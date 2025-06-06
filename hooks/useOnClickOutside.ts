import { useEffect } from 'react'

type useOnClickOutsideParams = {
  ref: HTMLElement | null
  onClose: () => void
}

export const useOnClickOutside = ({ ref, onClose }: useOnClickOutsideParams) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref?.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, onClose])
}
