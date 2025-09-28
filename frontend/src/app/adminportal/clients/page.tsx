"use client";

import React, { useEffect, useMemo, useState } from "react";
import Guard from "../_components/Guard";
import AdminShell from "../_components/AdminShell";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../fbservices/firebaseClient";

type Client = {
  id: string;
  name: string;
  email: string;
  company?: string;
  status?: "new" | "active" | "paused" | "inactive";
  createdAt?: Timestamp | null;
};

const CLIENTS_COLLECTION = "clients";

export default function ClientsPage() {
  const [rows, setRows] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // form state (create or edit)
  const [form, setForm] = useState<Partial<Client>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // subscribe realtime
  useEffect(() => {
    const q = query(collection(db, CLIENTS_COLLECTION), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const out: Client[] = [];
        snap.forEach((d) => out.push({ id: d.id, ...(d.data() as Omit<Client, "id">) }));
        setRows(out);
        setLoading(false);
      },
      () => {
        setError("Failed to load clients.");
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const resetForm = () => {
    setForm({});
    setEditingId(null);
    setError(null);
  };

  const startEdit = (row: Client) => {
    setEditingId(row.id);
    setForm({
      name: row.name,
      email: row.email,
      company: row.company ?? "",
      status: (row.status as Client["status"]) ?? "active",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: form.name?.trim() || "",
        email: form.email?.trim() || "",
        company: (form.company ?? "").toString().trim(),
        status: (form.status as Client["status"]) || "active",
        ...(editingId ? {} : { createdAt: serverTimestamp() }),
      };

      if (!payload.name || !payload.email) {
        setError("Name and Email are required.");
        setSaving(false);
        return;
      }

      if (editingId) {
        await updateDoc(doc(db, CLIENTS_COLLECTION, editingId), payload);
      } else {
        await addDoc(collection(db, CLIENTS_COLLECTION), payload);
      }
      resetForm();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Save failed.";
      console.error(e);
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this client?")) return;
    try {
      await deleteDoc(doc(db, CLIENTS_COLLECTION, id));
    } catch (e: unknown) {
      console.error(e);
      alert("Delete failed.");
    }
  };

  const table = useMemo(
    () => (
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/20 to-transparent blur-2xl" />
        <div className="border-b border-white/10 px-5 py-3 text-[11px] uppercase tracking-widest text-gray-200/70">
          Clients
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-black/30 text-gray-200/80">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Company</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">
                    <a className="underline-offset-2 hover:underline" href={`mailto:${r.email}`}>
                      {r.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">{r.company ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs uppercase tracking-widest">
                      {r.status ?? "active"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(r)}
                        className="rounded-xl border border-white/10 px-3 py-1 text-xs hover:bg-white/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs text-red-100 hover:brightness-110"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && rows.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-300" colSpan={5}>
                    No clients yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    ),
    [rows, loading]
  );

  return (
    <Guard>
      <AdminShell>
        <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/20 to-transparent blur-2xl" />

          <header className="mb-5 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/70">
              👥 Clients
            </div>
          </header>

          {/* Create / Edit form */}
          <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-5">
            <input
              className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none sm:col-span-1"
              placeholder="Name*"
              value={form.name ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
            <input
              className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none sm:col-span-1"
              placeholder="Email*"
              type="email"
              value={form.email ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
            <input
              className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none sm:col-span-1"
              placeholder="Company"
              value={form.company ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            />
            <select
              className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none sm:col-span-1"
              value={form.status ?? "active"}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Client["status"] }))}
            >
              <option value="new">new</option>
              <option value="active">active</option>
              <option value="paused">paused</option>
              <option value="inactive">inactive</option>
            </select>

            <div className="flex gap-2 sm:col-span-1">
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-2xl bg-[#174A3A] px-4 py-3 text-sm font-medium text-[#F7F5EF] transition hover:brightness-110 disabled:opacity-60"
              >
                {editingId ? "Update" : "Add Client"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm hover:bg-white/10"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-100">
              {error}
            </div>
          )}

          {table}
        </section>
      </AdminShell>
    </Guard>
  );
}
