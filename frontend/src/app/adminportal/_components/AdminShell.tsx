"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../../../fbservices/firebaseClient";

import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Shield,
  LogOut,
} from "lucide-react";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/adminportal/login");
  };

  return (
    // Lock shell to viewport and block horizontal scroll
    <div className="flex h-screen overflow-hidden bg-[#0C1B2A] text-gray-200">
      {/* Sidebar (non-scrolling) */}
      <aside className="relative z-20 flex w-64 shrink-0 flex-col border-r border-white/10 bg-white/5 backdrop-blur-md h-full overflow-y-hidden">
        {/* Logo */}
        <div className="flex items-center justify-center border-b border-white/10 py-6">
          <span className="text-xl font-bold text-[#F7F5EF]">Trailbyte Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col px-3 py-6 space-y-2">
          <NavItem
            href="/adminportal"
            label="Dashboard"
            icon={<LayoutDashboard className="h-5 w-5 text-gray-200" />}
            active={pathname === "/adminportal"}
          />
          <NavItem
            href="/adminportal/clients"
            label="Clients"
            icon={<Users className="h-5 w-5 text-gray-200" />}
            active={pathname.startsWith("/adminportal/clients")}
          />
          <NavItem
            href="/adminportal/messages"
            label="Messages"
            icon={<MessageSquare className="h-5 w-5 text-gray-200" />}
            active={pathname.startsWith("/adminportal/messages")}
          />
          <NavItem
            href="/adminportal/profile"
            label="Profile"
            icon={<Shield className="h-5 w-5 text-gray-200" />}
            active={pathname.startsWith("/adminportal/profile")}
          />
        </nav>

       {/* Logout section */}
            <div className="mt-auto mb-6 px-4">
            <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg border border-red-700/40 
                        bg-red-600/80 px-4 py-2 text-sm font-medium text-white 
                        shadow-[0_4px_20px_-6px_rgba(220,38,38,0.5)] 
                        transition hover:bg-red-700 hover:shadow-[0_6px_25px_-8px_rgba(220,38,38,0.6)]"
            >
                <LogOut className="h-5 w-5 text-white" />
                Logout
            </button>
            </div>
      </aside>

      {/* Content (scrolls vertically) */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden">
        <div className="mx-auto max-w-7xl p-8">{children}</div>
      </main>
    </div>
  );
}

/* ---------- NavItem ---------- */
function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition ${
        active
          ? "bg-[#174A3A]/40 text-[#F7F5EF] font-medium border border-white/10"
          : "text-gray-300 hover:bg-white/5"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
