import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  metadataBase: new URL('https://yaksiciftlik.com'),
  title: "Yakşi Çiftlik | Doğal Köy Yumurtası & Çiftlik Ürünleri",
  description:
    "Kırklareli Demirköy Balaban Köyü'nden taptaze köy yumurtası, ördek yumurtası, beç yumurtası, canlı kanatlılar, civciv ve kuluçka hizmeti. Doğal, katkısız ve güvenilir üretim.",
  keywords: [
    "Yakşi Çiftlik",
    "Köy Yumurtası",
    "Organik Yumurta",
    "Ördek Yumurtası",
    "Beç Tavuğu Yumurtası",
    "Kuluçkalık Yumurta",
    "Balaban Köyü",
    "Demirköy",
    "Kırklareli",
    "Trakya Doğal Çiftlik",
  ],
  icons: {
    icon: "/images/brand/logo.png",
    apple: "/images/brand/logo.png",
  },
  openGraph: {
    title: "Yakşi Çiftlik | Doğal Köy Yumurtası & Çiftlik Ürünleri",
    description: "Balaban Köyü'nden sofranıza taptaze, katkısız doğal lezzetler. WhatsApp ile hemen sipariş verin!",
    images: ["/images/brand/logo.png"],
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2D5A27",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#28190E] antialiased selection:bg-[#2D5A27] selection:text-white">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
