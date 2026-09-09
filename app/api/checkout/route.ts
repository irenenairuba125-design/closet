import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const { items } = (await request.json()) as {
    items: { productId: string; size: string; qty: number }[];
  };

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });
  const productById = new Map(products.map((p) => [p.id, p]));

  let total = 0;
  const orderItemsData = items.map((item) => {
    const product = productById.get(item.productId);
    if (!product) throw new Error(`Unknown product ${item.productId}`);
    total += product.price * item.qty;
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      size: item.size,
      qty: item.qty,
    };
  });

  // Ensure a Profile row exists even if the auth.users trigger hasn't
  // run yet (e.g. project just created, trigger not installed).
  await prisma.profile.upsert({
    where: { id: user.id },
    update: {},
    create: { id: user.id, email: user.email! },
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      items: { create: orderItemsData },
    },
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}
