import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LoadingGate from "./components/LoadingGate";

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <LoadingGate>{children}</LoadingGate>
      </body>
    </html>
  );
}
