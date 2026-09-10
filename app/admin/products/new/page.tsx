import Link from "next/link";
import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <Link href="/admin/products" className="text-secondary small text-decoration-none">
        <i className="bi bi-arrow-left me-1" />
        Back to products
      </Link>
      <h2 className="fw-bold mt-2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        New product
      </h2>
      <ProductForm />
    </div>
  );
}
