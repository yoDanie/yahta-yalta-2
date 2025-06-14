"use client"
import logo from "@/public/icons/yahta-logo.svg"

import { Image } from "@/components/Image"

import styles from "./index.module.scss"
import { cn } from "@/lib/utils"

export const Footer = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.rights}>
        Яхта-Ялта (c) 2021-{new Date().getFullYear()} Все права защищены.
      </div>
      <div>
        Разработка сайта:
        <a
          href="https://telegram.me/Danielyalta"
          target="_blank"
          className={cn(styles.creator, "link")}
        >
          Даниил
        </a>
      </div>

      <div className={styles.logo} onClick={() => window.scrollTo(0, 0)}>
        <Image
          className="link"
          placeholder="empty"
          src={logo}
          alt="лого яхта-ялта"
        />
      </div>
    </footer>
  )
}
