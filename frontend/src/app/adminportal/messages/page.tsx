"use client";

import React, { useEffect, useMemo, useState } from "react";
import Guard from "../_components/Guard";
import AdminShell from "../_components/AdminShell";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp, // <-- add this
} from "firebase/firestore";
import { db } from "../../../../fbservices/firebaseClient";

type Msg = {
  id: string;
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  status?: "new" | "open" | "done" | "in_progress" | "closed";
  urgency?: "Low" | "Normal" | "High" | "Critical";
  createdAt?: Timestamp | null; // <-- no 'any'
  read?: boolean;
};

const COLLECTION = "contactMessages";

export default function MessagesPage() {
  const [rows, setRows] = useState<Msg[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const out: Msg[] = [];
        snap.forEach((d) => out.push({ id: d.id, ...(d.data() as Omit<Msg, "id">) }));
        setRows(out);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const markRead = async (m: Msg, value = true) => {
    try {
      await updateDoc(doc(db, COLLECTION, m.id), { read: value });
    } catch (e) {
      console.error(e);
      alert("Failed to update read state.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteDoc(doc(db, COLLECTION, id));
    } catch (e) {
      console.error(e);
      alert("Delete failed.");
    }
  };

  const urgencyClass = (u?: Msg["urgency"]): string => {
    switch (u) {
      case "Critical":
        return "border-rose-400/40 bg-rose-400/10 text-rose-100";
      case "High":
        return "border-amber-400/40 bg-amber-400/10 text-amber-100";
      case "Low":
        return "border-slate-400/40 bg-slate-400/10 text-slate-100";
      case "Normal":
      default:
        return "border-slate-400/30 bg-white/5 text-gray-200/80";
    }
  };

  const list = useMemo(
    () => (
      <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent blur-2xl" />
        <header className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/70">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" d="M4 6h16v12H4z" />
            <path strokeWidth="1.5" d="m4 7 8 6 8-6" />
          </svg>
          Messages
        </header>

        <ul className="space-y-3">
          {rows.map((m) => {
            const unread =
              m.read === false ||
              (m.read === undefined && (m.status ?? "new") !== "done");

            return (
              <li
                key={m.id}
                className={`relative overflow-hidden rounded-3xl border px-0 py-0 backdrop-blur-sm transition hover:-translate-y-0.5 ${
                  unread
                    ? "border-white/15 bg-gray/[0.04]" // UNREAD: darker (stable)
                    : "border-white/10 bg-black/10 opacity-45 hover:opacity-100" // READ: lighter + slight fade
                }`}
              >
                {/* Thin left gradient accent only for UNREAD */}
                {unread && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-sky-400/80 via-sky-400/40 to-transparent"
                  />
                )}

                <div className="px-5 py-4">
                  {/* header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex min-w-0 items-center gap-2">
                        {/* unread dot */}
                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                            unread
                              ? "bg-sky-300 shadow-[0_0_0_2px_rgba(56,189,248,0.15)]"
                              : "border border-white/30"
                          }`}
                          aria-hidden
                        />
                        <span
                          className={`truncate text-sm ${
                            unread ? "font-semibold text-white" : "text-gray-100"
                          }`}
                        >
                          {m.name || "Unknown"}
                        </span>
                        <span className="truncate text-xs text-gray-300">• {m.email}</span>
                        {m.company && (
                          <span className="truncate text-xs text-gray-300">• {m.company}</span>
                        )}
                        {unread && (
                          <span className="ml-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-[10px] font-medium tracking-widest text-sky-100">
                            UNREAD
                          </span>
                        )}
                      </div>

                      {/* urgency chip */}
                      {m.urgency && (
                        <span
                          className={`mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${urgencyClass(
                            m.urgency
                          )}`}
                        >
                          {m.urgency}
                        </span>
                      )}
                    </div>

                    <div className={`text-xs ${unread ? "text-sky-100" : "text-gray-300"}`}>
                      {m.createdAt?.toDate ? m.createdAt.toDate().toLocaleString() : ""}
                    </div>
                  </div>

                  {/* body */}
                  <p
                    className={`mt-2 whitespace-pre-wrap text-sm ${
                      unread ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {m.message}
                  </p>

                  {/* actions */}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {m.email && (
                      <a
                        href={`mailto:${m.email}?subject=Re:%20Trailbyte%20Inquiry&body=Hi%20${encodeURIComponent(
                          m.name || ""
                        )},%0D%0A%0D%0A`}
                        className={`rounded-xl border px-3 py-1 transition hover:brightness-110 ${
                          unread
                            ? "border-sky-400/40 bg-sky-400/10 text-sky-100"
                            : "border-white/10 hover:bg-white/10"
                        }`}
                      >
                        Reply
                      </a>
                    )}
                    {unread ? (
                      <button
                        onClick={() => markRead(m, true)}
                        className="rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-sky-100 transition hover:brightness-110"
                      >
                        Mark as read
                      </button>
                    ) : (
                      <button
                        onClick={() => markRead(m, false)}
                        className="rounded-xl border border-white/10 px-3 py-1 text-gray-200 transition hover:bg-white/10"
                      >
                        Mark as unread
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-1 text-red-100 transition hover:brightness-110"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })}

          {!loading && rows.length === 0 && (
            <li className="rounded-3xl border border-white/10 bg-white/5 px-5 py-6 text-center text-gray-300">
              No messages yet.
            </li>
          )}
        </ul>
      </section>
    ),
    [rows, loading]
  );

  return (
    <Guard>
      <AdminShell>{list}</AdminShell>
    </Guard>
  );
}
