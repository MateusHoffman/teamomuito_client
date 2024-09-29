import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Te Amo Muito",
};

// Definindo a interface com a propriedade 'types' como obrigatória
interface RootLayoutProps {
  children: React.ReactNode;
  types: string; // Propriedade obrigatória
}

export default function RootLayout({
  children,
  types, // Agora esta propriedade é obrigatória
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
