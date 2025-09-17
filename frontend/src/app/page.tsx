"use client";

import React, { useState } from "react";

// Next.js 13+ (app router). Tailwind required.

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0C1B2A] text-gray-200">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_110%,rgba(23,74,58,0.18),rgba(0,0,0,0)_60%)]" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-[#174A3A]/40 via-[#174A3A]/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/15 to-transparent blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(90deg,transparent,transparent_12px,rgba(255,255,255,.06)_12px,rgba(255,255,255,.06)_13px)]"
      />

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
          <a className="text-sm text-gray-200/80 transition hover:text-white" href="#">
            Home
          </a>
          <a className="text-sm text-gray-200/80 transition hover:text-white" href="#about">
            About
          </a>
          <a className="text-sm text-gray-200/80 transition hover:text-white" href="#services">
            Services
          </a>
          <a className="text-sm text-gray-200/80 transition hover:text-white" href="#timeline">
            Timeline
          </a>
        </div>

        {/* Desktop actions (buttons keep hover) */}
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
            <a className="text-gray-100" href="#" onClick={() => setOpen(false)}>
              Home
            </a>
            <a className="text-gray-100" href="#about" onClick={() => setOpen(false)}>
              About
            </a>
            <a className="text-gray-100" href="#services" onClick={() => setOpen(false)}>
              Services
            </a>
            <a className="text-gray-100" href="#timeline" onClick={() => setOpen(false)}>
              Timeline
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

      {/* ===== TOP SECTION (HERO) ===== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-9 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left: Title */}
          <div>
            <p className="mb-2 text-xs tracking-[0.2em] text-gray-200/60">
              THE GUIDE FOR YOUR BUSINESS’S DIGITAL JOURNEY
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] text-[#F7F5EF] sm:text-5xl md:text-6xl">
              <span className="block">Secured</span>
              <span className="block bg-gradient-to-r from-[#F7F5EF] via-white to-[#F7F5EF] bg-clip-text text-transparent">
                Easy Servers
              </span>
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#services"
                className="rounded-2xl bg-white/5 px-5 py-3 text-sm text-[#F7F5EF] ring-1 ring-white/10 backdrop-blur-md transition hover:bg-white/10"
              >
                Explore Services
              </a>
              <button className="group rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-200/85 backdrop-blur-md transition hover:bg-white/10">
                <span className="bg-gradient-to-r from-white to-[#F7F5EF] bg-clip-text text-transparent">
                  Request a Demo
                </span>
              </button>
            </div>

            {/* stats */}
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 text-left sm:gap-6">
              <Stat label="Active Users" value="4.9K" />
              <Stat label="Protected Servers" value="20K+" />
            </div>
          </div>

          {/* Right: Copy block (no hover/animation) */}
          <div className="md:pl-8">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/20 to-transparent blur-2xl" />
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/70">
                <ShieldIcon className="h-3.5 w-3.5 text-white" />
                Top-Tier Security
              </div>
              <p className="text-base leading-7 text-gray-200">
                Trailbyte delivers consulting and technology services that blend{" "}
                <span className="mx-1 bg-gradient-to-r from-[#F7F5EF] to-white bg-clip-text font-medium text-transparent">
                  innovation with resilience.
                </span>
                Our solutions strengthen security, unlock data value, modernize infrastructure, and prepare organizations for the future of AI.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2">
                <Pill>Intrusion Detection</Pill>
                <Pill>Server Integrity</Pill>
                <Pill>End-to-End Encryption</Pill>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* subtle divider glow */}
      <div className="pointer-events-none relative z-10 mx-auto mb-8 h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* ===== ABOUT ===== */}
      <section id="about" className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-9">
        <header className="mb-8">
          <p className="mb-2 text-xs tracking-[0.2em] text-gray-200/60">ABOUT TRAILBYTE</p>
          <h2 className="text-3xl font-bold text-[#F7F5EF] sm:text-4xl">
            Driving Innovation in IT Solutions
          </h2>
          <p className="mt-3 max-w-3xl text-gray-200">
            Proven Track Record: <span className="font-semibold text-[#F7F5EF]">25 enterprise-scale implementations</span>.{" "}
            We’ve also launched <span className="font-semibold text-[#F7F5EF]">24 new projects</span> tailored to client needs.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Left: Narrative card */}
          <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/15 to-transparent blur-2xl" />
            <h3 className="text-xl font-semibold text-[#F7F5EF]">
              Engineering Expertise that Accelerates Growth
            </h3>
            <p className="mt-3 text-sm leading-6">
              Trailbyte is an IT consulting company dedicated to providing cutting-edge solutions for businesses. Our team of former engineers brings deep technical expertise to drive your business forward.
            </p>
            <p className="mt-3 text-sm leading-6">
              Our commitment to innovation extends beyond technology. We are dedicated to driving positive change and progress within the industry.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#services"
                className="rounded-2xl bg-[#174A3A] px-5 py-3 text-sm font-medium text-[#F7F5EF] shadow-[0_8px_30px_-12px_rgba(23,74,58,0.6)] transition hover:brightness-110"
              >
                Discover More
              </a>
              <span className="rounded-2xl border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-gray-200/80">
                Tailored Results
              </span>
            </div>
          </article>

          {/* Right: Mini features with outdoor icons (no hover) */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FeatureCard
              icon={<MountainIcon className="h-5 w-5 text-white" />}
              title="Built for the Summit"
              blurb="Strategy that scales as you climb—go from pilot to enterprise without losing footing."
            />
            <FeatureCard
              icon={<CompassIcon className="h-5 w-5 text-white" />}
              title="Guided by Outcomes"
              blurb="Clear compass points: security, speed, and measurable ROI. No vendor noise."
            />
            <FeatureCard
              icon={<PineIcon className="h-5 w-5 text-white" />}
              title="Resilient by Design"
              blurb="Sustainable architectures that bend, not break—rooted in governance."
            />
            <FeatureCard
              icon={<ShieldIcon className="h-5 w-5 text-white" />}
              title="Enterprise-Ready"
              blurb="25 major rollouts, 24 new projects launched—battle-tested delivery."
            />
          </div>
        </div>
      </section>

      {/* ===== SERVICES (only section with card hover) ===== */}
      <section id="services" className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-9">
        <header className="mb-6">
          <p className="mb-2 text-xs tracking-[0.2em] text-gray-200/60">OUR SERVICES</p>
          <h2 className="text-3xl font-bold text-[#F7F5EF] sm:text-4xl">
            <span className="bg-gradient-to-r from-[#F7F5EF] via-white to-[#F7F5EF] bg-clip-text text-transparent">
              Industry-Leading Solutions
            </span>
          </h2>
          <p className="mt-3 max-w-3xl text-gray-200">
            We strengthen security, unlock data value, modernize infrastructure, and prepare organizations for the future of AI.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SolutionCard
            title="Trailbyte Cyber Shield"
            tag="Security"
            description="Elite cybersecurity protection, beyond vendor bias. Full-spectrum assessments, AI-driven monitoring, and rapid incident response."
          />
          <SolutionCard
            title="Trailbyte Data Guard"
            tag="Data"
            description="Your data, governed, protected, and future-ready. Privacy compliance plus AI-powered risk detection to stay audit-ready and resilient."
          />
          <SolutionCard
            title="Trailbyte Digital Evolution"
            tag="Transformation"
            description="Transformation without the chaos. Cloud migration, process automation, and adoption strategies that deliver measurable outcomes."
          />
          <SolutionCard
            title="Trailbyte Virtualization Solutions"
            tag="Infrastructure"
            description="Scalable performance, reduced footprint. Consolidate infrastructure, optimize resources, and enhance flexibility with next-gen virtualization."
          />
          <SolutionCard
            title="Trailbyte AI Readiness Assessment"
            tag="AI"
            description="Your roadmap to responsible AI. Assess readiness, mitigate bias, and design governance for ethical, scalable AI adoption."
          />
          <SolutionCard
            title="Trailbyte Strategic CIO Advisory"
            tag="Advisory"
            description="Executive-level IT leadership, on demand. Align tech strategy with business goals, with board-ready reporting and guidance."
          />
        </div>
      </section>

      {/* ===== THE TIMELINE (with ripple/ping dot) ===== */}
      <section id="timeline" className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-9">
        <header className="mb-8">
          <p className="mb-2 text-xs tracking-[0.2em] text-gray-200/60">THE TRAILBYTE METHOD</p>
          <h2 className="text-3xl font-bold text-[#F7F5EF] sm:text-4xl">Discover. Secure. Scale.</h2>
          <p className="mt-3 max-w-3xl text-gray-200">
            A pragmatic path to outcomes: map reality, harden the core, then grow with confidence.
          </p>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/15 to-transparent blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/25 via-[#174A3A]/10 to-transparent blur-2xl" />

          {/* Animated line with ripple/ping dot */}
          <div className="relative mx-auto mt-4 mb-10 h-0.5 w-full max-w-4xl bg-white/10">
            <span className="absolute -top-[7px] left-0 h-4 w-4 animate-ping rounded-full bg-white/70" />
            <span className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-white" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <MethodCard
              step="01"
              title="Discover"
              blurb="Assess systems, data flows, and risk. Turn unknowns into a clear map of priorities."
            />
            <MethodCard
              step="02"
              title="Secure"
              blurb="Implement controls, monitoring, and response. Stabilize operations without slowing teams."
            />
            <MethodCard
              step="03"
              title="Scale"
              blurb="Automate, modernize, and measure. Ship faster with governance baked in from day one."
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="rounded-2xl bg-[#174A3A] px-5 py-3 text-sm font-medium text-[#F7F5EF] shadow-[0_8px_30px_-12px_rgba(23,74,58,0.6)] transition hover:brightness-110">
              See a Sample Roadmap
            </button>
            <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-200/85 backdrop-blur-md transition hover:bg-white/10">
              How We Measure ROI
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* === Small components === */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div className="text-2xl font-semibold tracking-tight text-[#F7F5EF] sm:text-3xl">
        <span className="bg-gradient-to-r from-[#F7F5EF] to-white bg-clip-text text-transparent">{value}</span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-widest text-gray-200/70">{label}</p>
    </div>
  );
}

