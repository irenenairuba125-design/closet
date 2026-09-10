import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// Handles the redirect back from Supabase after Google OAuth / email link
// clicks, exchanging the auth code for a session cookie.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const admin = data.user ? await prisma.admin.findUnique({ where: { id: data.user.id } }) : null;
      return NextResponse.redirect(`${origin}${admin ? "/admin" : next}`);
    }
  }

  return NextResponse.redirect(`${origin}/?auth_error=1`);
}
