import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AwardWinningAnimations = () => {
  const containerRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    // Create award-winning floating particles with physics
    const createPremiumParticles = () => {
      const container = containerRef.current
      if (!container) return

      for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div')
        particle.className = 'premium-particle'
        
        const size = Math.random() * 6 + 2
        const opacity = Math.random() * 0.3 + 0.1
        
        particle.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(45deg, 
            rgba(59, 130, 246, ${opacity}), 
            rgba(139, 92, 246, ${opacity * 0.8}),
            rgba(236, 72, 153, ${opacity * 0.6})
          );
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          left: ${Math.random() * window.innerWidth}px;
          top: ${Math.random() * window.innerHeight}px;
          filter: blur(${Math.random() * 1.5}px);
          box-shadow: 0 0 ${size * 3}px rgba(59, 130, 246, 0.3);
        `
        
        document.body.appendChild(particle)
        particlesRef.current.push(particle)
        
        // Advanced floating animation with physics
        gsap.to(particle, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 150 - 75}`,
          rotation: Math.random() * 360,
          duration: 15 + Math.random() * 10,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 5
        })
        
        // Parallax effect on scroll
        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const speed = 0.3 + (i % 5) * 0.1
            gsap.set(particle, {
              y: `+=${self.progress * 100 * speed}`
            })
          }
        })
      }
    }

    // Award-winning micro-interactions
    const setupMicroInteractions = () => {
      // Enhanced button hover effects with 3D transforms
      gsap.utils.toArray('button, .btn-primary, .cricket-button, a[class*="btn"]').forEach(button => {
        const tl = gsap.timeline({ paused: true })
        
        tl.to(button, {
          scale: 1.08,
          rotationY: 8,
          rotationX: 3,
          z: 50,
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
          duration: 0.4,
          ease: "power3.out"
        })

        button.addEventListener('mouseenter', () => {
          tl.play()
          
          // Dynamic gradient shift
          gsap.to(button, {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            backgroundSize: "200% 200%",
            backgroundPosition: "100% 0%",
            duration: 0.5
          })
          
          // Add shimmer effect
          const shimmer = document.createElement('div')
          shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            pointer-events: none;
            z-index: 1;
          `
          button.style.position = 'relative'
          button.style.overflow = 'hidden'
          button.appendChild(shimmer)
          
          gsap.to(shimmer, {
            left: '100%',
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => shimmer.remove()
          })
        })

        button.addEventListener('mouseleave', () => {
          tl.reverse()
          gsap.to(button, {
            backgroundPosition: "0% 0%",
            duration: 0.3
          })
        })

        button.addEventListener('click', () => {
          // Award-winning click animation
          gsap.timeline()
            .to(button, {
              scale: 0.95,
              duration: 0.1,
              ease: "power2.out"
            })
            .to(button, {
              scale: 1.08,
              duration: 0.3,
              ease: "elastic.out(1.2, 0.4)"
            })
        })
      })

      // Premium card hover effects
      gsap.utils.toArray('.glass-card, .interactive-card, .feature-card, .stat-card').forEach(card => {
        const tl = gsap.timeline({ paused: true })
        
        tl.to(card, {
          y: -15,
          scale: 1.03,
          rotationX: 5,
          rotationY: 2,
          boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
          duration: 0.5,
          ease: "power3.out"
        })

        card.addEventListener('mouseenter', () => {
          tl.play()
          
          // Gradient border animation
          gsap.to(card, {
            borderImage: "linear-gradient(45deg, #667eea, #764ba2, #f093fb, #667eea) 1",
            borderWidth: "2px",
            borderStyle: "solid",
            duration: 0.4
          })
          
          // Inner glow effect
          gsap.to(card, {
            filter: "brightness(1.05) saturate(1.1)",
            backdropFilter: "blur(20px) saturate(180%)",
            duration: 0.3
          })
        })

        card.addEventListener('mouseleave', () => {
          tl.reverse()
          gsap.to(card, {
            borderWidth: "0px",
            filter: "brightness(1) saturate(1)",
            backdropFilter: "blur(10px) saturate(100%)",
            duration: 0.3
          })
        })
      })
    }

    // Award-winning scroll animations
    const setupScrollAnimations = () => {
      // Stagger reveal for sections with premium easing
      gsap.utils.toArray('section, .animate-section').forEach((section) => {
        gsap.fromTo(section.children, {
          y: 120,
          opacity: 0,
          scale: 0.9,
          rotationX: 15
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: "start",
            ease: "power2.out"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        })
      })

      // Character-by-character text reveal
      gsap.utils.toArray('h1, h2, h3, .animate-text').forEach(heading => {
        const text = heading.textContent
        heading.innerHTML = text.split('').map(char => 
          char === ' ' ? ' ' : `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(50px) rotateX(90deg);">${char}</span>`
        ).join('')

        gsap.to(heading.querySelectorAll('.char'), {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.08,
          stagger: 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        })
      })

      // Parallax effects for background elements
      gsap.utils.toArray('.parallax-element, .floating-element').forEach(element => {
        gsap.to(element, {
          yPercent: -60,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        })
      })

      // Advanced image reveal animations
      gsap.utils.toArray('img, .image-container').forEach((img) => {
        gsap.fromTo(img, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          scale: 1.3,
          filter: "blur(10px)"
        }, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        })
      })
    }

    // Magnetic cursor effect for interactive elements
    const setupMagneticEffect = () => {
      gsap.utils.toArray('button, .btn-primary, .magnetic-hover').forEach(button => {
        const magneticStrength = 0.3
        
        button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(button, {
            x: x * magneticStrength,
            y: y * magneticStrength,
            rotation: x * magneticStrength * 0.5,
            duration: 0.4,
            ease: "power2.out"
          })
        })
        
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
          })
        })
      })
    }

    // Advanced performance optimization
    const setupPerformanceOptimizations = () => {
      // Use will-change for animated elements
      gsap.utils.toArray('.interactive-card, .floating-element, .parallax-element').forEach(element => {
        element.style.willChange = 'transform'
      })
      
      // Intersection Observer for scroll animations
      const observerOptions = {
        root: null,
        rootMargin: '10%',
        threshold: 0.1
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      }, observerOptions)
      
      gsap.utils.toArray('.lazy-animate').forEach(element => {
        observer.observe(element)
      })
    }

    // Initialize all systems
    createPremiumParticles()
    setupMicroInteractions()
    setupScrollAnimations()
    setupMagneticEffect()
    setupPerformanceOptimizations()

    // Cleanup function
    return () => {
      const currentParticles = particlesRef.current
      if (currentParticles && Array.isArray(currentParticles)) {
        currentParticles.forEach(particle => {
          if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        })
        particlesRef.current = []
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Premium Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-red-50/30"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern animate-grid-move"></div>
      </div>

      {/* Dynamic Light Rays */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-200/50 to-transparent animate-pulse"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-200/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl animate-float-slow parallax-element"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-red-200/20 rounded-full blur-xl animate-float-medium parallax-element"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-xl animate-float-fast parallax-element"></div>
    </div>
  )
}

export default AwardWinningAnimations
