import { useEffect } from 'react'

const SmoothScrolling = ({ children }) => {
  useEffect(() => {
    // Smooth scrolling with easing
    const smoothScrollTo = (targetY, duration = 1000) => {
      const startY = window.pageYOffset
      const difference = targetY - startY
      const startTime = performance.now()

      const step = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1)
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1
        
        window.scrollTo(0, startY + difference * ease)
        
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    }

    // Enhanced anchor link handling
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return

      e.preventDefault()
      const targetId = target.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        const targetY = targetElement.getBoundingClientRect().top + window.pageYOffset - 100
        smoothScrollTo(targetY, 1200)
        
        // Update URL without jumping
        window.history.pushState(null, null, `#${targetId}`)
      }
    }

    // Scroll-based animations optimization
    let ticking = false
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Add scroll-based logic here if needed
          ticking = false
        })
        ticking = true
      }
    }

    document.addEventListener('click', handleAnchorClick)
    window.addEventListener('scroll', optimizedScroll, { passive: true })

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('scroll', optimizedScroll)
    }
  }, [])

  return <>{children}</>
}

export default SmoothScrolling
