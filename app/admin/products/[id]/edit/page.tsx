import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "../../ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/products" className="text-secondary small text-decoration-none">
        <i className="bi bi-arrow-left me-1" />
        Back to products
      </Link>
      <h2 className="fw-bold mt-2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        Edit product
      </h2>
      <ProductForm product={product} />
    </div>
  );
}
