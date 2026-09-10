import { requireAdmin } from "@/lib/admin";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireAdmin();

  return (
    <div className="d-flex" style={{ background: "#F5F1EB", minHeight: "100vh" }}>
      <AdminSidebar email={profile.email} />
      <div className="flex-grow-1 p-4 p-md-5" style={{ maxWidth: "calc(100vw - 240px)" }}>
        {children}
      </div>
    </div>
  );
}
