"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap,
  PlayCircle,
  CreditCard,
  Bell,
  User,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "../../components/ThemeToggle";
import { signOut } from "../../actions/auth";

const tabs = [
  { label: "Sessions", href: "/compte", icon: GraduationCap, exact: true },
  { label: "Replays", href: "/compte/replays", icon: PlayCircle, exact: false },
  { label: "Paiements", href: "/compte/paiements", icon: CreditCard, exact: false },
  { label: "Alertes", href: "/compte/notifications", icon: Bell, exact: false },
  { label: "Profil", href: "/compte/profil", icon: User, exact: false },
];

export function AccountMobileNav({ name, email }: { name: string; email: string }) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  function handleSignOut() {
    startTransition(async () => {
      await signOut();
    });
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-surface/90 px-5 backdrop-blur-md lg:hidden">
        <span className="font-heading text-[15px] font-bold tracking-tight text-foreground">
          Auramind<span className="text-accent"> AI</span>
        </span>
        <button
          onClick={() => setSheetOpen(true)}
          aria-label="Menu du compte"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-body text-[12px] font-semibold text-white"
        >
          {name.slice(0, 2).toUpperCase()}
        </button>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        {tabs.map((tab) => {
          const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-1 flex-col items-center gap-1 py-2.5"
            >
              {isActive && (
                <motion.span
                  layoutId="account-tab-dot"
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  className="absolute top-1 h-1 w-1 rounded-full bg-accent"
                />
              )}
              <Icon
                className={`h-[19px] w-[19px] ${isActive ? "text-accent" : "text-foreground-muted"}`}
                strokeWidth={isActive ? 2.1 : 1.8}
              />
              <span
                className={`font-body text-[10px] font-medium ${
                  isActive ? "text-accent" : "text-foreground-muted"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed inset-x-0 bottom-0 z-[60] rounded-t-[24px] border-t border-border bg-surface p-6 pb-8 lg:hidden"
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />

              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-body text-[14px] font-semibold text-white">
                  {name.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-body text-[15px] font-semibold text-foreground">{name}</p>
                  <p className="truncate font-body text-[13px] text-foreground-muted">{email}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-[12px] border border-border px-4 py-3">
                <span className="font-body text-[14px] font-medium text-foreground">Thème</span>
                <ThemeToggle />
              </div>

              <Link
                href="/"
                onClick={() => setSheetOpen(false)}
                className="mt-3 flex items-center gap-3 rounded-[12px] px-4 py-3 font-body text-[14px] font-medium text-foreground-muted"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.9} />
                Retour au site
              </Link>

              <button
                onClick={handleSignOut}
                disabled={isPending}
                className="mt-1 flex w-full items-center gap-3 rounded-[12px] px-4 py-3 text-left font-body text-[14px] font-medium text-red-500 disabled:opacity-60"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.9} />
                {isPending ? "Déconnexion..." : "Se déconnecter"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}