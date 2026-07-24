"use client";

import { Plus, X } from "lucide-react";

export function ListField({
  label,
  placeholder,
  items,
  onChange,
}: {
  label: string;
  placeholder: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  function updateItem(index: number, value: string) {
    const next = [...items];
    next[index] = value;
    onChange(next);
  }

  function addItem() {
    onChange([...items, ""]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="font-body text-[13px] font-medium text-foreground">{label}</label>
      <div className="mt-2 flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder={placeholder}
              className="h-11 w-full rounded-[12px] border border-border bg-surface px-3.5 font-body text-[14px] text-foreground outline-none transition-all duration-200 placeholder:text-foreground-muted/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
            />
            <button
              type="button"
              onClick={() => removeItem(i)}
              aria-label="Retirer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-border text-foreground-muted transition-colors duration-200 hover:border-red-200 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-2 flex items-center gap-1.5 font-body text-[13px] font-medium text-accent"
      >
        <Plus className="h-3.5 w-3.5" />
        Ajouter une ligne
      </button>
    </div>
  );
}