'use client'

import { useEffect, useState } from 'react'

type HeaderState = 'show' | 'hide'

export default function useHeaderScroll() {
  const [headerState, setHeaderState] = useState<HeaderState>('show')
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingDown = currentScrollPos > prevScrollPos

      if (isScrollingDown && currentScrollPos > 80) {
        setHeaderState('hide')
      } else {
        setHeaderState('show')
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return headerState
} 