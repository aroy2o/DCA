import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin)

// Enhanced Animation utilities
export const fadeInUp = (element, duration = 0.8, delay = 0) => {
  return gsap.fromTo(element,
    { opacity: 0, y: 50, scale: 0.95 },
    { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      duration,
      delay,
      ease: "power3.out"
    }
  )
}

export const staggerChildren = (parent, duration = 0.6, stagger = 0.1) => {
  return gsap.fromTo(parent.children,
    { opacity: 0, y: 30, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease: "back.out(1.7)"
    }
  )
}

export const scaleOnHover = (element) => {
  const tl = gsap.timeline({ paused: true })
  
  tl.to(element, {
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out"
  })

  return {
    play: () => tl.play(),
    reverse: () => tl.reverse()
  }
}

// New Advanced Animations
export const magneticEffect = (element, strength = 0.3) => {
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    })
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

export const floatingAnimation = (element, options = {}) => {
  const {
    amplitude = 20,
    duration = 3,
    delay = 0,
    rotation = 5,
    scale = 1.05
  } = options

  return gsap.to(element, {
    y: -amplitude,
    rotation,
    scale,
    duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay
  })
}

export const parallaxEffect = (element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  })
}

export const morphingGradient = (element, colors, duration = 20) => {
  const tl = gsap.timeline({ repeat: -1 })
  
  colors.forEach((color, index) => {
    tl.to(element, {
      background: color,
      duration: duration / colors.length,
      ease: "none"
    })
  })

  return tl
}

export const textTypewriter = (element, text, speed = 0.05) => {
  return gsap.to(element, {
    duration: text.length * speed,
    text: text,
    ease: "none"
  })
}

export const revealAnimation = (element, direction = 'up') => {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  }

  return gsap.fromTo(element,
    { 
      opacity: 0, 
      ...directions[direction],
      clipPath: 'inset(0 0 100% 0)'
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: 1,
      ease: "power3.out"
    }
  )
}

export const bounceIn = (element, delay = 0) => {
  return gsap.fromTo(element,
    { 
      opacity: 0,
      scale: 0.3,
      rotation: -180
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1,
      delay,
      ease: "back.out(1.7)"
    }
  )
}

export const slideInFromSide = (element, side = 'left', distance = 100) => {
  const startPos = side === 'left' ? -distance : side === 'right' ? distance : 0
  const axis = ['left', 'right'].includes(side) ? 'x' : 'y'
  
  return gsap.fromTo(element,
    { 
      opacity: 0, 
      [axis]: startPos,
      scale: 0.8
    },
    {
      opacity: 1,
      [axis]: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    }
  )
}

export const createScrollTriggerAnimation = (element, animation, options = {}) => {
  const defaultOptions = {
    trigger: element,
    start: "top 80%",
    toggleActions: "play none none reverse"
  }

  return gsap.set(element, {
    ...animation,
    scrollTrigger: { ...defaultOptions, ...options }
  })
}

// Cricket-specific animations
export const cricketBallBounce = (element) => {
  return gsap.to(element, {
    y: -30,
    duration: 0.3,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  })
}

export const wicketFall = (element) => {
  return gsap.timeline()
    .to(element, {
      rotation: 15,
      duration: 0.2,
      ease: "power2.out"
    })
    .to(element, {
      rotation: 0,
      y: 5,
      duration: 0.5,
      ease: "bounce.out"
    })
}

export const batSwing = (element) => {
  return gsap.timeline()
    .to(element, {
      rotation: -45,
      duration: 0.2,
      ease: "power3.in"
    })
    .to(element, {
      rotation: 45,
      duration: 0.3,
      ease: "power3.out"
    })
    .to(element, {
      rotation: 0,
      duration: 0.2,
      ease: "power2.out"
    })
}
