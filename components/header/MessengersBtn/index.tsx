import { useState } from "react"
import cn from "classnames"

import { Contacts } from "@/components/Contacts"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"

import styles from "./index.module.scss"

type MessengersBtnProps = {
  isOpened: boolean
  toggleOpened: () => void
  onClose: () => void
}

export const MessengersBtn = ({
  isOpened,
  toggleOpened,
  onClose,
}: MessengersBtnProps) => {
  const [ref, setRef] = useState<HTMLElement | null>(null)

  useOnClickOutside({ ref, onClose })

  return (
    <div className={styles.root} ref={setRef}>
      <button onClick={toggleOpened} className={styles.btn} type="button" />
      <div
        className={cn(
          styles.messengers,
          "bg-gradient1-3",
          isOpened && styles.active,
        )}
      >
        <Contacts />
      </div>
    </div>
  )
}
