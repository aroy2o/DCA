  import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

const CricketCursor = () => {
  const [isActive, setIsActive] = useState(true)
  const [isCharging, setIsCharging] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [buttonPosition, setButtonPosition] = useState('bottom-right')
  const chargeStartTime = useRef(0)
  const buttonRef = useRef(null)

  // Check if device is large screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Smart button positioning
  useEffect(() => {
    if (!isActive || !isLargeScreen) return

    const handleMouseMove = (e) => {
      const button = buttonRef.current
      if (!button) return

      const buttonRect = button.getBoundingClientRect()
      const mouseX = e.clientX
      const mouseY = e.clientY
      
      const buffer = 100
      
      const isNearButton = mouseX > buttonRect.left - buffer && 
                          mouseX < buttonRect.right + buffer && 
                          mouseY > buttonRect.top - buffer && 
                          mouseY < buttonRect.bottom + buffer

      if (isNearButton) {
        setButtonPosition(prev => prev === 'bottom-right' ? 'bottom-left' : 'bottom-right')
      }
    }

    let ticking = false
    const throttledMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('mousemove', throttledMouseMove)
    return () => window.removeEventListener('mousemove', throttledMouseMove)
  }, [isActive, buttonPosition, isLargeScreen])

  // Enhanced sound effects
  const createSound = (type, intensity = 1) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      const soundConfig = {
        single: { freq: 400, volume: 0.06 },
        two: { freq: 500, volume: 0.07 },
        four: { freq: 600, volume: 0.08 },
        six: { freq: 750, volume: 0.09 },
        charge: { freq: 250, volume: 0.04 }
      }
      
      const config = soundConfig[type] || soundConfig.single
      
      oscillator.frequency.setValueAtTime(config.freq, audioContext.currentTime)
      gainNode.gain.setValueAtTime(config.volume * intensity, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.4)
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  // Enhanced ball effect
  const createBallEffect = (e, shotType = 'single') => {
    const shotConfig = {
      single: { runs: 1, color: '#3b82f6', balls: 5, sound: 'single' },
      two: { runs: 2, color: '#10b981', balls: 6, sound: 'two' },
      four: { runs: 4, color: '#f59e0b', balls: 8, sound: 'four' },
      six: { runs: 6, color: '#ef4444', balls: 10, sound: 'six' }
    }

    const config = shotConfig[shotType]
    createSound(config.sound, 1)

    // Enhanced score display (Sweezy style)
    const scoreDisplay = document.createElement('div')
    scoreDisplay.innerHTML = `
      <div style="
        background: linear-gradient(135deg, 
          rgba(0,0,0,0.95) 0%, 
          rgba(30,30,30,0.98) 50%, 
          rgba(0,0,0,0.95) 100%);
        backdrop-filter: blur(20px);
        border: 2px solid ${config.color};
        color: white;
        padding: 16px 24px;
        border-radius: 25px;
        font-weight: 900;
        font-size: 18px;
        font-family: 'Arial Black', Arial, sans-serif;
        box-shadow: 
          0 15px 35px rgba(0,0,0,0.5),
          0 5px 15px ${config.color}40,
          0 0 30px ${config.color}30,
          inset 0 2px 0 rgba(255,255,255,0.3),
          inset 0 -2px 0 rgba(0,0,0,0.3);
        text-shadow: 
          0 0 10px ${config.color},
          2px 2px 8px rgba(0,0,0,0.9),
          0 0 20px rgba(255,255,255,0.3);
        position: relative;
        overflow: hidden;
        transform-style: preserve-3d;
        animation: scoreGlow 2s ease-out;
      ">
        <div style="
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            transparent 0deg,
            ${config.color}30 45deg,
            transparent 90deg,
            transparent 180deg,
            ${config.color}30 225deg,
            transparent 270deg
          );
          animation: rotate360 3s linear infinite;
          z-index: -1;
        "></div>
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            ellipse at 30% 30%, 
            rgba(255,255,255,0.4) 0%, 
            rgba(255,255,255,0.1) 40%, 
            transparent 70%
          );
          border-radius: 25px;
          z-index: 1;
        "></div>
        <div style="
          position: relative; 
          z-index: 2;
          text-transform: uppercase;
          letter-spacing: 2px;
        ">
          ${shotType === 'six' ? '🚀 MAXIMUM! +6' : 
            shotType === 'four' ? '🔥 BOUNDARY! +4' : 
            shotType === 'two' ? '⚡ DOUBLE! +2' : 
            '🏏 SINGLE! +1'}
        </div>
      </div>
    `
    
    scoreDisplay.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY - 80}px;
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -50%);
    `
    
    document.body.appendChild(scoreDisplay)
    
    gsap.timeline()
      .fromTo(scoreDisplay, 
        { 
          scale: 0, 
          opacity: 0, 
          rotationY: -180,
          rotationX: 90
        }, 
        { 
          scale: 1, 
          opacity: 1, 
          rotationY: 0,
          rotationX: 0,
          duration: 0.6, 
          ease: "back.out(2.5)" 
        }
      )
      .to(scoreDisplay, {
        y: -120,
        duration: 2.5,
        ease: "power2.out"
      })
      .to(scoreDisplay, {
        opacity: 0,
        scale: 0.7,
        rotationY: 180,
        rotationX: -90,
        duration: 0.8,
        ease: "power2.in",
        onComplete: () => scoreDisplay.remove()
      })

    // Enhanced 3D cricket balls (Sweezy style)
    for (let i = 0; i < config.balls; i++) {
      setTimeout(() => {
        const ballContainer = document.createElement('div')
        ballContainer.innerHTML = `
          <div class="ball-trail-3d" style="
            position: absolute;
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, 
              transparent, 
              ${config.color}50, 
              ${config.color}90, 
              ${config.color}50, 
              transparent);
            top: 50%;
            left: -30px;
            transform: translateY(-50%);
            border-radius: 2px;
            opacity: 0.8;
            box-shadow: 
              0 0 15px ${config.color}60,
              0 0 25px ${config.color}40;
            filter: blur(0.5px);
          "></div>
          <div class="cricket-ball-3d" style="
            width: 20px;
            height: 20px;
            background: 
              radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.9) 12%, transparent 35%),
              radial-gradient(ellipse at 75% 75%, rgba(0,0,0,0.4) 8%, transparent 25%),
              radial-gradient(ellipse at 50% 50%, rgba(220,20,60,0.3) 60%, transparent 80%),
              linear-gradient(135deg, 
                #dc143c 0%, 
                #b71c1c 25%, 
                #8b0000 50%, 
                #a0141e 75%, 
                #dc143c 100%);
            border-radius: 50%;
            position: relative;
            box-shadow: 
              0 8px 20px rgba(220, 20, 60, 0.7),
              0 4px 10px rgba(0,0,0,0.5),
              inset 0 2px 0 rgba(255,255,255,0.4),
              inset 0 -2px 0 rgba(0,0,0,0.3),
              0 0 30px rgba(220, 20, 60, 0.3);
            z-index: 10;
            border: 1px solid rgba(139,0,0,0.9);
            transform-style: preserve-3d;
          ">
            <!-- Realistic cricket ball seam (enhanced) -->
            <div style="
              position: absolute;
              top: 50%;
              left: 15%;
              right: 15%;
              height: 2px;
              background: linear-gradient(90deg, 
                rgba(0,0,0,0.9) 0%, 
                rgba(40,40,40,0.8) 25%, 
                rgba(0,0,0,0.9) 50%, 
                rgba(40,40,40,0.8) 75%, 
                rgba(0,0,0,0.9) 100%);
              transform: translateY(-50%);
              border-radius: 1px;
              box-shadow: 
                0 0 3px rgba(0,0,0,0.9),
                inset 0 1px 0 rgba(255,255,255,0.2);
            "></div>
            <!-- Seam stitching lines (enhanced) -->
            <div style="
              position: absolute;
              top: 20%;
              left: 50%;
              width: 1.5px;
              height: 30%;
              background: linear-gradient(180deg, 
                rgba(0,0,0,0.9), 
                rgba(40,40,40,0.7), 
                rgba(0,0,0,0.9));
              transform: translateX(-50%) rotate(-18deg);
              border-radius: 0.75px;
              box-shadow: 0 0 2px rgba(0,0,0,0.8);
            "></div>
            <div style="
              position: absolute;
              bottom: 20%;
              left: 50%;
              width: 1.5px;
              height: 30%;
              background: linear-gradient(180deg, 
                rgba(40,40,40,0.7), 
                rgba(0,0,0,0.9));
              transform: translateX(-50%) rotate(18deg);
              border-radius: 0.75px;
              box-shadow: 0 0 2px rgba(0,0,0,0.8);
            "></div>
            <!-- Additional seam details -->
            <div style="
              position: absolute;
              top: 25%;
              left: 25%;
              width: 3px;
              height: 3px;
              background: radial-gradient(circle, rgba(0,0,0,0.8), transparent);
              border-radius: 50%;
            "></div>
            <div style="
              position: absolute;
              bottom: 25%;
              right: 25%;
              width: 3px;
              height: 3px;
              background: radial-gradient(circle, rgba(0,0,0,0.8), transparent);
              border-radius: 50%;
            "></div>
            <!-- Ball shine effect -->
            <div style="
              position: absolute;
              top: 15%;
              left: 20%;
              width: 8px;
              height: 8px;
              background: radial-gradient(
                ellipse at center, 
                rgba(255,255,255,0.8) 0%, 
                rgba(255,255,255,0.4) 40%, 
                transparent 70%);
              border-radius: 50%;
              transform: rotate(-25deg);
            "></div>
          </div>
        `
        
        ballContainer.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
        `
        
        document.body.appendChild(ballContainer)
        
        const angle = (Math.PI * 2 * i) / config.balls + (Math.random() - 0.5) * 0.6
        const distance = 90 + Math.random() * 80
        const ball = ballContainer.querySelector('.cricket-ball-3d')
        const trail = ballContainer.querySelector('.ball-trail-3d')
        
        let vx = Math.cos(angle) * distance * 0.025
        let vy = Math.sin(angle) * distance * 0.025 - Math.random() * 3
        let currentX = 0, currentY = 0, rotation = 0, rotationY = 0
        
        const animateBall = () => {
          vy += 0.7 // gravity
          vx *= 0.992 // air resistance
          
          currentX += vx
          currentY += vy
          rotation += 20
          rotationY += 15
          
          gsap.set(ballContainer, { x: currentX, y: currentY })
          gsap.set(ball, { 
            rotation: rotation,
            rotationY: rotationY,
            rotationX: rotation * 0.5
          })
          gsap.set(trail, {
            rotation: Math.atan2(vy, vx) * 180 / Math.PI,
            scaleX: Math.min(2.5, Math.abs(vx) + Math.abs(vy)),
            opacity: Math.max(0.2, 1 - (Math.abs(currentX) + Math.abs(currentY)) / 450)
          })
          
          if (currentY > 400 || Math.abs(currentX) > 500) {
            gsap.to(ballContainer, {
              opacity: 0,
              scale: 0.5,
              rotationY: 360,
              duration: 0.6,
              ease: "power2.in",
              onComplete: () => ballContainer.remove()
            })
          } else {
            requestAnimationFrame(animateBall)
          }
        }
        
        animateBall()
      }, i * 90)
    }

    // Enhanced impact effect (Sweezy style)
    const impact = document.createElement('div')
    impact.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 100px;
      height: 100px;
      border: 3px solid ${config.color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      box-shadow: 
        0 0 50px ${config.color}80,
        0 0 100px ${config.color}50,
        inset 0 0 30px ${config.color}40;
      background: radial-gradient(circle, 
        ${config.color}30 0%, 
        ${config.color}20 30%,
        transparent 70%);
    `
    
    document.body.appendChild(impact)
    
    gsap.timeline()
      .to(impact, {
        scale: 4,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => impact.remove()
      })
  }

  const determineShotType = (chargeDuration) => {
    if (chargeDuration > 2500) return 'six'
    if (chargeDuration > 1600) return 'four'
    if (chargeDuration > 800) return 'two'
    return 'single'
  }

  useEffect(() => {
    if (!isActive || !isLargeScreen) {
      document.body.style.cursor = 'auto'
      return
    }

    document.body.style.cursor = 'none'

    const cursor = document.createElement('div')
    cursor.id = 'cricket-cursor-3d'
    cursor.innerHTML = `
      <div class="cricket-3d-cursor">
        <!-- Professional 3D Cricket Bat (Sweezy Style) -->
        <svg width="60" height="60" viewBox="0 0 60 60" class="bat-svg-3d">
          <defs>
            <!-- Premium 3D Wood texture gradients -->
            <linearGradient id="willow-premium-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#faf6ed"/>
              <stop offset="10%" style="stop-color:#f4ead7"/>
              <stop offset="25%" style="stop-color:#eed8b5"/>
              <stop offset="40%" style="stop-color:#e6c893"/>
              <stop offset="60%" style="stop-color:#deb887"/>
              <stop offset="80%" style="stop-color:#d2b48c"/>
              <stop offset="100%" style="stop-color:#b8956d"/>
            </linearGradient>
            
            <linearGradient id="wood-highlight-premium-3d" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.8"/>
              <stop offset="20%" style="stop-color:#ffffff;stop-opacity:0.6"/>
              <stop offset="60%" style="stop-color:#ffffff;stop-opacity:0.2"/>
              <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0"/>
            </linearGradient>
            
            <linearGradient id="wood-shadow-premium-3d" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#8b4513;stop-opacity:0"/>
              <stop offset="40%" style="stop-color:#654321;stop-opacity:0.3"/>
              <stop offset="80%" style="stop-color:#4a2c17;stop-opacity:0.5"/>
              <stop offset="100%" style="stop-color:#2f1b0c;stop-opacity:0.7"/>
            </linearGradient>
            
            <linearGradient id="handle-premium-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#cd853f"/>
              <stop offset="20%" style="stop-color:#a0522d"/>
              <stop offset="50%" style="stop-color:#8b4513"/>
              <stop offset="80%" style="stop-color:#654321"/>
              <stop offset="100%" style="stop-color:#4a2c17"/>
            </linearGradient>
            
            <linearGradient id="grip-premium-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4a3f3a"/>
              <stop offset="30%" style="stop-color:#3a2f2a"/>
              <stop offset="70%" style="stop-color:#2a1f1a"/>
              <stop offset="100%" style="stop-color:#1a120f"/>
            </linearGradient>
            
            <!-- Enhanced 3D Shadow filters -->
            <filter id="bat-shadow-premium-3d">
              <feDropShadow dx="3" dy="6" stdDeviation="4" flood-color="rgba(0,0,0,0.6)"/>
              <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
            </filter>
            
            <!-- Premium power glow filter -->
            <filter id="power-glow-premium-3d">
              <feGaussianBlur stdDeviation="6"/>
              <feColorMatrix values="1 0 0 0 1  0 1 0 0 0.85  0 0 1 0 0  0 0 0 1 0"/>
            </filter>
            
            <!-- Wood texture pattern -->
            <pattern id="wood-grain-3d" patternUnits="userSpaceOnUse" width="40" height="6">
              <rect width="40" height="6" fill="#deb887"/>
              <path d="M0,3 Q10,1 20,3 T40,3" stroke="#cd853f" stroke-width="0.5" fill="none" opacity="0.6"/>
              <path d="M0,2 Q15,0.5 30,2 T40,2" stroke="#b8860b" stroke-width="0.3" fill="none" opacity="0.4"/>
              <path d="M0,4 Q8,5.5 16,4 T40,4" stroke="#daa520" stroke-width="0.4" fill="none" opacity="0.5"/>
            </pattern>
          </defs>
          
          <!-- Bat ground shadow (enhanced) -->
          <ellipse cx="30" cy="28" rx="6" ry="18" fill="rgba(0,0,0,0.25)" transform="rotate(15 30 28)" opacity="0.7"/>
          
          <!-- Main bat blade (premium 3D effect) -->
          <path d="M30 5 
                   C34.5 5, 38 7, 40 10.5 
                   C42 14, 42.2 18, 42.2 22 
                   L42.2 36 
                   C42.2 39.5, 41 42, 38.5 43.8 
                   C36 45.6, 32 46, 30 46 
                   C28 46, 24 45.6, 21.5 43.8 
                   C19 42, 17.8 39.5, 17.8 36 
                   L17.8 22 
                   C17.8 18, 18 14, 20 10.5 
                   C22 7, 25.5 5, 30 5 Z" 
                fill="url(#wood-grain-3d)" 
                stroke="#a0522d" 
                stroke-width="1"
                filter="url(#bat-shadow-premium-3d)"
                transform="rotate(15 30 25.5)"/>
          
          <!-- Base wood color -->
          <path d="M30 5 
                   C34.5 5, 38 7, 40 10.5 
                   C42 14, 42.2 18, 42.2 22 
                   L42.2 36 
                   C42.2 39.5, 41 42, 38.5 43.8 
                   C36 45.6, 32 46, 30 46 
                   C28 46, 24 45.6, 21.5 43.8 
                   C19 42, 17.8 39.5, 17.8 36 
                   L17.8 22 
                   C17.8 18, 18 14, 20 10.5 
                   C22 7, 25.5 5, 30 5 Z" 
                fill="url(#willow-premium-3d)" 
                transform="rotate(15 30 25.5)"/>
          
          <!-- 3D Highlight on blade -->
          <path d="M30 5 
                   C34.5 5, 38 7, 40 10.5 
                   C42 14, 42.2 18, 42.2 22 
                   L42.2 36 
                   C42.2 39.5, 41 42, 38.5 43.8 
                   C36 45.6, 32 46, 30 46 
                   C28 46, 24 45.6, 21.5 43.8 
                   C19 42, 17.8 39.5, 17.8 36 
                   L17.8 22 
                   C17.8 18, 18 14, 20 10.5 
                   C22 7, 25.5 5, 30 5 Z" 
                fill="url(#wood-highlight-premium-3d)" 
                transform="rotate(15 30 25.5)"/>
          
          <!-- 3D Shadow on blade -->
          <path d="M30 5 
                   C34.5 5, 38 7, 40 10.5 
                   C42 14, 42.2 18, 42.2 22 
                   L42.2 36 
                   C42.2 39.5, 41 42, 38.5 43.8 
                   C36 45.6, 32 46, 30 46 
                   C28 46, 24 45.6, 21.5 43.8 
                   C19 42, 17.8 39.5, 17.8 36 
                   L17.8 22 
                   C17.8 18, 18 14, 20 10.5 
                   C22 7, 25.5 5, 30 5 Z" 
                fill="url(#wood-shadow-premium-3d)" 
                transform="rotate(15 30 25.5)"/>
          
          <!-- Premium wood grain lines -->
          <g transform="rotate(15 30 25.5)" opacity="0.7">
            <line x1="19" y1="10" x2="41" y2="10" stroke="#cd853f" stroke-width="0.5"/>
            <line x1="18.5" y1="15" x2="41.5" y2="15" stroke="#daa520" stroke-width="0.4"/>
            <line x1="19" y1="20" x2="41" y2="20" stroke="#cd853f" stroke-width="0.5"/>
            <line x1="18.8" y1="25" x2="41.2" y2="25" stroke="#b8860b" stroke-width="0.4"/>
            <line x1="19.2" y1="30" x2="40.8" y2="30" stroke="#cd853f" stroke-width="0.4"/>
            <line x1="19.8" y1="35" x2="40.2" y2="35" stroke="#daa520" stroke-width="0.5"/>
            <line x1="21" y1="40" x2="39" y2="40" stroke="#cd853f" stroke-width="0.4"/>
          </g>
          
          <!-- Premium sweet spot markings -->
          <ellipse cx="30" cy="27" rx="8" ry="12" 
                   fill="none" 
                   stroke="#b8860b" 
                   stroke-width="0.6" 
                   opacity="0.8" 
                   stroke-dasharray="3,2"
                   transform="rotate(15 30 27)"/>
          <ellipse cx="30" cy="25" rx="5" ry="8" 
                   fill="none" 
                   stroke="#daa520" 
                   stroke-width="0.7" 
                   stroke-dasharray="2,1.5" 
                   transform="rotate(15 30 25)"/>
          
          <!-- Enhanced 3D Bat edges -->
          <line x1="18" y1="22" x2="18.8" y2="36" 
                stroke="#654321" 
                stroke-width="1.8" 
                transform="rotate(15 30 25.5)"/>
          <line x1="41.2" y1="22" x2="42" y2="36" 
                stroke="#4a2c17" 
                stroke-width="1.8" 
                transform="rotate(15 30 25.5)"/>
          
          <!-- Premium 3D Handle -->
          <rect x="28.5" y="46" width="5" height="14" rx="2.5" 
                fill="url(#handle-premium-3d)" 
                stroke="#3a2c17" 
                stroke-width="0.6" 
                transform="rotate(15 31 53)"
                filter="url(#bat-shadow-premium-3d)"/>
          
          <!-- Premium 3D Rubber grip -->
          <rect x="29" y="48.5" width="4" height="9.5" rx="2" 
                fill="url(#grip-premium-3d)" 
                stroke="#1a120f" 
                stroke-width="0.5" 
                transform="rotate(15 31 53)"/>
          
          <!-- Enhanced 3D Grip texture -->
          <g transform="rotate(15 31 53)" opacity="0.9">
            <path d="M29.2 49.5 Q30.5 50 31.8 50.5 Q30.5 51 29.2 51.5 Q30.5 52 31.8 52.5 Q30.5 53 29.2 53.5 Q30.5 54 31.8 54.5 Q30.5 55 29.2 55.5 Q30.5 56 31.8 56.5" 
                  stroke="#4a2c17" 
                  stroke-width="0.3" 
                  fill="none"/>
            <circle cx="29.8" cy="50" r="0.4" fill="#654321"/>
            <circle cx="32.2" cy="51.3" r="0.4" fill="#654321"/>
            <circle cx="29.8" cy="52.6" r="0.4" fill="#654321"/>
            <circle cx="32.2" cy="53.9" r="0.4" fill="#654321"/>
            <circle cx="29.8" cy="55.2" r="0.4" fill="#654321"/>
            <circle cx="32.2" cy="56.5" r="0.4" fill="#654321"/>
          </g>
          
          <!-- Premium 3D Handle cap -->
          <ellipse cx="31" cy="60.5" rx="2.8" ry="1.2" 
                   fill="#3a2c17" 
                   stroke="#2f1b0c" 
                   stroke-width="0.5"
                   transform="rotate(15 31 60.5)"/>
          <ellipse cx="31" cy="59.8" rx="2.3" ry="0.8" 
                   fill="#654321" 
                   transform="rotate(15 31 59.8)"/>
          
          <!-- Premium brand logo area -->
          <ellipse cx="30" cy="18" rx="4" ry="2.5" 
                   fill="none" 
                   stroke="#b8860b" 
                   stroke-width="0.5" 
                   opacity="0.7"
                   transform="rotate(15 30 18)"/>
          <text x="30" y="19.5" text-anchor="middle" 
                fill="#654321" 
                font-size="3.5" 
                font-weight="bold" 
                font-family="Arial, sans-serif"
                opacity="0.8"
                transform="rotate(15 30 19.5)">MRF</text>
          
          <!-- Premium 3D Light reflection -->
          <line x1="19.5" y1="14" x2="20.8" y2="34" 
                stroke="rgba(255,255,255,0.95)" 
                stroke-width="1" 
                opacity="0.95"
                transform="rotate(15 30 25.5)"/>
          
          <!-- Enhanced power charge glow -->
          <circle cx="30" cy="30" r="25" 
                  fill="none" 
                  stroke="#ffd700" 
                  stroke-width="4" 
                  opacity="0" 
                  class="power-glow-3d"
                  filter="url(#power-glow-premium-3d)"/>
        </svg>
        
        <!-- Premium 3D Cricket Ball (floating beside bat) -->
        <div class="cricket-ball-companion">
          <div class="ball-3d" style="
            width: 16px;
            height: 16px;
            background: 
              radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.95) 15%, transparent 40%),
              radial-gradient(ellipse at 75% 75%, rgba(0,0,0,0.5) 10%, transparent 30%),
              radial-gradient(ellipse at 50% 50%, rgba(220,20,60,0.4) 65%, transparent 85%),
              linear-gradient(135deg, 
                #dc143c 0%, 
                #b71c1c 20%, 
                #8b0000 40%, 
                #a0141e 60%, 
                #dc143c 80%, 
                #b71c1c 100%);
            border-radius: 50%;
            position: absolute;
            top: 10px;
            right: -10px;
            box-shadow: 
              0 6px 15px rgba(220, 20, 60, 0.8),
              0 3px 8px rgba(0,0,0,0.6),
              inset 0 2px 0 rgba(255,255,255,0.5),
              inset 0 -2px 0 rgba(0,0,0,0.4),
              0 0 20px rgba(220, 20, 60, 0.4);
            z-index: 5;
            border: 1px solid rgba(139,0,0,0.9);
            transform-style: preserve-3d;
          ">
            <!-- Enhanced cricket ball seam -->
            <div style="
              position: absolute;
              top: 50%;
              left: 15%;
              right: 15%;
              height: 2px;
              background: linear-gradient(90deg, 
                rgba(0,0,0,0.95) 0%, 
                rgba(50,50,50,0.85) 20%, 
                rgba(0,0,0,0.95) 40%, 
                rgba(50,50,50,0.85) 60%, 
                rgba(0,0,0,0.95) 80%, 
                rgba(50,50,50,0.85) 100%);
              transform: translateY(-50%);
              border-radius: 1px;
              box-shadow: 
                0 0 3px rgba(0,0,0,0.95),
                inset 0 1px 0 rgba(255,255,255,0.3);
            "></div>
            <!-- Enhanced seam stitching -->
            <div style="
              position: absolute;
              top: 18%;
              left: 50%;
              width: 2px;
              height: 35%;
              background: linear-gradient(180deg, 
                rgba(0,0,0,0.95), 
                rgba(50,50,50,0.8), 
                rgba(0,0,0,0.95));
              transform: translateX(-50%) rotate(-20deg);
              border-radius: 1px;
              box-shadow: 0 0 2px rgba(0,0,0,0.9);
            "></div>
            <div style="
              position: absolute;
              bottom: 18%;
              left: 50%;
              width: 2px;
              height: 35%;
              background: linear-gradient(180deg, 
                rgba(50,50,50,0.8), 
                rgba(0,0,0,0.95));
              transform: translateX(-50%) rotate(20deg);
              border-radius: 1px;
              box-shadow: 0 0 2px rgba(0,0,0,0.9);
            "></div>
            <!-- Enhanced ball shine -->
            <div style="
              position: absolute;
              top: 20%;
              left: 25%;
              width: 6px;
              height: 6px;
              background: radial-gradient(
                ellipse at center, 
                rgba(255,255,255,0.9) 0%, 
                rgba(255,255,255,0.6) 30%, 
                rgba(255,255,255,0.2) 60%,
                transparent 80%);
              border-radius: 50%;
              transform: rotate(-30deg);
            "></div>
          </div>
        </div>
        
        <!-- Enhanced 3D power indicator -->
        <div class="power-indicator-3d">
          <div class="power-fill-3d"></div>
          <div class="power-segments-3d">
            <div class="segment-3d"></div>
            <div class="segment-3d"></div>
            <div class="segment-3d"></div>
            <div class="segment-3d"></div>
            <div class="segment-3d"></div>
          </div>
          <div class="power-label">POWER</div>
        </div>
        
        <!-- Enhanced 3D Aura effect -->
        <div class="bat-aura-3d"></div>
      </div>
    `

    const style = document.createElement('style')
    style.textContent = `
      @keyframes rotate360 {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes scoreGlow {
        0%, 100% { 
          filter: brightness(1) drop-shadow(0 0 10px currentColor); 
        }
        50% { 
          filter: brightness(1.2) drop-shadow(0 0 20px currentColor); 
        }
      }
      
      .cricket-3d-cursor {
        position: relative;
        width: 60px;
        height: 60px;
        pointer-events: none;
        filter: drop-shadow(0 8px 20px rgba(0,0,0,0.5));
        transform-style: preserve-3d;
      }
      
      .bat-svg-3d {
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center 85%;
        transform-style: preserve-3d;
      }
      
      .cricket-ball-companion {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      
      .ball-3d {
        animation: ball-float-3d 3.5s ease-in-out infinite alternate;
        transform-style: preserve-3d;
      }
      
      .bat-aura-3d {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, 
          rgba(255, 215, 0, 0.2) 0%, 
          rgba(255, 193, 7, 0.15) 25%, 
          rgba(255, 152, 0, 0.1) 50%, 
          rgba(255, 87, 34, 0.05) 75%,
          transparent 90%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.5;
        animation: aura-pulse-3d 4.5s ease-in-out infinite alternate;
        transform-style: preserve-3d;
      }
      
      .power-indicator-3d {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 45px;
        height: 8px;
        background: linear-gradient(135deg, 
          rgba(0,0,0,0.6), 
          rgba(20,20,20,0.8), 
          rgba(0,0,0,0.6));
        border-radius: 4px;
        opacity: 0;
        transition: all 0.3s ease;
        overflow: hidden;
        border: 1.5px solid rgba(255,255,255,0.4);
        box-shadow: 
          0 4px 15px rgba(0,0,0,0.4),
          inset 0 2px 0 rgba(255,255,255,0.3),
          inset 0 -1px 0 rgba(0,0,0,0.5);
        transform-style: preserve-3d;
      }
      
      .power-fill-3d {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, 
          #22c55e 0%, 
          #84cc16 15%, 
          #eab308 30%, 
          #f97316 50%, 
          #ef4444 75%, 
          #dc2626 90%,
          #b91c1c 100%);
        border-radius: 4px;
        transition: width 0.1s ease;
        box-shadow: 
          0 0 15px rgba(255,255,255,0.7),
          inset 0 2px 0 rgba(255,255,255,0.5),
          inset 0 -1px 0 rgba(0,0,0,0.3);
        position: relative;
        transform-style: preserve-3d;
      }
      
      .power-fill-3d::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 60%;
        background: linear-gradient(90deg, 
          rgba(255,255,255,0.6), 
          rgba(255,255,255,0.4),
          rgba(255,255,255,0.6));
        border-radius: 4px 4px 0 0;
      }
      
      .power-segments-3d {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
      }
      
      .segment-3d {
        flex: 1;
        border-right: 1.5px solid rgba(255,255,255,0.4);
        height: 100%;
      }
      
      .segment-3d:last-child {
        border-right: none;
      }
      
      .power-label {
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 7px;
        font-weight: 900;
        color: rgba(255,255,255,0.9);
        text-shadow: 
          0 0 5px rgba(255,255,255,0.8),
          0 1px 3px rgba(0,0,0,0.9);
        letter-spacing: 1px;
        font-family: 'Arial Black', Arial, sans-serif;
      }
      
      .charging .bat-svg-3d {
        transform: scale(1.2) rotate(12deg) rotateY(20deg) rotateX(5deg);
        filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.9)) 
                drop-shadow(0 8px 20px rgba(0,0,0,0.5));
      }
      
      .charging .power-glow-3d {
        opacity: 1;
        animation: power-glow-pulse-3d 1.2s ease-in-out infinite alternate;
      }
      
      .charging .power-indicator-3d {
        opacity: 1;
        transform: translateX(-50%) scale(1.15);
      }
      
      .charging .bat-aura-3d {
        animation-duration: 1.8s;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.4);
      }
      
      .charging .ball-3d {
        animation-duration: 1.2s;
        transform: scale(1.25);
        box-shadow: 
          0 8px 20px rgba(220, 20, 60, 0.9),
          0 0 25px rgba(255, 215, 0, 0.7),
          0 4px 12px rgba(0,0,0,0.6),
          inset 0 2px 0 rgba(255,255,255,0.5),
          inset 0 -2px 0 rgba(0,0,0,0.4);
      }
      
      @keyframes ball-float-3d {
        0% { 
          transform: translateY(0px) rotateX(0deg) rotateZ(0deg); 
        }
        100% { 
          transform: translateY(-4px) rotateX(15deg) rotateZ(10deg); 
        }
      }
      
      @keyframes aura-pulse-3d {
        0% { 
          transform: translate(-50%, -50%) scale(0.8) rotateZ(0deg); 
          opacity: 0.3; 
        }
        100% { 
          transform: translate(-50%, -50%) scale(1.3) rotateZ(10deg); 
          opacity: 0.9; 
        }
      }
      
      @keyframes power-glow-pulse-3d {
        0% { 
          opacity: 0.6; 
          stroke-width: 3;
          stroke: #ffd700;
        }
        100% { 
          opacity: 1; 
          stroke-width: 5;
          stroke: #ffed4e;
        }
      }
    `
    document.head.appendChild(style)

    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 60px;
      height: 60px;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transform-style: preserve-3d;
    `

    document.body.appendChild(cursor)

    let mouseX = 0, mouseY = 0

    const updateCursor = () => {
      if (cursor && document.body.contains(cursor)) {
        const naturalFloat = Math.sin(Date.now() * 0.002) * 1.5
        const subtleRotation = Math.cos(Date.now() * 0.0018) * 3
        const depth = Math.sin(Date.now() * 0.0012) * 4
        
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          duration: 0.2,
          ease: "power2.out",
          rotation: naturalFloat + subtleRotation + (isCharging ? 12 : 0),
          rotationY: depth + (isCharging ? 20 : 0),
          rotationX: naturalFloat * 0.7 + (isCharging ? 5 : 0)
        })
      }
      requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseDown = (e) => {
      setIsCharging(true)
      chargeStartTime.current = Date.now()
      cursor.classList.add('charging')
      createSound('charge', 0.7)
      
      const powerFill = cursor.querySelector('.power-fill-3d')
      if (powerFill) {
        gsap.to(powerFill, {
          width: '100%',
          duration: 3.2,
          ease: "power2.out"
        })
      }
    }

    const handleMouseUp = (e) => {
      if (!isCharging) return
      
      setIsCharging(false)
      const chargeDuration = Date.now() - chargeStartTime.current
      const shotType = determineShotType(chargeDuration)
      
      cursor.classList.remove('charging')
      const powerFill = cursor.querySelector('.power-fill-3d')
      if (powerFill) {
        gsap.to(powerFill, { width: '0%', duration: 0.5 })
      }

      createBallEffect(e, shotType)
      
      // Enhanced 3D bat swing animation (Sweezy style)
      const batSvg = cursor.querySelector('.bat-svg-3d')
      if (batSvg) {
        const intensity = {
          'six': 2.0,
          'four': 1.8,
          'two': 1.5,
          'single': 1.3
        }[shotType]
        
        gsap.timeline()
          .to(batSvg, {
            scale: intensity,
            rotation: 60,
            rotationY: 35,
            rotationX: 15,
            duration: 0.15,
            ease: "power4.out"
          })
          .to(batSvg, {
            scale: 1,
            rotation: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.9,
            ease: "elastic.out(1.2, 0.3)"
          })
      }
      
      // Enhanced ball companion animation
      const ballCompanion = cursor.querySelector('.ball-3d')
      if (ballCompanion) {
        gsap.timeline()
          .to(ballCompanion, {
            scale: 1.8,
            rotationX: 200,
            rotationY: 180,
            duration: 0.18,
            ease: "power3.out"
          })
          .to(ballCompanion, {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 0.7,
            ease: "bounce.out"
          })
      }
    }

    const handleClick = (e) => {
      if (!isCharging) {
        createBallEffect(e, 'single')
        
        const batSvg = cursor.querySelector('.bat-svg-3d')
        const ballCompanion = cursor.querySelector('.ball-3d')
        
        if (batSvg) {
          gsap.timeline()
            .to(batSvg, { 
              scale: 1.4, 
              rotation: 35, 
              rotationY: 18,
              rotationX: 8,
              duration: 0.12 
            })
            .to(batSvg, { 
              scale: 1, 
              rotation: 0, 
              rotationY: 0,
              rotationX: 0,
              duration: 0.6, 
              ease: "elastic.out(1.3, 0.3)" 
            })
        }
        
        if (ballCompanion) {
          gsap.timeline()
            .to(ballCompanion, {
              scale: 1.4,
              rotationX: 120,
              rotationY: 90,
              duration: 0.12
            })
            .to(ballCompanion, {
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              duration: 0.5,
              ease: "bounce.out"
            })
        }
      }
    }

    updateCursor()

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('click', handleClick)

    return () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('click', handleClick)
      if (cursor?.parentNode) cursor.parentNode.removeChild(cursor)
      if (style?.parentNode) style.parentNode.removeChild(style)
    }
  }, [isActive, isLargeScreen])

  const getButtonClasses = () => {
    const baseClasses = "fixed bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-500 text-white p-4 rounded-2xl shadow-2xl z-[10000] transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-orange-500/50 border-2 border-white/20"
    const positionClasses = buttonPosition === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'
    return `${baseClasses} ${positionClasses}`
  }

  return (
    <>
      
    </>
  )
}

export default CricketCursor