// Optimized utility functions
import { PERFORMANCE_CONFIG } from '../config/index.js'

// Class name utility
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

// Price formatting
export const formatPrice = (price) => {
  if (typeof price === 'string') {
    price = parseFloat(price.replace(/[^\d.-]/g, ''))
  }
  return `₹${price.toLocaleString('en-IN')}`
}

// Smooth scroll to element
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

// Performance optimized debounce
export const debounce = (func, wait, immediate = false) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      if (!immediate) func(...args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

// Performance optimized throttle
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy loading utility
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    rootMargin: PERFORMANCE_CONFIG.LAZY_LOADING_OFFSET,
    threshold: 0.1,
    ...options
  }
  
  return new IntersectionObserver(callback, defaultOptions)
}

// Image lazy loading
export const lazyLoadImage = (img) => {
  if ('loading' in HTMLImageElement.prototype) {
    img.loading = 'lazy'
  } else {
    // Fallback for browsers that don't support native lazy loading
    const observer = createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })
    observer.observe(img)
  }
}

// Performance monitoring
export const measurePerformance = (name, fn) => {
  if (performance.mark) {
    performance.mark(`${name}-start`)
    const result = fn()
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
    return result
  }
  return fn()
}

// Memory cleanup utility
export const cleanupRefs = (...refs) => {
  refs.forEach(ref => {
    if (ref.current) {
      ref.current = null
    }
  })
}

// Form validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^[+]?[1-9][\d]{0,15}$/
  return re.test(phone.replace(/\s/g, ''))
}

// Local storage utilities with error handling
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn('Error reading from localStorage:', error)
      return defaultValue
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.warn('Error writing to localStorage:', error)
      return false
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn('Error removing from localStorage:', error)
      return false
    }
  }
}

// Error handling utility
export const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error)
  
  // In production, you might want to send errors to a monitoring service
  if (import.meta.env.PROD) {
    // Send to error tracking service
    // trackError(error, context)
  }
}