function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={`inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#F7F5EF] ${className}`}>
      {children}
    </li>
  );
}

function FeatureCard({
  icon,
  title,
  blurb,
}: {
  icon: React.ReactNode;
  title: string;
  blurb: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-tr from-[#174A3A]/25 via-[#174A3A]/10 to-transparent blur-2xl" />
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-widest text-gray-200/70">
        {icon}
        <span>Focus</span>
      </div>
      <h3 className="text-lg font-semibold text-[#F7F5EF]">{title}</h3>
      <p className="mt-2 text-sm text-gray-200">{blurb}</p>
    </article>
  );
}

function MethodCard({
  step,
  title,
  blurb,
}: {
  step: string;
  title: string;
  blurb: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-tr from-[#174A3A]/25 via-[#174A3A]/10 to-transparent blur-2xl" />
      <div className="mb-2 text-[11px] font-semibold tracking-widest text-gray-200/70">STEP {step}</div>
      <h3 className="text-lg font-semibold text-[#F7F5EF]">{title}</h3>
      <p className="mt-2 text-sm text-gray-200">{blurb}</p>
    </article>
  );
}

/* SERVICES — keep hover animations here */
function SolutionCard({
  title,
  description,
  tag,
}: {
  title: string;
  description: string;
  tag?: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/10">
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/25 via-[#174A3A]/10 to-transparent blur-2xl" />
      {tag ? (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/70">
          {tag}
        </div>
      ) : null}
      <h3 className="text-xl font-semibold leading-tight text-[#F7F5EF]">
        <span className="bg-gradient-to-r from-[#F7F5EF] to-white bg-clip-text text-transparent">{title}</span>
      </h3>
      <p className="mt-3 text-sm leading-6 text-gray-200">{description}</p>
    </article>
  );
}

/* === Inline SVG Icons (outdoor vibes) === */

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M3 19h18l-6.5-9.5-2.5 3-3-4L3 19Z" />
      <path strokeWidth="1.5" d="M14.5 9.5 16 8l5 7" />
    </svg>
  );
}

function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="m9 15 2.6-6.5L15 9l-2.6 6.5L9 15Z" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function PineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M12 3 7 9h4L6 15h5l-3 4h8l-3-4h5l-5-6h4L12 3Z" />
    </svg>
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
