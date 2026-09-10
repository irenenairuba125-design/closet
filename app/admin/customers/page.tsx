import { prisma } from "@/lib/prisma";

export default async function AdminCustomersPage() {
  const customers = await prisma.profile.findMany({
    include: { _count: { select: { orders: true } }, admin: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="fw-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Customers
      </h2>
      <p className="text-secondary mb-4">{customers.length} customer{customers.length === 1 ? "" : "s"} total</p>

      <div className="bg-white rounded-4 overflow-hidden" style={{ border: "1px solid #eee" }}>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr className="text-secondary" style={{ fontSize: 12 }}>
              <th className="ps-4">Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Role</th>
              <th className="pe-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td className="ps-4 fw-bold" style={{ fontSize: 13 }}>
                  {[c.firstName, c.lastName].filter(Boolean).join(" ") || "—"}
                </td>
                <td style={{ fontSize: 13 }}>{c.email}</td>
                <td style={{ fontSize: 13 }}>{c._count.orders}</td>
                <td>
                  {c.admin && (
                    <span className="badge rounded-pill" style={{ background: "#FF6A00", fontSize: 11 }}>
                      Admin
                    </span>
                  )}
                </td>
                <td className="pe-4 text-secondary" style={{ fontSize: 12 }}>
                  {c.createdAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-secondary py-5">
                  No customers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
