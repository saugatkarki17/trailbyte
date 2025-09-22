"use client";

import React from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0C1B2A] text-gray-200">
      {/* BG accents */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_110%,rgba(23,74,58,0.18),rgba(0,0,0,0)_60%)]" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-[#174A3A]/40 via-[#174A3A]/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/15 to-transparent blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(90deg,transparent,transparent_12px,rgba(255,255,255,.06)_12px,rgba(255,255,255,.06)_13px)]"
      />

      {/* Reusable header/nav */}
      <SiteNav />

      {/* Page intro (kept the same copy) */}
      <header className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-9">
        <div className="mt-2">
          <p className="mb-2 text-xs tracking-[0.2em] text-gray-200/60">GET IN TOUCH</p>
          <h1 className="text-3xl font-bold text-[#F7F5EF] sm:text-4xl">Let’s talk security.</h1>
          <p className="mt-3 max-w-3xl text-gray-200">
            Tell us where you are today and where you need to be. We’ll map a secure, practical path—no vendor noise.
          </p>
        </div>
      </header>

      {/* Contact section with image band */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-9">
        <ImageBand
          src="/TrailbyteDigitalGuide.png"
          alt="Contact Trailbyte"
          heightClass="min-h-[22rem] sm:min-h-[24rem] md:min-h-[26rem]"
        >
          <div className="flex h-full items-stretch px-6 py-6 sm:px-10 sm:py-8">
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-12">
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

              <div className="md:col-span-7">
                <FormCard />
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes meterPulse { 0% { opacity: .65 } 50% { opacity: 1 } 100% { opacity: .65 } }
            .tb-meter-pulse { animation: meterPulse 1.6s ease-in-out infinite; }
          `}</style>
        </ImageBand>
      </section>

      {/* Reusable footer */}
      <SiteFooter />
    </main>
  );
}

/* === Helpers (unchanged) === */

function ImageBand({
  src,
  alt,
  heightClass = "min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem]",
  className = "",
  children,
}: {
  src: string; alt: string; heightClass?: string; className?: string; children?: React.ReactNode;
}) {
  return (
    <section className={`relative isolate overflow-hidden rounded-3xl border border-white/10 ${heightClass} ${className}`}>
      <img src={src} alt={alt} aria-hidden className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0C1B2A]/92 via-[#0C1B2A]/78 to-[#174A3A]/58" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-overlay"
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

function FormCard() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toast = document.getElementById("tb-contact-toast");
    if (toast) {
      toast.classList.remove("opacity-0", "translate-y-2");
      setTimeout(() => toast.classList.add("opacity-0", "translate-y-2"), 3500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs tracking-wide text-gray-100">Name</span>
          <input type="text" name="name" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20" placeholder="Jane Doe" required />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs tracking-wide text-gray-100">Email</span>
          <input type="email" name="email" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20" placeholder="jane@company.com" required />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-xs tracking-wide text-gray-100">Company / Website</span>
          <input type="text" name="company" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20" placeholder="Acme • acme.com" />
        </label>

        <MessageWithMeter />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15">
          Send message <ArrowIcon className="h-4 w-4" />
        </button>
        <span className="text-xs text-gray-200/90">We’ll reply within one business day.</span>
      </div>

      <div id="tb-contact-toast" className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white opacity-0 shadow-sm backdrop-blur transition duration-300 ease-out translate-y-2">
        <CheckIcon className="h-4 w-4" /> Message queued securely
      </div>
    </form>
  );
}

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
      <span className="text-xs tracking-wide text-gray-100">Message</span>
      <textarea name="message" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="What challenge can we help with?" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20" required />
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-widest text-gray-100">Encryption Level</span>
        <span className="text-[11px] text-gray-200/80">{score}%</span>
      </div>
      <div className="tb-meter-pulse mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#174A3A]" style={{ width: `${score}%` }} />
      </div>
      <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />
    </label>
  );
}

/* === Icons === */
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path strokeWidth="1.5" d="M4 6h16v12H4z" /><path strokeWidth="1.5" d="m4 7 8 6 8-6" /></svg>);
}
function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path strokeWidth="1.5" d="M5 12h14M13 6l6 6-6 6" /></svg>);
}
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path strokeWidth="1.5" d="m5 13 4 4L19 7" /></svg>);
}
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M12 2.5c-.3 0-.6.06-.86.18L6.2 4.54a2 2 0 0 0-1.2 1.84v5.66c0 2.35 1.14 4.57 3.06 5.93l3.05 2.14c.54.38 1.25.38 1.79 0l3.05-2.14a7.33 7.33 0 0 0 3.06-5.93V6.38c0-.8-.47-1.53-1.2-1.84L12.86 2.68c-.27-.12-.56-.18-.86-.18Zm0 5.25a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z" /></svg>);
}
