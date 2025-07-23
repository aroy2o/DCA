import { useEffect, useRef } from 'react'
import { createIntersectionObserver } from '../lib/utils'

// Custom hook for performance-optimized animations
export const usePerformantAnimation = (triggerRef, animationFn, options = {}) => {
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!triggerRef.current || hasAnimated.current) return

    const observer = createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animationFn()
          observer.unobserve(entry.target)
        }
      })
    }, options)

    observer.observe(triggerRef.current)

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current)
      }
    }
  }, [triggerRef, animationFn, options])
}

// Custom hook for reduced motion support
export const useReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  return prefersReducedMotion.matches
}
