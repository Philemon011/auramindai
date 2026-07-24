"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { AdminReveal, AdminRevealItem } from "../admin/components/AdminReveal";
import { RegistrationCard } from "./components/RegistrationCard";
import { getMyRegistrations, MyRegistration } from "./actions";

type Tab = "upcoming" | "past";

export default function MyMasterclassesPage() {
  const [registrations, setRegistrations] = useState<MyRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("upcoming");

  useEffect(() => {
    getMyRegistrations().then((data) => {
      setRegistrations(data);
      setLoading(false);
    });
  }, []);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const upcoming: MyRegistration[] = [];
    const past: MyRegistration[] = [];

    registrations.forEach((r) => {
      if (!r.masterclass) return;
      const date = new Date(r.masterclass.scheduled_at);
      if (date >= now) upcoming.push(r);
      else past.push(r);
    });

    return { upcoming, past };
  }, [registrations]);

  const visible = tab === "upcoming" ? upcoming : past;

  return (
    <AdminReveal className="flex flex-col gap-8">
      <AdminRevealItem className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
            Mon espace
          </span>
          <h1
            className="mt-2 font-heading font-semibold text-foreground"
            style={{ fontSize: "28px", lineHeight: "34px", letterSpacing: "-0.02em" }}
          >
            Mes masterclasses
          </h1>
        </div>

        <Link
          href="/masterclasses"
          className="inline-flex items-center gap-2 rounded-button border border-border bg-surface px-5 font-body text-[14px] font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          style={{ height: "44px" }}
        >
          Explorer le programme
        </Link>
      </AdminRevealItem>

      <AdminRevealItem className="inline-flex w-fit items-center gap-1 rounded-full border border-border bg-surface p-1">
        {(
          [
            { label: `À venir (${upcoming.length})`, value: "upcoming" as Tab },
            { label: `Passées (${past.length})`, value: "past" as Tab },
          ]
        ).map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className="relative rounded-full px-5 py-2 font-body text-sm font-medium transition-colors duration-200"
          >
            {tab === t.value && (
              <motion.span
                layoutId="account-tab-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className={`relative z-10 ${tab === t.value ? "text-white" : "text-foreground-muted"}`}>
              {t.label}
            </span>
          </button>
        ))}
      </AdminRevealItem>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-card-lg bg-surface" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <AdminRevealItem className="flex flex-col items-center rounded-card-lg border border-border bg-surface py-20 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
            <GraduationCap className="h-5 w-5 text-accent" strokeWidth={1.75} />
          </span>
          <p className="mt-4 font-subheading text-lg font-semibold text-foreground">
            {tab === "upcoming" ? "Aucune masterclass à venir" : "Aucune masterclass passée"}
          </p>
          <p className="mt-1.5 max-w-xs font-body text-[14px] text-foreground-muted">
            {tab === "upcoming"
              ? "Explore le programme et réserve ta prochaine session."
              : "Tes sessions terminées apparaîtront ici."}
          </p>
          {tab === "upcoming" && (
            <Link
              href="/masterclasses"
              className="mt-6 inline-flex items-center gap-2 rounded-button bg-accent px-6 font-body text-[14px] font-medium text-white"
              style={{ height: "44px" }}
            >
              Voir le programme
            </Link>
          )}
        </AdminRevealItem>
      ) : (
        <AdminRevealItem className="flex flex-col gap-3">
          {visible.map((r) => (
            <RegistrationCard key={r.id} registration={r} isPast={tab === "past"} />
          ))}
        </AdminRevealItem>
      )}
    </AdminReveal>
  );
}