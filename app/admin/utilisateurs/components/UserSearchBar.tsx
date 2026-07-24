"use client";

import { Search } from "lucide-react";

export function UserSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative max-w-sm">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un utilisateur..."
        className="h-11 w-full rounded-full border border-border bg-surface py-2.5 pl-11 pr-4 font-body text-[14px] text-foreground outline-none transition-colors duration-200 placeholder:text-foreground-muted/60 focus:border-accent"
      />
    </div>
  );
}