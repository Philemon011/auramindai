"use server";

import { createClient } from "@/lib/supabase/server";

export interface PendingPayment {
  registrationId: string;
  masterclass: {
    id: string;
    title: string;
    price: number | null;
  };
}

export interface PaymentRecord {
  id: string;
  amount: number;
  provider: string | null;
  status: "pending" | "succeeded" | "failed" | "refunded";
  created_at: string;
}

export async function getPendingPayments(): Promise<PendingPayment[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("registrations")
    .select("id, masterclass:masterclasses(id, title, price)")
    .eq("user_id", user.id)
    .eq("payment_status", "pending");

  return (data ?? []).map((r: any) => ({
    registrationId: r.id,
    masterclass: Array.isArray(r.masterclass) ? r.masterclass[0] : r.masterclass,
  }));
}

export async function getPaymentHistory(): Promise<PaymentRecord[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("payments")
    .select("id, amount, provider, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data ?? [];
}