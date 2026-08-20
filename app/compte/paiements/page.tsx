"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreditCard, Clock, Check, X, RotateCcw, AlertCircle } from "lucide-react";
import { AdminReveal, AdminRevealItem } from "../../admin/components/AdminReveal";
import { getPendingPayments, getPaymentHistory, PendingPayment, PaymentRecord } from "./actions";

function formatPrice(price: number | null) {
  if (!price) return "—";
  return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

const statusConfig = {
  succeeded: { label: "Payé", icon: Check, className: "bg-accent-soft text-accent" },
  pending: { label: "En attente", icon: Clock, className: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" },
  failed: { label: "Échoué", icon: X, className: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400" },
  refunded: { label: "Remboursé", icon: RotateCcw, className: "bg-border text-foreground-muted" },
} as const;

export default function PaymentsPage() {
  const [pending, setPending] = useState<PendingPayment[]>([]);
  const [history, setHistory] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPendingPayments(), getPaymentHistory()]).then(([p, h]) => {
      setPending(p);
      setHistory(h);
      setLoading(false);
    });
  }, []);

  return (
    <AdminReveal className="flex flex-col gap-8">
      <AdminRevealItem>
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
          Mon espace
        </span>
        <h1
          className="mt-2 font-heading font-semibold text-foreground"
          style={{ fontSize: "28px", lineHeight: "34px", letterSpacing: "-0.02em" }}
        >
          Paiements
        </h1>
      </AdminRevealItem>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-card-lg bg-surface" />
          ))}
        </div>
      ) : (
        <>
          {/* Paiements en attente */}
          {pending.length > 0 && (
            <AdminRevealItem>
              <h2 className="font-subheading text-[17px] font-semibold text-foreground">
                En attente de paiement
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                {pending.map((p) => (
                  <div
                    key={p.registrationId}
                    className="flex flex-col gap-3 rounded-card-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-body text-[14px] font-medium text-foreground">
                          {p.masterclass?.title}
                        </p>
                        <p className="font-body text-[13px] text-foreground-muted">
                          {formatPrice(p.masterclass?.price ?? null)}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/masterclasses/${p.masterclass?.id}`}
                      className="inline-flex shrink-0 items-center justify-center rounded-button bg-accent px-5 py-2.5 font-body text-[13px] font-medium text-white"
                    >
                      Voir les détails
                    </Link>
                  </div>
                ))}
              </div>
            </AdminRevealItem>
          )}

          {/* Historique */}
          <AdminRevealItem>
            <h2 className="font-subheading text-[17px] font-semibold text-foreground">Historique</h2>

            {history.length === 0 ? (
              <div className="mt-4 flex flex-col items-center rounded-card-lg border border-border bg-surface py-16 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
                  <CreditCard className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
                </span>
                <p className="mt-4 font-body text-[14px] text-foreground-muted">
                  Aucun paiement confirmé pour l&apos;instant.
                </p>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2">
                {history.map((payment) => {
                  const status = statusConfig[payment.status];
                  const StatusIcon = status.icon;
                  return (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between rounded-card border border-border bg-surface p-4"
                    >
                      <div>
                        <p className="font-body text-[14px] font-medium text-foreground">
                          {formatPrice(payment.amount)}
                        </p>
                        <p className="mt-0.5 font-body text-[12px] text-foreground-muted" suppressHydrationWarning>
                          {formatDate(payment.created_at)}
                          {payment.provider && ` · ${payment.provider}`}
                        </p>
                      </div>
                      <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[11px] font-semibold ${status.className}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </AdminRevealItem>
        </>
      )}
    </AdminReveal>
  );
}