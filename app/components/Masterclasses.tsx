"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedText, headlineContainer } from "./AnimatedText";
import { MasterclassCard } from "./MasterclassCard";
import { PublicMasterclass } from "../lib/masterclasses-types";

type MasterclassType = "free" | "paid";

const filters: { label: string; value: "all" | MasterclassType }[] = [
  { label: "Toutes", value: "all" },
  { label: "Gratuites", value: "free" },
  { label: "Payantes", value: "paid" },
];

function useMaxVisible() {
  const [maxVisible, setMaxVisible] = useState(6);

  useEffect(() => {
    const compute = () => {
      const width = window.innerWidth;
      if (width < 640) setMaxVisible(3);
      else if (width < 1024) setMaxVisible(4);
      else setMaxVisible(6);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return maxVisible;
}

export function Masterclasses({ masterclasses }: { masterclasses: PublicMasterclass[] }) {
  const [activeFilter, setActiveFilter] = useState<"all" | MasterclassType>("all");
  const maxVisible = useMaxVisible();

  const filtered = useMemo(() => {
    if (activeFilter === "all") return masterclasses;
    return masterclasses.filter((mc) => mc.type === activeFilter);
  }, [activeFilter, masterclasses]);

  const visible = filtered.slice(0, maxVisible);
  const hasMore = filtered.length > maxVisible;

  return (
    <section id="masterclasses" className="bg-background px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 font-body text-xs font-semibold uppercase tracking-wide text-accent">
            Programme
          </span>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={headlineContainer}
            className="max-w-xl font-heading font-semibold text-foreground"
            style={{ fontSize: "40px", lineHeight: "46px", letterSpacing: "-0.02em" }}
          >
            <AnimatedText text="Choisis ta prochaine masterclass" />
          </motion.h2>
          <p className="mt-4 max-w-md font-body text-base text-foreground-muted">
            Des sessions en direct, gratuites ou payantes, animées par des
            experts qui utilisent l&apos;IA au quotidien.
          </p>

          {masterclasses.length > 0 && (
            <div className="mt-10 inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className="relative rounded-full px-5 py-2 font-body text-sm font-medium transition-colors duration-200"
                >
                  {activeFilter === f.value && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      activeFilter === f.value ? "text-white" : "text-foreground-muted"
                    }`}
                  >
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {masterclasses.length === 0 ? (
          <p className="mt-14 text-center font-body text-[14px] text-foreground-muted">
            Aucune masterclass programmée pour l&apos;instant — reviens bientôt !
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((mc) => (
                <MasterclassCard key={mc.id} mc={mc} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/masterclasses"
              className="group inline-flex items-center gap-2 rounded-button border border-border bg-surface px-7 font-body text-[15px] font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
              style={{ height: "52px" }}
            >
              Voir toutes les masterclasses
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}