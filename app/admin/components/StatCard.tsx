"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Users, PlayCircle, TrendingUp } from "lucide-react";

/**
 * Table de correspondance nom → icône, tenue entièrement à l'intérieur
 * de ce Client Component. Le Server Component parent ne passe qu'une
 * chaîne de caractères (sérialisable), jamais la référence du composant
 * icône elle-même (qui ne peut pas traverser la frontière serveur/client).
 */
const icons = {
  graduation: GraduationCap,
  calendar: Calendar,
  users: Users,
  play: PlayCircle,
} as const;

export type StatIconName = keyof typeof icons;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function StatCard({
  icon,
  label,
  value,
  trend,
  accent = false,
}: {
  icon: StatIconName;
  label: string;
  value: string | number;
  trend?: string;
  accent?: boolean;
}) {
  const Icon = icons[icon];

  return (
    <motion.div
      variants={fadeUp}
      className={`group relative overflow-hidden rounded-card-lg border border-border p-6 transition-colors duration-300 ${
        accent ? "bg-contrast" : "bg-surface hover:border-accent/25"
      }`}
    >
      {accent && (
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      )}

      <div className="relative flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-[13px] ${
            accent ? "bg-white/10" : "bg-accent-soft"
          }`}
        >
          <Icon className={`h-4.5 w-4.5 ${accent ? "text-white" : "text-accent"}`} strokeWidth={1.75} />
        </div>

        {trend && (
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-1 font-body text-[11px] font-semibold ${
              accent ? "bg-white/10 text-white" : "bg-accent-soft text-accent"
            }`}
          >
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        )}
      </div>

      <p
        className={`relative mt-7 font-heading font-semibold ${accent ? "text-white" : "text-foreground"}`}
        style={{ fontSize: "32px", lineHeight: "36px", letterSpacing: "-0.01em" }}
      >
        {value}
      </p>
      <p className={`relative mt-1.5 font-body text-[13px] ${accent ? "text-white/60" : "text-foreground-muted"}`}>
        {label}
      </p>
    </motion.div>
  );
}