"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, ShieldOff, AlertTriangle } from "lucide-react";
import { toggleUserRole } from "../actions";

export function RoleToggle({
  userId,
  role,
  isSelf,
}: {
  userId: string;
  role: "user" | "admin";
  isSelf: boolean;
}) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await toggleUserRole(userId, role === "admin" ? "user" : "admin");
      setConfirming(false);
    });
  }

  if (isSelf) {
    return (
      <span className="rounded-full bg-accent-soft px-3 py-1.5 font-body text-[12px] font-semibold text-accent">
        Vous
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setConfirming(true)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-[12px] font-medium transition-colors duration-200 ${
          role === "admin"
            ? "bg-accent-soft text-accent hover:bg-accent/15"
            : "border border-border text-foreground-muted hover:border-accent/30 hover:text-accent"
        }`}
      >
        {role === "admin" ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldOff className="h-3.5 w-3.5" />}
        {role === "admin" ? "Admin" : "Rendre admin"}
      </button>

      <AnimatePresence>
        {confirming && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirming(false)}
              className="fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-1/2 z-[80] w-[92%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-card-lg border border-border bg-surface p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/30">
                <AlertTriangle className="h-5 w-5 text-amber-500" strokeWidth={1.9} />
              </span>
              <h3 className="mt-4 font-subheading text-[17px] font-semibold text-foreground">
                {role === "admin" ? "Retirer les droits admin ?" : "Rendre cet utilisateur admin ?"}
              </h3>
              <p className="mt-1.5 font-body text-[14px] leading-relaxed text-foreground-muted">
                {role === "admin"
                  ? "Il perdra immédiatement l'accès au dashboard admin."
                  : "Il aura un accès complet au dashboard admin, y compris la gestion des masterclasses et des utilisateurs."}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex h-11 flex-1 items-center justify-center rounded-button border border-border font-body text-[14px] font-medium text-foreground"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isPending}
                  className="flex h-11 flex-1 items-center justify-center rounded-button bg-accent font-body text-[14px] font-medium text-white disabled:opacity-60"
                >
                  {isPending ? "..." : "Confirmer"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}