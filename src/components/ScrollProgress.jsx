import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'

const ScrollProgress = ({ progress }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [ballPosition, setBallPosition] = useState(0)
  const [isRolling, setIsRolling] = useState(false)
  const [lastProgress, setLastProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [currentSection, setCurrentSection] = useState('')
  const [ballSpeed, setBallSpeed] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const scrollbarRef = useRef(null)
  const ballRef = useRef(null)
  const lastScrollTime = useRef(Date.now())
  
  // Spring animation for smooth ball movement
  const springProgress = useSpring(progress, { stiffness: 400, damping: 30 })

  // Enhanced sections with better consistency
  const sections = [
    { name: 'Hero', start: 0, end: 20, icon: '🏏', color: '#f59e0b', description: 'Welcome to Cricket Excellence' },
    { name: 'Programs', start: 20, end: 40, icon: '🎯', color: '#22c55e', description: 'Elite Training Programs' },
    { name: 'Features', start: 40, end: 60, icon: '⭐', color: '#3b82f6', description: 'Academy Advantages' },
    { name: 'Stats', start: 60, end: 80, icon: '📊', color: '#8b5cf6', description: 'Championship Results' },
    { name: 'Contact', start: 80, end: 100, icon: '📞', color: '#ef4444', description: 'Join Our Academy' }
  ]

    // Enhanced scroll detection with velocity and consistency
  useEffect(() => {
    setIsVisible(progress > 0.5)
    setBallPosition(progress)
    setShowScrollToTop(progress > 20)
    
    // Current section detection
    const currentSec = sections.find(s => progress >= s.start && progress <= s.end)
    setCurrentSection(currentSec?.name || '')
    
    // Enhanced velocity calculation for better consistency
    const now = Date.now()
    const timeDiff = now - lastScrollTime.current
    const progressDiff = progress - lastProgress
    
    if (timeDiff > 0) {
      const velocity = Math.abs(progressDiff) / timeDiff * 1000
      setBallSpeed(Math.min(velocity, 100)) // Cap speed for consistency
      setIsRolling(velocity > 3) // Lower threshold for better responsiveness
      setIsScrollingUp(progressDiff < -0.1) // Add threshold to prevent flickering
      
      // Consistent auto-stop rolling animation
      const rollDuration = Math.min(Math.max(velocity * 8, 300), 1500)
      const timer = setTimeout(() => setIsRolling(false), rollDuration)
      lastScrollTime.current = now
      return () => clearTimeout(timer)
    }
    setLastProgress(progress)
  }, [progress, lastProgress])

  // Enhanced cricket sound effect with consistency
  const createSoundEffect = useCallback(() => {
    if (!soundEnabled) return
    
    const soundWave = document.createElement('div')
    soundWave.className = 'cricket-sound-wave'
    soundWave.style.cssText = `
      position: fixed;
      top: 8px;
      left: ${ballPosition}%;
      width: 35px;
      height: 35px;
      border: 3px solid #22c55e;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.9;
      animation: soundWaveExpand 0.8s ease-out forwards;
      box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
    `
    document.body.appendChild(soundWave)
    setTimeout(() => soundWave.remove(), 800)
  }, [ballPosition, soundEnabled])

  // Enhanced cricket ball click with combo system
  const handleBallClick = useCallback(() => {
    const ball = ballRef.current || document.querySelector('.cricket-ball')
    if (!ball) return

    setClickCount(prev => prev + 1)
    
    // Reset click count after 2 seconds
    setTimeout(() => setClickCount(0), 2000)
    
    // Enhanced effects with better consistency
    const effects = {
      1: { scale: 1.4, rotation: 360, duration: 350 },
      2: { scale: 1.6, rotation: 720, duration: 450 },
      3: { scale: 1.8, rotation: 1080, duration: 550 },
      4: { scale: 2.1, rotation: 1440, duration: 650 },
      5: { scale: 2.4, rotation: 1800, duration: 750 }
    }
    
    const effect = effects[Math.min(clickCount, 5)] || effects[1]
    
    ball.style.transition = `transform ${effect.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    ball.style.transform = `translateY(-50%) scale(${effect.scale}) rotate(${effect.rotation}deg)`
    ball.style.boxShadow = `0 0 ${25 + clickCount * 12}px #dc2626, 0 0 ${50 + clickCount * 25}px #dc262650`
    ball.style.filter = `brightness(${1 + clickCount * 0.1}) saturate(${1 + clickCount * 0.15})`
    
    setTimeout(() => {
      ball.style.transform = 'translateY(-50%) scale(1) rotate(0deg)'
      ball.style.boxShadow = ''
      ball.style.filter = ''
      ball.style.transition = 'all 0.3s ease'
    }, effect.duration)
    
    // Create enhanced trail based on click count
    createEnhancedBallTrail(clickCount)
    createSoundEffect()
    
    // Celebration effect for 5+ clicks
    if (clickCount >= 5) {
      setShowCelebration(true)
      createCelebrationEffect()
      setTimeout(() => setShowCelebration(false), 2000)
    }
  }, [clickCount, createSoundEffect])

  // Create enhanced interactive ball trail
  const createEnhancedBallTrail = useCallback((intensity = 1) => {
    const trailCount = Math.min(5 + intensity * 2, 15)
    
    for (let i = 0; i < trailCount; i++) {
      setTimeout(() => {
        const trail = document.createElement('div')
        trail.className = 'ball-trail-effect-enhanced'
        const size = 4 + intensity
        const randomOffset = (Math.random() - 0.5) * 20
        
        trail.style.cssText = `
          position: fixed;
          top: ${6 + randomOffset}px;
          left: calc(${ballPosition}% + ${randomOffset}px);
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, 
            ${intensity > 3 ? '#ffd700' : '#dc2626'}, 
            ${intensity > 3 ? '#ff8c00' : '#991b1b'}, 
            transparent
          );
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.9;
          animation: enhancedTrailFade ${0.8 + intensity * 0.2}s ease-out forwards;
        `
        document.body.appendChild(trail)
        setTimeout(() => trail.remove(), 1000 + intensity * 200)
      }, i * (50 - intensity * 5))
    }
  }, [ballPosition])

  // Create celebration effect for multiple clicks
  const createCelebrationEffect = useCallback(() => {
    const colors = ['#ffd700', '#ff6347', '#32cd32', '#ff69b4', '#00bfff']
    
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const firework = document.createElement('div')
        firework.className = 'celebration-firework'
        const angle = (Math.PI * 2 * i) / 20
        const distance = 50 + Math.random() * 50
        const color = colors[Math.floor(Math.random() * colors.length)]
        
        firework.style.cssText = `
          position: fixed;
          top: 6px;
          left: ${ballPosition}%;
          width: 6px;
          height: 6px;
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          opacity: 1;
          animation: celebrationBurst 1.5s ease-out forwards;
          --angle: ${angle}rad;
          --distance: ${distance}px;
        `
        document.body.appendChild(firework)
        setTimeout(() => firework.remove(), 1500)
      }, i * 50)
    }
  }, [ballPosition])

  // Enhanced scrollbar dragging with momentum
  const handleScrollbarMouseDown = useCallback((e) => {
    setIsDragging(true)
    setShowTooltip(true)
    handleScrollbarMove(e)
    document.body.style.cursor = 'grabbing'
  }, [])

  const handleScrollbarMove = useCallback((e) => {
    if (!scrollbarRef.current) return
    
    const rect = scrollbarRef.current.getBoundingClientRect()
    const y = e.clientY - rect.top
    const newProgress = Math.max(0, Math.min(100, (y / rect.height) * 100))
    
    // Calculate target scroll position with easing
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = (newProgress / 100) * maxScroll
    
    // Smooth scroll with momentum
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
  }, [])

  // Section jumping with smooth animation
  const jumpToSection = useCallback((section) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = (section.start / 100) * maxScroll
    
    // Create jump effect
    createJumpEffect(section)
    
    window.scrollTo({ 
      top: targetScroll, 
      behavior: 'smooth' 
    })
  }, [])

  // Create visual jump effect
  const createJumpEffect = useCallback((section) => {
    const jumpIndicator = document.createElement('div')
    jumpIndicator.className = 'section-jump-effect'
    jumpIndicator.innerHTML = `
      <div class="jump-icon">${section.icon}</div>
      <div class="jump-text">${section.name}</div>
    `
    jumpIndicator.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, ${section.color}20, ${section.color}40);
      border: 2px solid ${section.color};
      border-radius: 20px;
      padding: 20px 30px;
      pointer-events: none;
      z-index: 10000;
      color: ${section.color};
      font-weight: bold;
      text-align: center;
      backdrop-filter: blur(15px);
      animation: jumpEffect 1s ease-out forwards;
    `
    document.body.appendChild(jumpIndicator)
    setTimeout(() => jumpIndicator.remove(), 1000)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault()
            window.scrollBy({ top: -200, behavior: 'smooth' })
            createSoundEffect()
            break
          case 'ArrowDown':
            e.preventDefault()
            window.scrollBy({ top: 200, behavior: 'smooth' })
            createSoundEffect()
            break
          case 'Home':
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            break
          case 'End':
            e.preventDefault()
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [createSoundEffect])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        handleScrollbarMove(e)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setShowTooltip(false)
      document.body.style.cursor = 'auto'
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleScrollbarMove])

  return (
    <>
      {/* Main Progress Bar */}
      <motion.div
        className="cricket-scroll-progress"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Track (Cricket Pitch) */}
        <div className="scroll-track">
          {/* Pitch Lines */}
          <div className="pitch-lines">
            <div className="crease-line" style={{ left: '22%' }}></div>
            <div className="crease-line" style={{ left: '50%' }}></div>
            <div className="crease-line" style={{ left: '78%' }}></div>
          </div>
          
          {/* Progress Fill (Grass Field) */}
          <motion.div
            className="scroll-fill"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          
          {/* Cricket Ball with enhanced animations */}
          <motion.div
            ref={ballRef}
            className={`cricket-ball ${isRolling ? 'rolling' : ''} ${ballSpeed > 50 ? 'fast-rolling' : ''} ${isScrollingUp ? 'reverse-rolling' : ''}`}
            style={{ left: `calc(${ballPosition}% - 8px)` }}
            animate={{ 
              left: `calc(${ballPosition}% - 8px)`,
              rotate: isScrollingUp ? -ballPosition * 3.6 : ballPosition * 3.6,
              scale: isDragging ? 1.2 : 1
            }}
            transition={{ 
              type: "spring", 
              stiffness: ballSpeed > 30 ? 600 : 400, 
              damping: ballSpeed > 30 ? 40 : 30 
            }}
            onClick={handleBallClick}
            whileHover={{ 
              scale: 1.3, 
              boxShadow: "0 0 20px #dc2626, 0 0 40px #dc262640",
              filter: "brightness(1.2)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="ball-seam"></div>
            <div className="ball-highlight"></div>
            
            {/* Speed indicator */}
            {ballSpeed > 30 && (
              <motion.div
                className="speed-lines"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="speed-line"></div>
                <div className="speed-line"></div>
                <div className="speed-line"></div>
              </motion.div>
            )}
            
            {/* Click counter */}
            <AnimatePresence>
              {clickCount > 1 && (
                <motion.div
                  className="click-counter"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  {clickCount}x
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Wickets at key positions */}
          <div className="wicket" style={{ left: '22%' }}>
            <div className="stump"></div>
            <div className="stump"></div>
            <div className="stump"></div>
            <div className="bail"></div>
          </div>
          <div className="wicket" style={{ left: '78%' }}>
            <div className="stump"></div>
            <div className="stump"></div>
            <div className="stump"></div>
            <div className="bail"></div>
          </div>
        </div>
        
        {/* Enhanced Progress Percentage with Cricket Score Style */}
        <motion.div
          className="progress-percentage"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 10 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            className="score-value"
            key={Math.round(progress)}
            initial={{ scale: 1.2, color: '#22c55e' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(progress)}
          </motion.span>
          <span className="score-unit">%</span>
          <div className="score-indicator"></div>
          
          {/* Speed indicator */}
          {ballSpeed > 20 && (
            <motion.div
              className="speed-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              ⚡ {Math.round(ballSpeed)}
            </motion.div>
          )}
        </motion.div>
        
        {/* Celebration overlay */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="celebration-overlay"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="celebration-text">🎉 SIXER! 🎉</div>
              <div className="celebration-subtext">Amazing clicking skills!</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Interactive Scrollbar */}
      <motion.div 
        className="cricket-scrollbar-container"
        ref={scrollbarRef}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => !isDragging && setShowTooltip(false)}
      >
        <div className="cricket-scrollbar-track">
          {/* Enhanced section markers with colors */}
          <div className="section-markers">
            {sections.map((section, index) => (
              <motion.div
                key={section.name}
                className="section-marker"
                style={{ 
                  top: `${section.start}%`,
                  backgroundColor: section.color,
                  boxShadow: `0 0 10px ${section.color}60`
                }}
                whileHover={{ 
                  scale: 2, 
                  backgroundColor: section.color,
                  boxShadow: `0 0 20px ${section.color}80`
                }}
                onClick={() => jumpToSection(section)}
              >
                <motion.span
                  className="marker-icon"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {section.icon}
                </motion.span>
              </motion.div>
            ))}
          </div>
          
          {/* Cricket ball thumb */}
          <motion.div
            className="cricket-scrollbar-thumb"
            style={{ top: `${progress}%` }}
            animate={{ top: `${progress}%` }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onMouseDown={handleScrollbarMouseDown}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="ball-texture">
              <div className="ball-seam"></div>
              <div className="ball-highlight"></div>
            </div>
            
            {/* Progress ring around ball */}
            <motion.div
              className="progress-ring"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isDragging ? 1.5 : 1, 
                opacity: isDragging ? 0.8 : 0.4 
              }}
              transition={{ duration: 0.2 }}
            >
              <svg width="32" height="32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeDasharray={`${progress * 0.88} 88`}
                  strokeLinecap="round"
                  transform="rotate(-90 16 16)"
                />
              </svg>
            </motion.div>
          </motion.div>
          
          {/* Enhanced interactive tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="section-tooltip"
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ top: `${progress}%` }}
              >
                <div className="tooltip-content">
                  <motion.span 
                    className="section-name"
                    key={currentSection}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    {currentSection || '🏏 Cricket Academy'}
                  </motion.span>
                  
                  <div className="cricket-field-mini">
                    <div className="mini-pitch"></div>
                    <motion.div 
                      className="mini-ball" 
                      animate={{ left: `${progress}%` }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    
                    {/* Mini wickets */}
                    <div className="mini-wicket" style={{ left: '22%' }}></div>
                    <div className="mini-wicket" style={{ left: '78%' }}></div>
                  </div>
                  
                  <div className="tooltip-stats">
                    <div className="scroll-percentage">{Math.round(progress)}%</div>
                    {ballSpeed > 10 && (
                      <div className="scroll-speed">⚡{Math.round(ballSpeed)}</div>
                    )}
                    {isScrollingUp && (
                      <div className="scroll-direction">↑ Up</div>
                    )}
                  </div>
                  
                  {/* Current section description */}
                  {sections.find(s => progress >= s.start && progress <= s.end) && (
                    <motion.div
                      className="section-description"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {sections.find(s => progress >= s.start && progress <= s.end)?.description}
                    </motion.div>
                  )}
                </div>
                <div className="tooltip-arrow"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Enhanced Scroll to Top Cricket Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="scroll-to-top-cricket"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            whileHover={{ 
              scale: 1.15, 
              boxShadow: "0 15px 40px rgba(34, 197, 94, 0.5)",
              rotate: [0, -10, 10, -10, 0],
              transition: { 
                rotate: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
              }
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 15,
              rotate: { duration: 0.6 }
            }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              createSoundEffect()
            }}
          >
            <motion.div 
              className="cricket-bat"
              animate={{ 
                rotate: progress > 80 ? [0, 360] : 0 
              }}
              transition={{ 
                duration: 2, 
                repeat: progress > 80 ? Infinity : 0,
                ease: "linear"
              }}
            >
              <div className="bat-blade"></div>
              <div className="bat-handle"></div>
            </motion.div>
            <span className="scroll-text">Top</span>
            
            {/* Progress ring around button */}
            <motion.div
              className="button-progress-ring"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                background: `conic-gradient(from 0deg, #22c55e ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Sound toggle button */}
      <motion.button
        className="sound-toggle-btn"
        onClick={() => setSoundEnabled(!soundEnabled)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 5 ? 1 : 0 }}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </motion.button>
      
      {/* Keyboard shortcuts indicator */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            className="keyboard-shortcuts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="shortcut-item">Ctrl+↑/↓ - Quick scroll</div>
            <div className="shortcut-item">Ctrl+Home/End - Jump to top/bottom</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ScrollProgress
