import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "@/components/wrapper/QueryProvider";
import GridLayout from "@/components/layout/GridLayout";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Presensi Guru",
  description: "Website Presensi Guru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors={true} position="top-center" />
        <QueryProvider>
          <GridLayout>{children}</GridLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
