"use client";

import React from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

/* -----------------------------------------------------------
   Reusable background containers (same look/feel as landing)
------------------------------------------------------------ */

type ImageBandProps = {
  src: string;
  alt: string;
  heightClass?: string;
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0C1B2A]/92 via-[#0C1B2A]/78 to-[#174A3A]/58" />
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
   About Page
------------------------------------------------------------ */

export default function AboutPage() {
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

      {/* Reusable NAV */}
      <SiteNav />

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-9">
        <ImageBand
          src="/TrailByteDigitalRevolution.png"
          alt="About Trailbyte"
          heightClass="min-h-[22rem] sm:min-h-[26rem] md:min-h-[28rem]"
        >
          <div className="flex h-full items-center px-6 py-10 sm:px-10">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/90">
                <PineIcon className="h-4 w-4 text-white" /> Built for the Summit
              </div>
              <h1 className="text-3xl font-extrabold leading-tight text-[#F7F5EF] sm:text-4xl md:text-5xl">
                Engineering Expertise that Accelerates Growth
              </h1>
              <p className="mt-3 max-w-[60ch] text-sm text-gray-100/95">
                We’re an IT consulting team of former engineers focused on pragmatic outcomes:
                secure foundations, governed data, and modern infrastructure that scales without chaos.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="/services"
                  className="rounded-2xl bg-white/10 px-5 py-3 text-sm text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15"
                >
                  Explore Services
                </a>
                <a
                  href="/contact"
                  className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-200/85 backdrop-blur-md transition hover:bg-white/10"
                >
                  Talk to Us
                </a>
              </div>
            </div>
          </div>
        </ImageBand>
      </section>

      {/* MILESTONES
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-9">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <KPI label="Enterprise Implementations" value="25" />
          <KPI label="New Projects Launched" value="24" />
          <KPI label="Protected Servers" value="20K+" />
          <KPI label="Active Users" value="4.9K" />
        </div>
      </section> */}

      {/* STORY + BADGES */}
      <section id="method" className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-9">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/15 to-transparent blur-2xl" />
            <h2 className="text-2xl font-semibold text-[#F7F5EF]">Our Trail</h2>
            <p className="mt-3 text-sm leading-6 text-gray-200">
              From trailhead to summit, we guide your journey with clarity, resilience, and governance at every step.
              We help map risks, harden the core, and build pathways that let teams ship faster—without losing direction.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge icon={<CompassIcon className="h-4 w-4" />}>Guided</Badge>
              <Badge icon={<MountainIcon className="h-4 w-4" />}>Scalable</Badge>
              <Badge icon={<ShieldIcon className="h-4 w-4" />}>Secure</Badge>
            </div>
          </article>

          <BGPanel
            src="/TrailbyteDigitalGuide.png"
            alt="Trailbyte Digital Guide"
            className="min-h-[20rem]"
            contentClass="p-6 sm:p-7 lg:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FeatureCard
                icon={<PineIcon className="h-5 w-5 text-white" />}
                title="Resilient by Design"
                blurb="Adaptable architectures, built to endure—anchored in governance and observability."
              />
              <FeatureCard
                icon={<CompassIcon className="h-5 w-5 text-white" />}
                title="Clear Compass"
                blurb="Security, speed, and ROI: the north stars guiding every technical decision."
              />
              <FeatureCard
                icon={<MountainIcon className="h-5 w-5 text-white" />}
                title="Summit-Ready"
                blurb="Scale smoothly from pilot projects to enterprise rollouts—without re-platforming chaos."
              />
              <FeatureCard
                icon={<ShieldIcon className="h-5 w-5 text-white" />}
                title="Trail-Tested"
                blurb="Decades of leadership delivering enterprise-grade outcomes—applied to your toughest challenges."
              />
            </div>
          </BGPanel>
        </div>
      </section>


      {/* VALUES GRID */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-9">
        <header className="mb-6">
          <p className="mb-2 text-xs tracking-[0.2em] text-gray-200/60">WHY TRAILBYTE</p>
          <h3 className="text-3xl font-bold text-[#F7F5EF] sm:text-4xl">
            Tailored IT Solutions that Deliver Measurable Results
          </h3>
          <p className="mt-3 max-w-3xl text-gray-200">
            We partner end-to-end—from roadmap and controls to implementation and enablement—so your team keeps momentum.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ValueCard title="Pragmatic Security" blurb="Controls that protect without slowing teams. Tools chosen for fit, not logos." />
          <ValueCard title="Governed Data" blurb="Policy, lineage, and privacy designed in—so insights can move fast safely." />
          <ValueCard title="Modern Infra" blurb="Cloud, automation, and virtualization for performance and flexibility." />
          <ValueCard title="AI Readiness" blurb="Assessment, bias mitigation, and guardrails for responsible AI adoption." />
          <ValueCard title="CIO Advisory" blurb="Executive-level guidance that ties tech choices to board-ready outcomes." />
          <ValueCard title="Enablement" blurb="Playbooks and hand-offs so your team can thrive after launch." />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="/services"
            className="rounded-2xl bg-[#174A3A] px-5 py-3 text-sm font-medium text-[#F7F5EF] shadow-[0_8px_30px_-12px_rgba(23,74,58,0.6)] transition hover:brightness-110"
          >
            See Services
          </a>
          <a
            href="/contact"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-200/85 backdrop-blur-md transition hover:bg-white/10"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <TeamSection />

      {/* Reusable FOOTER */}
      <SiteFooter />
    </main>
  );
}

/* =========================== Team Section ============================ */

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imgSrc?: string; 
  linkedInUrl?: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Michael Hacker",
    role: "Co-founder • Executive Strategist (Former CIO)",
    imgSrc: "MichaelHacker.png", 
    linkedInUrl: "https://www.linkedin.com/",
    bio:
      "Technology executive, strategist, and entrepreneur with 20+ years leading digital transformation across higher education, government, and private sector. Expertise includes enterprise IT strategy, cloud modernization, cybersecurity, advanced analytics, and AI—leveraging automation to unlock efficiency, insight, and innovation. Known for cutting through complexity, uniting stakeholders, and building scalable, resilient ecosystems that accelerate growth.",
  },
  {
    name: "Julian Salinas",
    role: "Co-founder • Principal Architect",
    imgSrc: "JulianSalinas.png", 
    linkedInUrl: "https://www.linkedin.com/",
    bio:
      "IT leader with 20+ years delivering enterprise-class solutions focusing on data resiliency and digital transformation. Deep expertise in hybrid cloud and future-state architecture. Has architected strategies for data availability, protection, and resiliency across healthcare, finance, government, education, telecom, and energy—safeguarding critical information while enabling flexibility and scale.",
  },
];

