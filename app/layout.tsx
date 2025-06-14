import type { Metadata } from "next"
import { Caveat, Montserrat } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
})

const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-caveat",
})

const title = "Яхта-Ялта - аренда яхты и катера в Ялте, морские прогулки"

export const metadata: Metadata = {
  title,
  keywords:
    "прогулки на яхте, прогулки на катере, морская прогулка ялта, морские прогулки, ялта, яхта, катер, аренда, морское путешествие, экскурсия, рыбалка, прогулка на яхте, снять яхту, аренда яхты с капитаном, аренда, заказать яхту, морская экскурсия ласточкино гнездо, ласточка, гнездо, гнездышко, гурзуф яхта, медведь гора яхта",
  description:
    "Аренда яхты и катера в Ялте, с капитаном. От 5 000 руб/в час. Морские прогулки к замку Ласточкино гнездо, Медведь-горе... Рыбалка и готовка яхте. Морские экскурсии",
  openGraph: {
    title,
    type: "website",
    url: "/",
    // images:
    description:
      "Морская прогулка в Ялте. Морская прогулка к Ласточкино гнездо. Аренда яхты в Ялте. Аренда катера Ялта. Прогулка на яхте",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          montserrat.variable,
          caveat.variable,
          "flex min-h-screen flex-col antialiased",
        )}
      >
        <Header />
        <ScrollArea className="relative flex h-dvh w-full flex-col">
          {children}
          <Footer />
        </ScrollArea>
      </body>
    </html>
  )
}
