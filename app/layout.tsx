import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Irene's Closet",
  description: "Online clothing store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
