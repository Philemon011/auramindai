const config = {
  scheduled: { label: "Programmée", className: "bg-accent-soft text-accent" },
  live: { label: "En direct", className: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400" },
  ended: { label: "Terminée", className: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" },
  archived: { label: "Archivée", className: "bg-border text-foreground-muted" },
} as const;

export function StatusBadge({ status }: { status: keyof typeof config }) {
  const { label, className } = config[status];
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 font-body text-[11px] font-semibold ${className}`}>
      {label}
    </span>
  );
}