"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, LogOut, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "../actions/auth";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Masterclasses", href: "/#masterclasses" },
  { label: "Notre approche", href: "/#approche" },
  { label: "Pour qui ?", href: "/#pour-qui" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Contact", href: "/#contact" },
];

const mobileContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const mobileItem = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

interface Profile {
  full_name: string | null;
  role: "user" | "admin";
}

function getInitials(name: string | null, email: string | undefined) {
  if (name) {
    const parts = name.trim().split(" ");
    const initials = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
    return initials.toUpperCase();
  }
  return (email ?? "?")[0].toUpperCase();
}

function getDisplayName(name: string | null, email: string | undefined) {
  return name || email || "";
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isPending, startTransition] = useTransition();
  const accountRef = useRef<HTMLDivElement>(null);

  // Récupère l'utilisateur connecté + son profil (nom réel et rôle,
  // toujours à jour, pas le nom figé au moment de l'inscription),
  // puis écoute les changements de session en temps réel.
  useEffect(() => {
    const supabase = createClient();

    async function loadProfile(currentUser: User) {
      const { data } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", currentUser.id)
        .single();
      setProfile(data);
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) loadProfile(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user);
      } else {
        setProfile(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSignOut() {
    setAccountOpen(false);
    setMobileOpen(false);
    startTransition(async () => {
      await signOut();
    });
  }

  const dashboardHref = profile?.role === "admin" ? "/admin" : "/compte";
  const displayName = getDisplayName(profile?.full_name ?? null, user?.email);
  const initials = getInitials(profile?.full_name ?? null, user?.email);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-surface/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-10">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1">
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              Auramind<span className="text-accent"> AI</span>
            </span>
          </a>

          {/* Liens desktop */}
          <nav className="hidden items-center gap-9 whitespace-nowrap xl:flex">
            {navLinks.map((link) => (
              
              <a  key={link.label}
                href={link.href}
                className="group relative font-body text-[14px] font-medium text-foreground-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden items-center gap-6 xl:flex">
            <ThemeToggle />

            <div
              ref={accountRef}
              className="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                onClick={() => setAccountOpen((v) => !v)}
                aria-label="Compte"
                aria-expanded={accountOpen}
                className={`flex h-11 w-11 items-center justify-center rounded-full font-body text-[13px] font-semibold transition-colors duration-200 ${
                  user
                    ? "bg-accent text-white"
                    : accountOpen
                      ? "border border-accent/50 bg-accent/10 text-accent"
                      : "border border-border bg-surface text-foreground hover:border-accent/40 hover:text-accent"
                }`}
              >
                {user ? initials : <UserIcon />}
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-[calc(100%+10px)] flex w-64 flex-col gap-1 rounded-card border border-border bg-surface p-2 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.18)]"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-3">
                          <p className="truncate font-body text-[14px] font-semibold text-foreground">
                            {displayName}
                          </p>
                          <p className="truncate font-body text-[13px] text-foreground-muted">
                            {user.email}
                          </p>
                        </div>
                        <div className="my-1 h-px bg-border" />
                        
                        <a  href={dashboardHref}
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2.5 rounded-[10px] px-4 py-3 font-body text-[14px] font-medium text-foreground transition-colors duration-150 hover:bg-background"
                        >
                          <LayoutDashboard className="h-4 w-4" strokeWidth={1.75} />
                          {profile?.role === "admin" ? "Dashboard admin" : "Mon tableau de bord"}
                        </a>
                        <button
                          onClick={handleSignOut}
                          disabled={isPending}
                          className="flex items-center gap-2.5 rounded-[10px] px-4 py-3 text-left font-body text-[14px] font-medium text-foreground transition-colors duration-150 hover:bg-background disabled:opacity-60"
                        >
                          <LogOut className="h-4 w-4" strokeWidth={1.75} />
                          {isPending ? "Déconnexion..." : "Se déconnecter"}
                        </button>
                      </>
                    ) : (
                      <>
                        
                        <a  href="/connexion"
                          onClick={() => setAccountOpen(false)}
                          className="rounded-[10px] px-4 py-3 font-body text-[14px] font-medium text-foreground transition-colors duration-150 hover:bg-background"
                        >
                          Se connecter
                        </a>
                        
                        <a  href="/#masterclasses"
                          onClick={() => setAccountOpen(false)}
                          className="group flex items-center justify-center gap-2 rounded-[10px] bg-accent px-4 py-3 font-body text-[14px] font-semibold text-white transition-transform duration-150 hover:scale-[1.02]"
                        >
                          Réserver ma place
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Thème + bouton menu — mobile */}
          <div className="flex items-center gap-3 xl:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface"
            >
              <Menu className="h-4.5 w-4.5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-background xl:hidden"
          >
            <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-[90px]" />
            <div className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-[90px]" />

            <div className="relative z-10 flex h-20 shrink-0 items-center justify-between px-6">
              <a href="/" className="flex items-center gap-1" onClick={() => setMobileOpen(false)}>
                <span className="font-heading text-lg font-bold text-foreground">
                  Auramind<span className="text-accent"> AI</span>
                </span>
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer le menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface"
              >
                <X className="h-4.5 w-4.5 text-foreground" />
              </button>
            </div>

            <motion.nav
              variants={mobileContainer}
              initial="hidden"
              animate="show"
              className="relative z-10 flex flex-1 flex-col justify-center gap-0 px-8"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  variants={mobileItem}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between border-b border-border/60 py-3.5"
                >
                  <span className="font-heading text-[19px] font-medium text-foreground transition-colors duration-200 group-active:text-accent">
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 text-foreground-muted opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              variants={mobileItem}
              initial="hidden"
              animate="show"
              className="relative z-10 flex flex-col gap-3 px-8 pb-10"
            >
              {user ? (
                <>
                  <div className="flex items-center gap-3 rounded-button border border-border px-4" style={{ height: "56px" }}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-body text-[13px] font-semibold text-white">
                      {initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-body text-[14px] font-semibold text-foreground">
                        {displayName}
                      </p>
                      <p className="truncate font-body text-[12px] text-foreground-muted">{user.email}</p>
                    </div>
                  </div>

                  
                  <a  href={dashboardHref}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-button bg-accent font-body text-[15px] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(0,0,0,0.25)]"
                    style={{ height: "56px" }}
                  >
                    <LayoutDashboard className="h-4 w-4" strokeWidth={1.9} />
                    {profile?.role === "admin" ? "Dashboard admin" : "Mon tableau de bord"}
                  </a>

                  <button
                    onClick={handleSignOut}
                    disabled={isPending}
                    className="flex items-center justify-center gap-2 rounded-button border border-border font-body text-[15px] font-medium text-foreground disabled:opacity-60"
                    style={{ height: "52px" }}
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.75} />
                    {isPending ? "Déconnexion..." : "Se déconnecter"}
                  </button>
                </>
              ) : (
                <>
                  
                  <a  href="/connexion"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-button border border-border font-body text-[15px] font-medium text-foreground"
                    style={{ height: "52px" }}
                  >
                    <UserIcon />
                    Se connecter
                  </a>

                  
                  <a  href="/#masterclasses"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-button bg-accent font-body text-[15px] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(0,0,0,0.25)]"
                    style={{ height: "56px" }}
                  >
                    Réserver ma place
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M4.5 20c1.2-3.5 4.2-5.5 7.5-5.5s6.3 2 7.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}