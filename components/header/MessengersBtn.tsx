'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MessengersBtnProps {
  isOpened: boolean
  toggleOpened: () => void
  onClose: () => void
}

export function MessengersBtn({ isOpened, toggleOpened, onClose }: MessengersBtnProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div ref={ref} className={cn('relative w-[50px] h-[40px]', isOpened && 'opened')}>
      <Button
        variant="secondary"
        size="icon"
        className={cn(
          'w-[60px] h-[60px] bg-no-repeat bg-[length:25px] bg-[position:center_bottom,right_top]',
          'hover:bg-[position:top_left,center_bottom]',
          'transition-all duration-400',
          'bg-[url("/icons/telegram.svg"),url("/icons/whatsapp.svg")]',
        )}
      >
        <a href="https://telegram.me/Danielyalta" target="_blank">
          Telegram
        </a>
        <a href="https://wa.me/79787755577" target="_blank">
          WhatsApp
        </a>
      </Button>
      <div
        className={cn(
          'absolute top-0 transition-transform duration-200 ease-in',
          'w-max bg-gradient-to-br from-darkblue1 to-darkblue3',
          'border border-bronze border-l-transparent rounded-r-lg',
          'p-10 sm:p-5',
          'translate-x-[calc(-100%-30px)] translate-y-[60px]',
          isOpened && 'translate-x-[-30px] translate-y-[60px]',
        )}
      >
        <div className="flex flex-col gap-4">
          <a href="https://telegram.me/Danielyalta" target="_blank">
            Telegram
          </a>
          <a href="https://wa.me/79787547878" target="_blank">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
