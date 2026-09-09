import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email: string };

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  return NextResponse.json({ ok: true });
}
