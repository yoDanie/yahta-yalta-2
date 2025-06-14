import { useState } from "react"
import cn from "classnames"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"

import styles from "./index.module.scss"

type BurgerProps = {
  isOpened: boolean
  toggleOpened: () => void
  onClose: () => void
}

export const Burger = ({ isOpened, toggleOpened, onClose }: BurgerProps) => {
  const [burgerRef, setBurgerRef] = useState<HTMLButtonElement | null>(null)

  useOnClickOutside({ ref: burgerRef, onClose })

  return (
    <button
      className={cn(styles.root, isOpened && styles.opened)}
      onClick={toggleOpened}
      ref={setBurgerRef}
    >
      <div className={cn(styles.item)} />
      <div className={cn(styles.item)} />
      <div className={cn(styles.item)} />
    </button>
  )
}
