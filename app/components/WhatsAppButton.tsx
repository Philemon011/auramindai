"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Logo WhatsApp officiel en SVG inline — évite une dépendance à une
 * icône générique qui ne rendrait pas le vert/blanc caractéristique.
 */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
      <path
        fill="white"
        d="M16 3C9.373 3 4 8.373 4 15c0 2.31.65 4.47 1.78 6.31L4 29l7.86-1.74A11.93 11.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Zm0 21.6c-1.94 0-3.75-.56-5.28-1.53l-.38-.23-4.66 1.03 1.06-4.53-.25-.39A9.57 9.57 0 0 1 5.4 15C5.4 9.15 10.15 4.4 16 4.4S26.6 9.15 26.6 15 21.85 24.6 16 24.6Z"
      />
      <path
        fill="white"
        d="M21.2 18.02c-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.72.91-.88 1.1-.16.19-.32.21-.6.07-.28-.14-1.18-.44-2.24-1.39-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.63-1.53-.87-2.1-.23-.55-.46-.47-.63-.48h-.54c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.42 0 1.42 1.03 2.8 1.17 2.99.14.19 2.03 3.1 4.92 4.34.69.3 1.22.48 1.64.61.69.22 1.32.19 1.82.11.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33Z"
      />
    </svg>
  );
}

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Info-bulle au survol (desktop uniquement, évite un texte qui traîne au tap mobile) */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="hidden whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 font-body text-[13px] font-medium text-foreground shadow-[0_4px_16px_rgba(10,37,64,0.08)] sm:block"
          >
            Une question ? Écris-nous
          </motion.span>
        )}
      </AnimatePresence>

      
      <a  href="https://wa.me/22900000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous contacter sur WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105"
      >
        {/* Anneau de pulsation discret, une seule fois toutes les quelques secondes */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40 [animation-duration:2.5s] [animation-iteration-count:3]" />
        <WhatsAppIcon />
      </a>
    </div>
  );
}