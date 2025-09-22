"use client";

import React from "react";

export default function SiteNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Trailbyte logo"
            className="h-20 w-auto translate-y-2.5"
            draggable={false}
          />
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <a className="text-sm text-gray-200/80 transition hover:text-white" href="/">
            Home
          </a>
          <a className="text-sm text-gray-200/80 transition hover:text-white" href="/about">
            About
          </a>
          <a className="text-sm text-gray-200/80 transition hover:text-white" href="/services">
            Services
          </a>
          <a className="text-sm text-gray-200/80 transition hover:text-white" href="/contact">
            Contact
          </a>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-200/85 backdrop-blur-sm transition hover:bg-white/10">
            Log in
          </button>
          <button className="rounded-xl bg-[#174A3A] px-4 py-2 text-sm font-medium text-[#F7F5EF] shadow-[0_8px_30px_-10px_rgba(23,74,58,0.6)] transition hover:brightness-110">
            Sign Up
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-lg border border-white/10 p-2 text-gray-200/80"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden relative z-10 mx-4 mt-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex flex-col gap-4 text-sm">
            <a className="text-gray-100" href="/" onClick={() => setOpen(false)}>
              Home
            </a>
            <a className="text-gray-100" href="/about" onClick={() => setOpen(false)}>
              About
            </a>
            <a className="text-gray-100" href="/services" onClick={() => setOpen(false)}>
              Services
            </a>
            <a className="text-gray-100" href="/#timeline" onClick={() => setOpen(false)}>
              Timeline
            </a>
            <a className="text-gray-100" href="/contact" onClick={() => setOpen(false)}>
              Contact
            </a>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                className="rounded-xl bg-white/5 px-3 py-2 text-gray-100 ring-1 ring-white/10 transition hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Log in
              </button>
              <button
                className="rounded-xl bg-[#174A3A] px-3 py-2 font-medium text-[#F7F5EF] shadow-[0_10px_40px_-12px_rgba(23,74,58,0.6)] transition hover:brightness-110"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* === Local icon (kept identical) === */
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
