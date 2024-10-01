import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Te Amo Muito",
};

interface RootLayoutProps {
  children: React.ReactNode;
  types: string;
}

export default function RootLayout({ children, types }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
