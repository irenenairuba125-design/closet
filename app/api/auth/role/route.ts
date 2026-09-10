import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// Called right after a successful sign-in so the frontend knows whether to
// route the user into /admin or the regular storefront.
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ isAdmin: false });
  }

  const admin = await prisma.admin.findUnique({ where: { id: user.id } });

  return NextResponse.json({ isAdmin: !!admin });
}
