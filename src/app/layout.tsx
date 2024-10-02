import type { Metadata } from "next";
import "./globals.css";
import { FormProvider } from "../app/context/FormContext";

export const metadata: Metadata = {
  title: "Te Amo Muito",
};

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
