import { prisma } from "@/lib/prisma";

export default async function AdminAnalyticsPage() {
  const [bySection, byStatus, topProducts] = await Promise.all([
    prisma.product.groupBy({ by: ["section"], _count: { _all: true } }),
    prisma.order.groupBy({ by: ["status"], _count: { _all: true }, _sum: { total: true } }),
    prisma.orderItem.groupBy({
      by: ["name"],
      _sum: { qty: true },
      orderBy: { _sum: { qty: "desc" } },
      take: 5,
    }),
  ]);

  return (
    <div>
      <h2 className="fw-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Analytics
      </h2>
      <p className="text-secondary mb-4">A quick read on what&apos;s selling</p>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="bg-white rounded-4 p-4 h-100" style={{ border: "1px solid #eee" }}>
            <h6 className="fw-bold mb-3">Products by section</h6>
            {bySection.map((s) => (
              <div key={s.section} className="d-flex justify-content-between border-bottom py-2" style={{ fontSize: 13 }}>
                <span>{s.section}</span>
                <span className="fw-bold">{s._count._all}</span>
              </div>
            ))}
            {bySection.length === 0 && <p className="text-secondary small mb-0">No data yet.</p>}
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="bg-white rounded-4 p-4 h-100" style={{ border: "1px solid #eee" }}>
            <h6 className="fw-bold mb-3">Orders by status</h6>
            {byStatus.map((s) => (
              <div key={s.status} className="d-flex justify-content-between border-bottom py-2" style={{ fontSize: 13 }}>
                <span className="text-capitalize">{s.status}</span>
                <span className="fw-bold">
                  {s._count._all} · Shs {(s._sum.total ?? 0).toLocaleString()}
                </span>
              </div>
            ))}
            {byStatus.length === 0 && <p className="text-secondary small mb-0">No data yet.</p>}
          </div>
        </div>

        <div className="col-12">
          <div className="bg-white rounded-4 p-4" style={{ border: "1px solid #eee" }}>
            <h6 className="fw-bold mb-3">Top-selling products</h6>
            {topProducts.map((p, i) => (
              <div key={p.name} className="d-flex justify-content-between border-bottom py-2" style={{ fontSize: 13 }}>
                <span>
                  {i + 1}. {p.name}
                </span>
                <span className="fw-bold">{p._sum.qty ?? 0} sold</span>
              </div>
            ))}
            {topProducts.length === 0 && <p className="text-secondary small mb-0">No sales yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
