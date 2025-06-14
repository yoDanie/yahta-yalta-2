"use client"
import { useState } from "react"
import cn from "classnames"
import logo from "@/public/icons/yahta-logo.svg"
import { Image } from "@/components/Image"

import { Burger } from "./Burger"
import styles from "./index.module.scss"
import { MessengersBtn } from "./MessengersBtn"
import { NavMenu } from "./NavMenu"
import useHeaderScroll from "./useHeaderScroll"
import { Link } from "@/components/Link"

export const Header = () => {
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
        styles.root,
        headerState === "hide" && styles.hide,
        (headerState === "show" || isBurgerOpened || isMessengersOpened) &&
          styles.show,
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

      <div className={styles.info}>
        <div className={styles.wrapper}>
          <Link href="/" className={styles.title}>
            Яхта-ялта
          </Link>
          <div className={styles.subtitle}>Аренда яхт и катеров в Ялте</div>
        </div>
        <Link href="/">
          <Image
            placeholder="empty"
            className={styles.logo}
            src={logo}
            alt="лого яхта-ялта"
          />
        </Link>
      </div>
    </header>
  )
}
