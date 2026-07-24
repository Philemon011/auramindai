"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, Globe2 } from "lucide-react";
import { PublicMasterclass, formatPrice } from "../lib/masterclasses-types";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export function MasterclassCard({ mc }: { mc: PublicMasterclass }) {
  return (
    <motion.div variants={cardVariants} initial="hidden" animate="show">
      <Link
        href={`/masterclasses/${mc.id}`}
        className="group block overflow-hidden rounded-card-lg border border-border bg-surface"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-accent-soft">
          {mc.image_url ? (
            <img
              src={mc.image_url}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-body text-[13px] text-accent">
              AURAMIND AI
            </div>
          )}

          <div className="absolute left-4 top-4">
            {mc.type === "free" ? (
              <span className="rounded-full bg-surface/95 px-3 py-1 font-body text-xs font-semibold text-accent backdrop-blur-sm">
                Gratuit
              </span>
            ) : (
              <span className="rounded-full bg-foreground/90 px-3 py-1 font-body text-xs font-semibold text-white backdrop-blur-sm">
                {formatPrice(mc.price)}
              </span>
            )}
          </div>
          <div className="absolute right-4 top-4">
            <span className="flex items-center gap-1 rounded-full bg-surface/95 px-2.5 py-1 font-body text-xs font-medium text-foreground-muted backdrop-blur-sm">
              <Globe2 className="h-3 w-3" />
              {mc.language === "fr" ? "FR" : "EN"}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 font-body text-xs text-foreground-muted">
            <span className="flex items-center gap-1.5" suppressHydrationWarning>
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(mc.scheduled_at)}
            </span>
            <span className="flex items-center gap-1.5" suppressHydrationWarning>
              <Clock className="h-3.5 w-3.5" />
              {formatTime(mc.scheduled_at)}
            </span>
          </div>

          <h3 className="mt-3 font-subheading text-[19px] font-semibold leading-snug text-foreground">
            {mc.title}
          </h3>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="font-body text-xs text-foreground-muted">Par {mc.host_name}</span>
            <span className="font-body text-xs font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
              Voir les détails
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}