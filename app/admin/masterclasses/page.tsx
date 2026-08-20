import Link from "next/link";
import { Plus, Users, Globe2, Pencil, Radio } from "lucide-react";
import { AdminReveal, AdminRevealItem } from "../components/AdminReveal";
import { StatusBadge } from "./components/StatusBadge";
import { DeleteMasterclassButton } from "./components/DeleteMasterclassButton";
import { getAdminMasterclasses, getMasterclassRegistrationCounts } from "./actions";

function formatPrice(price: number | null) {
  if (!price) return "Gratuit";
  return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminMasterclassesPage() {
  const [masterclasses, counts] = await Promise.all([
    getAdminMasterclasses(),
    getMasterclassRegistrationCounts(),
  ]);

  return (
    <AdminReveal className="flex flex-col gap-8">
      {/* En-tête */}
      <AdminRevealItem className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
            Gestion
          </span>
          <h1
            className="mt-2 font-heading font-semibold text-foreground"
            style={{ fontSize: "28px", lineHeight: "34px", letterSpacing: "-0.02em" }}
          >
            Masterclasses
          </h1>
          <p className="mt-1.5 font-body text-[14px] text-foreground-muted">
            {masterclasses.length} masterclass{masterclasses.length > 1 ? "s" : ""} au total.
          </p>
        </div>

        <Link
          href="/admin/masterclasses/nouvelle"
          className="group inline-flex items-center gap-2 rounded-button bg-accent px-5 font-body text-[14px] font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
          style={{ height: "44px" }}
        >
          <Plus className="h-4 w-4" />
          Créer une masterclass
        </Link>
      </AdminRevealItem>

      {/* Liste */}
      {masterclasses.length === 0 ? (
        <AdminRevealItem className="flex flex-col items-center rounded-card-lg border border-border bg-surface py-20 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
            <Plus className="h-5 w-5 text-accent" />
          </span>
          <p className="mt-4 font-subheading text-lg font-semibold text-foreground">
            Aucune masterclass pour l&apos;instant
          </p>
          <p className="mt-1.5 max-w-xs font-body text-[14px] text-foreground-muted">
            Crée ta première masterclass pour la voir apparaître ici et sur le site.
          </p>
          <Link
            href="/admin/masterclasses/nouvelle"
            className="mt-6 inline-flex items-center gap-2 rounded-button bg-accent px-6 font-body text-[14px] font-medium text-white"
            style={{ height: "44px" }}
          >
            <Plus className="h-4 w-4" />
            Créer une masterclass
          </Link>
        </AdminRevealItem>
      ) : (
        <AdminRevealItem className="flex flex-col gap-3">
          {masterclasses.map((mc) => (
            <div
              key={mc.id}
              className="group flex flex-col gap-4 rounded-card-lg border border-border bg-surface p-4 transition-colors duration-200 hover:border-accent/25 sm:flex-row sm:items-center sm:p-4"
            >
              {/* Miniature */}
              <div className="h-16 w-full shrink-0 overflow-hidden rounded-[12px] bg-accent-soft sm:h-14 sm:w-24">
                {mc.image_url ? (
                  <img src={mc.image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-body text-[10px] text-accent">
                    Pas d&apos;image
                  </div>
                )}
              </div>

              {/* Infos principales */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-body text-[15px] font-semibold text-foreground">
                    {mc.title}
                  </p>
                  <StatusBadge status={mc.status} />
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-[13px] text-foreground-muted">
                  <span>{formatDate(mc.scheduled_at)}</span>
                  <span className="flex items-center gap-1">
                    <Globe2 className="h-3 w-3" />
                    {mc.language === "fr" ? "FR" : "EN"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {counts[mc.id] ?? 0} inscrits
                  </span>
                  <span className={mc.type === "free" ? "text-accent" : "text-foreground"}>
                    {formatPrice(mc.price)}
                  </span>
                </div>
              </div>

                            {/* Actions */}
              <div className="flex shrink-0 items-center gap-1 self-end sm:self-auto">
                {(mc.status === "scheduled" || mc.status === "live") && (
                  <Link
                    href={`/admin/masterclasses/${mc.id}/live`}
                    aria-label="Démarrer ou rejoindre le live"
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
                      mc.status === "live"
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "text-foreground-muted hover:bg-accent-soft hover:text-accent"
                    }`}
                  >
                    <Radio className="h-3.5 w-3.5" strokeWidth={1.9} />
                  </Link>
                )}
                <Link
                  href={`/admin/masterclasses/${mc.id}`}
                  aria-label="Modifier"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-foreground-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
                >
                  <Pencil className="h-3.5 w-3.5" strokeWidth={1.9} />
                </Link>
                <DeleteMasterclassButton id={mc.id} title={mc.title} />
              </div>
            </div>
          ))}
        </AdminRevealItem>
      )}
    </AdminReveal>
  );
}