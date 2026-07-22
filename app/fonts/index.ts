import localFont from "next/font/local";
import { Poppins } from "next/font/google";

/**
 * Poppins — utilisée pour tout le texte courant (corps, UI, boutons).
 * Google Sans Flex reste réservée aux titres uniquement.
 */
export const fontPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Google Sans Flex est une police à taille optique variable :
 * chaque palier (9pt, 24pt, 36pt, 72pt, 120pt) est optimisé pour un
 * contexte d'usage différent (petit texte UI → très grands titres).
 * On charge donc 5 "familles" distinctes, chacune avec ses 9 graisses.
 */

// 9pt — petits éléments d'UI (labels, badges, texte très fin)
export const fontFlex9 = localFont({
  variable: "--font-flex-9",
  src: [
    { path: "./GoogleSansFlex_9pt-Thin.ttf", weight: "100", style: "normal" },
    { path: "./GoogleSansFlex_9pt-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./GoogleSansFlex_9pt-Light.ttf", weight: "300", style: "normal" },
    { path: "./GoogleSansFlex_9pt-Regular.ttf", weight: "400", style: "normal" },
    { path: "./GoogleSansFlex_9pt-Medium.ttf", weight: "500", style: "normal" },
    { path: "./GoogleSansFlex_9pt-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./GoogleSansFlex_9pt-Bold.ttf", weight: "700", style: "normal" },
    { path: "./GoogleSansFlex_9pt-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./GoogleSansFlex_9pt-Black.ttf", weight: "900", style: "normal" },
  ],
});

// 24pt — texte courant (paragraphes, corps de texte)
export const fontFlex24 = localFont({
  variable: "--font-flex-24",
  src: [
    { path: "./GoogleSansFlex_24pt-Thin.ttf", weight: "100", style: "normal" },
    { path: "./GoogleSansFlex_24pt-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./GoogleSansFlex_24pt-Light.ttf", weight: "300", style: "normal" },
    { path: "./GoogleSansFlex_24pt-Regular.ttf", weight: "400", style: "normal" },
    { path: "./GoogleSansFlex_24pt-Medium.ttf", weight: "500", style: "normal" },
    { path: "./GoogleSansFlex_24pt-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./GoogleSansFlex_24pt-Bold.ttf", weight: "700", style: "normal" },
    { path: "./GoogleSansFlex_24pt-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./GoogleSansFlex_24pt-Black.ttf", weight: "900", style: "normal" },
  ],
});

// 36pt — sous-titres, titres de section
export const fontFlex36 = localFont({
  variable: "--font-flex-36",
  src: [
    { path: "./GoogleSansFlex_36pt-Thin.ttf", weight: "100", style: "normal" },
    { path: "./GoogleSansFlex_36pt-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./GoogleSansFlex_36pt-Light.ttf", weight: "300", style: "normal" },
    { path: "./GoogleSansFlex_36pt-Regular.ttf", weight: "400", style: "normal" },
    { path: "./GoogleSansFlex_36pt-Medium.ttf", weight: "500", style: "normal" },
    { path: "./GoogleSansFlex_36pt-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./GoogleSansFlex_36pt-Bold.ttf", weight: "700", style: "normal" },
    { path: "./GoogleSansFlex_36pt-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./GoogleSansFlex_36pt-Black.ttf", weight: "900", style: "normal" },
  ],
});

// 72pt — grands titres (H1 de section)
export const fontFlex72 = localFont({
  variable: "--font-flex-72",
  src: [
    { path: "./GoogleSansFlex_72pt-Thin.ttf", weight: "100", style: "normal" },
    { path: "./GoogleSansFlex_72pt-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./GoogleSansFlex_72pt-Light.ttf", weight: "300", style: "normal" },
    { path: "./GoogleSansFlex_72pt-Regular.ttf", weight: "400", style: "normal" },
    { path: "./GoogleSansFlex_72pt-Medium.ttf", weight: "500", style: "normal" },
    { path: "./GoogleSansFlex_72pt-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./GoogleSansFlex_72pt-Bold.ttf", weight: "700", style: "normal" },
    { path: "./GoogleSansFlex_72pt-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./GoogleSansFlex_72pt-Black.ttf", weight: "900", style: "normal" },
  ],
});

// 120pt — hero géant, titre principal de la page d'accueil
export const fontFlex120 = localFont({
  variable: "--font-flex-120",
  src: [
    { path: "./GoogleSansFlex_120pt-Thin.ttf", weight: "100", style: "normal" },
    { path: "./GoogleSansFlex_120pt-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./GoogleSansFlex_120pt-Light.ttf", weight: "300", style: "normal" },
    { path: "./GoogleSansFlex_120pt-Regular.ttf", weight: "400", style: "normal" },
    { path: "./GoogleSansFlex_120pt-Medium.ttf", weight: "500", style: "normal" },
    { path: "./GoogleSansFlex_120pt-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./GoogleSansFlex_120pt-Bold.ttf", weight: "700", style: "normal" },
    { path: "./GoogleSansFlex_120pt-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./GoogleSansFlex_120pt-Black.ttf", weight: "900", style: "normal" },
  ],
});