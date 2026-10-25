import type { Metadata } from "next";
import { Instrument_Serif, Manrope, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Devendra Singh Baghel | Full-Stack Developer",
    template: "%s | Devendra Singh Baghel",
  },
  description:
    "Full-stack developer building reliable APIs and web applications with Node.js, Express, PostgreSQL and React.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Devendra Singh Baghel | Full-Stack Developer",
    description:
      "Full-stack developer building reliable APIs and web applications with Node.js, Express, PostgreSQL and React.",
    url: SITE_URL,
    siteName: "Devendra Singh Baghel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devendra Singh Baghel | Full-Stack Developer",
    description:
      "Full-stack developer building reliable APIs and web applications with Node.js, Express, PostgreSQL and React.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
