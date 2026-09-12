import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Resend's shared sandbox domain works without verifying your own domain,
// but can only send to the email the Resend account was signed up with.
// Swap this for an address on your own verified domain to email real customers.
const FROM = process.env.RESEND_FROM_EMAIL ?? "Irene's Closet <onboarding@resend.dev>";

export async function sendOrderReceipt(order: {
  id: string;
  total: number;
  createdAt: Date;
  items: { name: string; price: number; size: string; qty: number }[];
}, to: string) {
  const rows = order.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0">${i.name} (${i.size}) x${i.qty}</td><td style="padding:6px 0;text-align:right">Shs ${(i.price * i.qty).toLocaleString()}</td></tr>`
    )
    .join("");

  await resend.emails.send({
    from: FROM,
    to,
    subject: `Receipt for order #${order.id.slice(-8).toUpperCase()}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h2>Thanks for your order!</h2>
        <p>Order #${order.id.slice(-8).toUpperCase()} &middot; ${order.createdAt.toLocaleDateString()}</p>
        <table style="width:100%;border-collapse:collapse">${rows}</table>
        <hr />
        <p style="text-align:right;font-weight:bold">Total: Shs ${order.total.toLocaleString()}</p>
        <p style="color:#666;font-size:12px">Irene's Closet &mdash; Wear Your Confidence.</p>
      </div>
    `,
  });
}
