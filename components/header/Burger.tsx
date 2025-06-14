"use client"

import { cn } from "@/lib/utils"

interface BurgerProps {
  isOpened: boolean
  toggleOpened: () => void
  onClose: () => void
}

export function Burger({ isOpened, toggleOpened }: BurgerProps) {
  return (
    <button
      className={cn(
        "relative order-1 hidden h-8 w-10 lg:block",
        "tap-highlight-none",
        isOpened && "opened",
      )}
      onClick={toggleOpened}
      aria-label="Меню"
    >
      <span
        className={cn(
          "absolute h-1 w-full rounded bg-white",
          "transition-all duration-200 ease-in-out",
          isOpened ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute h-1 w-full rounded bg-white",
          "top-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out",
          isOpened && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute h-1 w-full rounded bg-white",
          "transition-all duration-200 ease-in-out",
          isOpened ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
        )}
      />
    </button>
  )
}
