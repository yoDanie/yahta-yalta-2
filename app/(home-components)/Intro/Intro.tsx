"use client"

import { useRef } from "react"
import Image from "next/image"
import anchorImage from "@/public/icons/sea-anchor.png"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import bgImage from "./intro-1.jpg"

export const Intro = () => {
  const bottomElementRef = useRef(null)

  const isBottomElementVisible = useIntersectionObserver(bottomElementRef, {
    rootMargin: "-18px",
  })

  return (
    <>
      <div className="relative h-[calc(100dvh-theme(spacing.16)+16px)] w-full overflow-hidden">
        <Image
          priority
          src={bgImage}
          alt="Интро картинка - аренда яхт и катеров в Ялте"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[hsla(215,30%,2%,0.7)]" />

        <Image
          priority
          className={`absolute right-[2%] bottom-[-1%] z-[1000] h-[260px] object-contain transition-all duration-3000 ease-in-out ${
            isBottomElementVisible
              ? "translate-x-0"
              : "translate-x-[calc(100%+50px)]"
          }`}
          src={anchorImage}
          alt="Якорь"
        />

        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center py-24">
          <div className="flex h-full w-[70%] flex-col items-center justify-between text-center text-shadow-lg/30">
            <div>
              <h1 className="text-bronze relative mb-11 inline-block text-2xl font-bold">
                Аренда яхты в Ялте
                <span className="bg-bronze absolute bottom-[-12px] left-0 block h-0.5 w-full rounded" />
              </h1>
              <h2 className="text-6xl font-bold">
                Совершите настоящее
                <p>морское путешествие!</p>
              </h2>
            </div>

            <h3 className="text-2xl leading-normal font-light italic">
              Покупайтесь на диких пляжах или в открытом, чистом море.
              Полюбуйтесь самыми красивыми местами Ялты из яхты, совершая
              морскую прогулку к замку Ласточкино гнездо, скалам Адалары,
              Медведь-горе, скале Дива...
            </h3>
          </div>
        </div>
      </div>

      <div ref={bottomElementRef}></div>
    </>
  )
}
