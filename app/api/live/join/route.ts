import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateAudienceToken } from "@/lib/agora/tokens";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Connecte-toi pour rejoindre le live." }, { status: 401 });
  }

  const { masterclassId } = await request.json();

  const { data: mc } = await supabase
    .from("masterclasses")
    .select("id, status, agora_channel_name, type")
    .eq("id", masterclassId)
    .single();

  if (!mc) {
    return NextResponse.json({ error: "Masterclass introuvable." }, { status: 404 });
  }

  if (mc.status !== "live" || !mc.agora_channel_name) {
    return NextResponse.json({ error: "Ce live n'est pas actif pour le moment." }, { status: 409 });
  }

  // Gratuit → accès direct si connecté. Payant → il faut une inscription
  // dont le paiement est confirmé (pas "pending" ni "failed").
  if (mc.type === "paid") {
    const { data: registration } = await supabase
      .from("registrations")
      .select("payment_status")
      .eq("user_id", user.id)
      .eq("masterclass_id", masterclassId)
      .maybeSingle();

    if (!registration || registration.payment_status === "pending" || registration.payment_status === "failed") {
      return NextResponse.json(
        { error: "Ton paiement doit être confirmé pour accéder à ce live." },
        { status: 403 }
      );
    }
  }

  const token = generateAudienceToken(mc.agora_channel_name);

  return NextResponse.json({
    token,
    channelName: mc.agora_channel_name,
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID,
  });
}