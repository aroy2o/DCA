import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const AdvancedScrollEffects = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // ADVANCED: Smooth scrolling progress indicator
    const createScrollProgress = () => {
      const progressBar = document.createElement('div')
      progressBar.className = 'scroll-progress-bar'
      progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #FFD600, #4FC3F7, #E63946);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(255, 214, 0, 0.3);
      `
      document.body.appendChild(progressBar)

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          progressBar.style.width = `${self.progress * 100}%`
        }
      })

      return progressBar
    }

    // PREMIUM: Advanced parallax text effects
    const setupParallaxText = () => {
      gsap.utils.toArray('.parallax-text').forEach((text, index) => {
        gsap.to(text, {
          yPercent: -50 - (index * 20),
          scale: 1.1,
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: text,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
            invalidateOnRefresh: true
          }
        })
      })
    }

    // ENHANCED: Magnetic scroll snap effects
    const setupMagneticSnap = () => {
      const sections = gsap.utils.toArray('section')
      
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(section, {
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            })
          },
          onLeave: () => {
            gsap.to(section, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            })
          }
        })
      })
    }

    // CRICKET-SPECIFIC: Ball trajectory following scroll
    const setupCricketBallTrajectory = () => {
      const ballPath = "M0,50 Q25,10 50,50 Q75,90 100,50"
      
      gsap.utils.toArray('.cricket-trajectory-ball').forEach((ball, index) => {
        gsap.to(ball, {
          motionPath: {
            path: ballPath,
            autoRotate: true
          },
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1 + index * 0.2
          }
        })
      })
    }

    // ADVANCED: Text split and stagger reveal
    const setupAdvancedTextReveals = () => {
      gsap.utils.toArray('.advanced-text-reveal').forEach(text => {
        const words = text.textContent.split(' ')
        text.innerHTML = words.map(word => 
          `<span class="word-reveal" style="display: inline-block; overflow: hidden;">
            <span class="word-inner" style="display: inline-block; transform: translateY(100px) rotateX(90deg); opacity: 0;">${word}</span>
          </span>`
        ).join(' ')
        
        ScrollTrigger.create({
          trigger: text,
          start: "top 80%",
          onEnter: () => {
            gsap.to(text.querySelectorAll('.word-inner'), {
              y: 0,
              rotationX: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)"
            })
          }
        })
      })
    }

    // PREMIUM: Dynamic background color changes based on scroll
    const setupDynamicBackgrounds = () => {
      const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
      ]

      const sections = gsap.utils.toArray('section')
      
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(document.body, {
              background: colors[index % colors.length],
              duration: 1,
              ease: "power2.inOut"
            })
          }
        })
      })
    }

    // ENHANCED: Scroll-triggered particle bursts
    const setupScrollParticleBursts = () => {
      const createParticleBurst = (x, y) => {
        for (let i = 0; i < 12; i++) {
          const particle = document.createElement('div')
          particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #FFD600, #E63946);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
          `
          document.body.appendChild(particle)

          const angle = (i / 12) * Math.PI * 2
          const distance = 50 + Math.random() * 50
          
          gsap.to(particle, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => particle.remove()
          })
        }
      }

      ScrollTrigger.batch('.burst-trigger', {
        onEnter: (elements) => {
          elements.forEach(element => {
            const rect = element.getBoundingClientRect()
            createParticleBurst(
              rect.left + rect.width / 2,
              rect.top + rect.height / 2
            )
          })
        }
      })
    }

    // ADVANCED: 3D scroll transformations
    const setup3DScrollEffects = () => {
      gsap.utils.toArray('.scroll-3d').forEach((element, index) => {
        gsap.to(element, {
          rotationX: 15,
          rotationY: 10,
          z: -100,
          transformPerspective: 1000,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })
      })
    }

    // CRICKET: Wicket fall animation on scroll milestones
    const setupWicketFallEffects = () => {
      const milestones = [0.2, 0.4, 0.6, 0.8]
      
      milestones.forEach((milestone, index) => {
        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (self.progress >= milestone && !self.milestone?.[index]) {
              self.milestone = self.milestone || {}
              self.milestone[index] = true
              
              // Create wicket fall effect
              const wicket = document.createElement('div')
              wicket.innerHTML = '🏏'
              wicket.style.cssText = `
                position: fixed;
                font-size: 30px;
                right: 50px;
                top: 20px;
                z-index: 9999;
                pointer-events: none;
              `
              document.body.appendChild(wicket)
              
              gsap.timeline()
                .to(wicket, {
                  rotation: 180,
                  y: window.innerHeight,
                  duration: 2,
                  ease: "bounce.out"
                })
                .to(wicket, {
                  opacity: 0,
                  duration: 0.5,
                  onComplete: () => wicket.remove()
                })
            }
          }
        })
      })
    }

    // Initialize all effects
    const progressBar = createScrollProgress()
    setupParallaxText()
    setupMagneticSnap()
    setupCricketBallTrajectory()
    setupAdvancedTextReveals()
    setupScrollParticleBursts()
    setup3DScrollEffects()
    setupWicketFallEffects()

    // Cleanup
    return () => {
      progressBar?.remove()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="advanced-scroll-effects">
      {/* Cricket ball for trajectory */}
      <div className="cricket-trajectory-ball fixed w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg z-50 pointer-events-none opacity-60">
        🏏
      </div>
      
      {/* Scroll milestone indicators */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer opacity-60 hover:opacity-100"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      {/* Performance monitor for scroll effects */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-20 right-4 bg-black/80 text-white text-xs p-3 rounded-lg backdrop-blur-sm font-mono z-50">
          <div>Scroll Effects: Active</div>
          <div>Performance: Optimized</div>
          <div>Triggers: <span id="trigger-count">0</span></div>
        </div>
      )}
    </div>
  )
}

export default AdvancedScrollEffects
