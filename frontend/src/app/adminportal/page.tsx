"use client";

import { useEffect, useMemo, useState } from "react";
import Guard from "./_components/Guard";
import AdminShell from "./_components/AdminShell";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../fbservices/firebaseClient";

/* ------------------------------
   Types
------------------------------ */

type ClientDoc = {
  email?: string;
  name?: string;
  company?: string;
  status?: string; // 'active' or other
  createdAt?: any; // Firestore Timestamp
};

type MessageDoc = {
  id?: string;
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  urgency?: "Low" | "Normal" | "High" | "Critical";
  status?: "new" | "open" | "done" | "in_progress" | "closed";
  read?: boolean;
  createdAt?: any; // Firestore Timestamp
};

/* ------------------------------
   Helpers
------------------------------ */

const DAYS = 14;

function toDate(v: any): Date | null {
  // supports Firestore Timestamp or native Date or undefined
  if (!v) return null;
  if (typeof v.toDate === "function") return v.toDate() as Date;
  if (v instanceof Date) return v;
  return null;
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function formatDayMMDD(d: Date) {
  return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

function lastNDaysBuckets(n = DAYS) {
  const today = startOfDay(new Date());
  const days: { key: string; date: Date; count: number }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({ key: startOfDay(d).toISOString(), date: d, count: 0 });
  }
  return days;
}

function bumpBucket(buckets: { key: string; date: Date; count: number }[], when: Date | null) {
  if (!when) return;
  const dayKey = startOfDay(when).toISOString();
  const idx = buckets.findIndex((b) => b.key === dayKey);
  if (idx >= 0) buckets[idx].count += 1;
}

/* ------------------------------
   Dashboard
------------------------------ */

export default function AdminHome() {
  // Clients
  const [clientsTotal, setClientsTotal] = useState(0);
  const [clientsActive, setClientsActive] = useState(0);
  const [clientsSeries, setClientsSeries] = useState<{ key: string; date: Date; count: number }[]>(
    lastNDaysBuckets()
  );

  // Messages
  const [msgsTotal, setMsgsTotal] = useState(0);
  const [msgsUnread, setMsgsUnread] = useState(0);
  const [msgsSeries, setMsgsSeries] = useState<{ key: string; date: Date; count: number }[]>(
    lastNDaysBuckets()
  );
  const [urgencyCounts, setUrgencyCounts] = useState<Record<string, number>>({
    Low: 0,
    Normal: 0,
    High: 0,
    Critical: 0,
  });
  const [recent, setRecent] = useState<MessageDoc[]>([]);

  // Subscribe to clients
  useEffect(() => {
    const qClients = query(collection(db, "clients"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      qClients,
      (snap) => {
        let total = 0;
        let active = 0;
        const series = lastNDaysBuckets();

        snap.forEach((d) => {
          const data = d.data() as ClientDoc;
          total++;
          if ((data.status ?? "").toLowerCase() === "active") active++;
          bumpBucket(series, toDate(data.createdAt));
        });

        setClientsTotal(total);
        setClientsActive(active);
        setClientsSeries(series);
      },
      (e) => console.error(e)
    );
    return () => unsub();
  }, []);

  // Subscribe to messages (IMPORTANT: collection name is contactMessages)
  useEffect(() => {
    const qMsgs = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      qMsgs,
      (snap) => {
        let total = 0;
        let unread = 0;
        const uCounts = { Low: 0, Normal: 0, High: 0, Critical: 0 };
        const series = lastNDaysBuckets();

        const recents: MessageDoc[] = [];
        snap.forEach((d) => {
          const data = { id: d.id, ...(d.data() as MessageDoc) };
          total++;
          const isUnread = data.read === false || data.read === undefined;
          if (isUnread) unread++;
          const u = data.urgency ?? "Normal";
          if (uCounts[u as keyof typeof uCounts] !== undefined) {
            uCounts[u as keyof typeof uCounts] += 1;
          }
          bumpBucket(series, toDate(data.createdAt));
          if (recents.length < 6) recents.push(data);
        });

        setMsgsTotal(total);
        setMsgsUnread(unread);
        setUrgencyCounts(uCounts);
        setMsgsSeries(series);
        setRecent(recents);
      },
      (e) => console.error(e)
    );
    return () => unsub();
  }, []);

  const readRate = useMemo(() => {
    if (msgsTotal === 0) return 1;
    return (msgsTotal - msgsUnread) / msgsTotal;
  }, [msgsTotal, msgsUnread]);

  const unreadRate = useMemo(() => (msgsTotal === 0 ? 0 : msgsUnread / msgsTotal), [msgsTotal, msgsUnread]);

  return (
    <Guard>
      <AdminShell>
        {/* Top overview panel */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          {/* soft bg accents */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent blur-2xl" />
          <header className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/70">
            <span className="h-3 w-3 rounded-full bg-gradient-to-tr from-white/60 to-white/20" />
            Dashboard Overview
          </header>

          {/* Grid layout: KPIs + charts + recent */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* KPI + sparklines */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
              <StatCard
                title="New Clients (14d)"
                value={clientsSeries.reduce((a, b) => a + b.count, 0)}
                sub={`${clientsActive} active / ${clientsTotal} total`}
              >
                <Sparkline data={clientsSeries.map((d) => d.count)} labels={clientsSeries.map((d) => formatDayMMDD(d.date))} />
              </StatCard>

              <StatCard
                title="Messages (14d)"
                value={msgsSeries.reduce((a, b) => a + b.count, 0)}
                sub={`${msgsUnread} unread / ${msgsTotal} total`}
              >
                <Sparkline data={msgsSeries.map((d) => d.count)} labels={msgsSeries.map((d) => formatDayMMDD(d.date))} />
              </StatCard>

              <RingCard title="Read Rate" value={Math.round(readRate * 100)} caption={`${msgsTotal - msgsUnread} read`} />

              <UrgencyCard counts={urgencyCounts} />
            </div>

            {/* Recent messages */}
            <div className="lg:col-span-6">
              <RecentMessagesCard items={recent} />
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/adminportal/clients"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-100 hover:bg-white/10"
            >
              View Clients
            </a>
            <a
              href="/adminportal/messages"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-100 hover:bg-white/10"
            >
              View Messages
            </a>
          </div>
        </section>
      </AdminShell>
    </Guard>
  );
}

/* ------------------------------
   Cards & Visuals
------------------------------ */

function StatCard({
  title,
  value,
  sub,
  children,
}: {
  title: string;
  value: number | string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent blur-2xl" />
      <h3 className="text-[12px] uppercase tracking-[0.2em] text-gray-300">{title}</h3>
      <div className="mt-2 text-3xl font-semibold text-[#F7F5EF]">
        <span className="bg-gradient-to-r from-[#F7F5EF] to-white bg-clip-text text-transparent">{value}</span>
      </div>
      {sub ? <p className="mt-1 text-xs text-gray-300">{sub}</p> : null}
      <div className="mt-4">{children}</div>
    </article>
  );
}

function Sparkline({ data, labels }: { data: number[]; labels?: string[] }) {
  // Simple inline SVG sparkline
  const width = 220;
  const height = 46;
  const pad = 4;
  const max = Math.max(1, ...data);
  const step = (width - pad * 2) / Math.max(1, data.length - 1);
  const points = data.map((v, i) => {
    const x = pad + i * step;
    const y = height - pad - (v / max) * (height - pad * 2);
    return `${x},${y}`;
  });

  return (
    <div className="relative h-[56px] w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        {/* grid line */}
        <line x1="0" y1={height - 1} x2={width} y2={height - 1} className="stroke-white/10" />
        {/* area fill */}
        <polyline
          points={`0,${height - pad} ${points.join(" ")} ${width},${height - pad}`}
          className="fill-white/5"
        />
        {/* line */}
        <polyline points={points.join(" ")} className="fill-none stroke-white/60" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function RingCard({ title, value, caption }: { title: string; value: number; caption?: string }) {
  // value: 0..100
  const size = 120;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c;

  return (
    <article className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="relative h-[120px] w-[120px]">
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,.12)" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(255,255,255,.85)"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xl font-semibold text-white">{pct}%</div>
        </div>
      </div>
      <div>
        <h3 className="text-[12px] uppercase tracking-[0.2em] text-gray-300">{title}</h3>
        {caption ? <p className="mt-2 text-sm text-gray-200">{caption}</p> : null}
        <p className="mt-1 text-xs text-gray-400">Percentage of messages marked read.</p>
      </div>
    </article>
  );
}

function UrgencyCard({ counts }: { counts: Record<string, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const items: Array<{ label: string; key: keyof typeof counts; cls: string }> = [
    { label: "Critical", key: "Critical", cls: "bg-rose-400" },
    { label: "High", key: "High", cls: "bg-amber-400" },
    { label: "Normal", key: "Normal", cls: "bg-slate-400" },
    { label: "Low", key: "Low", cls: "bg-emerald-400" },
  ];

  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-[12px] uppercase tracking-[0.2em] text-gray-300">Urgency</h3>
      <ul className="mt-4 space-y-3">
        {items.map((it) => {
          const n = counts[it.key] || 0;
          const pct = Math.round((n / total) * 100);
          return (
            <li key={it.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-200">{it.label}</span>
                <span className="text-gray-300">{n} • {pct}%</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full ${it.cls}`}
                  style={{ width: `${(n / total) * 100}%`, opacity: 0.85 }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function RecentMessagesCard({ items }: { items: MessageDoc[] }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent blur-2xl" />
      <h3 className="text-[12px] uppercase tracking-[0.2em] text-gray-300">Recent Messages</h3>

      <ul className="mt-3 divide-y divide-white/10">
        {items.map((m) => {
          const unread = m.read === false || m.read === undefined;
          return (
            <li key={m.id} className="py-3 first:pt-0 last:pb-0">
              <a href="/adminportal/messages" className="block">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                          unread ? "bg-sky-300 shadow-[0_0_0_2px_rgba(56,189,248,0.15)]" : "border border-white/30"
                        }`}
                      />
                      <span className={`truncate text-sm ${unread ? "font-semibold text-white" : "text-gray-100"}`}>
                        {m.name || "Unknown"}
                      </span>
                      <span className="truncate text-xs text-gray-300">• {m.email}</span>
                      {m.company && <span className="truncate text-xs text-gray-300">• {m.company}</span>}
                    </div>
                    <p className={`mt-1 line-clamp-2 text-xs ${unread ? "text-white/90" : "text-gray-300"}`}>
                      {m.message}
                    </p>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    {m.createdAt?.toDate ? m.createdAt.toDate().toLocaleDateString() : ""}
                  </div>
                </div>
              </a>
            </li>
          );
        })}
        {items.length === 0 && (
          <li className="py-6 text-center text-gray-300">No recent messages.</li>
        )}
      </ul>
    </article>
  );
}
