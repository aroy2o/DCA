import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const UniqueInteractionSystem = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // Hero Section: 3D Tilt and Parallax Mouse Tracking
    const enhanceHeroSection = () => {
      const heroSection = document.querySelector('.hero-section')
      if (!heroSection) return

      let mouseX = 0, mouseY = 0

      const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2

        // 3D tilt effect on hero elements
        gsap.to(heroSection.querySelectorAll('.hero-title'), {
          rotationY: mouseX * 5,
          rotationX: -mouseY * 5,
          duration: 0.5,
          ease: "power2.out"
        })

        // Parallax background movement
        gsap.to(heroSection.querySelector('.hero-background'), {
          x: mouseX * 20,
          y: mouseY * 20,
          duration: 0.8,
          ease: "power2.out"
        })
      }

      heroSection.addEventListener('mousemove', handleMouseMove)
      return () => heroSection.removeEventListener('mousemove', handleMouseMove)
    }

    // Stats Section: Counter Animation with Sound Effects (Visual)
    const enhanceStatsSection = () => {
      const statsSection = document.querySelector('.stats-section')
      if (!statsSection) return

      const statCards = statsSection.querySelectorAll('[data-stat]')
      
      statCards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            // Create counting animation with visual "sound" effect
            let count = 0
            const target = parseInt(card.dataset.stat || '0')
            
            const counter = setInterval(() => {
              count += Math.ceil(target / 50)
              if (count >= target) {
                count = target
                clearInterval(counter)
                
                // Final explosion effect
                createCounterExplosion(card)
              }
              
              card.textContent = count
              
              // Pulse effect during counting
              gsap.to(card, {
                scale: 1.1,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.out"
              })
            }, 50)
          }
        })
      })
    }

    // Features Section: Magnetic Hover with Physics
    const enhanceFeaturesSection = () => {
      const featuresSection = document.querySelector('.features-section')
      if (!featuresSection) return

      const featureCards = featuresSection.querySelectorAll('.feature-card')
      
      featureCards.forEach((card, index) => {
        let isHovering = false
        
        card.addEventListener('mouseenter', () => {
          isHovering = true
          
          // Magnetic attraction effect
          gsap.to(card, {
            scale: 1.15,
            rotationY: 10,
            rotationX: 5,
            z: 50,
            duration: 0.4,
            ease: "back.out(1.7)"
          })
          
          // Create orbiting particles
          createOrbitingParticles(card)
        })
        
        card.addEventListener('mouseleave', () => {
          isHovering = false
          
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
          })
        })
        
        // Mouse tracking within card
        card.addEventListener('mousemove', (e) => {
          if (!isHovering) return
          
          const rect = card.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = (e.clientX - centerX) / rect.width
          const deltaY = (e.clientY - centerY) / rect.height
          
          gsap.to(card, {
            rotationY: deltaX * 20,
            rotationX: -deltaY * 20,
            duration: 0.2,
            ease: "power2.out"
          })
        })
      })
    }

    // Success Stories Section: 3D Carousel with Gesture Control
    const enhanceSuccessStoriesSection = () => {
      const successSection = document.querySelector('.success-story-section')
      if (!successSection) return

      const cards = successSection.querySelectorAll('.success-story-card')
      let currentIndex = 0
      let isAnimating = false

      // Arrange cards in 3D carousel
      cards.forEach((card, index) => {
        const angle = (index / cards.length) * 360
        gsap.set(card, {
          rotationY: angle,
          transformOrigin: "center center -300px",
          z: -300
        })
      })

      // Auto-rotate carousel
      gsap.to(successSection, {
        rotationY: 360,
        duration: 30,
        repeat: -1,
        ease: "none"
      })

      // Click to focus on card
      cards.forEach((card, index) => {
        card.addEventListener('click', () => {
          if (isAnimating) return
          isAnimating = true
          
          const targetAngle = -index * (360 / cards.length)
          
          gsap.to(successSection, {
            rotationY: targetAngle,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              isAnimating = false
              currentIndex = index
            }
          })
        })
      })
    }

    // CTA Section: Bouncing Physics with Elastic Interactions
    const enhanceCTASection = () => {
      const ctaSection = document.querySelector('.cta-section')
      if (!ctaSection) return

      const ctaButtons = ctaSection.querySelectorAll('.cta-button')
      
      ctaButtons.forEach((button, index) => {
        // Continuous bouncing animation
        gsap.to(button, {
          y: -10 - index * 5,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
        
        // Physics-based click interaction
        button.addEventListener('mousedown', () => {
          gsap.to(button, {
            scale: 0.9,
            duration: 0.1,
            ease: "power2.out"
          })
        })
        
        button.addEventListener('mouseup', () => {
          gsap.to(button, {
            scale: 1.1,
            duration: 0.2,
            ease: "back.out(2)"
          }).then(() => {
            gsap.to(button, {
              scale: 1,
              duration: 0.3,
              ease: "elastic.out(1, 0.3)"
            })
          })
        })
        
        // Magnetic field effect
        button.addEventListener('mouseenter', () => {
          createMagneticField(button)
        })
      })
    }

    // Why Choose Section: Hexagonal Grid with Ripple Effects
    const enhanceWhyChooseSection = () => {
      const whyChooseSection = document.querySelector('.why-choose-section') || 
                               document.querySelector('[ref="interactiveRef"]')
      if (!whyChooseSection) return

      const items = whyChooseSection.querySelectorAll('.why-choose-item')
      
      items.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
          // Hexagonal ripple effect
          createHexagonalRipple(item, index)
          
          // Scale up current item
          gsap.to(item, {
            scale: 1.2,
            rotationZ: 5,
            duration: 0.3,
            ease: "back.out(1.7)"
          })
          
          // Scale down neighboring items
          const neighbors = getNeighboringItems(item, items, index)
          neighbors.forEach(neighbor => {
            gsap.to(neighbor, {
              scale: 0.9,
              opacity: 0.7,
              duration: 0.3,
              ease: "power2.out"
            })
          })
        })
        
        item.addEventListener('mouseleave', () => {
          // Reset all items
          gsap.to(items, {
            scale: 1,
            rotationZ: 0,
            opacity: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.3)"
          })
        })
      })
    }

    // Newsletter Section: Typing Animation with Real-time Effects
    const enhanceNewsletterSection = () => {
      const newsletterSection = document.querySelector('.newsletter-section')
      if (!newsletterSection) return

      const input = newsletterSection.querySelector('input[type="email"]')
      if (!input) return

      input.addEventListener('input', (e) => {
        const value = e.target.value
        
        // Create typing particles
        if (value.length > 0) {
          createTypingParticles(input)
        }
        
        // Real-time validation visual feedback
        const isValid = /\S+@\S+\.\S+/.test(value)
        gsap.to(input, {
          borderColor: isValid ? '#10b981' : '#ef4444',
          boxShadow: isValid ? '0 0 20px rgba(16, 185, 129, 0.3)' : '0 0 20px rgba(239, 68, 68, 0.3)',
          duration: 0.3
        })
      })

      input.addEventListener('focus', () => {
        createFocusAura(input)
      })
    }

    // Utility Functions
    const createCounterExplosion = (element) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div')
        particle.className = 'fixed pointer-events-none z-50 w-2 h-2 bg-amber-400 rounded-full'
        particle.style.left = centerX + 'px'
        particle.style.top = centerY + 'px'
        document.body.appendChild(particle)

        const angle = (i / 10) * Math.PI * 2
        const distance = 50 + Math.random() * 30

        gsap.to(particle, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => particle.remove()
        })
      }
    }

    const createOrbitingParticles = (element) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div')
        particle.className = 'fixed pointer-events-none z-50 w-1 h-1 bg-blue-400 rounded-full'
        particle.style.left = centerX + 'px'
        particle.style.top = centerY + 'px'
        document.body.appendChild(particle)

        const radius = 50 + i * 10
        gsap.to(particle, {
          rotation: 360,
          transformOrigin: `0px ${radius}px`,
          duration: 2 + i * 0.5,
          repeat: 3,
          ease: "none",
          onComplete: () => particle.remove()
        })
      }
    }

    const createHexagonalRipple = (element, index) => {
      const ripple = document.createElement('div')
      ripple.className = 'fixed pointer-events-none z-40'
      
      const rect = element.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      
      ripple.style.cssText = `
        left: ${rect.left + rect.width / 2 - size / 2}px;
        top: ${rect.top + rect.height / 2 - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border: 3px solid hsl(${index * 60}deg, 70%, 60%);
        clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
      `
      
      document.body.appendChild(ripple)

      gsap.fromTo(ripple, {
        scale: 0,
        opacity: 1
      }, {
        scale: 1,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      })
    }

    const createMagneticField = (element) => {
      const field = document.createElement('div')
      field.className = 'fixed pointer-events-none z-30'
      
      const rect = element.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 3
      
      field.style.cssText = `
        left: ${rect.left + rect.width / 2 - size / 2}px;
        top: ${rect.top + rect.height / 2 - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
        border-radius: 50%;
      `
      
      document.body.appendChild(field)

      gsap.fromTo(field, {
        scale: 0,
        opacity: 1
      }, {
        scale: 1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => field.remove()
      })
    }

    const createTypingParticles = (input) => {
      const rect = input.getBoundingClientRect()
      
      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div')
        particle.className = 'fixed pointer-events-none z-50 text-xs'
        particle.textContent = ['✨', '💫', '⭐'][i]
        particle.style.left = (rect.right - 20 + Math.random() * 40) + 'px'
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px'
        document.body.appendChild(particle)

        gsap.to(particle, {
          y: -30,
          x: (Math.random() - 0.5) * 40,
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => particle.remove()
        })
      }
    }

    const createFocusAura = (input) => {
      const aura = document.createElement('div')
      aura.className = 'fixed pointer-events-none z-30'
      
      const rect = input.getBoundingClientRect()
      
      aura.style.cssText = `
        left: ${rect.left - 10}px;
        top: ${rect.top - 10}px;
        width: ${rect.width + 20}px;
        height: ${rect.height + 20}px;
        background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3));
        border-radius: ${getComputedStyle(input).borderRadius};
        filter: blur(10px);
      `
      
      document.body.appendChild(aura)

      gsap.fromTo(aura, {
        scale: 0.8,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      })

      setTimeout(() => {
        gsap.to(aura, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => aura.remove()
        })
      }, 2000)
    }

    const getNeighboringItems = (item, allItems, index) => {
      const neighbors = []
      const itemsPerRow = Math.ceil(Math.sqrt(allItems.length))
      
      // Add adjacent items (simplified neighbor detection)
      if (index > 0) neighbors.push(allItems[index - 1])
      if (index < allItems.length - 1) neighbors.push(allItems[index + 1])
      
      return neighbors
    }

    // Initialize all enhancements
    const cleanupFunctions = [
      enhanceHeroSection(),
      enhanceStatsSection(),
      enhanceFeaturesSection(),
      enhanceSuccessStoriesSection(),
      enhanceCTASection(),
      enhanceWhyChooseSection(),
      enhanceNewsletterSection()
    ].filter(Boolean)

    // Cleanup
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10">
      {/* Enhanced interaction indicators */}
      <div className="absolute top-4 left-4 z-50 pointer-events-none">
        <div className="bg-black/70 text-white text-xs p-2 rounded font-mono space-y-1">
          <div>🎮 Interactive Mode Active</div>
          <div>🏏 Click • Hover • Scroll for effects</div>
        </div>
      </div>
    </div>
  )
}

export default UniqueInteractionSystem
