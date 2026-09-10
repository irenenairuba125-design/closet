import { prisma } from "@/lib/prisma";

const STATUS_COLORS: Record<string, string> = {
  pending: "#FDD835",
  paid: "#43A047",
  shipped: "#1E88E5",
  cancelled: "#E53935",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="fw-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Orders
      </h2>
      <p className="text-secondary mb-4">{orders.length} order{orders.length === 1 ? "" : "s"} total</p>

      <div className="bg-white rounded-4 overflow-hidden" style={{ border: "1px solid #eee" }}>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr className="text-secondary" style={{ fontSize: 12 }}>
              <th className="ps-4">Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th className="pe-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="ps-4" style={{ fontSize: 12 }}>
                  #{o.id.slice(-8)}
                </td>
                <td style={{ fontSize: 13 }}>{o.user.email}</td>
                <td style={{ fontSize: 13 }}>{o.items.length}</td>
                <td style={{ fontSize: 13 }}>Shs {o.total.toLocaleString()}</td>
                <td>
                  <span
                    className="badge rounded-pill"
                    style={{ background: STATUS_COLORS[o.status] ?? "#999", fontSize: 11 }}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="pe-4 text-secondary" style={{ fontSize: 12 }}>
                  {o.createdAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-secondary py-5">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
