"use client";

import React, { useState } from "react";

/* -----------------------------------------------------------
   Reusable background containers (no hero usage)
   - ImageBand: full-width band with low-contrast image bg
   - BGPanel:  column/card with low-contrast image bg
------------------------------------------------------------ */

type ImageBandProps = {
  src: string;
  alt: string;
  heightClass?: string; // e.g., "min-h-[20rem]"
  className?: string;
  children?: React.ReactNode;
};
function ImageBand({
  src,
  alt,
  heightClass = "min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem]",
  className = "",
  children,
}: ImageBandProps) {
  return (
    <section
      className={`relative isolate overflow-hidden rounded-3xl border border-white/10 ${heightClass} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/* darker scrim for readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0C1B2A]/92 via-[#0C1B2A]/78 to-[#174A3A]/58" />
      {/* subtle grid to unify look */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-overlay"
        style={{
          background:
            "linear-gradient(transparent 95%, rgba(255,255,255,.25) 96%) 0 0/100% 18px, " +
            "linear-gradient(90deg, transparent 95%, rgba(255,255,255,.25) 96%) 0 0/18px 100%",
        }}
      />
      <div className="relative h-full w-full">{children}</div>
    </section>
  );
}

type BGPanelProps = {
  src: string;
  alt: string;
  className?: string;
  contentClass?: string;
  children?: React.ReactNode;
};
function BGPanel({
  src,
  alt,
  className = "",
  contentClass = "p-6 sm:p-7 lg:p-8",
  children,
}: BGPanelProps) {
  return (
    <section
      className={`relative isolate overflow-hidden rounded-3xl border border-white/10 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0C1B2A]/90 via-[#0C1B2A]/76 to-[#0C1B2A]/58" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-overlay"
        style={{
          background:
            "linear-gradient(transparent 95%, rgba(255,255,255,.22) 96%) 0 0/100% 18px, " +
            "linear-gradient(90deg, transparent 95%, rgba(255,255,255,.22) 96%) 0 0/18px 100%",
        }}
      />
      <div className={`relative ${contentClass}`}>{children}</div>
    </section>
  );
}

/* -----------------------------------------------------------
   Page
------------------------------------------------------------ */

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
          <a className="text-sm text-gray-200/80 transition hover:text-white" href="#contact">
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
            <a className="text-gray-100" href="#contact" onClick={() => setOpen(false)}>
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

      {/* ===== HERO (unchanged, no images here) ===== */}
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

          {/* Right: Copy block */}
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

          {/* Right: Mini features over low-contrast image background */}
          <BGPanel
            src="/TrailbyteDigitalGuide.png"
            alt="Trailbyte Digital Guide"
            className="min-h-[20rem]"
            contentClass="p-6 sm:p-7 lg:p-8"
          >
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
          </BGPanel>
        </div>
      </section>

      {/* ===== TIMELINE (with low-contrast background image) ===== */}
      <section id="timeline" className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-9">
        <header className="mb-8">
          <p className="mb-2 text-xs tracking-[0.2em] text-gray-200/60">THE TRAILBYTE METHOD</p>
          <h2 className="text-3xl font-bold text-[#F7F5EF] sm:text-4xl">Discover. Secure. Scale.</h2>
          <p className="mt-3 max-w-3xl text-gray-200">
            A pragmatic path to outcomes: map reality, harden the core, then grow with confidence.
          </p>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          {/* background image for timeline box */}
          <img
            src="/TrailByteDigitalRevolution.png"
            alt="Background"
            aria-hidden
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[#0C1B2A]/80" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-overlay"
            style={{
              background:
                "linear-gradient(transparent 95%, rgba(255,255,255,.22) 96%) 0 0/100% 18px, " +
                "linear-gradient(90deg, transparent 95%, rgba(255,255,255,.22) 96%) 0 0/18px 100%",
            }}
          />

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

      {/* ===== CONTACT / MESSAGE (with fun meter) ===== */}
      <section id="contact" className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-9">
        <ImageBand
          src="/TrailbyteDigitalGuide.png"
          alt="Contact Trailbyte"
          heightClass="min-h-[22rem] sm:min-h-[24rem] md:min-h-[26rem]"
        >
          <div className="flex h-full items-stretch px-6 py-6 sm:px-10 sm:py-8">
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-12">
              {/* Left: copy */}
              <div className="md:col-span-5">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/90">
                  Get in touch
                </div>
                <h3 className="text-2xl font-semibold text-[#F7F5EF]">Let’s talk security.</h3>
                <p className="mt-2 max-w-[48ch] text-sm text-gray-100/95">
                  Tell us where you are today and where you need to be. We’ll map a secure, practical path—no vendor noise.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-gray-100/95">
                  <li className="inline-flex items-center gap-2">
                    <MailIcon className="h-4 w-4" />{" "}
                    <a href="mailto:hello@trailbyte.io" className="underline-offset-2 hover:underline">
                      hello@trailbyte.io
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <ShieldIcon className="h-4 w-4" /> 24h response on active incidents
                  </li>
                </ul>
              </div>

              {/* Right: form card */}
              <div className="md:col-span-7">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const toast = document.getElementById("tb-contact-toast");
                    if (toast) {
                      toast.classList.remove("opacity-0", "translate-y-2");
                      setTimeout(() => toast.classList.add("opacity-0", "translate-y-2"), 3500);
                    }
                  }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5"
                >
                  {/* fun shimmer bar */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="flex flex-col gap-1">
                      <span className="text-xs tracking-wide text-gray-200/80">Name</span>
                      <input
                        type="text"
                        name="name"
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20"
                        placeholder="Jane Doe"
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-xs tracking-wide text-gray-200/80">Email</span>
                      <input
                        type="email"
                        name="email"
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20"
                        placeholder="jane@company.com"
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-1 sm:col-span-2">
                      <span className="text-xs tracking-wide text-gray-200/80">Company / Website</span>
                      <input
                        type="text"
                        name="company"
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20"
                        placeholder="Acme • acme.com"
                      />
                    </label>

                    {/* Message + fun element */}
                    <MessageWithMeter />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15"
                    >
                      Send message <ArrowIcon className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-gray-200/70">We’ll reply within one business day.</span>
                  </div>

                  {/* toast */}
                  <div
                    id="tb-contact-toast"
                    className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white opacity-0 shadow-sm backdrop-blur transition duration-300 ease-out translate-y-2"
                  >
                    <CheckIcon className="h-4 w-4" /> Message queued securely
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* local styles for the encryption meter */}
          <style jsx>{`
            @keyframes meterPulse { 0% { opacity: .65 } 50% { opacity: 1 } 100% { opacity: .65 } }
            .tb-meter-pulse { animation: meterPulse 1.6s ease-in-out infinite; }
          `}</style>
        </ImageBand>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-9">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Trailbyte logo" className="h-7 w-auto" />
                <span className="text-sm font-semibold tracking-wide text-white">TRAILBYTE</span>
              </div>
              <p className="mt-3 max-w-[40ch] text-sm text-gray-200/85">
                Pragmatic cybersecurity &amp; data governance—designed for speed, built for audit.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a href="#" aria-label="GitHub" className="rounded-lg border border-white/10 bg-white/5 p-2 hover:bg-white/10">
                  <GitHubIcon className="h-4 w-4" />
                </a>
                <a href="#" aria-label="LinkedIn" className="rounded-lg border border-white/10 bg-white/5 p-2 hover:bg-white/10">
                  <LinkedInIcon className="h-4 w-4" />
                </a>
                <a href="#" aria-label="X" className="rounded-lg border border-white/10 bg-white/5 p-2 hover:bg-white/10">
                  <XIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Services</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-200/85">
                <li><a href="#services" className="hover:underline underline-offset-2">Cyber Shield</a></li>
                <li><a href="#services" className="hover:underline underline-offset-2">Data Guard</a></li>
                <li><a href="#services" className="hover:underline underline-offset-2">Digital Evolution</a></li>
                <li><a href="#services" className="hover:underline underline-offset-2">CIO Advisory</a></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-200/85">
                <li><a href="#about" className="hover:underline underline-offset-2">About</a></li>
                <li><a href="#timeline" className="hover:underline underline-offset-2">Method</a></li>
                <li><a href="#contact" className="hover:underline underline-offset-2">Contact</a></li>
                <li><a href="#" className="hover:underline underline-offset-2">Careers</a></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Contact</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-200/85">
                <li className="inline-flex items-center gap-2">
                  <MailIcon className="h-4 w-4" />{" "}
                  <a href="mailto:hello@trailbyte.io" className="hover:underline underline-offset-2">hello@trailbyte.io</a>
                </li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-200/70 sm:flex-row">
            <span>© {new Date().getFullYear()} Trailbyte. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:underline underline-offset-2">Privacy</a>
              <a href="#" className="hover:underline underline-offset-2">Terms</a>
              <a href="#contact" className="hover:underline underline-offset-2">Report an issue</a>
            </div>
          </div>
        </div>
      </footer>
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

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3 text-center backdrop-blur">
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-widest text-gray-200/80">{label}</div>
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

/* === Contact helpers === */

function MessageWithMeter() {
  const [msg, setMsg] = React.useState("");
  const score = React.useMemo(() => {
    let s = Math.min(60, msg.length * 0.5);
    if (/[A-Z]/.test(msg)) s += 10;
    if (/\d/.test(msg)) s += 10;
    if (/[^A-Za-z0-9\s]/.test(msg)) s += 10;
    if (msg.length > 140) s += 10;
    return Math.max(10, Math.min(100, Math.round(s)));
  }, [msg]);

  return (
    <label className="flex flex-col gap-1 sm:col-span-2">
      <span className="text-xs tracking-wide text-gray-200/80">Message</span>
      <textarea
        name="message"
        rows={4}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="What challenge can we help with?"
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20"
        required
      />
      {/* fun element: “encryption meter” */}
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-widest text-gray-200/70">Encryption Level</span>
        <span className="text-[11px] text-gray-200/80">{score}%</span>
      </div>
      <div className="tb-meter-pulse mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#174A3A]" style={{ width: `${score}%` }} />
      </div>
      {/* honeypot for basic spam protection */}
      <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />
    </label>
  );
}

/* === Icons === */

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

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M4 6h16v12H4z" />
      <path strokeWidth="1.5" d="m4 7 8 6 8-6" />
    </svg>
  );
}
function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="m5 13 4 4L19 7" />
    </svg>
  );
}
function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 1.8a10.2 10.2 0 0 0-3.22 19.87c.51.09.7-.22.7-.49l-.01-1.7c-2.86.63-3.46-1.21-3.46-1.21-.46-1.18-1.12-1.5-1.12-1.5-.91-.63.07-.62.07-.62 1 .07 1.52 1.05 1.52 1.05.9 1.56 2.36 1.11 2.94.85.09-.66.35-1.11.63-1.36-2.28-.26-4.68-1.14-4.68-5.09 0-1.12.4-2.03 1.05-2.75-.11-.26-.46-1.31.1-2.74 0 0 .86-.28 2.82 1.05a9.73 9.73 0 0 1 5.14 0c1.96-1.33 2.82-1.05 2.82-1.05.56 1.43.21 2.48.1 2.74.65.72 1.05 1.63 1.05 2.75 0 3.96-2.4 4.82-4.69 5.07.36.31.68.93.68 1.88l-.01 2.78c0 .27.18.58.71.48A10.2 10.2 0 0 0 12 1.8Z" />
    </svg>
  );
}
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 .02 5 2.5 2.5 0 0 0-.02-5ZM3.5 8.98h2.96V20.5H3.5zM9.02 8.98h2.84v1.59h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.62 2.02 3.62 4.65v6.84h-2.96v-6.07c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.22v6.17H9.02z" />
    </svg>
  );
}
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 3.5h3.2l5.06 6.66L16.9 3.5H20l-7 8.7 7.5 8.3h-3.2l-5.3-6.83-5 6.83H2.5l7.25-8.6L4 3.5Z" />
    </svg>
  );
}
