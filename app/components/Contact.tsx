"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, Check } from "lucide-react";
import { AnimatedText, headlineContainer } from "./AnimatedText";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    // TODO: brancher sur une Server Action / route API qui envoie le message
    // vers Supabase (table `contact_messages`) une fois le schéma en place.
    setTimeout(() => {
      setStatus("sent");
    }, 900);
  }

  return (
    <section id="contact" className="bg-background px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Colonne gauche — texte + coordonnées directes */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
            className="flex flex-col"
          >
            <motion.span variants={fadeUp} className="mb-4 font-body text-xs font-semibold uppercase tracking-wide text-accent">
              Contact
            </motion.span>
            <motion.h2
              variants={headlineContainer}
              className="max-w-md font-heading font-semibold text-foreground"
              style={{ fontSize: "40px", lineHeight: "46px", letterSpacing: "-0.02em" }}
            >
              <AnimatedText text="Une question ? Écris-nous." />
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-sm font-body text-[15px] leading-relaxed text-foreground-muted">
              Qu&apos;il s&apos;agisse d&apos;une masterclass, d&apos;un partenariat ou
              simplement d&apos;une question, on te répond rapidement.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4">
              
              <a  href="mailto:contact@auramind-academy.fr"
                className="group flex items-center gap-3 font-body text-[15px] font-medium text-foreground transition-colors duration-200 hover:text-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft">
                  <Mail className="h-4 w-4 text-accent" strokeWidth={1.75} />
                </span>
                contact@auramind-academy.fr
              </a>
              
              <a  href="#"
                className="group flex items-center gap-3 font-body text-[15px] font-medium text-foreground transition-colors duration-200 hover:text-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft">
                  <MessageCircle className="h-4 w-4 text-accent" strokeWidth={1.75} />
                </span>
                Rejoindre la communauté WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Colonne droite — formulaire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-card-lg border border-border bg-surface p-8 sm:p-9"
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft">
                  <Check className="h-6 w-6 text-accent" strokeWidth={2} />
                </span>
                <h3 className="mt-6 font-subheading text-xl font-semibold text-foreground">
                  Message envoyé
                </h3>
                <p className="mt-2 max-w-xs font-body text-[14px] text-foreground-muted">
                  Merci, on revient vers toi très vite par email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="font-body text-[13px] font-medium text-foreground">
                    Nom
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ton nom"
                    className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 font-body text-[15px] text-foreground outline-none transition-colors duration-200 placeholder:text-foreground-muted/60 focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="font-body text-[13px] font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ton@email.com"
                    className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 font-body text-[15px] text-foreground outline-none transition-colors duration-200 placeholder:text-foreground-muted/60 focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-body text-[13px] font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Comment peut-on t'aider ?"
                    className="mt-2 w-full resize-none rounded-[12px] border border-border bg-background px-4 py-3 font-body text-[15px] text-foreground outline-none transition-colors duration-200 placeholder:text-foreground-muted/60 focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group mt-2 inline-flex h-13 items-center justify-center gap-2 rounded-button bg-accent font-body text-[15px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
                  style={{ height: "52px" }}
                >
                  {status === "submitting" ? "Envoi en cours..." : "Envoyer le message"}
                  {status !== "submitting" && (
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}