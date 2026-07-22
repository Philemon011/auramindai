"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { AnimatedText, headlineContainer } from "./AnimatedText";

const faqs = [
  {
    question: "Comment se déroule une masterclass en direct ?",
    answer:
      "Tu t'inscris à la session de ton choix, tu reçois un lien d'accès sur le site à l'heure du live. Tu peux poser tes questions en temps réel pendant toute la durée de la session.",
  },
  {
    question: "Quelle est la différence entre les masterclasses gratuites et payantes ?",
    answer:
      "Les masterclasses gratuites couvrent des bases solides et des découvertes d'outils. Les masterclasses payantes vont plus loin techniquement, avec un accompagnement plus poussé et souvent des ressources exclusives.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Orange Money, MTN MoMo, Wave, PayPal, carte bancaire, virement SEPA, et crypto. On a pensé les paiements pour être accessibles aussi bien en Afrique qu'à l'international.",
  },
  {
    question: "J'ai manqué une session, puis-je récupérer le replay ?",
    answer:
      "Oui. Tu peux faire une demande de replay directement depuis la plateforme, et on te l'envoie dès qu'il est disponible.",
  },
  {
    question: "Les masterclasses sont-elles disponibles en anglais ?",
    answer:
      "Oui, certaines sessions sont animées en anglais en plus du français, selon le programme. Le calendrier indique la langue de chaque session.",
  },
  {
    question: "Comment rejoindre la communauté AURAMIND AI ?",
    answer:
      "Un lien vers notre groupe WhatsApp actif t'est communiqué après ton inscription — tu y reçois les ressources, les rappels de sessions, et peux échanger avec les autres apprenants.",
  },
];

function FaqItem({ item, isOpen, onToggle }: { item: (typeof faqs)[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-subheading text-[17px] font-medium text-foreground">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft"
        >
          <Plus className="h-3.5 w-3.5 text-accent" strokeWidth={2.25} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-xl pb-6 font-body text-[15px] leading-relaxed text-foreground-muted">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-background px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <span className="mb-4 font-body text-xs font-semibold uppercase tracking-wide text-accent">
            FAQ
          </span>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={headlineContainer}
            className="font-heading font-semibold text-foreground"
            style={{ fontSize: "40px", lineHeight: "46px", letterSpacing: "-0.02em" }}
          >
            <AnimatedText text="Questions fréquentes" />
          </motion.h2>
        </motion.div>

        <div className="mt-14">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}