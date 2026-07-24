import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminReveal, AdminRevealItem } from "../../components/AdminReveal";
import { MasterclassForm } from "../components/MasterclassForm";

export default function NewMasterclassPage() {
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
          Créer une masterclass
        </h1>
      </AdminRevealItem>

      <AdminRevealItem className="max-w-2xl rounded-card-lg border border-border bg-surface p-7 sm:p-9">
        <MasterclassForm mode="create" />
      </AdminRevealItem>
    </AdminReveal>
  );
}