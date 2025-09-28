"use client";

import * as React from "react";
import { saveContactMessage } from "@/fbservices/contact";

type Urgency = "Low" | "Normal" | "High" | "Critical";

export type ContactFormProps = {
  className?: string;
  defaultUrgency?: Urgency;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export default function ContactForm({
  className = "",
  defaultUrgency = "Normal",
  onSuccess,
  onError,
}: ContactFormProps) {
  const [msg, setMsg] = React.useState("");
  const [toast, setToast] = React.useState<{ kind: "success" | "error"; text: string } | null>(null);
  const hideTimer = React.useRef<number | null>(null);

  // encryption meter (same logic as your MessageWithMeter)
  const score = React.useMemo(() => {
    let s = Math.min(60, msg.length * 0.5);
    if (/[A-Z]/.test(msg)) s += 10;
    if (/\d/.test(msg)) s += 10;
    if (/[^A-Za-z0-9\s]/.test(msg)) s += 10;
    if (msg.length > 140) s += 10;
    return Math.max(10, Math.min(100, Math.round(s)));
  }, [msg]);

  // cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string) || "there";
    const email = (data.get("email") as string) || "";
    const company = (data.get("company") as string) || "";
    const urgency = ((data.get("urgency") as string) || defaultUrgency) as Urgency;
    const message = (data.get("message") as string) || "";
    const company_website = (data.get("company_website") as string) || ""; // honeypot

    try {
      await saveContactMessage({
        name,
        email,
        company,
        urgency,
        message,
        company_website,
      });

      setToast({
        kind: "success",
        text: `Thanks, ${name}. Your message has been sent. Urgency: ${urgency}. We’ll get back to you within one business day.`,
      });
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setToast(null), 4000);

      // reset form & local state
      form.reset();
      setMsg("");
      const urgencyEl = form.querySelector<HTMLSelectElement>('select[name="urgency"]');
      if (urgencyEl) urgencyEl.value = defaultUrgency;

      onSuccess?.();
    } catch (err) {
      console.error("Contact form write failed:", err);
      setToast({ kind: "error", text: "Sorry, something went wrong. Please try again." });
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setToast(null), 4000);

      onError?.(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5 ${className}`}
    >
      {/* fun shimmer bar */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-[14px] mb-1 tracking-wide text-gray-100">Name</span>
          <input
            type="text"
            name="name"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20"
            placeholder="Full Name"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[14px] mb-1 tracking-wide text-gray-100">Email</span>
          <input
            type="email"
            name="email"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20"
            placeholder="example@company.com"
            required
          />
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-[14px] mb-1 tracking-wide text-gray-100">Company / Website</span>
          <input
            type="text"
            name="company"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20"
            placeholder="Company Name"
          />
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-[14px] mb-1 tracking-wide text-gray-100">Urgency</span>
          <select
            name="urgency"
            defaultValue={defaultUrgency}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20"
            aria-label="Urgency"
            required
          >
            <option value="Low">Low — general inquiry</option>
            <option value="Normal">Normal — project discussion</option>
            <option value="High">High — time-sensitive</option>
            <option value="Critical">Critical — active incident</option>
          </select>
        </label>

        {/* Message with meter (inlined here so the component is self-contained) */}
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-[14px] mb-1 tracking-wide text-gray-1000">Message</span>
          <textarea
            name="message"
            rows={4}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder=" What challenge can we help solve?"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/20"
            required
          />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-widest text-gray-100">Encryption Level</span>
            <span className="text-[11px] text-gray-200/80">{score}%</span>
          </div>
          <div className="tb-meter-pulse mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#174A3A]" style={{ width: `${score}%` }} />
          </div>
          {/* honeypot for basic spam protection */}
          <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15"
        >
          Send message
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <span className="text-xs text-gray-200/90">We’ll reply within one business day.</span>
      </div>

      {/* toast (no global IDs, component-local state) */}
      <div
        className={`pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-4 text-xs text-white shadow-sm backdrop-blur transition duration-300 ease-out ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        } ${toast?.kind === "error" ? "bg-[#7a1f1f]" : "bg-[#174A3A]"}`}
        role="status"
        aria-live="polite"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" d="m5 13 4 4L19 7" />
        </svg>
        <span>{toast?.text ?? "Message sent."}</span>
      </div>

      {/* local styles for the encryption meter */}
      <style jsx>{`
        @keyframes meterPulse {
          0% { opacity: .65 }
          50% { opacity: 1 }
          100% { opacity: .65 }
        }
        .tb-meter-pulse { animation: meterPulse 1.6s ease-in-out infinite; }
      `}</style>
    </form>
  );
}
