import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, Observer, MotionPathPlugin)

const GamifiedScrollSystem = () => {
  const containerRef = useRef(null)
  const [scrollGame, setScrollGame] = useState({
    score: 0,
    streak: 0,
    level: 1,
    powerUps: 0
  })
  const [activeEffects, setActiveEffects] = useState([])

  useEffect(() => {
    let scrollVelocity = 0
    let lastScrollY = 0
    let animationFrame
    
    // Game Elements
    const createScrollParticle = (x, y, type = 'normal') => {
      const particle = document.createElement('div')
      particle.className = 'fixed pointer-events-none z-50'
      
      const particleTypes = {
        normal: '✨',
        cricket: '🏏',
        trophy: '🏆',
        fire: '🔥',
        star: '⭐'
      }
      
      particle.innerHTML = `
        <div class="text-2xl animate-bounce" style="animation-duration: 0.5s;">
          ${particleTypes[type] || particleTypes.normal}
        </div>
      `
      
      particle.style.left = x + 'px'
      particle.style.top = y + 'px'
      document.body.appendChild(particle)

      gsap.timeline()
        .to(particle, {
          y: y - 100,
          x: x + (Math.random() - 0.5) * 100,
          scale: 1.5,
          rotation: 360,
          duration: 1,
          ease: "power2.out"
        })
        .to(particle, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => particle.remove()
        })
    }

    // Scroll-based game mechanics
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollVelocity = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      // Create particles based on scroll velocity
      if (scrollVelocity > 5) {
        const particleCount = Math.min(Math.floor(scrollVelocity / 10), 5)
        for (let i = 0; i < particleCount; i++) {
          setTimeout(() => {
            createScrollParticle(
              Math.random() * window.innerWidth,
              Math.random() * 100 + 50,
              scrollVelocity > 20 ? 'fire' : 'normal'
            )
          }, i * 50)
        }

        // Update game score
        setScrollGame(prev => ({
          ...prev,
          score: prev.score + Math.floor(scrollVelocity / 2),
          streak: prev.streak + 1
        }))
      }

      // Reset streak if scroll stops
      clearTimeout(window.scrollTimeout)
      window.scrollTimeout = setTimeout(() => {
        setScrollGame(prev => ({ ...prev, streak: 0 }))
      }, 1000)
    }

    // Section-based achievements
    const createSectionAchievements = () => {
      const sections = document.querySelectorAll('section, .hero-section, .stats-section, .features-section')
      
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => {
            // Section entered achievement
            createScrollParticle(
              window.innerWidth / 2,
              100,
              ['cricket', 'trophy', 'star'][index % 3]
            )
            
            setScrollGame(prev => ({
              ...prev,
              score: prev.score + 50,
              powerUps: prev.powerUps + (index % 3 === 0 ? 1 : 0)
            }))

            // Create section-specific effects
            createSectionEffect(section, index)
          }
        })
      })
    }

    // Section-specific visual effects
    const createSectionEffect = (section, index) => {
      const effectTypes = [
        () => createFloatingBalls(section),
        () => createSparkleShower(section),
        () => createWaveEffect(section),
        () => createSpinningElements(section)
      ]
      
      effectTypes[index % effectTypes.length]()
    }

    // Floating cricket balls effect
    const createFloatingBalls = (section) => {
      const rect = section.getBoundingClientRect()
      
      for (let i = 0; i < 3; i++) {
        const ball = document.createElement('div')
        ball.className = 'fixed pointer-events-none z-40'
        ball.innerHTML = `
          <div class="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg">
            <div class="absolute inset-1 bg-gradient-to-br from-red-300 to-red-500 rounded-full">
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-white rounded-full"></div>
            </div>
          </div>
        `
        
        ball.style.left = (rect.left + Math.random() * rect.width) + 'px'
        ball.style.top = (rect.top + window.scrollY + Math.random() * rect.height) + 'px'
        document.body.appendChild(ball)

        gsap.to(ball, {
          motionPath: {
            path: `M0,0 Q${100 + Math.random() * 200},${-50 - Math.random() * 100} ${200 + Math.random() * 100},0`,
            autoRotate: true
          },
          duration: 3 + Math.random() * 2,
          ease: "power2.inOut",
          onComplete: () => ball.remove()
        })
      }
    }

    // Sparkle shower effect
    const createSparkleShower = (section) => {
      const rect = section.getBoundingClientRect()
      
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          createScrollParticle(
            rect.left + Math.random() * rect.width,
            rect.top + window.scrollY,
            'star'
          )
        }, i * 100)
      }
    }

    // Wave effect
    const createWaveEffect = (section) => {
      const wave = document.createElement('div')
      wave.className = 'fixed pointer-events-none z-30'
      wave.style.cssText = `
        left: 0;
        top: 50%;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, transparent, #3b82f6, transparent);
        transform: translateY(-50%);
      `
      document.body.appendChild(wave)

      gsap.fromTo(wave, {
        scaleX: 0,
        opacity: 1
      }, {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out"
      }).then(() => {
        gsap.to(wave, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => wave.remove()
        })
      })
    }

    // Spinning elements effect
    const createSpinningElements = (section) => {
      const rect = section.getBoundingClientRect()
      
      for (let i = 0; i < 5; i++) {
        const element = document.createElement('div')
        element.className = 'fixed pointer-events-none z-40'
        element.innerHTML = `
          <div class="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-lg">
            <div class="absolute inset-1 bg-gradient-to-br from-amber-200 to-orange-300 rounded-sm"></div>
          </div>
        `
        
        element.style.left = (rect.left + Math.random() * rect.width) + 'px'
        element.style.top = (rect.top + window.scrollY + Math.random() * rect.height) + 'px'
        document.body.appendChild(element)

        gsap.to(element, {
          rotation: 720,
          scale: 2,
          opacity: 0,
          duration: 2,
          ease: "power2.out",
          onComplete: () => element.remove()
        })
      }
    }

    // Power-up system
    const createPowerUpEffect = () => {
      if (scrollGame.powerUps > 0) {
        const powerUp = document.createElement('div')
        powerUp.className = 'fixed top-20 right-20 z-50 pointer-events-none'
        powerUp.innerHTML = `
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-xl animate-pulse">
            🔥 POWER UP ACTIVE! 🔥
          </div>
        `
        document.body.appendChild(powerUp)

        gsap.fromTo(powerUp, {
          scale: 0,
          rotation: -180
        }, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        })

        setTimeout(() => {
          gsap.to(powerUp, {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            onComplete: () => powerUp.remove()
          })
        }, 3000)
      }
    }

    // Game HUD
    const createGameHUD = () => {
      const hud = document.createElement('div')
      hud.id = 'scroll-game-hud'
      hud.className = 'fixed top-4 right-4 z-50 pointer-events-none'
      hud.innerHTML = `
        <div class="bg-black/80 backdrop-blur-md text-white p-4 rounded-2xl border border-blue-500/30 font-mono">
          <div class="text-sm space-y-1">
            <div>Score: <span id="scroll-score">${scrollGame.score}</span></div>
            <div>Streak: <span id="scroll-streak">${scrollGame.streak}</span>x</div>
            <div>Level: <span id="scroll-level">${scrollGame.level}</span></div>
          </div>
        </div>
      `
      document.body.appendChild(hud)
      return hud
    }

    // Initialize system
    window.addEventListener('scroll', handleScroll, { passive: true })
    createSectionAchievements()
    const gameHUD = createGameHUD()

    // Update HUD
    const updateHUD = () => {
      const scoreEl = document.getElementById('scroll-score')
      const streakEl = document.getElementById('scroll-streak')
      const levelEl = document.getElementById('scroll-level')
      
      if (scoreEl) scoreEl.textContent = scrollGame.score
      if (streakEl) streakEl.textContent = scrollGame.streak
      if (levelEl) levelEl.textContent = scrollGame.level
    }

    // Animation loop
    const animate = () => {
      updateHUD()
      
      // Level progression
      const newLevel = Math.floor(scrollGame.score / 500) + 1
      if (newLevel > scrollGame.level) {
        setScrollGame(prev => ({ ...prev, level: newLevel }))
        createPowerUpEffect()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrame) cancelAnimationFrame(animationFrame)
      if (gameHUD && gameHUD.parentNode) gameHUD.remove()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      clearTimeout(window.scrollTimeout)
    }
  }, [scrollGame.score, scrollGame.level, scrollGame.powerUps])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-20">
      {/* Background gradient that responds to scroll game */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, ${0.05 + scrollGame.level * 0.01}) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(239, 68, 68, ${0.05 + scrollGame.streak * 0.002}) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(34, 197, 94, ${0.05 + scrollGame.score * 0.0001}) 0%, transparent 50%)
          `
        }}
      />

      {/* Achievement notifications */}
      <div className="fixed bottom-4 left-4 z-50 pointer-events-none space-y-2">
        {scrollGame.streak > 10 && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce">
            🔥 ON FIRE! {scrollGame.streak}x streak!
          </div>
        )}
        {scrollGame.level > 1 && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            ⭐ Level {scrollGame.level} achieved!
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scrollGamePulse {
          0%, 100% { 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            transform: scale(1.05);
            filter: brightness(1.1);
          }
        }
      `}</style>
    </div>
  )
}

export default GamifiedScrollSystem
