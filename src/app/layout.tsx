import type { Metadata } from "next";
import "./globals.css";
import { FormProvider } from "../app/context/FormContext";
import { Great_Vibes } from "next/font/google";

export const metadata: Metadata = {
  title: "Te Amo Muito",
};

const greatVibes = Great_Vibes({
  weight: ["400"], // Defina o peso que deseja usar (400 é normal)
  subsets: ["latin"], // Inclua o subset da fonte que vai utilizar
  display: "swap", // O padrão 'swap' melhora a performance
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}
