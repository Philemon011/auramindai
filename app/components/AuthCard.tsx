"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedText, headlineContainer } from "./AnimatedText";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
  panelHeadline,
  panelQuote,
  panelAuthor,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  panelHeadline: string;
  panelQuote: string;
  panelAuthor: string;
}) {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Panneau de marque — masqué sur mobile, visible à partir de lg */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-contrast p-12 lg:flex">
        {/* Motif de points discret en fond */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Halo lumineux */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />

        <Link href="/" className="relative z-10 flex items-center gap-1">
          <span className="font-heading text-lg font-bold tracking-tight text-white">
            Auramind<span className="text-accent"> AI</span>
          </span>
        </Link>

        <motion.div
          initial="hidden"
          animate="show"
          variants={headlineContainer}
          className="relative z-10 max-w-md"
        >
          <h2
            className="font-heading font-semibold text-white"
            style={{ fontSize: "40px", lineHeight: "46px", letterSpacing: "-0.02em" }}
          >
            <AnimatedText text={panelHeadline} />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative z-10 max-w-sm border-t border-white/10 pt-6"
        >
          <p className="font-subheading text-[17px] font-medium leading-snug text-white/90">
            &ldquo;{panelQuote}&rdquo;
          </p>
          <p className="mt-3 font-body text-[13px] text-white/50">{panelAuthor}</p>
        </motion.div>
      </div>

      {/* Panneau formulaire */}
      <div className="flex items-center justify-center bg-background px-6 py-16 sm:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="w-full max-w-[380px]"
        >
          {/* Logo visible uniquement sur mobile, puisque le panneau de gauche est caché */}
          <Link href="/" className="mb-10 flex items-center gap-1 lg:hidden">
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              Auramind<span className="text-accent"> AI</span>
            </span>
          </Link>

          <h1
            className="font-heading font-semibold text-foreground"
            style={{ fontSize: "30px", lineHeight: "36px", letterSpacing: "-0.02em" }}
          >
            {title}
          </h1>
          <p className="mt-2.5 font-body text-[15px] text-foreground-muted">{subtitle}</p>

          <div className="mt-9">{children}</div>

          <div className="mt-8 font-body text-[14px] text-foreground-muted">{footer}</div>
        </motion.div>
      </div>
    </main>
  );
}