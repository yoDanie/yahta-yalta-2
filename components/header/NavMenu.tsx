"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavMenuProps {
  isOpened: boolean
  burger: ReactNode
}

export function NavMenu({ isOpened, burger }: NavMenuProps) {
  const linkClasses = cn(
    "relative py-2.5 px-1.5 transition-all duration-200",
    'after:content-[""] after:block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-bronze after:rounded-sm after:scale-x-0 after:transition-transform after:duration-500 after:ease-in-out hover:after:scale-x-100',
    "lg:py-10 lg:px-20 lg:w-full lg:cursor-pointer lg:transition-padding lg:duration-200 lg:border-b lg:border-white lg:last:border-b-0 lg:after:hidden",
  )

  return (
    <nav
      className={cn(
        "flex items-center gap-6",
        "lg:absolute lg:top-0 lg:right-0 lg:z-[1000]",
        "lg:border-bronze lg:rounded-l-lg lg:border lg:border-r-transparent",
        "lg:flex-col lg:gap-0",
        "lg:translate-x-full lg:translate-y-20",
        "lg:from-darkblue1 lg:to-darkblue3 lg:bg-gradient-to-br",
        "lg:transition-transform lg:duration-200 lg:ease-in",
        isOpened && "lg:translate-x-[-2%] lg:translate-y-20",
      )}
    >
      {burger}
      <div className="flex gap-6 lg:flex-col">
        <Link href="/" className={linkClasses}>
          Главная
        </Link>
        <Link href="/contacts" className={linkClasses}>
          Контакты
        </Link>
      </div>
    </nav>
  )
}
