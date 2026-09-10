import { prisma } from "@/lib/prisma";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="fw-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Newsletter
      </h2>
      <p className="text-secondary mb-4">
        {subscribers.length} subscriber{subscribers.length === 1 ? "" : "s"}
      </p>

      <div className="bg-white rounded-4 overflow-hidden" style={{ border: "1px solid #eee" }}>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr className="text-secondary" style={{ fontSize: 12 }}>
              <th className="ps-4">Email</th>
              <th className="pe-4">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id}>
                <td className="ps-4" style={{ fontSize: 13 }}>
                  {s.email}
                </td>
                <td className="pe-4 text-secondary" style={{ fontSize: 12 }}>
                  {s.createdAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center text-secondary py-5">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
