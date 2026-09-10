import { requireAdmin } from "@/lib/admin";

export default async function AdminSettingsPage() {
  const profile = await requireAdmin();

  return (
    <div>
      <h2 className="fw-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Settings
      </h2>
      <p className="text-secondary mb-4">Your admin account</p>

      <div className="bg-white rounded-4 p-4" style={{ border: "1px solid #eee", maxWidth: 480 }}>
        <div className="mb-3">
          <small className="text-secondary d-block">Name</small>
          <span className="fw-bold">
            {[profile.firstName, profile.lastName].filter(Boolean).join(" ") || "—"}
          </span>
        </div>
        <div className="mb-3">
          <small className="text-secondary d-block">Email</small>
          <span className="fw-bold">{profile.email}</span>
        </div>
        <div>
          <small className="text-secondary d-block">Role</small>
          <span className="badge rounded-pill" style={{ background: "#FF6A00" }}>
            Admin
          </span>
        </div>
      </div>

      <p className="text-secondary small mt-4">
        Store-wide settings (branding, shipping rules, payment providers) aren&apos;t configurable
        here yet.
      </p>
    </div>
  );
}
