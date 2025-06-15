"use client"
import { useEffect, useState } from "react"
import {
  Controller,
  FreeMode,
  Keyboard,
  Navigation,
  Thumbs,
} from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import styles from "./gallery.module.scss"
import { useEscapeKey } from "./useEscapeKey"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { getBoatData } from "@/lib/getBoatData"
import { BoatImageWithSkeleton } from "@/components/BoatImageWithSkeleton"
import { Minimize } from "lucide-react"
import { cn } from "@/lib/utils"

const modEnabled = {
  enabled: true,
}

export const GalleryPage = () => {
  const [searchParams] = useSearchParams()

  const { boatName } = useParams<{ boatName: BoatName }>()
  const { data, images } = getBoatData(boatName)

  const initialSlide = searchParams[1] || 0

  useEscapeKey(boatName)

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [thumbsSliderPerView, setThumbsSliderPerView] = useState(3)

  useEffect(() => {
    const getThumbsSliderPerView = () => {
      const breakpoints = {
        small: window.matchMedia("(max-width: 600px)"),
        medium: window.matchMedia("(min-width: 601px) and (max-width: 1024px)"),
        large: window.matchMedia("(min-width: 1025px) and (max-width: 1440px)"),
        extraLarge: window.matchMedia("(min-width: 1441px)"),
      }

      if (breakpoints.small.matches) {
        return 3
      } else if (breakpoints.medium.matches) {
        return 4
      } else if (breakpoints.large.matches) {
        return 5
      } else if (breakpoints.extraLarge.matches) {
        return 6
      }

      return 3
    }

    // Only run on client side
    if (typeof window !== "undefined") {
      setThumbsSliderPerView(getThumbsSliderPerView())
    }
  }, [])

  return (
    <div className={styles.root}>
      <Link
        href={`/boats/${data?.name}`}
        className="link absolute top-[20px] right-[10px] z-20"
      >
        <Minimize className={cn("size-12 text-cyan-400", styles.close)} />
      </Link>

      {/* <Carousel images={images} /> */}
      <div className="h-4/5">
        <Swiper
          loop={modEnabled}
          navigation={modEnabled}
          initialSlide={Number(initialSlide)}
          className="h-full"
          scrollbar={modEnabled}
          keyboard={modEnabled}
          slidesPerView={1}
          lazyPreloadPrevNext={2}
          {...(thumbsSwiper && { thumbs: { swiper: thumbsSwiper } })}
          modules={[Navigation, Controller, Thumbs, Keyboard, FreeMode]}
        >
          {images.map((src, index) => (
            <SwiperSlide key={src}>
              <BoatImageWithSkeleton
                priority
                className={styles.img}
                key={index}
                src={src}
                fill
                alt={`Заглавное фото ${data?.slug}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative h-1/5">
        <Swiper
          spaceBetween={10}
          slidesPerView={thumbsSliderPerView}
          modules={[FreeMode, Navigation]}
          onSwiper={setThumbsSwiper}
          freeMode
          watchSlidesProgress
          className="h-full"
        >
          {images.map((src) => (
            <SwiperSlide key={src}>
              <BoatImageWithSkeleton
                fill
                src={src}
                alt={`Фото-миниатюра ${data?.slug}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default GalleryPage
