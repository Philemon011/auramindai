import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateHostToken, generateChannelName } from "@/lib/agora/tokens";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const { masterclassId } = await request.json();

  const { data: mc } = await supabase
    .from("masterclasses")
    .select("id, agora_channel_name, status")
    .eq("id", masterclassId)
    .single();

  if (!mc) {
    return NextResponse.json({ error: "Masterclass introuvable." }, { status: 404 });
  }

  // Le channel n'est généré qu'une seule fois, à la première prise de live,
  // puis réutilisé — évite de dupliquer des channels pour la même session.
  const channelName = mc.agora_channel_name ?? generateChannelName(mc.id);

  const { error: updateError } = await supabase
    .from("masterclasses")
    .update({ agora_channel_name: channelName, status: "live" })
    .eq("id", mc.id);

  if (updateError) {
    return NextResponse.json({ error: "Impossible de démarrer le live." }, { status: 500 });
  }

  const token = generateHostToken(channelName);

  return NextResponse.json({
    token,
    channelName,
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID,
  });
}