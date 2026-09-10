import Link from "next/link";
import { prisma } from "@/lib/prisma";

const ALL_SIZES = ["M", "L", "XL", "2XL", "3XL", "4XL"];

export default async function AdminInventoryPage() {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h2 className="fw-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Inventory
      </h2>
      <p className="text-secondary mb-4">Size availability across all products</p>

      <div className="bg-white rounded-4 overflow-hidden" style={{ border: "1px solid #eee" }}>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr className="text-secondary" style={{ fontSize: 12 }}>
              <th className="ps-4">Product</th>
              {ALL_SIZES.map((s) => (
                <th key={s} className="text-center">
                  {s}
                </th>
              ))}
              <th className="pe-4 text-end">Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="ps-4 fw-bold" style={{ fontSize: 13 }}>
                  {p.name}
                </td>
                {ALL_SIZES.map((s) => {
                  const inStock = p.sizes.includes(s);
                  return (
                    <td key={s} className="text-center">
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: inStock ? "2px solid #43A047" : "1px solid #ccc",
                          color: inStock ? "#43A047" : "#ccc",
                          fontSize: 12,
                        }}
                      >
                        <i className={`bi ${inStock ? "bi-check" : "bi-x"}`} />
                      </span>
                    </td>
                  );
                })}
                <td className="pe-4 text-end">
                  <Link href={`/admin/products/${p.id}/edit`} className="btn btn-sm btn-outline-dark">
                    <i className="bi bi-pencil" />
                  </Link>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={ALL_SIZES.length + 2} className="text-center text-secondary py-5">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
