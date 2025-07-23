import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const InteractiveParticleSystem = () => {
  const containerRef = useRef(null)
  const [particles, setParticles] = useState([])
  const [isInteractive, setIsInteractive] = useState(true)

  useEffect(() => {
    let animationFrame
    const particleArray = []
    const maxParticles = 50

    class InteractiveParticle {
      constructor(x, y, type = 'default') {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 4
        this.vy = (Math.random() - 0.5) * 4
        this.life = 1
        this.decay = 0.02 + Math.random() * 0.02
        this.type = type
        this.size = Math.random() * 6 + 2
        this.hue = Math.random() * 360
        this.element = this.createElement()
        this.trail = []
      }

      createElement() {
        const particle = document.createElement('div')
        particle.className = 'fixed pointer-events-none z-40'
        
        switch(this.type) {
          case 'cricket':
            particle.innerHTML = `
              <div class="w-${Math.floor(this.size)}px h-${Math.floor(this.size)}px bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg transform">
                <div class="absolute inset-0.5 bg-gradient-to-br from-red-300 to-red-500 rounded-full">
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-white rounded-full opacity-80"></div>
                </div>
              </div>
            `
            break
          case 'spark':
            particle.innerHTML = `
              <div class="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg animate-pulse"></div>
            `
            break
          case 'glow':
            particle.innerHTML = `
              <div class="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-2xl opacity-70 blur-sm"></div>
            `
            break
          default:
            particle.innerHTML = `
              <div class="w-3 h-3 rounded-full shadow-lg" style="background: hsl(${this.hue}, 70%, 60%); box-shadow: 0 0 10px hsl(${this.hue}, 70%, 60%)"></div>
            `
        }
        
        particle.style.left = this.x + 'px'
        particle.style.top = this.y + 'px'
        document.body.appendChild(particle)
        return particle
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= this.decay
        this.vx *= 0.99
        this.vy *= 0.99
        this.vy += 0.1 // Gravity

        // Update trail
        this.trail.push({ x: this.x, y: this.y, life: this.life })
        if (this.trail.length > 10) this.trail.shift()

        // Update DOM element
        if (this.element) {
          this.element.style.left = this.x + 'px'
          this.element.style.top = this.y + 'px'
          this.element.style.opacity = this.life
          this.element.style.transform = `scale(${this.life})`
        }
        return this.life > 0
      }

      destroy() {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element)
        }
      }
    }

    // Create particle on click
    const handleClick = (e) => {
      if (!isInteractive) return

      const particleCount = 12 + Math.random() * 8
      const colors = ['cricket', 'spark', 'glow', 'default']
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2
        const velocity = 3 + Math.random() * 5
        const distance = 20 + Math.random() * 30
        
        const particle = new InteractiveParticle(
          e.clientX + Math.cos(angle) * distance,
          e.clientY + Math.sin(angle) * distance,
          colors[Math.floor(Math.random() * colors.length)]
        )
        
        particle.vx = Math.cos(angle) * velocity
        particle.vy = Math.sin(angle) * velocity
        particleArray.push(particle)
      }

      // Create shockwave effect
      createShockwave(e.clientX, e.clientY)
    }

    // Create shockwave effect
    const createShockwave = (x, y) => {
      const shockwave = document.createElement('div')
      shockwave.className = 'fixed pointer-events-none z-30'
      shockwave.style.cssText = `
        left: ${x - 50}px;
        top: ${y - 50}px;
        width: 100px;
        height: 100px;
        border: 3px solid rgba(59, 130, 246, 0.8);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
      `
      document.body.appendChild(shockwave)

      gsap.fromTo(shockwave, {
        scale: 0,
        opacity: 1
      }, {
        scale: 4,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => shockwave.remove()
      })
    }

    // Mouse trail effect
    let mouseTrail = []
    const handleMouseMove = (e) => {
      if (!isInteractive) return

      mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() })
      if (mouseTrail.length > 5) mouseTrail.shift()

      // Create trailing particles occasionally
      if (Math.random() < 0.1) {
        const particle = new InteractiveParticle(
          e.clientX + (Math.random() - 0.5) * 20,
          e.clientY + (Math.random() - 0.5) * 20,
          'glow'
        )
        particle.decay = 0.05
        particleArray.push(particle)
      }
    }

    // Scroll-triggered particle bursts
    const createScrollParticles = () => {
      ScrollTrigger.batch('.particle-trigger', {
        onEnter: (elements) => {
          elements.forEach(element => {
            const rect = element.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            for (let i = 0; i < 8; i++) {
              const particle = new InteractiveParticle(
                centerX + (Math.random() - 0.5) * 100,
                centerY + (Math.random() - 0.5) * 100,
                Math.random() < 0.5 ? 'spark' : 'cricket'
              )
              particleArray.push(particle)
            }
          })
        }
      })
    }

    // Floating ambient particles
    const createAmbientParticles = () => {
      for (let i = 0; i < 15; i++) {
        const particle = new InteractiveParticle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          'default'
        )
        particle.vx = (Math.random() - 0.5) * 2
        particle.vy = (Math.random() - 0.5) * 2
        particle.decay = 0.005 // Very slow decay
        particle.life = 0.3 + Math.random() * 0.4
        particleArray.push(particle)
      }
    }

    // Animation loop
    const animate = () => {
      // Update all particles
      for (let i = particleArray.length - 1; i >= 0; i--) {
        const particle = particleArray[i]
        if (!particle.update()) {
          particle.destroy()
          particleArray.splice(i, 1)
        }
      }

      // Maintain particle count
      while (particleArray.length < 20) {
        const particle = new InteractiveParticle(
          Math.random() * window.innerWidth,
          -10,
          'default'
        )
        particle.vy = Math.random() * 2 + 1
        particle.decay = 0.01
        particleArray.push(particle)
      }

      // Limit total particles
      if (particleArray.length > maxParticles) {
        const excess = particleArray.splice(0, particleArray.length - maxParticles)
        excess.forEach(particle => particle.destroy())
      }

      animationFrame = requestAnimationFrame(animate)
    }

    // Section-specific particle effects
    const createSectionEffects = () => {
      // Hero section - floating cricket balls
      const heroSection = document.querySelector('.hero-section')
      if (heroSection) {
        const heroBalls = []
        for (let i = 0; i < 3; i++) {
          const ball = new InteractiveParticle(
            Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
            Math.random() * window.innerHeight * 0.3 + window.innerHeight * 0.1,
            'cricket'
          )
          ball.vx = (Math.random() - 0.5) * 1
          ball.vy = (Math.random() - 0.5) * 1
          ball.decay = 0.002
          ball.life = 0.8
          heroBalls.push(ball)
          particleArray.push(ball)
        }

        // Orbital motion
        heroBalls.forEach((ball, index) => {
          gsap.to(ball, {
            rotation: 360,
            transformOrigin: "50% 200px",
            duration: 20 + index * 5,
            repeat: -1,
            ease: "none"
          })
        })
      }

      // Stats section - number particles
      const statsSection = document.querySelector('.stats-section')
      if (statsSection) {
        ScrollTrigger.create({
          trigger: statsSection,
          start: "top 70%",
          onEnter: () => {
            const statCards = statsSection.querySelectorAll('.stat-card')
            statCards.forEach((card, index) => {
              setTimeout(() => {
                const rect = card.getBoundingClientRect()
                for (let i = 0; i < 6; i++) {
                  const particle = new InteractiveParticle(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    'spark'
                  )
                  particle.vx = (Math.random() - 0.5) * 6
                  particle.vy = (Math.random() - 0.5) * 6 - 2
                  particleArray.push(particle)
                }
              }, index * 300)
            })
          }
        })
      }
    }

    // Initialize system
    document.addEventListener('click', handleClick)
    document.addEventListener('mousemove', handleMouseMove)
    
    createAmbientParticles()
    createScrollParticles()
    createSectionEffects()
    
    // Start animation loop
    animate()

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('mousemove', handleMouseMove)
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      
      particleArray.forEach(particle => particle.destroy())
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isInteractive])

  // Interactive controls
  const toggleInteractivity = () => {
    setIsInteractive(!isInteractive)
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-20">
      {/* Particle System Canvas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background gradient that responds to particles */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-1000"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)
            `,
            backgroundSize: '200% 200%',
            animation: 'particleBackground 25s ease-in-out infinite'
          }}
        />
      </div>

      {/* Interactive Controls */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-auto">
        <button
          onClick={toggleInteractivity}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
            isInteractive 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl' 
              : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
          }`}
        >
          {isInteractive ? '✨ Interactive Mode' : '💤 Static Mode'}
        </button>
      </div>

      {/* Performance indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 pointer-events-none">
          <div className="bg-black/70 text-white text-xs p-2 rounded font-mono">
            Particles: <span id="particle-count">0</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes particleBackground {
          0%, 100% { 
            background-position: 0% 0%; 
            filter: hue-rotate(0deg);
          }
          25% { 
            background-position: 100% 0%; 
            filter: hue-rotate(90deg);
          }
          50% { 
            background-position: 100% 100%; 
            filter: hue-rotate(180deg);
          }
          75% { 
            background-position: 0% 100%; 
            filter: hue-rotate(270deg);
          }
        }
      `}</style>
    </div>
  )
}

export default InteractiveParticleSystem
