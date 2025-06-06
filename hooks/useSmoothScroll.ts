import { useEffect } from 'react'
import { useRouter } from 'next/router'

// noworking

export const useSmoothScroll = () => {
  const router = useRouter()

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location
      if (hash) {
        const section = document.querySelector(hash)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    handleHashChange() // Scroll to section on initial load if hash exists

    const unlisten = () => {
      window.removeEventListener('hashchange', handleHashChange)
    }

    window.addEventListener('hashchange', handleHashChange)

    return unlisten
  }, []) // Run effect only once on component mount
}
