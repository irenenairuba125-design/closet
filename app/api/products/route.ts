import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminProfile } from "@/lib/admin";

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section");

  const products = await prisma.product.findMany({
    where: section && section !== "All" ? { section } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const admin = await getAdminProfile();
  if (!admin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

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

  if (!name || !description || !price || !image || !section) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
      section,
      sizes: sizes?.length ? sizes : undefined,
      colors: colors ?? [],
    },
  });

  return NextResponse.json(product, { status: 201 });
}
