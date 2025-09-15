"use client";

import React, { useState } from "react";

// Drop this file into app/page.tsx (Next.js 13+ app router)
// Tailwind must be configured. No external assets required.

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] text-white">
      {/* Decorative Background Layers (kept same style, green palette) */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_110%,rgba(16,185,129,0.14),rgba(0,0,0,0)_60%)]" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-emerald-600/40 via-teal-400/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-teal-500/30 via-emerald-500/20 to-transparent blur-3xl" />

      {/* Vertical Scan Lines for a subtle futuristic vibe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(90deg,transparent,transparent_12px,rgba(255,255,255,.06)_12px,rgba(255,255,255,.06)_13px)]"
      />

      {/* NAVBAR */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4  py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {/* Use your white logo from /public/logo.png */}
          <img
            src="/logo.png"
            alt="Trailbyte logo"
            className="h-20 w-auto translate-y-2.5 "
            draggable={false}
          />
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <a className="text-sm text-white/80 transition hover:text-white" href="#">
            Home
          </a>
          <a className="text-sm text-white/80 transition hover:text-white" href="#">
            About
          </a>
          <a className="text-sm text-white/80 transition hover:text-white" href="#">
            Solutions
          </a>
          <a className="text-sm text-white/80 transition hover:text-white" href="#">
            Support
          </a>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-sm transition hover:bg-white/10">
            Log in
          </button>
          <button className="rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 px-4 py-2 text-sm font-medium shadow-[0_8px_30px_-10px_rgba(16,185,129,0.8)] transition hover:brightness-110">
            Sign Up
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-lg border border-white/10 p-2 text-white/80"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </nav>

     {/* Mobile dropdown panel */}
      {open && (
        <div className="md:hidden relative z-10 mx-4 mt-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex flex-col gap-4 text-sm">
            <a className="text-white/90" href="#" onClick={() => setOpen(false)}>Home</a>
            <a className="text-white/90" href="#" onClick={() => setOpen(false)}>About</a>
            <a className="text-white/90" href="#" onClick={() => setOpen(false)}>Solutions</a>
            <a className="text-white/90" href="#" onClick={() => setOpen(false)}>Support</a>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button className="rounded-xl bg-white/5 px-3 py-2 text-white/90 ring-1 ring-white/10" onClick={() => setOpen(false)}>Log in</button>
              <button className="rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 px-3 py-2 font-medium shadow-[0_10px_40px_-12px_rgba(16,185,129,0.8)]" onClick={() => setOpen(false)}>Sign Up</button>
            </div>
          </div>
        </div>
      )}


      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-9 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left: Title */}
          <div>
            <p className="mb-2 text-xs tracking-[0.2em] text-white/50">
              THE GUIDE FOR YOUR BUSINESSES DIGITAL JOURNEY
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
              <span className="block text-white/90">Secured</span>
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                Easy Servers
              </span>
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="rounded-2xl bg-white/5 px-5 py-3 text-sm text-white/90 ring-1 ring-white/10 backdrop-blur-md transition hover:bg-white/10">
                Explore Solutions
              </button>
              <button className="group rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/10">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Request a Demo
                </span>
              </button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 text-left sm:gap-6">
              <Stat label="Active Users" value="4.9K" />
              <Stat label="Protected Servers" value="20K+" />
            </div>
          </div>

          {/* Right: Copy block / Features */}
          <div className="md:pl-8">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-transparent blur-2xl" />
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-white/70">
                <ShieldIcon className="h-3.5 w-3.5" />
                Top-Tier Security
              </div>
              <p className="text-m leading-7 text-white/80">
                Trailbyte delivers consulting and technology services that blend
                <span className="mx-1 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text font-medium text-transparent">
                innovation with resilience.
                </span>
                Our solutions strengthen security, unlock data value, modernize infrastructure, and prepare organizations for the future of AI.
              </p>

              <ul className="mt-6 grid lg:grid-cols-2 md:grid-cols-2 gap-3 sm:grid-cols-3" >
                <Pill>Intrusion Detection</Pill>
                <Pill>Server Integrity</Pill>
                <Pill >End-to-End Encryption</Pill>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom arc glow + labels */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[28rem] w-[80rem] -translate-x-1/2 rounded-[50%] bg-gradient-to-t from-emerald-600/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-0 flex select-none items-center justify-between px-8 text-[10px] uppercase tracking-[0.35em] text-white/30">
        <span>Intrusion Detection</span>
        <span className="mx-auto bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          Server Integrity
        </span>
        <span>End-to-End Encryption</span>
      </div>

      
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
        <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          {value}
        </span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-widest text-white/60">{label}</p>
    </div>
  );
}

function Pill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={`inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 ${className}`}
    >
      {children}
    </li>
  );
}


function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.5c-.3 0-.6.06-.86.18L6.2 4.54a2 2 0 0 0-1.2 1.84v5.66c0 2.35 1.14 4.57 3.06 5.93l3.05 2.14c.54.38 1.25.38 1.79 0l3.05-2.14a7.33 7.33 0 0 0 3.06-5.93V6.38c0-.8-.47-1.53-1.2-1.84L12.86 2.68c-.27-.12-.56-.18-.86-.18Zm0 5.25a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
