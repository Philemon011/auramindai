"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Globe2,
  Check,
  Star,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { BackToTop } from "../../components/BackToTop";
import { MasterclassCard } from "../../components/MasterclassCard";
import {
  getMasterclassById,
  getHostById,
  getReviewsByIds,
  formatPrice,
  masterclasses,
} from "../../data/masterclasses";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function MasterclassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const mc = getMasterclassById(id);
  const [registered, setRegistered] = useState(false);

  if (!mc) {
    return (
      <main>
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-32 text-center">
          <p className="font-subheading text-2xl font-semibold text-foreground">
            Masterclass introuvable
          </p>
          <p className="mt-2 font-body text-sm text-foreground-muted">
            Cette session n&apos;existe pas ou a été retirée du programme.
          </p>
          <Link
            href="/masterclasses"
            className="mt-6 inline-flex items-center gap-2 rounded-button bg-accent px-6 py-3 font-body text-[14px] font-medium text-white"
          >
            Voir toutes les masterclasses
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const host = getHostById(mc.hostId);
  const reviews = getReviewsByIds(mc.reviewIds);
  const related = masterclasses.filter((m) => m.id !== mc.id).slice(0, 3);

  function handleRegister() {
    // TODO: brancher sur Supabase (table `registrations`) une fois l'authentification en place.
    // Si mc.type === "paid", rediriger vers le flux de paiement avant de confirmer l'inscription.
    setRegistered(true);
  }

  return (
    <main>
      <Navbar />

      <section className="bg-background px-6 pt-32 pb-20 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/masterclasses"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-foreground-muted transition-colors duration-200 hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Toutes les masterclasses
          </Link>

          {/* Image + badges */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="relative mt-6 aspect-[16/7] overflow-hidden rounded-card-lg"
          >
            <img src={mc.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
            <div className="absolute left-6 top-6 flex items-center gap-2">
              {mc.type === "free" ? (
                <span className="rounded-full bg-surface/95 px-3 py-1 font-body text-xs font-semibold text-accent backdrop-blur-sm">
                  Gratuit
                </span>
              ) : (
                <span className="rounded-full bg-foreground/90 px-3 py-1 font-body text-xs font-semibold text-white backdrop-blur-sm">
                  {formatPrice(mc.price ?? 0)}
                </span>
              )}
              <span className="flex items-center gap-1 rounded-full bg-surface/95 px-2.5 py-1 font-body text-xs font-medium text-foreground-muted backdrop-blur-sm">
                <Globe2 className="h-3 w-3" />
                {mc.language === "fr" ? "FR" : "EN"}
              </span>
            </div>
          </motion.div>

          {/* Titre + meta */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="mt-8">
            <h1
              className="max-w-2xl font-heading font-semibold text-foreground"
              style={{ fontSize: "34px", lineHeight: "40px", letterSpacing: "-0.02em" }}
            >
              {mc.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-5 font-body text-sm text-foreground-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {mc.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {mc.time}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {mc.attendees} inscrits
              </span>
            </div>
          </motion.div>

          {/* Contenu principal + carte latérale */}
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
            {/* Colonne gauche */}
            <div className="flex flex-col gap-12">
              {/* Description */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                <h2 className="font-subheading text-xl font-semibold text-foreground">À propos de cette session</h2>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-foreground-muted">{mc.description}</p>
              </motion.div>

              {/* Programme */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                <h2 className="font-subheading text-xl font-semibold text-foreground">Programme de la session</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {mc.agenda.map((step, i) => (
                    <li key={step} className="flex items-start gap-4 rounded-card border border-border bg-surface p-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft font-body text-xs font-semibold text-accent">
                        {i + 1}
                      </span>
                      <span className="font-body text-[14px] leading-relaxed text-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Prérequis */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                <h2 className="font-subheading text-xl font-semibold text-foreground">Pour qui, et avec quoi ?</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {mc.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                        <Check className="h-3 w-3 text-accent" strokeWidth={2.5} />
                      </span>
                      <span className="font-body text-[14px] text-foreground-muted">{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Intervenant */}
              {host && (
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                  <h2 className="font-subheading text-xl font-semibold text-foreground">Ton intervenant</h2>
                  <div className="mt-5 flex items-start gap-4 rounded-card-lg border border-border bg-surface p-6">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-soft font-subheading text-lg font-semibold text-accent">
                      {host.initials}
                    </span>
                    <div>
                      <p className="font-body text-[16px] font-semibold text-foreground">{host.name}</p>
                      <p className="font-body text-[13px] text-accent">{host.role}</p>
                      <p className="mt-2 font-body text-[14px] leading-relaxed text-foreground-muted">{host.bio}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Avis */}
              {reviews.length > 0 && (
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                  <h2 className="font-subheading text-xl font-semibold text-foreground">Avis de participants</h2>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {reviews.map((review) => (
                      <div key={review.id} className="rounded-card border border-border bg-surface p-5">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-[#FBBF24] text-[#FBBF24]" />
                          ))}
                        </div>
                        <p className="mt-2.5 font-body text-[14px] leading-relaxed text-foreground-muted">
                          &ldquo;{review.quote}&rdquo;
                        </p>
                        <p className="mt-2.5 font-body text-[13px] font-medium text-foreground">{review.name}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Carte latérale — sticky sur desktop */}
            <motion.div initial="hidden" animate="show" variants={fadeUp} className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-card-lg border border-border bg-surface p-7">
                <p className="font-heading text-2xl font-semibold text-foreground">
                  {mc.type === "free" ? "Gratuit" : formatPrice(mc.price ?? 0)}
                </p>

                {registered ? (
                  <div className="mt-5 flex flex-col items-center rounded-card bg-accent-soft py-6 text-center">
                    <Check className="h-6 w-6 text-accent" strokeWidth={2} />
                    <p className="mt-2 font-body text-[14px] font-semibold text-foreground">Place réservée</p>
                    <p className="mt-1 max-w-[220px] font-body text-[13px] text-foreground-muted">
                      Tu recevras les détails de connexion avant le live.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleRegister}
                    className="group mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-button bg-accent font-body text-[15px] font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
                    style={{ height: "52px" }}
                  >
                    Réserver ma place
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                )}

                <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                  <div className="flex items-center justify-between font-body text-[13px]">
                    <span className="text-foreground-muted">Date</span>
                    <span className="font-medium text-foreground">{mc.date}</span>
                  </div>
                  <div className="flex items-center justify-between font-body text-[13px]">
                    <span className="text-foreground-muted">Heure</span>
                    <span className="font-medium text-foreground">{mc.time}</span>
                  </div>
                  <div className="flex items-center justify-between font-body text-[13px]">
                    <span className="text-foreground-muted">Langue</span>
                    <span className="font-medium text-foreground">{mc.language === "fr" ? "Français" : "English"}</span>
                  </div>
                  <div className="flex items-center justify-between font-body text-[13px]">
                    <span className="text-foreground-muted">Inscrits</span>
                    <span className="font-medium text-foreground">{mc.attendees}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Masterclasses similaires */}
          {related.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mt-24"
            >
              <h2 className="font-subheading text-xl font-semibold text-foreground">
                D&apos;autres masterclasses qui pourraient t&apos;intéresser
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {related.map((m) => (
                  <MasterclassCard key={m.id} mc={m} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}