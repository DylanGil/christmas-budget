import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
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
        className={`${pacifico.className} flex min-h-dvh flex-col antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex grow flex-col">{children}</main>
          <TailwindIndicator />
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
