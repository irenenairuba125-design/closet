import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// Returns the caller's Profile only if they are a signed-in admin, else null.
// Use in API routes, where a redirect() isn't appropriate — return 403 instead.
export async function getAdminProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const admin = await prisma.admin.findUnique({ where: { id: user.id }, include: { profile: true } });

  return admin?.profile ?? null;
}

// Use in admin page/layout server components — redirects non-admins home.
export async function requireAdmin() {
  const profile = await getAdminProfile();

  if (!profile) redirect("/");

  return profile;
}
