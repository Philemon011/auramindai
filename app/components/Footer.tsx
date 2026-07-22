"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";

const columns = [
    {
        title: "Navigation",
        links: [
            { label: "Accueil", href: "/" },
            { label: "Masterclasses", href: "/#masterclasses" },
            { label: "Notre approche", href: "/#approche" },
            { label: "Pour qui ?", href: "/#pour-qui" },
        ],
    },
    {
        title: "Plateforme",
        links: [
            { label: "À propos", href: "/#a-propos" },
            { label: "FAQ", href: "/#faq" },
            { label: "Contact", href: "/#contact" },
            { label: "Se connecter", href: "/#connexion" },
        ],
    },
    {
        title: "Légal",
        links: [
            { label: "Conditions d'utilisation", href: "#" },
            { label: "Politique de confidentialité", href: "#" },
            { label: "Mentions légales", href: "#" },
        ],
    },
];

function Logomark() {
    return (
        <svg viewBox="0 0 32 32" fill="none" className="h-4 w-4">
            <circle cx="13" cy="16" r="8.5" stroke="white" strokeWidth="2.2" />
            <circle cx="20" cy="14" r="4.5" fill="white" />
        </svg>
    );
}

export function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    function handleSubscribe(e: React.FormEvent) {
        e.preventDefault();
        // TODO: brancher sur Supabase (table `newsletter_subscribers`) une fois le schéma en place.
        setSubscribed(true);
    }

    return (
        <footer className="border-t border-border bg-surface px-6 pt-20 pb-10 sm:px-10">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    {/* Bloc marque + newsletter */}
                    <div className="flex flex-col">
                        <a href="#" className="flex items-center gap-1">
                            {/* <Image
                                src="/logo.png"
                                alt="Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                            /> */}
                            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                                Auramind<span className="text-accent"> AI</span>
                            </span>
                        </a>
                        <p className="mt-4 max-w-xs font-body text-[14px] leading-relaxed text-foreground-muted">
                            Des masterclasses en direct pour apprendre à faire travailler
                            l&apos;intelligence artificielle, quel que soit ton profil.
                        </p>

                        {/* Newsletter */}
                        <form onSubmit={handleSubscribe} className="mt-7">
                            {subscribed ? (
                                <p className="font-body text-[13px] font-medium text-accent">
                                    Merci, tu es inscrit à la newsletter.
                                </p>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Ton email"
                                        className="w-full rounded-[10px] border border-border bg-background px-4 py-2.5 font-body text-[13px] text-foreground outline-none transition-colors duration-200 placeholder:text-foreground-muted/60 focus:border-accent"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="S'inscrire à la newsletter"
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-accent transition-transform duration-200 hover:scale-105"
                                    >
                                        <ArrowRight className="h-3.5 w-3.5 text-white" />
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Colonnes de liens */}
                    {columns.map((col) => (
                        <div key={col.title} className="flex flex-col">
                            <span className="font-body text-[13px] font-semibold uppercase tracking-wide text-foreground-muted">
                                {col.title}
                            </span>
                            <ul className="mt-5 flex flex-col gap-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>

                                        <a href={link.href}
                                            className="font-body text-[14px] text-foreground-muted transition-colors duration-200 hover:text-accent"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bas de footer — copyright + réseaux */}
                <div className="mt-16 flex flex-col items-center gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between">
                    <p className="font-body text-[13px] text-foreground-muted">
                        © {new Date().getFullYear()} AURAMIND AI. Tous droits réservés.
                    </p>

                    <div className="flex items-center gap-3">

                        <a href="#"
                            aria-label="WhatsApp"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                        >
                            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                        </a>

                        <a href="#"
                            aria-label="LinkedIn"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border grayscale transition-all duration-200 hover:border-accent/40 hover:grayscale-0"
                        >
                            <Image src="/social/linkedin.svg" alt="LinkedIn" width={16} height={16} />
                        </a>

                        <a href="#"
                            aria-label="Instagram"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border grayscale transition-all duration-200 hover:border-accent/40 hover:grayscale-0"
                        >
                            <Image src="/social/instagram.svg" alt="Instagram" width={16} height={16} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}