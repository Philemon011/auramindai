"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Bell, CreditCard, PlayCircle, Info } from "lucide-react";
import { MyNotification, markNotificationRead } from "./actions";

const typeConfig = {
  info: { icon: Info, className: "bg-accent-soft text-accent" },
  reminder: { icon: Bell, className: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" },
  payment: { icon: CreditCard, className: "bg-accent-soft text-accent" },
  replay: { icon: PlayCircle, className: "bg-accent-soft text-accent" },
} as const;

function timeAgo(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Il y a ${days} j`;
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export function NotificationItem({ notification }: { notification: MyNotification }) {
  const [isPending, startTransition] = useTransition();
  const { icon: Icon, className } = typeConfig[notification.type];

  function handleClick() {
    if (notification.read) return;
    startTransition(async () => {
      await markNotificationRead(notification.id);
    });
  }

  const content = (
    <>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${className}`}>
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="font-body text-[14px] font-semibold text-foreground">{notification.title}</p>
          {!notification.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />}
        </div>
        <p className="mt-1 font-body text-[13px] leading-relaxed text-foreground-muted">
          {notification.message}
        </p>
        <p className="mt-2 font-body text-[12px] text-foreground-muted/70" suppressHydrationWarning>
          {timeAgo(notification.created_at)}
        </p>
      </div>
    </>
  );

  const className_ = `flex w-full items-start gap-3.5 rounded-card-lg border p-4 text-left transition-colors duration-200 ${
    notification.read
      ? "border-border bg-surface"
      : "border-accent/20 bg-accent-soft/40 hover:border-accent/30"
  }`;

  if (notification.link) {
    return (
      <Link href={notification.link} onClick={handleClick} className={className_}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={className_}>
      {content}
    </button>
  );
}