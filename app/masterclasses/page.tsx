"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BackToTop } from "../components/BackToTop";
import { MasterclassCard } from "../components/MasterclassCard";
import { AnimatedText, headlineContainer } from "../components/AnimatedText";
import { masterclasses, MasterclassType, MasterclassLanguage } from "../data/masterclasses";

const typeFilters: { label: string; value: "all" | MasterclassType }[] = [
  { label: "Toutes", value: "all" },
  { label: "Gratuites", value: "free" },
  { label: "Payantes", value: "paid" },
];

const languageFilters: { label: string; value: "all" | MasterclassLanguage }[] = [
  { label: "Toutes", value: "all" },
  { label: "Français", value: "fr" },
  { label: "English", value: "en" },
];

const PAGE_SIZE = 6;

export default function MasterclassesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | MasterclassType>("all");
  const [languageFilter, setLanguageFilter] = useState<"all" | MasterclassLanguage>("all");
  const [page, setPage] = useState(1);

  // Revient à la page 1 dès qu'un filtre ou la recherche change,
  // pour éviter de rester bloqué sur une page qui n'existe plus.
  useEffect(() => {
    setPage(1);
  }, [search, typeFilter, languageFilter]);

  const filtered = useMemo(() => {
    return masterclasses.filter((mc) => {
      const matchesSearch = mc.title.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || mc.type === typeFilter;
      const matchesLanguage = languageFilter === "all" || mc.language === languageFilter;
      return matchesSearch && matchesType && matchesLanguage;
    });
  }, [search, typeFilter, languageFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main>
      <Navbar />

      <section className="bg-background px-6 pt-40 pb-16 sm:px-10">
        <div className="mx-auto max-w-6xl">
          {/* En-tête */}
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 font-body text-xs font-semibold uppercase tracking-wide text-accent">
              Programme complet
            </span>
            <motion.h1
              initial="hidden"
              animate="show"
              variants={headlineContainer}
              className="max-w-2xl font-heading font-semibold text-foreground"
              style={{ fontSize: "48px", lineHeight: "52px", letterSpacing: "-0.02em" }}
            >
              <AnimatedText text="Toutes nos masterclasses" />
            </motion.h1>
            <p className="mt-4 max-w-md font-body text-base text-foreground-muted">
              Trouve la session qui correspond à ton besoin, filtre par type
              ou par langue, et réserve ta place.
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="mx-auto mt-10 max-w-md">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une masterclass..."
                className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 font-body text-[14px] text-foreground outline-none transition-colors duration-200 placeholder:text-foreground-muted/60 focus:border-accent"
              />
            </div>
          </div>

          {/* Filtres */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
              {typeFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className="relative rounded-full px-5 py-2 font-body text-sm font-medium transition-colors duration-200"
                >
                  {typeFilter === f.value && (
                    <motion.span
                      layoutId="type-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 ${typeFilter === f.value ? "text-white" : "text-foreground-muted"}`}>
                    {f.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
              {languageFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setLanguageFilter(f.value)}
                  className="relative rounded-full px-5 py-2 font-body text-sm font-medium transition-colors duration-200"
                >
                  {languageFilter === f.value && (
                    <motion.span
                      layoutId="language-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 ${languageFilter === f.value ? "text-white" : "text-foreground-muted"}`}>
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Résultats */}
          {paginated.length > 0 ? (
            <motion.div
              key={`${page}-${typeFilter}-${languageFilter}-${search}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {paginated.map((mc) => (
                <MasterclassCard key={mc.id} mc={mc} />
              ))}
            </motion.div>
          ) : (
            <div className="mt-20 flex flex-col items-center text-center">
              <p className="font-subheading text-xl font-semibold text-foreground">
                Aucune masterclass ne correspond
              </p>
              <p className="mt-2 font-body text-sm text-foreground-muted">
                Essaie d&apos;ajuster ta recherche ou tes filtres.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Page précédente"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors duration-200 hover:border-accent/40 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === page;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full font-body text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-white" : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="page-pill"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{pageNum}</span>
                  </button>
                );
              })}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Page suivante"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors duration-200 hover:border-accent/40 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}