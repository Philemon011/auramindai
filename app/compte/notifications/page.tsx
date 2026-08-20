"use client";

import { useEffect, useState, useTransition } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { AdminReveal, AdminRevealItem } from "../../admin/components/AdminReveal";
import { NotificationItem } from "./NotificationItem";
import { getMyNotifications, markAllNotificationsRead, MyNotification } from "./actions";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<MyNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getMyNotifications().then((data) => {
      setNotifications(data);
      setLoading(false);
    });
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function handleMarkAllRead() {
    startTransition(async () => {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    });
  }

  return (
    <AdminReveal className="flex flex-col gap-8">
      <AdminRevealItem className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
            Mon espace
          </span>
          <h1
            className="mt-2 font-heading font-semibold text-foreground"
            style={{ fontSize: "28px", lineHeight: "34px", letterSpacing: "-0.02em" }}
          >
            Notifications
          </h1>
          <p className="mt-1.5 font-body text-[14px] text-foreground-muted">
            {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? "s" : ""}.` : "Tout est à jour."}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-button border border-border bg-surface px-5 font-body text-[14px] font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent disabled:opacity-60"
            style={{ height: "44px" }}
          >
            <CheckCheck className="h-4 w-4" />
            Tout marquer comme lu
          </button>
        )}
      </AdminRevealItem>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-card-lg bg-surface" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <AdminRevealItem className="flex flex-col items-center rounded-card-lg border border-border bg-surface py-20 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
            <Bell className="h-5 w-5 text-accent" strokeWidth={1.75} />
          </span>
          <p className="mt-4 font-subheading text-lg font-semibold text-foreground">
            Aucune notification
          </p>
          <p className="mt-1.5 max-w-xs font-body text-[14px] text-foreground-muted">
            Tu seras notifié ici pour les rappels de session, paiements et replays disponibles.
          </p>
        </AdminRevealItem>
      ) : (
        <AdminRevealItem className="flex flex-col gap-2.5">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </AdminRevealItem>
      )}
    </AdminReveal>
  );
}