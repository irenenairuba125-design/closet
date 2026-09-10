"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Overview", icon: "bi-grid" },
  { href: "/admin/products", label: "Products", icon: "bi-bag" },
  { href: "/admin/orders", label: "Orders", icon: "bi-receipt" },
  { href: "/admin/customers", label: "Customers", icon: "bi-people" },
  { href: "/admin/inventory", label: "Inventory", icon: "bi-box-seam" },
  { href: "/admin/analytics", label: "Analytics", icon: "bi-bar-chart" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "bi-envelope" },
  { href: "/admin/settings", label: "Settings", icon: "bi-gear" },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <div
      className="d-flex flex-column flex-shrink-0 text-white p-3"
      style={{ width: 240, minHeight: "100vh", background: "#0B0B0B" }}
    >
      <Link href="/admin" className="d-flex align-items-center gap-2 mb-4 text-decoration-none">
        <div
          className="bg-white text-black d-flex justify-content-center align-items-center fw-bold"
          style={{ width: 32, height: 32, borderRadius: 8, fontFamily: "'Playfair Display', serif", fontSize: 13 }}
        >
          IC
        </div>
        <span className="fw-bold text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: 15 }}>
          ADMIN
        </span>
      </Link>

      <nav className="flex-grow-1">
        <ul className="nav nav-pills flex-column gap-1">
          {NAV.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="nav-item">
                <Link
                  href={item.href}
                  className="nav-link d-flex align-items-center gap-2 text-white-50"
                  style={
                    active
                      ? { background: "#FF6A00", color: "#fff", fontWeight: 600 }
                      : { fontWeight: 500 }
                  }
                >
                  <i className={`bi ${item.icon}`} style={{ fontSize: 15 }} />
                  <span style={{ fontSize: 14 }}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-top border-secondary pt-3 mt-3">
        <small className="text-secondary d-block" style={{ fontSize: 11 }}>
          Signed in as
        </small>
        <small className="text-white text-truncate d-block" style={{ fontSize: 13 }}>
          {email}
        </small>
        <Link href="/" className="d-block mt-2 text-secondary" style={{ fontSize: 12 }}>
          <i className="bi bi-box-arrow-left me-1" />
          Back to store
        </Link>
      </div>
    </div>
  );
}
