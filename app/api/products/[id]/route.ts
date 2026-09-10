import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminProfile } from "@/lib/admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminProfile();
  if (!admin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const { name, description, price, image, section, sizes, colors } = body as {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    section?: string;
    sizes?: string[];
    colors?: string[];
  };

  const product = await prisma.product.update({
    where: { id },
    data: { name, description, price, image, section, sizes, colors },
  });

  return NextResponse.json(product);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminProfile();
  if (!admin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { id } = await params;
  await prisma.product.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
