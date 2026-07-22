"use client";

import { motion } from "framer-motion";

/**
 * Variantes réutilisées par tous les titres de section du site,
 * pour garder une seule signature d'animation cohérente partout.
 */
export const headlineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.15 },
  },
};

export const letterVariant = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * Découpe un texte en mots puis en lettres, chaque lettre étant animée
 * indépendamment. À utiliser à l'intérieur d'un motion.h1/h2 qui porte
 * variants={headlineContainer} + initial="hidden" + animate/whileInView="show".
 */
export function AnimatedText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, ci) => (
            <motion.span key={ci} variants={letterVariant} style={{ display: "inline-block" }}>
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </>
  );
}