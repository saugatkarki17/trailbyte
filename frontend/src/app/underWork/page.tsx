import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { Wrench, Clock, Mail, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Under Maintenance — Trailbyte",
  description:
    "Trailbyte is performing scheduled maintenance to improve reliability and security. We’ll be back shortly.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  const now = new Date().toLocaleString("en-US", {
    // adjust if your site runs elsewhere
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-16 h-64 w-64 rounded-full bg-gradient-to-tr from-[#174A3A]/30 via-[#174A3A]/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-gradient-to-tr from-[#F7F5EF]/20 via-transparent to-transparent blur-3xl" />
      </div>

      <main className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
        <section
          aria-labelledby="maintenance-title"
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
          role="status"
          aria-live="polite"
        >
          {/* shimmer accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-[#174A3A]/30 p-3 ring-1 ring-white/10">
              <Wrench className="h-6 w-6 text-[#F7F5EF]" aria-hidden />
            </div>
            <div>
              <h1 id="maintenance-title" className="text-2xl font-semibold text-[#F7F5EF] sm:text-3xl">
                We’ll be right back.
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-200/95">
                Trailbyte is performing scheduled maintenance to improve reliability and security. No data is at risk.
                Services will be restored shortly.
              </p>

              <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <dt className="flex items-center gap-2 text-gray-300">
                    <Clock className="h-4 w-4" aria-hidden /> Updated
                  </dt>
                  <dd className="mt-1 font-medium text-[#F7F5EF]">{now} PT</dd>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <dt className="text-gray-300">Status</dt>
                  <dd className="mt-1 font-medium text-[#F7F5EF]">Maintenance in progress</dd>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <dt className="text-gray-300">Contact</dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:hello@trailbyte.co"
                      className="font-medium text-[#F7F5EF] underline-offset-2 hover:underline"
                    >
                      hello@trailbyte.io
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#174A3A] px-6 py-3 text-sm text-[#F7F5EF] ring-1 ring-white/10 backdrop-blur-md transition hover:brightness-125"
                >
                  <Home className="h-4 w-4" aria-hidden /> Return Home
                </a>
                <a
                  href="mailto:hello@trailbyte.io?subject=Maintenance%20Question"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-gray-200/85 backdrop-blur-md transition hover:bg-white/10"
                >
                  <Mail className="h-4 w-4" aria-hidden /> Email Support
                </a>
                {/* Optional: add a dedicated status page link if you have one
                <a
                  href="/status"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-gray-200/85 backdrop-blur-md transition hover:bg-white/10"
                >
                  <Activity className="h-4 w-4" aria-hidden /> View Status
                </a>
                */}
              </div>

              <p className="mt-3 text-xs text-gray-300">
                For active incidents, we target a 24-hour initial response window.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
