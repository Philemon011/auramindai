"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import { AnimatedText, headlineContainer } from "./AnimatedText";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};


const softShadow = "0 1px 2px rgba(10,37,64,0.04), 0 16px 40px rgba(10,37,64,0.06)";

const learnerAvatars = [
  "images/testimonials/light.png",
  "https://i.pinimg.com/1200x/7d/9e/9b/7d9e9b724f35cedd04c3e1950b3a4845.jpg",
  "https://i.pinimg.com/736x/e5/39/49/e5394915262d78aacd2ee18562dae9d3.jpg",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
];

const highlightCards = [
  {
    image: "https://i.pinimg.com/1200x/bd/59/bb/bd59bb6ea9955bbc3462d5ab7636aaeb.jpg",
    value: "88+",
    label: "apprenants à la dernière session",
  },
  {
    image: "images/12pays.png",
    value: "12 pays",
    label: "représentés dans la communauté",
  },
  {
    image: "images/satisfaction-client.png",
    value: "4.9/5",
    label: "satisfaction moyenne",
  },
];

/**
 * Avis façon carte compacte : avatar, prénom + note, citation sur 2 lignes max.
 * Format inspiré d'un widget d'avis (type Senja) plutôt qu'une grande section.
 */
const reviews = [
  {
    name: "E. Lumière",
    avatar: learnerAvatars[0],
    quote: "J'ai automatisé ma prospection en une seule session, du jamais vu.",
  },
  {
    name: "B. Yannick",
    avatar: learnerAvatars[1],
    quote: "Le format live change tout, je pose mes questions en direct.",
  },
  {
    name: "A. Fatou",
    avatar: learnerAvatars[2],
    quote: "Toute mon équipe formée en un après-midi, du concret dès le début.",
  },
  {
    name: "J. Julien",
    avatar: learnerAvatars[3],
    quote: "Le meilleur rapport qualité-prix pour apprendre l'IA appliquée.",
  },
];

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div className="w-[300px] shrink-0 rounded-card border border-border bg-surface p-5">
      <div className="flex items-start gap-3">
        <img
          src={review.avatar}
          alt=""
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-body text-[15px] font-semibold text-foreground">
              {review.name}
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-[#FBBF24] text-[#FBBF24]" />
              ))}
            </div>
          </div>
          <p
            className="mt-1.5 line-clamp-2 font-body text-[13px] leading-relaxed text-foreground-muted"
            style={{ minHeight: "36px" }}
          >
            {review.quote}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-background pt-32 pb-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center sm:px-10"
      >
        {/* Badge de preuve sociale */}
        <motion.div
          variants={fadeUp}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface py-1.5 pr-5 pl-1.5"
          style={{ boxShadow: softShadow }}
        >
          <div className="flex -space-x-2">
            {learnerAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-6 w-6 rounded-full border-2 border-surface object-cover"
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-body text-xs font-medium text-foreground-muted">
              4.9/5 — 88+ apprenants
            </span>
          </div>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="font-heading font-semibold text-foreground"
          style={{ fontSize: "68px", lineHeight: "72px", letterSpacing: "-0.03em" }}
        >
          <span style={{ display: "block" }}>
            <AnimatedText text="Apprends à faire" />
          </span>
          <span style={{ display: "block" }}>
            <AnimatedText text="travailler l'IA." />
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-xl font-body text-lg leading-relaxed text-foreground-muted"
        >
          Pas de théorie abstraite. Des masterclasses concrètes pour utiliser
          l&apos;intelligence artificielle dans ton métier, tes études ou ton
          entreprise — animées en direct.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          
          <a  href="#masterclasses"
            className="group inline-flex items-center gap-2 rounded-button bg-accent px-7 font-body text-[15px] font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
            style={{ height: "52px" }}
          >
            Réserver ma place
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          
           <a href="#approche"
            className="inline-flex items-center gap-2 font-body text-[15px] font-medium text-foreground transition-colors duration-200 hover:text-accent"
            style={{ height: "52px" }}
          >
            <PlayCircle className="h-4 w-4" />
            Comment ça marche
          </a>
        </motion.div>
      </motion.div>

      {/* Avis qui défilent — cartes façon widget, boucle infinie */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative mt-14 overflow-hidden bg-background"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent sm:w-40" />

        <div className="flex w-max animate-marquee gap-5 px-6">
          {[...reviews, ...reviews].map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
      </motion.div>

      {/* Trois cartes photo — scroll horizontal sur mobile, grille sur desktop */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto mt-6 max-w-4xl"
      >
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-10 sm:pb-0">
          {highlightCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-card-lg sm:w-auto sm:shrink"
              style={{ boxShadow: softShadow }}
            >
              <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <div className="absolute bottom-5 left-5 right-5 text-left">
                <p className="font-heading text-2xl font-semibold text-white">{card.value}</p>
                <p className="mt-1 font-body text-[13px] text-white/80">{card.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}