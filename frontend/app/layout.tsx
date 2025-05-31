import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Tooltip } from "@/components/ui/tooltip";
import "./globals.css";
import { AuthProvider } from "@/hooks/auth/useAuthContext";
import MetaDataLayout from "@/components/layout/MetaDataLayout";
import QueryClientProvider from "@/util/providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Tooltip />
      <Toaster richColors />
      <html lang="pt-BR">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased
         max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <QueryClientProvider>
            <MetaDataLayout>
              <AuthProvider>
                  <LayoutWrapper>
                    {children}
                  </LayoutWrapper> 
              </AuthProvider>
            </MetaDataLayout>
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
}
