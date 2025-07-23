import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

// Unique Animation System for Different Components
export class UniqueAnimationSystem {
  constructor() {
    this.activeAnimations = new Map()
    this.particleSystems = new Map()
  }

  // HERO SECTION: Epic entrance with 3D transforms
  createHeroAnimation(element, options = {}) {
    const tl = gsap.timeline()
    
    // Create floating cricket balls around hero
    this.createHeroCricketBalls(element)
    
    // Epic text reveal with 3D rotation
    const title = element.querySelector('.hero-title')
    if (title) {
      const chars = title.textContent.split('')
      title.innerHTML = chars.map((char, i) => 
        `<span class="hero-char" style="display: inline-block; transform: rotateX(90deg) translateZ(-100px); opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('')
      
      tl.to(title.querySelectorAll('.hero-char'), {
        rotateX: 0,
        z: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)"
      })
    }

    // Morphing background
    const background = element.querySelector('.hero-background')
    if (background) {
      gsap.to(background, {
        backgroundPosition: '200% 200%',
        duration: 25,
        repeat: -1,
        ease: "none"
      })
    }

    return tl
  }

  // STATS SECTION: Counter animation with particle explosions
  createStatsAnimation(element, stats = []) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    })

    stats.forEach((stat, index) => {
      const statElement = element.querySelector(`[data-stat="${index}"]`)
      if (statElement) {
        // Particle explosion on count completion
        tl.to({}, {
          duration: 0.1,
          onComplete: () => this.createStatsParticleExplosion(statElement)
        }, index * 0.5)
        
        // Counter animation
        tl.to(statElement, {
          textContent: stat.number,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: function() {
            // Add glow effect during counting
            gsap.to(statElement, {
              textShadow: "0 0 20px rgba(251, 191, 36, 0.8)",
              duration: 0.1
            })
          }
        }, index * 0.5)
      }
    })

    return tl
  }

  // FEATURES SECTION: Card flip animations with magnetic hover
  createFeaturesAnimation(element, features = []) {
    const cards = element.querySelectorAll('.feature-card')
    
    cards.forEach((card, index) => {
      // Initial setup - cards are flipped
      gsap.set(card, {
        rotationY: 180,
        opacity: 0,
        scale: 0.8
      })

      // Entrance animation
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => {
          gsap.to(card, {
            rotationY: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)"
          })
        }
      })

      // Magnetic hover effect
      this.addMagneticHover(card)
      
      // Unique hover animation for each card
      this.addFeatureCardHover(card, index)
    })
  }

  // CTA SECTION: Bouncing elements with elastic physics
  createCTAAnimation(element) {
    const buttons = element.querySelectorAll('.cta-button')
    const background = element.querySelector('.cta-background')
    
    // Bouncing entrance
    gsap.fromTo(buttons, {
      y: 200,
      scale: 0,
      rotation: 180
    }, {
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: element,
        start: "top 80%"
      }
    })

    // Continuous floating animation
    buttons.forEach((button, index) => {
      gsap.to(button, {
        y: -15,
        rotation: 5,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })

    // Background wave animation
    if (background) {
      this.createWaveAnimation(background)
    }
  }

  // SUCCESS STORIES: Carousel with 3D perspective
  createSuccessStoriesAnimation(element) {
    const cards = element.querySelectorAll('.success-card')
    const carousel = element.querySelector('.success-carousel')
    
    if (carousel) {
      // 3D carousel setup
      gsap.set(carousel, { perspective: 1000 })
      
      cards.forEach((card, index) => {
        const angle = (index / cards.length) * 360
        gsap.set(card, {
          rotationY: angle,
          transformOrigin: "center center -200px"
        })
      })

      // Auto-rotate carousel
      gsap.to(carousel, {
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      })
    }

    // Individual card animations
    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(card, {
            scale: 0.5,
            opacity: 0,
            rotationX: 90
          }, {
            scale: 1,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out"
          })
        }
      })
    })
  }

  // WHY CHOOSE SECTION: Hexagonal grid animation
  createWhyChooseAnimation(element) {
    const items = element.querySelectorAll('.why-choose-item')
    
    // Create hexagonal entrance pattern
    items.forEach((item, index) => {
      const delay = this.getHexagonalDelay(index, items.length)
      
      gsap.fromTo(item, {
        scale: 0,
        rotation: -120,
        opacity: 0
      }, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        delay: delay,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 70%"
        }
      })

      // Unique hover effect
      this.addHexagonalHover(item, index)
    })
  }

  // NEWSLETTER: Typing animation with cursor
  createNewsletterAnimation(element) {
    const title = element.querySelector('.newsletter-title')
    const input = element.querySelector('.newsletter-input')
    
    if (title) {
      this.createTypingEffect(title, title.textContent)
    }

    if (input) {
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(input, {
            width: 0,
            opacity: 0
          }, {
            width: "100%",
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
          })
        }
      })
    }
  }

  // Utility Functions
  createHeroCricketBalls(hero) {
    for (let i = 0; i < 5; i++) {
      const ball = document.createElement('div')
      ball.className = 'absolute w-8 h-8 pointer-events-none'
      ball.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-lg">
          <div class="absolute inset-1 bg-gradient-to-br from-red-400 to-red-600 rounded-full">
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-white rounded-full"></div>
          </div>
        </div>
      `
      hero.appendChild(ball)

      // Orbital motion around hero
      const radius = 150 + i * 30
      gsap.to(ball, {
        rotation: 360,
        transformOrigin: `50% ${radius}px`,
        duration: 10 + i * 2,
        repeat: -1,
        ease: "none"
      })
    }
  }

  createStatsParticleExplosion(element) {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div')
      particle.className = 'fixed w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-50'
      particle.style.left = centerX + 'px'
      particle.style.top = centerY + 'px'
      document.body.appendChild(particle)

      const angle = (i / 12) * Math.PI * 2
      const distance = 60 + Math.random() * 40

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => particle.remove()
      })
    }
  }

  addMagneticHover(element) {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * 0.15
      const deltaY = (e.clientY - centerY) * 0.15

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        rotation: deltaX * 0.1,
        duration: 0.3,
        ease: "power2.out"
      })
    })

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      })
    })
  }

  addFeatureCardHover(card, index) {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    const color = colors[index % colors.length]

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.08,
        boxShadow: `0 20px 40px ${color}30`,
        duration: 0.3,
        ease: "power2.out"
      })

      // Icon spin
      const icon = card.querySelector('.feature-icon')
      if (icon) {
        gsap.to(icon, {
          rotation: 360,
          scale: 1.2,
          duration: 0.6,
          ease: "back.out(1.7)"
        })
      }
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out"
      })

      const icon = card.querySelector('.feature-icon')
      if (icon) {
        gsap.to(icon, {
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        })
      }
    })
  }

  createWaveAnimation(element) {
    const wave = document.createElement('div')
    wave.className = 'absolute inset-0 opacity-30'
    wave.style.background = `
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)
    `
    element.appendChild(wave)

    gsap.to(wave, {
      backgroundPosition: '200% 200%',
      duration: 15,
      repeat: -1,
      ease: "none"
    })
  }

  createTypingEffect(element, text) {
    element.textContent = ''
    const cursor = document.createElement('span')
    cursor.className = 'animate-pulse'
    cursor.textContent = '|'
    element.appendChild(cursor)

    let currentIndex = 0
    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        element.textContent = text.substring(0, currentIndex + 1)
        element.appendChild(cursor)
        currentIndex++
      } else {
        clearInterval(typeInterval)
        cursor.remove()
      }
    }, 100)
  }

  getHexagonalDelay(index, total) {
    // Create hexagonal pattern delays
    const rows = Math.ceil(Math.sqrt(total))
    const row = Math.floor(index / rows)
    const col = index % rows
    
    return (row + col) * 0.1
  }

  addHexagonalHover(item, index) {
    const hue = (index * 60) % 360
    
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        scale: 1.1,
        rotation: 5,
        filter: `hue-rotate(${hue}deg) brightness(1.2)`,
        duration: 0.3,
        ease: "power2.out"
      })
    })

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        scale: 1,
        rotation: 0,
        filter: "none",
        duration: 0.3,
        ease: "power2.out"
      })
    })
  }
}

// Export singleton instance
export const uniqueAnimations = new UniqueAnimationSystem()
