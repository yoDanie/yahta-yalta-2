import type { Metadata } from "next"
import { Caveat, Montserrat } from "next/font/google"
import Script from "next/script"

import "./globals.css"
import "./swiper.scss"
import { cn } from "@/lib/utils"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer/Footer"

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
  verification: {
    yandex: "66a28b60d8138467",
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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');
          ym(74716621, 'init', {webvisor:true, clickmap:true, accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-204178349-2"
          strategy="afterInteractive"
        />
        <Script id="ga-ua" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-204178349-2');`}
        </Script>
        {/* <ScrollArea className="relative flex h-dvh w-full flex-col"> */}
        <Header />
        <main className="min-h-[calc(100dvh - 80px)] relative flex flex-col overflow-hidden pt-[80px]">
          {children}
        </main>
        <Footer />
        {/* </ScrollArea> */}
      </body>
    </html>
  )
}
