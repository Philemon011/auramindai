"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, ArrowUpRight, Globe2 } from "lucide-react";
import Link from "next/link";
import { Masterclass, formatPrice } from "../data/masterclasses";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export function MasterclassCard({ mc }: { mc: Masterclass }) {
  return (
    <motion.div variants={cardVariants} initial="hidden" animate="show">
    <Link
      href={`/masterclasses/${mc.id}`}
      className="group block overflow-hidden rounded-card-lg border border-border bg-surface"
    >
      {/* Image + badge */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={mc.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          {mc.type === "free" ? (
            <span className="rounded-full bg-surface/95 px-3 py-1 font-body text-xs font-semibold text-accent backdrop-blur-sm">
              Gratuit
            </span>
          ) : (
            <span className="rounded-full bg-foreground/90 px-3 py-1 font-body text-xs font-semibold text-white backdrop-blur-sm">
              {formatPrice(mc.price ?? 0)}
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

      {/* Contenu */}
      <div className="p-5">
        <div className="flex items-center gap-3 font-body text-xs text-foreground-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {mc.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {mc.time}
          </span>
        </div>

        <h3 className="mt-3 font-subheading text-[19px] font-semibold leading-snug text-foreground">
          {mc.title}
        </h3>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="flex items-center gap-1.5 font-body text-xs text-foreground-muted">
            <Users className="h-3.5 w-3.5" />
            {mc.attendees} inscrits
          </span>
          <span className="flex items-center gap-1 font-body text-xs font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
            Voir les détails
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}