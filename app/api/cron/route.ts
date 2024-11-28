export const dynamic = "force-dynamic"; // static by default, unless reading the request

import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data, error } = (await supabase.from("recipient").select()) as {
    data: any;
    error: any;
  };
  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json({ status: 200, message: "Cron Executed" });
}
