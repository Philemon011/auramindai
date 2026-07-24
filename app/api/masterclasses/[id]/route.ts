import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: masterclass } = await supabase
    .from("masterclasses")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!masterclass) {
    return NextResponse.json({ masterclass: null, related: [] }, { status: 404 });
  }

  const { data: related } = await supabase
    .from("masterclasses")
    .select("*")
    .neq("id", id)
    .neq("status", "archived")
    .limit(3);

  return NextResponse.json({ masterclass, related: related ?? [] });
}