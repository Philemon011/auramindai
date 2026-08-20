import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

  const { error } = await supabase
    .from("masterclasses")
    .update({ status: "ended" })
    .eq("id", masterclassId);

  if (error) {
    return NextResponse.json({ error: "Impossible de terminer le live." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}