function TeamSection() {
  return (
    <section
      id="team"
      className="relative z-10 scroll-mt-24 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-9"
    >
      <header className="mb-6">
        <p className="mb-2 text-xs tracking-[0.2em] text-gray-200/60">MEET THE TEAM</p>
        <h3 className="text-3xl font-bold text-[#F7F5EF] sm:text-4xl">
          Leadership behind Trailbyte
        </h3>
        <p className="mt-3 max-w-3xl text-gray-200">
          Executive perspective + hands-on engineering. We align technology with outcomes and build for resilience and scale.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {TEAM.map((m) => (
          <TeamCard key={m.name} member={m} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const { name, role, bio, imgSrc, linkedInUrl } = member;
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      {/* soft glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/25 via-[#174A3A]/10 to-transparent blur-2xl" />

      <div className="flex gap-4 sm:gap-5">
        <Avatar name={name} imgSrc={imgSrc} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-semibold text-[#F7F5EF]">{name}</h4>
            {linkedInUrl ? (
              <a
                href={linkedInUrl}
                aria-label={`${name} on LinkedIn`}
                className="rounded-lg border border-white/10 bg-white/5 p-1.5 transition hover:bg-white/10"
              >
                <LinkedInIcon className="h-4 w-4 text-white" />
              </a>
            ) : null}
          </div>
          <p className="mt-0.5 text-sm text-gray-200/90">{role}</p>

          <p className="mt-3 text-sm leading-6 text-gray-200">{bio}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/80">
              Cloud & Cybersecurity
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/80">
              Data & AI
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/80">
              Transformation
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Avatar({ name, imgSrc }: { name: string; imgSrc?: string }) {
  if (imgSrc) {
    return (
      <img
        src={imgSrc}
        alt={`${name} headshot`}
        className="h-16 w-16 flex-none rounded-2xl object-cover ring-1 ring-white/10 sm:h-20 sm:w-20"
      />
    );
  }
  // Fallback: initials
  const initials = name
    .split(" ")
    .map((n) => n[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
  return (
    <div className="h-16 w-16 flex-none rounded-2xl bg-white/10 text-[#F7F5EF] ring-1 ring-white/10 sm:h-20 sm:w-20 grid place-items-center">
      <span className="text-lg font-semibold">{initials}</span>
    </div>
  );
}

/* === Small components (from your page) === */

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-center backdrop-blur">
      <div className="text-xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-widest text-gray-200/80">{label}</div>
    </div>
  );
}
function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-200/80">
      {icon}
      {children}
    </span>
  );
}
function FeatureCard({ icon, title, blurb }: { icon: React.ReactNode; title: string; blurb: string }) {
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
function ValueCard({ title, blurb }: { title: string; blurb: string }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/25 via-[#174A3A]/10 to-transparent blur-2xl" />
      <h4 className="text-xl font-semibold leading-tight text-[#F7F5EF]">
        <span className="bg-gradient-to-r from-[#F7F5EF] to-white bg-clip-text text-transparent">{title}</span>
      </h4>
      <p className="mt-3 text-sm leading-6 text-gray-200">{blurb}</p>
    </article>
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
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 .02 5 2.5 2.5 0 0 0-.02-5ZM3.5 8.98h2.96V20.5H3.5zM9.02 8.98h2.84v1.59h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.62 2.02 3.62 4.65v6.84h-2.96v-6.07c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.22v6.17H9.02z" />
    </svg>
  );
}
