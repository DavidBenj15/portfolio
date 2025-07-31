import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/system";
import Navigation from "@/components/ui/navigation";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | David Benjamin",
  description: "Personal portfolio showcasing my work and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistMono.variable} antialiased`}
      >
        <HeroUIProvider>
          <Navigation />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
