import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AddressBookProvider } from "@/contexts/AddressBookContext";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agenda de Endereços",
  description: "Teste técnico para vaga de Frontend Dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans bg-primary text-primary-foreground`}>
        <AddressBookProvider>
          {children}
          <Toaster />
        </AddressBookProvider>
      </body>
    </html>
  );
}
