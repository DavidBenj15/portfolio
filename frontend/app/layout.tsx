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
  description: "David Benjamin - Computer Science student at Johns Hopkins University, passionate about Full Stack Development, DevOps, and AI/ML. Software Engineer with experience at NASA, Meta and Major League Hacking, and more.",
  keywords: ["David Benjamin", "Computer Science", "Full Stack Developer", "DevOps", "AI/ML", "Johns Hopkins University", "Software Engineer", "Portfolio", "Meta", "NASA", "Production Engineering"],
  authors: [{ name: "David Benjamin", url: "https://davidbenjamin.dev" }],
  creator: "David Benjamin",
  publisher: "David Benjamin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://davidbenjamin.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://davidbenjamin.dev",
    siteName: "David Benjamin Portfolio",
    title: "David Benjamin - Portfolio",
    description: "Computer Science student passionate about building impactful solutions",
    images: [
      {
        url: "/images/me_square.jpg",
        width: 400,
        height: 400,
        alt: "David Benjamin - Computer Science Student",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@davidbenjamin",
    creator: "@davidbenjamin",
    title: "David Benjamin - Portfolio",
    description: "Computer Science student and Full Stack Developer",
    images: ["/images/me_square.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  classification: "portfolio",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  themeColor: "#68ACE5",
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
