import type { Metadata } from "next";
import {
  Inter,
  Merriweather,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Poppins,
} from "next/font/google";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "Zyroun — Premium design marketplace",
  description:
    "Launch a contest, receive dozens of premium concepts from top-tier designers globally, and choose your favorite.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${playfair.variable} ${poppins.variable} ${merriweather.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#0f172a]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
