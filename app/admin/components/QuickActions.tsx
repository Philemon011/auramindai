import Link from "next/link";
import { Plus, Users, PlayCircle } from "lucide-react";

const actions = [
  { label: "Créer une masterclass", href: "/admin/masterclasses/nouvelle", icon: Plus, primary: true },
  { label: "Voir les utilisateurs", href: "/admin/utilisateurs", icon: Users, primary: false },
  { label: "Traiter les replays", href: "/admin/replays", icon: PlayCircle, primary: false },
];

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.href}
            href={action.href}
            className={`group flex items-center gap-2 rounded-button px-5 font-body text-[14px] font-medium transition-transform duration-200 hover:scale-[1.02] ${
              action.primary
                ? "bg-accent text-white"
                : "border border-border bg-surface text-foreground"
            }`}
            style={{ height: "44px" }}
          >
            <Icon className="h-4 w-4" strokeWidth={1.9} />
            {action.label}
          </Link>
        );
      })}
    </div>
  );
}