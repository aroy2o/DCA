import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Trophy, Target, Star, Zap, Crown, Medal, Flame, Shield, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const GamefiedExperience = () => {
  const containerRef = useRef(null)
  const gameUIRef = useRef(null)
  const [gameStats, setGameStats] = useState({
    score: 0,
    level: 1,
    achievements: 0,
    combo: 0
  })
  const [gameEffects, setGameEffects] = useState([])
  const [isGameActive, setIsGameActive] = useState(false)

  useEffect(() => {
    let frameId
    const gameElements = []
    const particles = []
    
    // Initialize Game UI
    const initializeGameUI = () => {
      // Create game HUD
      const gameHUD = document.createElement('div')
      gameHUD.className = 'fixed top-4 left-4 z-50 pointer-events-none'
      gameHUD.innerHTML = `
        <div class="bg-black/80 backdrop-blur-md text-white p-4 rounded-2xl border border-amber-500/30 font-mono">
          <div class="flex items-center space-x-4 text-sm">
            <div class="flex items-center">
              <Trophy class="w-4 h-4 mr-1 text-amber-400" />
              <span id="game-score">${gameStats.score}</span>
            </div>
            <div class="flex items-center">
              <Star class="w-4 h-4 mr-1 text-blue-400" />
              <span>LVL ${gameStats.level}</span>
            </div>
            <div class="flex items-center">
              <Target class="w-4 h-4 mr-1 text-green-400" />
              <span id="combo-counter">${gameStats.combo}x</span>
            </div>
          </div>
          <div class="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div id="xp-bar" class="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300" style="width: 45%"></div>
          </div>
        </div>
      `
      document.body.appendChild(gameHUD)
      return gameHUD
    }

    // Create Floating Cricket Balls with Physics
    const createFloatingBalls = () => {
      for (let i = 0; i < 6; i++) {
        const ball = document.createElement('div')
        ball.className = 'fixed pointer-events-auto cursor-pointer z-40'
        ball.innerHTML = `
          <div class="relative w-12 h-12 group">
            <div class="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-180">
              <div class="absolute inset-2 bg-gradient-to-br from-red-400 to-red-600 rounded-full">
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white rounded-full"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-full"></div>
              </div>
            </div>
            <div class="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </div>
        `
        
        // Random initial position
        ball.style.left = Math.random() * (window.innerWidth - 100) + 'px'
        ball.style.top = Math.random() * (window.innerHeight - 100) + 'px'
        
        document.body.appendChild(ball)

        // Click interaction
        ball.addEventListener('click', (e) => {
          createClickEffect(e.clientX, e.clientY)
          updateScore(100)
          ball.remove()
          
          // Create new ball after delay
          setTimeout(() => {
            if (isGameActive) createFloatingBalls()
          }, 2000 + Math.random() * 3000)
        })

        // Floating animation
        gsap.to(ball, {
          y: -200 - Math.random() * 100,
          x: (Math.random() - 0.5) * 300,
          rotation: 360,
          duration: 8 + Math.random() * 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.5
        })

        gameElements.push(ball)
      }
    }

    // Create Click Effects
    const createClickEffect = (x, y) => {
      // Score popup
      const scorePopup = document.createElement('div')
      scorePopup.className = 'fixed pointer-events-none z-50 text-2xl font-black text-amber-400'
      scorePopup.style.left = x + 'px'
      scorePopup.style.top = y + 'px'
      scorePopup.textContent = '+100'
      document.body.appendChild(scorePopup)

      gsap.timeline()
        .to(scorePopup, {
          y: -50,
          scale: 1.5,
          duration: 0.3,
          ease: "back.out(1.7)"
        })
        .to(scorePopup, {
          opacity: 0,
          y: -100,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => scorePopup.remove()
        })

      // Particle burst
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div')
        particle.className = 'fixed pointer-events-none z-50 w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full'
        particle.style.left = x + 'px'
        particle.style.top = y + 'px'
        document.body.appendChild(particle)

        const angle = (i / 8) * Math.PI * 2
        const distance = 80 + Math.random() * 40

        gsap.to(particle, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => particle.remove()
        })
      }

      // Shockwave effect
      const shockwave = document.createElement('div')
      shockwave.className = 'fixed pointer-events-none z-40 border-4 border-amber-400/50 rounded-full'
      shockwave.style.left = (x - 25) + 'px'
      shockwave.style.top = (y - 25) + 'px'
      shockwave.style.width = '50px'
      shockwave.style.height = '50px'
      document.body.appendChild(shockwave)

      gsap.to(shockwave, {
        scale: 6,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => shockwave.remove()
      })
    }

    // Update Score System
    const updateScore = (points) => {
      setGameStats(prev => {
        const newScore = prev.score + points
        const newLevel = Math.floor(newScore / 1000) + 1
        const newCombo = prev.combo + 1
        
        // Update DOM elements
        const scoreEl = document.getElementById('game-score')
        const comboEl = document.getElementById('combo-counter')
        const xpBar = document.getElementById('xp-bar')
        
        if (scoreEl) scoreEl.textContent = newScore
        if (comboEl) comboEl.textContent = newCombo + 'x'
        if (xpBar) {
          const progress = (newScore % 1000) / 1000 * 100
          xpBar.style.width = progress + '%'
        }

        return {
          score: newScore,
          level: newLevel,
          combo: newCombo,
          achievements: prev.achievements + (newLevel > prev.level ? 1 : 0)
        }
      })
    }

    // Power-up System
    const createPowerUp = () => {
      const powerUp = document.createElement('div')
      powerUp.className = 'fixed pointer-events-auto cursor-pointer z-40'
      powerUp.innerHTML = `
        <div class="relative w-16 h-16 group">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-xl transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 animate-pulse">
            <Crown class="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div class="absolute -inset-4 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
        </div>
      `
      
      powerUp.style.left = Math.random() * (window.innerWidth - 100) + 'px'
      powerUp.style.top = Math.random() * (window.innerHeight - 100) + 'px'
      document.body.appendChild(powerUp)

      powerUp.addEventListener('click', (e) => {
        createPowerUpEffect(e.clientX, e.clientY)
        updateScore(500)
        activateMultiplier()
        powerUp.remove()
      })

      // Auto-remove after 10 seconds
      setTimeout(() => {
        if (powerUp.parentNode) powerUp.remove()
      }, 10000)

      gsap.fromTo(powerUp, 
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
      )
    }

    // Power-up Effects
    const createPowerUpEffect = (x, y) => {
      const effect = document.createElement('div')
      effect.className = 'fixed pointer-events-none z-50 text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
      effect.style.left = x + 'px'
      effect.style.top = y + 'px'
      effect.textContent = 'POWER UP!'
      document.body.appendChild(effect)

      gsap.timeline()
        .to(effect, {
          scale: 2,
          y: -80,
          duration: 0.5,
          ease: "back.out(1.7)"
        })
        .to(effect, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => effect.remove()
        })
    }

    // Score Multiplier
    const activateMultiplier = () => {
      const multiplier = document.createElement('div')
      multiplier.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none'
      multiplier.innerHTML = `
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-black text-lg shadow-xl border border-purple-400/50">
          🔥 2x MULTIPLIER ACTIVE! 🔥
        </div>
      `
      document.body.appendChild(multiplier)

      gsap.fromTo(multiplier,
        { scale: 0, y: -50 },
        { scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      )

      setTimeout(() => {
        gsap.to(multiplier, {
          scale: 0,
          y: -50,
          duration: 0.4,
          onComplete: () => multiplier.remove()
        })
      }, 5000)
    }

    // Achievement System
    const showAchievement = (title, description) => {
      const achievement = document.createElement('div')
      achievement.className = 'fixed top-4 right-4 z-50 pointer-events-none'
      achievement.innerHTML = `
        <div class="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-xl shadow-2xl border border-amber-400/50 max-w-sm">
          <div class="flex items-center mb-2">
            <Medal class="w-6 h-6 mr-2" />
            <span class="font-black text-lg">ACHIEVEMENT!</span>
          </div>
          <div class="font-bold">${title}</div>
          <div class="text-sm opacity-90">${description}</div>
        </div>
      `
      document.body.appendChild(achievement)

      gsap.fromTo(achievement,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      )

      setTimeout(() => {
        gsap.to(achievement, {
          x: 300,
          opacity: 0,
          duration: 0.4,
          onComplete: () => achievement.remove()
        })
      }, 5000)
    }

    // Combo System
    let comboTimeout
    const handleCombo = () => {
      clearTimeout(comboTimeout)
      comboTimeout = setTimeout(() => {
        setGameStats(prev => ({ ...prev, combo: 0 }))
        const comboEl = document.getElementById('combo-counter')
        if (comboEl) comboEl.textContent = '0x'
      }, 3000)
    }

    // Progressive Difficulty
    const increaseDifficulty = () => {
      if (gameStats.level > 1 && gameStats.level % 2 === 0) {
        createPowerUp()
      }
      
      if (gameStats.level > 3) {
        // Add more challenging elements
        createMovingTarget()
      }
    }

    // Moving Targets
    const createMovingTarget = () => {
      const target = document.createElement('div')
      target.className = 'fixed pointer-events-auto cursor-pointer z-40'
      target.innerHTML = `
        <div class="relative w-10 h-10 group">
          <div class="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-125">
            <Target class="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      `
      
      target.style.left = '100px'
      target.style.top = Math.random() * (window.innerHeight - 100) + 'px'
      document.body.appendChild(target)

      // Moving path
      const path = `M100,${target.style.top.replace('px', '')} Q${window.innerWidth/2},${Math.random() * window.innerHeight} ${window.innerWidth-100},${Math.random() * window.innerHeight}`
      
      gsap.to(target, {
        motionPath: {
          path: path,
          autoRotate: true
        },
        duration: 4,
        ease: "none",
        onComplete: () => target.remove()
      })

      target.addEventListener('click', (e) => {
        createClickEffect(e.clientX, e.clientY)
        updateScore(200)
        target.remove()
      })
    }

    // Initialize Game
    const startGame = () => {
      setIsGameActive(true)
      const gameHUD = initializeGameUI()
      createFloatingBalls()
      
      // Show welcome message
      showAchievement("Game Started!", "Click cricket balls to score points!")
      
      // Periodic power-ups
      const powerUpInterval = setInterval(() => {
        if (isGameActive) createPowerUp()
      }, 15000)

      // Level progression
      const levelInterval = setInterval(() => {
        if (gameStats.score > 0 && gameStats.score % 1000 === 0) {
          increaseDifficulty()
          showAchievement(`Level ${gameStats.level}!`, "Difficulty increased!")
        }
      }, 1000)

      return () => {
        clearInterval(powerUpInterval)
        clearInterval(levelInterval)
        gameHUD.remove()
        gameElements.forEach(el => el.remove())
        setIsGameActive(false)
      }
    }

    // Auto-start game after 2 seconds
    const gameTimeout = setTimeout(startGame, 2000)

    return () => {
      clearTimeout(gameTimeout)
      clearTimeout(comboTimeout)
      if (frameId) cancelAnimationFrame(frameId)
      gameElements.forEach(el => el.remove())
      setIsGameActive(false)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-30">
      {/* Game Canvas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 transition-all duration-1000"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 25% 75%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)
              `,
              backgroundSize: '200% 200%',
              animation: 'gameBackground 20s ease-in-out infinite'
            }}
          />
        </div>

        {/* Floating Game Elements */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animation: `gameFloat ${8 + Math.random() * 4}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      </div>

      {/* Game Instructions */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-full border border-amber-500/30 font-mono text-sm">
          🎮 Click cricket balls to score • 🏆 Collect power-ups • ⚡ Build combos!
        </div>
      </div>

      <style jsx>{`
        @keyframes gameBackground {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }
        
        @keyframes gameFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}

export default GamefiedExperience
