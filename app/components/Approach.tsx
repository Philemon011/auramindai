"use client";

import { motion } from "framer-motion";
import { Zap, Radio, Users, Target, ArrowUpRight } from "lucide-react";
import { AnimatedText, headlineContainer } from "./AnimatedText";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const pillars = [
  {
    icon: Zap,
    title: "100% pratique",
    description:
      "Pas de théorie abstraite. À la fin de chaque session, tu repars avec un résultat concret que tu peux utiliser immédiatement.",
    featured: true,
  },
  {
    icon: Radio,
    title: "En direct, vraiment",
    description:
      "Tu poses tes questions en temps réel. Le replay reste disponible si tu rates une session.",
    featured: false,
  },
  {
    icon: Users,
    title: "Une communauté active",
    description:
      "Rejoins des apprenants du monde entier, échange, trouve des collaborateurs, reste motivé après la session.",
    featured: false,
  },
  {
    icon: Target,
    title: "Adapté à ton profil",
    description:
      "Entrepreneur, étudiant, professionnel ou entreprise — chaque parcours est pensé pour ton contexte, pas un cours générique.",
    featured: true,
  },
];

function PillarCard({ pillar }: { pillar: (typeof pillars)[number] }) {
  const Icon = pillar.icon;

  if (pillar.featured) {
    return (
      <motion.div
        variants={fadeUp}
        className="group relative flex flex-col justify-between overflow-hidden rounded-card-lg bg-contrast p-8 sm:p-10"
      >
        {/* Halo décoratif discret, uniquement sur les cartes accentuées */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

        <div className="relative flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/10">
          <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
        </div>

        <div className="relative mt-10">
          <h3 className="font-subheading text-2xl font-semibold text-white">
            {pillar.title}
          </h3>
          <p className="mt-3 max-w-sm font-body text-[15px] leading-relaxed text-white/65">
            {pillar.description}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col justify-between rounded-card-lg border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/30 sm:p-10"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-accent-soft">
        <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
      </div>

      <div className="mt-10">
        <h3 className="font-subheading text-2xl font-semibold text-foreground">
          {pillar.title}
        </h3>
        <p className="mt-3 max-w-sm font-body text-[15px] leading-relaxed text-foreground-muted">
          {pillar.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Approach() {
  return (
    <section id="approche" className="bg-background px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-5xl">
        {/* En-tête de section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="flex flex-col items-start"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 font-body text-xs font-semibold uppercase tracking-wide text-accent"
          >
            Notre approche
          </motion.span>
          <motion.h2
            variants={headlineContainer}
            className="max-w-lg font-heading font-semibold text-foreground"
            style={{ fontSize: "40px", lineHeight: "46px", letterSpacing: "-0.02em" }}
          >
            <AnimatedText text="On ne t'explique pas l'IA. On te la fait utiliser." />
          </motion.h2>
          <motion.a
            variants={fadeUp}
            href="#masterclasses"
            className="group mt-6 inline-flex items-center gap-1.5 font-body text-[15px] font-medium text-foreground transition-colors duration-200 hover:text-accent"
          >
            Voir comment ça se passe en session
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </motion.div>

        {/* Bento asymétrique — grande carte / petite carte en quinconce */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12"
        >
          <div className="lg:col-span-8">
            <PillarCard pillar={pillars[0]} />
          </div>
          <div className="lg:col-span-4">
            <PillarCard pillar={pillars[1]} />
          </div>
          <div className="lg:col-span-4">
            <PillarCard pillar={pillars[2]} />
          </div>
          <div className="lg:col-span-8">
            <PillarCard pillar={pillars[3]} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}