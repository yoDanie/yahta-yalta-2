"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Burger } from "./Burger"
import { MessengersBtn } from "./MessengersBtn"
import { NavMenu } from "./NavMenu"
import useHeaderScroll from "./useHeaderScroll"
import { cn } from "@/lib/utils"
import logo from "@/public/icons/yahta-logo.svg"

export function Header() {
  const [isBurgerOpened, setBurgerOpened] = useState(false)
  const [isMessengersOpened, setMessengersOpened] = useState(false)

  const toggleBurgerMenu = () => {
    setBurgerOpened((state) => !state)
  }

  const toggleMessengers = () => {
    setMessengersOpened((state) => !state)
  }

  const headerState = useHeaderScroll()

  return (
    <header
      className={cn(
        "bg-headerblue fixed top-0 right-0 left-0 z-[10000] flex h-20 items-center justify-between px-8 transition-all duration-400 ease-out",
        headerState === "hide" && "-top-20",
        (headerState === "show" || isBurgerOpened || isMessengersOpened) &&
          "top-0",
      )}
    >
      <MessengersBtn
        isOpened={isMessengersOpened}
        toggleOpened={toggleMessengers}
        onClose={() => setMessengersOpened(false)}
      />

      <NavMenu
        isOpened={isBurgerOpened}
        burger={
          <Burger
            isOpened={isBurgerOpened}
            toggleOpened={toggleBurgerMenu}
            onClose={() => setBurgerOpened(false)}
          />
        }
      />

      <div className="flex items-center gap-3 text-right">
        <div className="flex flex-col gap-2">
          <Link href="/" className="font-caveat text-lg uppercase">
            Яхта-ялта
          </Link>
          <div className="hidden text-sm font-light sm:block">
            Аренда яхт и катеров в Ялте
          </div>
        </div>
        <Link href="/">
          <Image
            placeholder="empty"
            className={cn("h-[60px] w-[60px]", "sm:h-[40px] sm:w-[40px]")}
            src={logo}
            alt="лого яхта-ялта"
          />
        </Link>
      </div>
    </header>
  )
}
