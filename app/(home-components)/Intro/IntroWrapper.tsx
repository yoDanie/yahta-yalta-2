"use client"
import { PropsWithChildren, ReactNode, useRef } from "react"
import anchorImage from "./sea-anchor.png"
import { Image } from "@/components/Image"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

import styles from "./intro.module.scss"
import { RopeDivider } from "@/components/RopeDivider"
import { cn } from "@/lib/utils"

export const IntroWrapper = ({
  children,
  bgImage,
}: PropsWithChildren<{ bgImage: ReactNode }>) => {
  const bottomElementRef = useRef(null)

  const isBottomElementVisible = useIntersectionObserver(bottomElementRef, {
    rootMargin: "-18px",
  })

  return (
    <>
      <div className={styles.root}>
        <RopeDivider />
        {bgImage}
        <Image
          priority
          className={cn(
            styles.anchor,
            isBottomElementVisible && styles.animated,
          )}
          src={anchorImage}
          alt="Якорь"
        />
        {children}
      </div>

      <div ref={bottomElementRef} />
    </>
  )
}
