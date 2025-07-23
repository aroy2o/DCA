import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MicroInteractions = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // Cursor trail effect
    const cursor = document.querySelector('.magic-cursor')
    if (!cursor) return

    let trail = []
    const trailLength = 8
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement('div')
      dot.className = 'cursor-trail-dot'
      dot.style.cssText = `
        position: fixed;
        width: ${6 - i}px;
        height: ${6 - i}px;
        background: rgba(79, 195, 247, ${0.8 - i * 0.1});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        mix-blend-mode: multiply;
        transition: all 0.1s ease;
      `
      document.body.appendChild(dot)
      trail.push(dot)
    }

    const updateTrail = (e) => {
      trail.forEach((dot, index) => {
        setTimeout(() => {
          dot.style.left = (e.clientX - (6 - index) / 2) + 'px'
          dot.style.top = (e.clientY - (6 - index) / 2) + 'px'
        }, index * 10)
      })
    }

    document.addEventListener('mousemove', updateTrail)

    // Ripple effect on clicks
    const createRipple = (e) => {
      const ripple = document.createElement('div')
      ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(79, 195, 247, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9997;
        left: ${e.clientX - 25}px;
        top: ${e.clientY - 25}px;
        width: 50px;
        height: 50px;
        transform: scale(0);
      `
      
      document.body.appendChild(ripple)
      
      gsap.to(ripple, {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      })
    }

    document.addEventListener('click', createRipple)

    // Button press animation
    const buttons = document.querySelectorAll('button, a, .clickable')
    
    buttons.forEach(button => {
      button.addEventListener('mousedown', () => {
        gsap.to(button, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out"
        })
      })
      
      button.addEventListener('mouseup', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "elastic.out(1, 0.3)"
        })
      })
    })

    // Scroll-triggered micro animations
    ScrollTrigger.batch(".micro-animate", {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)"
        })
      },
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0.7,
          y: -10,
          stagger: 0.05,
          duration: 0.3
        })
      },
      onEnterBack: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)"
        })
      }
    })

    // Text reveal animation
    const textElements = document.querySelectorAll('.text-reveal')
    
    textElements.forEach(element => {
      const text = element.textContent
      element.innerHTML = text.split('').map(char => 
        char === ' ' ? ' ' : `<span class="char" style="opacity: 0; display: inline-block; transform: translateY(50px);">${char}</span>`
      ).join('')
      
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        onEnter: () => {
          gsap.to(element.querySelectorAll('.char'), {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.6,
            ease: "back.out(1.7)"
          })
        }
      })
    })

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateTrail)
      document.removeEventListener('click', createRipple)
      trail.forEach(dot => dot.remove())
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="micro-interactions-container">
      {/* Interactive floating particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-micro-particle absolute w-1 h-1 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 space-y-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-amber-400/30 rounded-full transition-all duration-300 hover:bg-amber-400/60 hover:scale-125 cursor-pointer"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      {/* Performance monitor (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/50 text-white text-xs p-2 rounded backdrop-blur-sm font-mono">
          <div>FPS: <span id="fps-counter">60</span></div>
          <div>Animations: <span id="active-animations">0</span></div>
        </div>
      )}
      
      <style jsx>{`
        .floating-micro-particle {
          animation: float-micro 8s ease-in-out infinite;
        }
        
        @keyframes float-micro {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) rotate(270deg);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}

export default MicroInteractions
