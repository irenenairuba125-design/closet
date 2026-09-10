import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PRODUCT_COLORS } from "@/lib/colors";
import DeleteProductButton from "./DeleteProductButton";

const HEX_BY_NAME = Object.fromEntries(PRODUCT_COLORS.map((c) => [c.name, c.hex]));

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Products
          </h2>
          <p className="text-secondary mb-0">{products.length} product{products.length === 1 ? "" : "s"} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn btn-dark fw-bold px-4"
          style={{ borderRadius: 50 }}
        >
          <i className="bi bi-plus-lg me-1" />
          New product
        </Link>
      </div>

      <div className="bg-white rounded-4 overflow-hidden" style={{ border: "1px solid #eee" }}>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr className="text-secondary" style={{ fontSize: 12 }}>
              <th className="ps-4">Product</th>
              <th>Section</th>
              <th>Price</th>
              <th>Sizes</th>
              <th>Colors</th>
              <th className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="ps-4">
                  <div className="d-flex align-items-center gap-2">
                    <img src={p.image} alt="" style={{ width: 40, height: 48, objectFit: "cover", borderRadius: 6 }} />
                    <span className="fw-bold" style={{ fontSize: 13 }}>
                      {p.name}
                    </span>
                  </div>
                </td>
                <td style={{ fontSize: 13 }}>{p.section}</td>
                <td style={{ fontSize: 13 }}>Shs {p.price.toLocaleString()}</td>
                <td style={{ fontSize: 12 }} className="text-secondary">
                  {p.sizes.join(", ")}
                </td>
                <td>
                  <div className="d-flex gap-1">
                    {p.colors.map((c) => (
                      <span
                        key={c}
                        title={c}
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: HEX_BY_NAME[c] ?? "#ccc",
                          border: "1px solid rgba(0,0,0,.15)",
                        }}
                      />
                    ))}
                  </div>
                </td>
                <td className="text-end pe-4">
                  <div className="d-flex gap-2 justify-content-end">
                    <Link href={`/admin/products/${p.id}/edit`} className="btn btn-sm btn-outline-dark">
                      <i className="bi bi-pencil" />
                    </Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-secondary py-5">
                  No products yet.{" "}
                  <Link href="/admin/products/new">Create your first one</Link>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
