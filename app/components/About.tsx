"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Trophy,
  Bot,
  BarChart3,
  Briefcase,
  Globe2,
  Check,
  Users,
  Calendar,
  Sparkles,
  Quote,
} from "lucide-react";
import { AnimatedText, headlineContainer } from "./AnimatedText";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const learnItems = [
  { icon: Bot, title: "Intelligence Artificielle", description: "ChatGPT, prompts, automatisation, outils IA du quotidien." },
  { icon: BarChart3, title: "Data & Analyse", description: "Exploiter les données, visualiser, décider grâce aux chiffres." },
  { icon: Briefcase, title: "IA & Entrepreneuriat", description: "Intégrer l'IA dans son business, gagner en productivité." },
  { icon: Globe2, title: "Accès mondial", description: "Sessions en français & anglais, accessibles de n'importe où." },
];

const whyItems = [
  { title: "Sessions live & interactives", description: "Pose tes questions en temps réel, interagis avec le formateur et les autres participants." },
  { title: "Tarifs accessibles", description: "Des masterclasses gratuites et payantes à des prix adaptés au contexte africain et international." },
  { title: "Modes de paiement flexibles", description: "Orange Money, MTN MoMo, Wave, PayPal, carte bancaire, virement SEPA, crypto et bien plus." },
  { title: "Communauté WhatsApp", description: "Rejoins notre groupe actif pour recevoir les ressources, les rappels et échanger avec la communauté." },
  { title: "Replay disponible", description: "Tu as manqué la session ? Demande le replay directement depuis la plateforme." },
];

const stats = [
  { icon: Users, value: "88+", label: "Inscrits dès la 1ère MC" },
  { icon: Globe2, value: "Mondiale", label: "Communauté" },
  { icon: Calendar, value: "Mai 2026", label: "Date de création" },
  { icon: Sparkles, value: "IA", label: "Notre spécialité" },
];

const team = [
  {
    initials: "RO",
    name: "Ronel OUSSOU",
    role: "Fondateur, Étudiant Ingénieur",
    bio: "Passionné d'IA et de transformation des données. Il a lancé sa première masterclass avec une conviction : partager la connaissance, c'est changer le monde.",
  },
  {
    initials: "SH",
    name: "Sidney HODIEB",
    role: "Mentor, Ingénieur en Data",
    bio: "C'est lui qui a poussé Ronel à créer AURAMIND AI. Son expertise en ingénierie des données et sa vision stratégique ont été les piliers du lancement.",
  },
];

export function About() {
  return (
    <section id="a-propos" className="bg-background px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-5xl">
        {/* En-tête de section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="flex flex-col items-start"
        >
          <motion.span variants={fadeUp} className="mb-4 font-body text-xs font-semibold uppercase tracking-wide text-accent">
            À propos
          </motion.span>
          <motion.h2
            variants={headlineContainer}
            className="max-w-lg font-heading font-semibold text-foreground"
            style={{ fontSize: "40px", lineHeight: "46px", letterSpacing: "-0.02em" }}
          >
            <AnimatedText text="AURAMIND AI, qui sommes-nous ?" />
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl font-body text-[15px] leading-relaxed text-foreground-muted">
            AURAMIND AI est une plateforme mondiale de masterclasses dédiées à
            l&apos;Intelligence Artificielle. Notre mission : rendre les savoirs
            de demain accessibles à tous, que tu sois étudiant à Cotonou,
            entrepreneur à Paris, ou professionnel à Montréal.
          </motion.p>
        </motion.div>

        {/* Mission + Historique — bento 2 colonnes, cohérent avec la section Approche */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="rounded-card-lg border border-border bg-surface p-8 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-accent-soft">
              <Rocket className="h-5 w-5 text-accent" strokeWidth={1.75} />
            </div>
            <h3 className="mt-7 font-subheading text-xl font-semibold text-foreground">Notre mission</h3>
            <p className="mt-3 font-body text-[14px] leading-relaxed text-foreground-muted">
              Dans un monde où la technologie évolue à une vitesse fulgurante,
              AURAMIND AI s&apos;est donné pour mission de connecter les esprits
              curieux aux expertises de demain. Nos masterclasses réunissent des
              passionnés, des professionnels et des novices des quatre coins du
              globe pour ne laisser personne derrière dans la révolution de l&apos;IA.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-card-lg bg-contrast p-8 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/10">
              <Trophy className="h-5 w-5 text-white" strokeWidth={1.75} />
            </div>
            <h3 className="mt-7 font-subheading text-xl font-semibold text-white">Une première historique</h3>
            <p className="mt-3 font-body text-[14px] leading-relaxed text-white/65">
              Tout commence avec une idée audacieuse : une masterclass sur
              &laquo;&nbsp;Intelligence Artificielle &amp; Chatbots, ChatGPT&nbsp;&raquo;.
              Le résultat ? 88 inscrits dès la première édition, issus de
              plusieurs pays d&apos;Afrique et d&apos;Europe. Un succès qui confirme
              qu&apos;AURAMIND AI était là au bon moment.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mt-5 grid grid-cols-2 gap-5 rounded-card-lg border border-border bg-surface p-8 sm:grid-cols-4 sm:p-9"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={fadeUp} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                <p className="mt-3 font-heading text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="mt-1 font-body text-xs text-foreground-muted">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Ce que tu vas apprendre */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mt-24"
        >
          <motion.h3 variants={fadeUp} className="font-subheading text-2xl font-semibold text-foreground">
            Ce que tu vas apprendre
          </motion.h3>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {learnItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={fadeUp} className="rounded-card border border-border bg-surface p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-accent-soft">
                    <Icon className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
                  </div>
                  <h4 className="mt-5 font-body text-[15px] font-semibold text-foreground">{item.title}</h4>
                  <p className="mt-2 font-body text-[13px] leading-relaxed text-foreground-muted">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Pourquoi choisir AURAMIND AI */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mt-24"
        >
          <motion.h3 variants={fadeUp} className="font-subheading text-2xl font-semibold text-foreground">
            Pourquoi choisir AURAMIND AI ?
          </motion.h3>

          <div className="mt-8 flex flex-col divide-y divide-border rounded-card-lg border border-border bg-surface">
            {whyItems.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="flex items-start gap-4 p-6">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                  <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-body text-[15px] font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 font-body text-[14px] leading-relaxed text-foreground-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Équipe */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mt-24"
        >
          <motion.h3 variants={fadeUp} className="font-subheading text-2xl font-semibold text-foreground">
            Notre équipe
          </motion.h3>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeUp} className="rounded-card-lg border border-border bg-surface p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft font-subheading text-lg font-semibold text-accent">
                  {member.initials}
                </span>
                <h4 className="mt-6 font-body text-[17px] font-semibold text-foreground">{member.name}</h4>
                <p className="mt-0.5 font-body text-[13px] text-accent">{member.role}</p>
                <p className="mt-4 font-body text-[14px] leading-relaxed text-foreground-muted">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Citation */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="relative mt-24 rounded-card-lg border border-border bg-surface p-10 sm:p-14"
        >
          <Quote className="h-8 w-8 text-accent/25" strokeWidth={1.5} />
          <p className="mt-5 max-w-2xl font-subheading text-[22px] font-medium leading-snug text-foreground sm:text-[26px]">
            L&apos;ère de l&apos;IA sera grande, nous voulons en être les acteurs
            incontournables.
          </p>
          <p className="mt-5 font-body text-sm font-medium text-foreground-muted">
            — Ronel OUSSOU, Fondateur d&apos;AURAMIND AI
          </p>
        </motion.div>
      </div>
    </section>
  );
}