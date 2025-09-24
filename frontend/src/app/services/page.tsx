"use client";

import React from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0C1B2A] text-gray-200">
      {/* BG accents */}
      <BackgroundAccents />

      {/* Reusable nav */}
      <SiteNav />

      {/* Header */}
      <header className="relative z-10 mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-9">
        <p className="mb-2 text-xs tracking-[0.2em] text-gray-200/60">OUR SERVICES</p>
        <h1 className="text-3xl font-bold text-[#F7F5EF] sm:text-4xl">Industry-Leading Solutions</h1>
        <p className="mt-3 max-w-3xl text-gray-200">
          We strengthen security, unlock data value, modernize infrastructure, and prepare organizations for the future of AI.
        </p>
      </header>

      {/* Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-9">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SolutionCard 
            title="Trailbyte Cyber Shield" 
            tag="Security" 
            description="Security without the noise. Includes CIS/NIST gap assessment, 24/7 monitoring & triage, and incident response on retainer." 
          />
          <SolutionCard 
            title="Trailbyte Data Guard" 
            tag="Data" 
            description="Governed, privacy-safe, AI-ready data. Includes inventory & lineage, access controls/DLP/SIEM alignment, and audit-ready evidence packs." 
          />
          <SolutionCard 
            title="Trailbyte Digital Evolution" 
            tag="Transformation" 
            description="Modernization with guardrails. Includes cloud migration playbooks, workflow automation, and adoption & change management." 
          />
          <SolutionCard 
            title="Trailbyte Virtualization Solutions" 
            tag="Infrastructure" 
            description="Consolidate, cut cost, and boost resilience. Includes capacity planning, backup/DR testing, and cost & performance dashboards." 
          />
          <SolutionCard 
            title="Trailbyte AI Readiness" 
            tag="AI" 
            description="Responsible AI, from policy to pilots. Includes use-case triage, risk & bias controls, and governance & lifecycle plans." 
          />
          <SolutionCard 
            title="Strategic CIO Advisory" 
            tag="Advisory" 
            description="Board-level clarity on demand. Includes quarterly roadmaps, budget planning, and risk narratives." 
          />
        </div>


        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="/contact" className="rounded-2xl bg-[#174A3A] px-5 py-3 text-sm font-medium text-[#F7F5EF] shadow-[0_8px_30px_-12px_rgba(23,74,58,0.6)] transition hover:brightness-110">
            Request a Proposal
          </a>
          <a href="/about#method" className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-200/85 backdrop-blur-md transition hover:bg-white/10">
            How We Deliver
          </a>
        </div>
      </section>

      {/* Reusable footer */}
      <SiteFooter />
    </main>
  );
}

/* ------------------------------ Layout Bits ------------------------------ */

function BackgroundAccents() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_110%,rgba(23,74,58,0.18),rgba(0,0,0,0)_60%)]" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-[#174A3A]/40 via-[#174A3A]/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/15 to-transparent blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(90deg,transparent,transparent_12px,rgba(255,255,255,.06)_12px,rgba(255,255,255,.06)_13px)]" />
    </>
  );
}

/* ------------------------------- Components ------------------------------ */

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
