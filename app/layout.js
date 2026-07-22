import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import "./globals.css";
import LoadingGate from "./components/LoadingGate";
import TabDim from "./components/TabDim";

// GA4 measurement ID (public by design; env var can override per-deploy)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-DMKJ8F316E";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE = "https://portfoliojaskirat.netlify.app";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Jaskirat Singh — Engineer at the intersection of code & hardware.",
  description:
    "Final-year EEE @ BIT Mesra. Full-stack web, GenAI, data, and power electronics — 6 shipped projects, 300+ LeetCode, 3 role-targeted resumes.",
  authors: [{ name: "Jaskirat Singh" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    title: "Jaskirat Singh — I build things.",
    description:
      "Engineer at the intersection of code & hardware — full-stack web, GenAI, data, and power electronics.",
    siteName: "Jaskirat Singh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaskirat Singh — I build things.",
    description:
      "Engineer at the intersection of code & hardware — full-stack, GenAI, data, power electronics.",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08080a",
};

// structured data — real profile facts only
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jaskirat Singh",
  url: SITE,
  email: "mailto:jaskiratsingh314276@gmail.com",
  telephone: "+91-8340361891",
  jobTitle: "Software Developer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Birla Institute of Technology, Mesra" },
  sameAs: [
    "https://github.com/Jaskirat314276",
    "https://www.linkedin.com/in/jaskirat-singh-b644a4255/",
    "https://leetcode.com/Jaskirat-singh",
    "https://www.geeksforgeeks.org/user/jaskiratsi2k1r",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <LoadingGate>{children}</LoadingGate>
        <TabDim />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {/* only on Vercel-hosted deploys — its /_vercel/insights endpoint
          doesn't exist on Netlify and would 404 there */}
      {process.env.VERCEL && <VercelAnalytics />}
    </html>
  );
}
