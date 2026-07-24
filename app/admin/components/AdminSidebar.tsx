"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  PlayCircle,
  CreditCard,
  ArrowLeft,
  LogOut,
  ChevronsUpDown,
} from "lucide-react";
import { ThemeToggle } from "../../components/ThemeToggle";
import { signOut } from "../../actions/auth";

const sections = [
  {
    label: "Général",
    items: [{ label: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Gestion",
    items: [
      { label: "Masterclasses", href: "/admin/masterclasses", icon: GraduationCap, exact: false },
      { label: "Utilisateurs", href: "/admin/utilisateurs", icon: Users, exact: false },
      { label: "Replays", href: "/admin/replays", icon: PlayCircle, exact: false },
      { label: "Paiements", href: "/admin/paiements", icon: CreditCard, exact: false },
    ],
  },
];

export function AdminSidebar({ name, email }: { name: string; email: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSignOut() {
    startTransition(async () => {
      await signOut();
    });
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] flex-col border-r border-border bg-surface lg:flex">
      {/* Logo + badge de contexte */}
      <div className="flex h-20 shrink-0 items-center gap-2.5 px-7">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-heading text-[16px] font-bold tracking-tight text-foreground">
            Auramind<span className="text-accent"> AI</span>
          </span>
        </Link>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wide text-accent">
          Admin
        </span>
      </div>

      {/* Navigation groupée */}
      <nav className="flex flex-1 flex-col gap-7 overflow-y-auto px-4 pt-2">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="mb-2 px-3.5 font-body text-[11px] font-semibold uppercase tracking-wide text-foreground-muted/70">
              {section.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative flex items-center gap-3 rounded-[12px] px-3.5 py-2.5"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="admin-nav-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-[12px] bg-accent-soft"
                      />
                    )}
                    <Icon
                      className={`relative h-4 w-4 ${isActive ? "text-accent" : "text-foreground-muted"}`}
                      strokeWidth={1.9}
                    />
                    <span
                      className={`relative font-body text-[14px] font-medium ${
                        isActive ? "text-accent" : "text-foreground-muted"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bas de sidebar */}
      <div className="flex flex-col gap-3 border-t border-border p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-[12px] px-3.5 py-2.5 font-body text-[13px] font-medium text-foreground-muted transition-colors duration-200 hover:bg-background hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.9} />
          Retour au site
        </Link>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-[12px] border border-border px-3 py-2.5 transition-colors duration-200 hover:border-accent/30"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-body text-[12px] font-semibold text-white">
                {name.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0 text-left">
                <p className="truncate font-body text-[13px] font-medium text-foreground">{name}</p>
                <p className="truncate font-body text-[11px] text-foreground-muted">{email}</p>
              </div>
            </div>
            <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-foreground-muted" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[calc(100%+8px)] left-0 right-0 flex flex-col gap-1 rounded-card border border-border bg-surface p-2 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="font-body text-[12px] font-medium text-foreground-muted">Thème</span>
                  <ThemeToggle />
                </div>
                <div className="h-px bg-border" />
                <button
                  onClick={handleSignOut}
                  disabled={isPending}
                  className="flex items-center gap-2.5 rounded-[10px] px-2 py-2.5 text-left font-body text-[13px] font-medium text-red-500 transition-colors duration-150 hover:bg-red-50 disabled:opacity-60 dark:hover:bg-red-950/30"
                >
                  <LogOut className="h-3.5 w-3.5" strokeWidth={1.9} />
                  {isPending ? "Déconnexion..." : "Se déconnecter"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}