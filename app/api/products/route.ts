import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section");

  const products = await prisma.product.findMany({
    where: section && section !== "All" ? { section } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
