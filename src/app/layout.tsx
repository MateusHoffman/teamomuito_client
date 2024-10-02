import type { Metadata } from "next";
import "./globals.css";
import { FormProvider } from "../app/context/FormContext";

export const metadata: Metadata = {
  title: "Te Amo Muito",
};

interface RootLayoutProps {
  children: React.ReactNode;
  types?: string;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <FormProvider>
          {children}
        </FormProvider>
      </body>
    </html>
  );
}
