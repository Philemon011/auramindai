"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteMasterclass } from "../actions";

export function DeleteMasterclassButton({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteMasterclass(id);
      setConfirming(false);
    });
  }

  return (
    <>
      <button
        onClick={() => setConfirming(true)}
        aria-label="Supprimer"
        className="flex h-8 w-8 items-center justify-center rounded-full text-foreground-muted transition-colors duration-200 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
      >
        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.9} />
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
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
                <AlertTriangle className="h-5 w-5 text-red-500" strokeWidth={1.9} />
              </span>
              <h3 className="mt-4 font-subheading text-[17px] font-semibold text-foreground">
                Supprimer cette masterclass ?
              </h3>
              <p className="mt-1.5 font-body text-[14px] leading-relaxed text-foreground-muted">
                &laquo;&nbsp;{title}&nbsp;&raquo; sera définitivement supprimée, ainsi que toutes les
                inscriptions associées. Cette action est irréversible.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex h-11 flex-1 items-center justify-center rounded-button border border-border font-body text-[14px] font-medium text-foreground"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="flex h-11 flex-1 items-center justify-center rounded-button bg-red-500 font-body text-[14px] font-medium text-white disabled:opacity-60"
                >
                  {isPending ? "Suppression..." : "Supprimer"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}