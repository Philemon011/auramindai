export interface PublicMasterclass {
  id: string;
  title: string;
  description: string;
  agenda: string[];
  requirements: string[];
  image_url: string | null;
  scheduled_at: string;
  type: "free" | "paid";
  price: number | null;
  language: "fr" | "en";
  status: "scheduled" | "live" | "ended" | "archived";
  host_name: string;
  replay_url: string | null;
}

export function formatPrice(price: number | null) {
  if (!price) return "Gratuit";
  return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
}