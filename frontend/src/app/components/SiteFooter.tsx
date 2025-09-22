"use client";

import React from "react";

export default function SiteFooter() {
  return (
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
              <li><a href="/services" className="hover:underline underline-offset-2">Cyber Shield</a></li>
              <li><a href="/services" className="hover:underline underline-offset-2">Data Guard</a></li>
              <li><a href="/services" className="hover:underline underline-offset-2">Digital Evolution</a></li>
              <li><a href="/services" className="hover:underline underline-offset-2">CIO Advisory</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-200/85">
              <li><a href="/about" className="hover:underline underline-offset-2">About</a></li>
              <li><a href="/Services" className="hover:underline underline-offset-2">Services</a></li>
              <li><a href="/contact" className="hover:underline underline-offset-2">Contact</a></li>
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
            <a href="/#contact" className="hover:underline underline-offset-2">Report an issue</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* === Local icons === */
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
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M4 6h16v12H4z" />
      <path strokeWidth="1.5" d="m4 7 8 6 8-6" />
    </svg>
  );
}
