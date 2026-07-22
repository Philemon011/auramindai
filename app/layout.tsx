import type { Metadata } from "next";
import {
  fontFlex9,
  fontFlex24,
  fontFlex36,
  fontFlex72,
  fontFlex120,
  fontPoppins,
} from "./fonts";
import { ThemeProvider } from "./theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURAMIND AI — Apprends à faire travailler l'intelligence artificielle",
  description:
    "Des masterclasses en direct pour apprendre à utiliser concrètement l'IA, quel que soit ton profil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning : nécessaire avec next-themes,
    // car la classe "dark" est ajoutée côté client après le premier rendu serveur
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`
  ${fontFlex9.variable}
  ${fontFlex24.variable}
  ${fontFlex36.variable}
  ${fontFlex72.variable}
  ${fontFlex120.variable}
  ${fontPoppins.variable}
  antialiased
`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}