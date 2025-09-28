"use client";

import Guard from "../_components/Guard";
import AdminShell from "../_components/AdminShell";
import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "../../../../fbservices/firebaseClient";

export default function ProfilePage() {
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const changePw = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null); setErr(null);
    const user = auth.currentUser;
    if (!user) {
      setErr("No active session.");
      return;
    }
    try {
      await updatePassword(user, pw);
      setMsg("Password updated.");
      setPw("");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to update password.");
    }
  };

  return (
    <Guard>
      <AdminShell>
        <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/20 to-transparent blur-2xl" />
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/70">
            🛡️ Profile
          </div>
          <h1 className="text-2xl font-bold text-[#F7F5EF]">Account Security</h1>
          <p className="mt-2 text-sm text-gray-200">
            Update your admin password below.
          </p>

          <form onSubmit={changePw} className="mt-6 max-w-md">
            {msg && (
              <div className="mb-3 rounded-2xl border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-100">
                {msg}
              </div>
            )}
            {err && (
              <div className="mb-3 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-100">
                {err}
              </div>
            )}
            <label className="mb-1 block text-xs uppercase tracking-widest text-gray-200/70">
              New Password
            </label>
            <input
              type="password"
              className="mb-4 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              minLength={6}
              required
            />
            <button
              type="submit"
              className="rounded-2xl bg-[#174A3A] px-5 py-3 text-sm font-medium text-[#F7F5EF] transition hover:brightness-110"
            >
              Update Password
            </button>
          </form>
        </section>
      </AdminShell>
    </Guard>
  );
}
