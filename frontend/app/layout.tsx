import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/system";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | David Benjamin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <HeroUIProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </HeroUIProvider>
      </body>
    </html>
  );
}
