"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Encapsule next-themes pour gérer le mode clair/sombre.
 * attribute="class" → ajoute la classe "dark" sur <html> quand le mode sombre est actif,
 * ce qui active automatiquement les variantes dark: de Tailwind.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}