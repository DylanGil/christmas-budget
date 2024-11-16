import { Header } from "@/components/layout/header";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Décompte de Noël",
  description: "Décompte de Noël et budgétisez vos achats de vacances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="flex h-screen flex-col">
            <div className="grow">{children}</div>
          </div>
          <TailwindIndicator />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
