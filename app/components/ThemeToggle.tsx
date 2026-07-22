"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

/**
 * Interrupteur clair/sombre — un rail avec un curseur qui glisse,
 * plus élégant qu'un simple bouton qui change d'icône brutalement.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Évite un décalage visuel au premier rendu serveur (le thème n'est
  // connu qu'une fois le composant monté côté client)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-[68px] rounded-full border border-border bg-surface" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Changer de thème"
      className="relative flex h-9 w-[68px] items-center rounded-full border border-border bg-surface px-1"
    >
      <motion.div
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-accent"
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 fill-white text-white" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-white" />
        )}
      </motion.div>

      {/* Icônes fixes en fond de rail, pour indiquer les deux états */}
      <Sun className="pointer-events-none absolute left-2 h-3.5 w-3.5 text-foreground-muted opacity-50" />
      <Moon className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-foreground-muted opacity-50" />
    </button>
  );
}