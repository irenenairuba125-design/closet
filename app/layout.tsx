import type { Metadata } from "next";
export const metadata: Metadata = { title: "Irene's Closet" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" /></head><body>{children}</body></html>);
}
