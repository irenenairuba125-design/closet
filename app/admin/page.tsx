import { prisma } from "@/lib/prisma";

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="bg-white rounded-4 p-4 h-100" style={{ border: "1px solid #eee" }}>
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
          style={{ width: 40, height: 40, background: "#FFF1E6" }}
        >
          <i className={`bi ${icon}`} style={{ color: "#FF6A00", fontSize: 18 }} />
        </div>
        <div className="fw-bold" style={{ fontSize: 28, fontFamily: "'Playfair Display', serif" }}>
          {value}
        </div>
        <small className="text-secondary">{label}</small>
      </div>
    </div>
  );
}

export default async function AdminOverview() {
  const [productCount, orderCount, customerCount, subscriberCount, revenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.profile.count(),
    prisma.newsletterSubscriber.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "cancelled" } } }),
  ]);

  return (
    <div>
      <h2 className="fw-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Overview
      </h2>
      <p className="text-secondary mb-4">Welcome back — here&apos;s how Irene&apos;s Closet is doing.</p>

      <div className="row g-3">
        <StatCard label="Total Revenue" value={`Shs ${(revenue._sum.total ?? 0).toLocaleString()}`} icon="bi-cash-stack" />
        <StatCard label="Orders" value={orderCount} icon="bi-receipt" />
        <StatCard label="Products" value={productCount} icon="bi-bag" />
        <StatCard label="Customers" value={customerCount} icon="bi-people" />
      </div>

      <div className="row g-3 mt-1">
        <StatCard label="Newsletter Subscribers" value={subscriberCount} icon="bi-envelope" />
      </div>
    </div>
  );
}
