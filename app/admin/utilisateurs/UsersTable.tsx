"use client";

import { useState } from "react";
import { RoleToggle } from "./components/RoleToggle";
import { UserSearchBar } from "./components/UserSearchBar";
import { AdminUser } from "./actions";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export function UsersTable({ users, currentUserId }: { users: AdminUser[]; currentUserId: string }) {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <UserSearchBar value={search} onChange={setSearch} />

      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="py-10 text-center font-body text-[14px] text-foreground-muted">
            Aucun utilisateur ne correspond à ta recherche.
          </p>
        ) : (
          filtered.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-4 rounded-card-lg border border-border bg-surface p-4 transition-colors duration-200 hover:border-accent/25"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-body text-[13px] font-semibold text-accent">
                {u.fullName.slice(0, 2).toUpperCase()}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate font-body text-[14px] font-medium text-foreground">{u.fullName}</p>
                <p className="truncate font-body text-[13px] text-foreground-muted">{u.email}</p>
              </div>

              <div className="hidden shrink-0 flex-col items-end sm:flex">
                <p className="font-body text-[13px] font-medium text-foreground">
                  {u.registrationsCount} inscription{u.registrationsCount !== 1 ? "s" : ""}
                </p>
                <p className="font-body text-[12px] text-foreground-muted">
                  Depuis le {formatDate(u.createdAt)}
                </p>
              </div>

              <RoleToggle userId={u.id} role={u.role} isSelf={u.id === currentUserId} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}