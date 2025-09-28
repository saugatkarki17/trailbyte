"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../fbservices/firebaseClient";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      router.replace("/adminportal");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";
      setErr(message);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#0C1B2A] text-gray-200">
      {/* Background accents (Trailbyte) */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_110%,rgba(23,74,58,0.18),rgba(0,0,0,0)_60%)]" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-[#174A3A]/40 via-[#174A3A]/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/15 to-transparent blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(90deg,transparent,transparent_12px,rgba(255,255,255,.06)_12px,rgba(255,255,255,.06)_13px)]"
      />

      <form
        onSubmit={handleLogin}
        className="relative isolate w-[22rem] overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/20 to-transparent blur-2xl" />
        <h1 className="mb-4 text-xl font-bold text-[#F7F5EF]">Admin Login</h1>
        {err && (
          <div className="mb-3 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-100">
            {err}
          </div>
        )}
        <input
          type="email"
          placeholder="Admin email"
          className="mb-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-white outline-none"
          value={pw}
          onChange={(e) => setPw(e.currentTarget.value)}
          required
        />
        <button
          type="submit"
          className="w-full rounded-2xl bg-[#174A3A] px-4 py-3 text-sm font-medium text-[#F7F5EF] transition hover:brightness-110"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
