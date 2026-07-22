export type MasterclassType = "free" | "paid";
export type MasterclassLanguage = "fr" | "en";

export interface Host {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface Review {
  id: string;
  name: string;
  quote: string;
  rating: number;
}

export interface Masterclass {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  type: MasterclassType;
  price?: number;
  attendees: number;
  language: MasterclassLanguage;
  description: string;
  agenda: string[];
  requirements: string[];
  hostId: string;
  reviewIds: string[];
}

/**
 * Intervenants — référencés par id depuis chaque masterclass, pour éviter
 * de dupliquer bio/rôle si le même intervenant anime plusieurs sessions.
 */
export const hosts: Host[] = [
  {
    id: "ronel",
    name: "Ronel OUSSOU",
    role: "Fondateur, AURAMIND AI",
    bio: "Passionné d'IA et de transformation des données, il anime les masterclasses les plus techniques du programme.",
    initials: "RO",
  },
  {
    id: "sidney",
    name: "Sidney HODIEB",
    role: "Ingénieur en Data",
    bio: "Expert en ingénierie des données, il intervient sur les sujets liés à l'analyse et à la structuration de l'information.",
    initials: "SH",
  },
];

/**
 * Avis — pool partagé, référencé par id depuis chaque masterclass
 * (2 à 3 avis différents par session plutôt que du contenu dupliqué).
 */
export const reviewPool: Review[] = [
  { id: "r1", name: "Amina K.", quote: "Contenu concret, j'ai pu appliquer ce que j'ai appris dès le lendemain.", rating: 5 },
  { id: "r2", name: "Yannick D.", quote: "Le format live change tout, on pose ses questions en direct.", rating: 5 },
  { id: "r3", name: "Fatou S.", quote: "Très clair même sans bagage technique au départ.", rating: 5 },
  { id: "r4", name: "Julien M.", quote: "Le meilleur rapport qualité-prix pour apprendre l'IA appliquée.", rating: 4 },
  { id: "r5", name: "Carla N.", quote: "L'intervenant prend vraiment le temps de répondre à toutes les questions.", rating: 5 },
  { id: "r6", name: "Idris B.", quote: "Session dense mais très bien structurée, rien à jeter.", rating: 4 },
];

/**
 * Données de démonstration — à remplacer par les vraies masterclasses
 * récupérées depuis Supabase une fois le schéma en place.
 */
export const masterclasses: Masterclass[] = [
  {
    id: "1",
    title: "Automatiser sa prospection avec l'IA",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80",
    date: "12 août",
    time: "18h00",
    type: "free",
    attendees: 64,
    language: "fr",
    description:
      "Découvre comment automatiser la recherche de prospects, la rédaction de messages personnalisés et le suivi de tes relances grâce à l'IA, sans écrire une seule ligne de code.",
    agenda: [
      "Identifier les tâches de prospection automatisables",
      "Construire un prompt de qualification de prospects",
      "Générer des messages de relance personnalisés",
      "Mettre en place un suivi automatisé simple",
    ],
    requirements: [
      "Aucune connaissance technique requise",
      "Avoir un ordinateur portable",
      "Un compte ChatGPT (gratuit suffit)",
    ],
    hostId: "ronel",
    reviewIds: ["r1", "r3"],
  },
  {
    id: "2",
    title: "Prompt engineering avancé pour la rédaction",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop&q=80",
    date: "19 août",
    time: "19h00",
    type: "paid",
    price: 15000,
    attendees: 41,
    language: "fr",
    description:
      "Va au-delà des prompts basiques : structure, contraintes, itération et techniques avancées pour obtenir des textes vraiment exploitables, du premier jet à la version finale.",
    agenda: [
      "Anatomie d'un prompt efficace",
      "Techniques d'itération et de raffinement",
      "Adapter le ton et le format à ton audience",
      "Construire une bibliothèque de prompts réutilisables",
    ],
    requirements: [
      "Bases en rédaction ou communication",
      "Avoir déjà utilisé un outil d'IA générative",
      "Un compte ChatGPT ou Claude",
    ],
    hostId: "ronel",
    reviewIds: ["r2", "r4"],
  },
  {
    id: "3",
    title: "Construire un chatbot pour son business",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=800&fit=crop&q=80",
    date: "26 août",
    time: "18h30",
    type: "paid",
    price: 20000,
    attendees: 37,
    language: "fr",
    description:
      "Apprends à concevoir un chatbot simple pour répondre aux questions fréquentes de tes clients, sans compétence en développement, avec des outils no-code accessibles.",
    agenda: [
      "Définir le rôle et les limites du chatbot",
      "Choisir un outil no-code adapté",
      "Configurer les réponses et le ton",
      "Tester et améliorer les réponses du bot",
    ],
    requirements: [
      "Avoir un business ou projet en tête",
      "Aucune compétence en code requise",
      "Un ordinateur portable",
    ],
    hostId: "sidney",
    reviewIds: ["r5", "r6"],
  },
  {
    id: "4",
    title: "IA & analyse de données pour débutants",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
    date: "2 sept.",
    time: "18h00",
    type: "free",
    attendees: 52,
    language: "fr",
    description:
      "Découvre comment utiliser l'IA pour explorer un jeu de données, repérer des tendances et créer des visualisations claires, même sans expérience en statistiques.",
    agenda: [
      "Comprendre un jeu de données simple",
      "Poser les bonnes questions à l'IA sur des données",
      "Générer des visualisations pertinentes",
      "Interpréter les résultats sans se tromper",
    ],
    requirements: [
      "Aucune expérience en data requise",
      "Un fichier Excel ou CSV à explorer (optionnel)",
      "Un ordinateur portable",
    ],
    hostId: "sidney",
    reviewIds: ["r1", "r6"],
  },
  {
    id: "5",
    title: "Créer du contenu visuel avec l'IA générative",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop&q=80",
    date: "9 sept.",
    time: "19h00",
    type: "paid",
    price: 18000,
    attendees: 29,
    language: "en",
    description:
      "Learn how to generate on-brand visuals, moodboards and social media assets using generative AI tools, without any design background.",
    agenda: [
      "Choosing the right generative AI tool",
      "Writing effective visual prompts",
      "Keeping visuals consistent with your brand",
      "Exporting assets for social media",
    ],
    requirements: [
      "No design experience required",
      "A laptop",
      "A free account on a generative AI image tool",
    ],
    hostId: "ronel",
    reviewIds: ["r4", "r5"],
  },
  {
    id: "6",
    title: "IA en entreprise : par où commencer ?",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop&q=80",
    date: "16 sept.",
    time: "18h00",
    type: "free",
    attendees: 71,
    language: "fr",
    description:
      "Un panorama pratique pour les dirigeants et managers qui veulent comprendre par où commencer l'adoption de l'IA dans leur organisation, sans jargon technique.",
    agenda: [
      "Cartographier les tâches automatisables",
      "Prioriser les premiers cas d'usage",
      "Anticiper la conduite du changement en équipe",
      "Mesurer l'impact des premiers outils déployés",
    ],
    requirements: [
      "Aucun prérequis technique",
      "Idéal pour dirigeants et managers",
      "Un ordinateur portable",
    ],
    hostId: "sidney",
    reviewIds: ["r3", "r2"],
  },
  {
    id: "7",
    title: "Advanced ChatGPT workflows for teams",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=800&fit=crop&q=80",
    date: "23 sept.",
    time: "17h00",
    type: "paid",
    price: 22000,
    attendees: 33,
    language: "en",
    description:
      "Learn how to design shared ChatGPT workflows for your team — from custom instructions to reusable prompt templates that save hours every week.",
    agenda: [
      "Setting up custom instructions for a team",
      "Building reusable prompt templates",
      "Sharing workflows across a team",
      "Measuring time saved per workflow",
    ],
    requirements: [
      "Basic ChatGPT experience",
      "A laptop",
      "Ideally, a small team to bring workflows back to",
    ],
    hostId: "ronel",
    reviewIds: ["r6", "r4"],
  },
  {
    id: "8",
    title: "Rédiger des emails professionnels avec l'IA",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80",
    date: "30 sept.",
    time: "18h00",
    type: "free",
    attendees: 58,
    language: "fr",
    description:
      "Gagne un temps précieux sur la rédaction de tes emails professionnels, tout en gardant un ton juste et personnel grâce à quelques techniques simples avec l'IA.",
    agenda: [
      "Structurer un email efficace avec l'IA",
      "Adapter le ton selon le destinataire",
      "Gérer les réponses aux mails difficiles",
      "Créer des modèles réutilisables",
    ],
    requirements: [
      "Aucun prérequis",
      "Un ordinateur portable",
      "Un compte ChatGPT (gratuit suffit)",
    ],
    hostId: "sidney",
    reviewIds: ["r1", "r5"],
  },
  {
    id: "9",
    title: "Building your first AI-powered product",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
    date: "7 oct.",
    time: "19h00",
    type: "paid",
    price: 25000,
    attendees: 24,
    language: "en",
    description:
      "A hands-on introduction to building a simple AI-powered product using no-code and low-code tools, from idea to a working prototype.",
    agenda: [
      "Scoping a realistic first AI product",
      "Choosing the right no-code/low-code stack",
      "Connecting an AI model to a simple interface",
      "Testing your prototype with real users",
    ],
    requirements: [
      "Basic comfort with digital tools",
      "A laptop",
      "An idea for a product (even rough)",
    ],
    hostId: "ronel",
    reviewIds: ["r4", "r6"],
  },
  {
    id: "10",
    title: "IA générative et création de visuels de marque",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop&q=80",
    date: "14 oct.",
    time: "18h30",
    type: "paid",
    price: 18000,
    attendees: 31,
    language: "fr",
    description:
      "Apprends à générer des visuels cohérents avec ton identité de marque grâce à l'IA générative, pour tes réseaux sociaux et supports de communication.",
    agenda: [
      "Définir sa direction artistique de marque",
      "Écrire des prompts visuels efficaces",
      "Garder une cohérence visuelle entre les visuels",
      "Adapter les formats pour chaque réseau social",
    ],
    requirements: [
      "Aucune expérience en design requise",
      "Un ordinateur portable",
      "Un compte sur un outil d'IA générative d'images",
    ],
    hostId: "ronel",
    reviewIds: ["r3", "r5"],
  },
  {
    id: "11",
    title: "Les bases de l'IA pour tous",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop&q=80",
    date: "21 oct.",
    time: "18h00",
    type: "free",
    attendees: 89,
    language: "fr",
    description:
      "La session parfaite pour démarrer : comprendre ce qu'est réellement l'IA générative, dissiper les idées reçues, et faire tes premiers pas avec confiance.",
    agenda: [
      "Comprendre ce qu'est l'IA générative",
      "Démystifier les idées reçues courantes",
      "Faire ses premiers prompts pas à pas",
      "Identifier les bons outils selon son besoin",
    ],
    requirements: [
      "Aucun prérequis",
      "Idéal pour les débutants complets",
      "Un smartphone ou ordinateur",
    ],
    hostId: "sidney",
    reviewIds: ["r2", "r1"],
  },
  {
    id: "12",
    title: "Data storytelling with AI tools",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=800&fit=crop&q=80",
    date: "28 oct.",
    time: "17h30",
    type: "paid",
    price: 20000,
    attendees: 27,
    language: "en",
    description:
      "Learn how to turn raw data into a clear, compelling narrative using AI tools — perfect for reports, pitches and internal presentations.",
    agenda: [
      "Structuring a data narrative",
      "Using AI to summarize key insights",
      "Building clear supporting visuals",
      "Presenting data with confidence",
    ],
    requirements: [
      "Basic spreadsheet experience",
      "A laptop",
      "A dataset to work with (optional)",
    ],
    hostId: "sidney",
    reviewIds: ["r6", "r2"],
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
}

export function getMasterclassById(id: string) {
  return masterclasses.find((mc) => mc.id === id);
}

export function getHostById(id: string) {
  return hosts.find((h) => h.id === id);
}

export function getReviewsByIds(ids: string[]) {
  return reviewPool.filter((r) => ids.includes(r.id));
}