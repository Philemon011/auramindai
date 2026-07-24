import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminReveal, AdminRevealItem } from "../../components/AdminReveal";
import { MasterclassForm } from "../components/MasterclassForm";
import { getAdminMasterclassById } from "../actions";

export default async function EditMasterclassPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const masterclass = await getAdminMasterclassById(id);

  if (!masterclass) {
    notFound();
  }

  // Le <input type="datetime-local"> attend le format "YYYY-MM-DDTHH:mm",
  // sans le fuseau/secondes que Postgres renvoie par défaut.
  const scheduledAtLocal = new Date(masterclass.scheduled_at).toISOString().slice(0, 16);

  return (
    <AdminReveal className="flex flex-col gap-8">
      <AdminRevealItem>
        <Link
          href="/admin/masterclasses"
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-foreground-muted transition-colors duration-200 hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux masterclasses
        </Link>
        <h1
          className="mt-4 font-heading font-semibold text-foreground"
          style={{ fontSize: "28px", lineHeight: "34px", letterSpacing: "-0.02em" }}
        >
          Modifier la masterclass
        </h1>
      </AdminRevealItem>

      <AdminRevealItem className="max-w-2xl rounded-card-lg border border-border bg-surface p-7 sm:p-9">
        <MasterclassForm
          mode="edit"
          masterclassId={masterclass.id}
          initialData={{
            title: masterclass.title,
            description: masterclass.description,
            agenda: masterclass.agenda.length > 0 ? masterclass.agenda : [""],
            requirements: masterclass.requirements.length > 0 ? masterclass.requirements : [""],
            image_url: masterclass.image_url,
            scheduled_at: scheduledAtLocal,
            type: masterclass.type,
            price: masterclass.price,
            language: masterclass.language,
            host_name: masterclass.host_name,
          }}
        />
      </AdminRevealItem>
    </AdminReveal>
  );
}