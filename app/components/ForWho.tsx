"use client";

import { motion } from "framer-motion";
import { Rocket, GraduationCap, Briefcase, Building2, ArrowRight } from "lucide-react";
import { AnimatedText, headlineContainer } from "./AnimatedText";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const profiles = [
  {
    icon: Rocket,
    label: "Pour les entrepreneurs",
    tagline: "Nourrir ton IA avec ton business",
    description:
      "Ton IA ne peut te répondre correctement que si tu lui donnes les bons éléments. On t'apprend à structurer tes offres, tes process et ta vision pour qu'elle parle ton langage et serve vraiment tes clients.",
    benefits: [
      "Construire ta base de connaissances IA",
      "Automatiser ta prospection et ta communication",
      "Gagner en productivité sans perdre le contrôle",
    ],
  },
  {
    icon: GraduationCap,
    label: "Pour les étudiants",
    tagline: "Maîtriser l'IA avant le marché du travail",
    description:
      "L'IA n'est pas là pour faire tes devoirs à ta place, elle est là pour t'aider à aller plus loin, plus vite. On te forme aux bons réflexes pour que tu arrives sur le marché avec une vraie longueur d'avance.",
    benefits: [
      "Prompt engineering et recherche assistée par IA",
      "Synthèse, rédaction et présentation avec l'IA",
      "Préparer son CV et ses candidatures grâce à l'IA",
    ],
  },
  {
    icon: Briefcase,
    label: "Pour les professionnels",
    tagline: "L'IA comme assistant au quotidien",
    description:
      "Tu n'as pas besoin de tout révolutionner. On t'aide à identifier les tâches qui te coûtent le plus de temps et à les automatiser, sans jargon technique, sans devenir développeur.",
    benefits: [
      "Rédaction, résumé et gestion de mails avec l'IA",
      "Analyse de données et aide à la prise de décision",
      "Outils IA concrets adaptés à ton métier",
    ],
  },
  {
    icon: Building2,
    label: "Pour les entreprises",
    tagline: "Intégrer l'IA dans toute une équipe",
    description:
      "L'IA ne se déploie pas seule dans une organisation. On accompagne vos équipes à comprendre, adopter et tirer parti des outils IA, avec une approche adaptée à votre secteur d'activité.",
    benefits: [
      "Formations IA sur mesure pour vos collaborateurs",
      "Optimisation des workflows internes avec l'IA",
      "Stratégie IA alignée sur vos objectifs business",
    ],
  },
];

function ProfileCard({ profile }: { profile: (typeof profiles)[number] }) {
  const Icon = profile.icon;

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col rounded-card-lg border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/30 sm:p-9"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-accent-soft transition-colors duration-300 group-hover:bg-accent">
        <Icon
          className="h-5 w-5 text-accent transition-colors duration-300 group-hover:text-white"
          strokeWidth={1.75}
        />
      </div>

      <span className="mt-7 font-body text-xs font-semibold uppercase tracking-wide text-foreground-muted">
        {profile.label}
      </span>
      <h3 className="mt-2 font-subheading text-xl font-semibold text-foreground">
        {profile.tagline}
      </h3>
      <p className="mt-3 font-body text-[14px] leading-relaxed text-foreground-muted">
        {profile.description}
      </p>

      <ul className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
        {profile.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2.5">
            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
            <span className="font-body text-sm leading-snug text-foreground">
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function ForWho() {
  return (
    <section id="pour-qui" className="bg-background px-6 py-28 sm:px-10">
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
            Pour qui ?
          </motion.span>
          <motion.h2
            variants={headlineContainer}
            className="max-w-lg font-heading font-semibold text-foreground"
            style={{ fontSize: "40px", lineHeight: "46px", letterSpacing: "-0.02em" }}
          >
            <AnimatedText text="Quel que soit ton profil, il y a un parcours pour toi" />
          </motion.h2>
        </motion.div>

        {/* Grille 2x2 */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {profiles.map((profile) => (
            <ProfileCard key={profile.label} profile={profile} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}