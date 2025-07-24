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
        single: { freq: 350, volume: 0.05 },
        two: { freq: 450, volume: 0.06 },
        four: { freq: 550, volume: 0.07 },
        six: { freq: 650, volume: 0.08 },
        charge: { freq: 200, volume: 0.03 }
      }
      
      const config = soundConfig[type] || soundConfig.single
      
      oscillator.frequency.setValueAtTime(config.freq, audioContext.currentTime)
      gainNode.gain.setValueAtTime(config.volume * intensity, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  // Enhanced ball effect
  const createBallEffect = (e, shotType = 'single') => {
    const shotConfig = {
      single: { runs: 1, color: '#3b82f6', balls: 4, sound: 'single' },
      two: { runs: 2, color: '#10b981', balls: 5, sound: 'two' },
      four: { runs: 4, color: '#f59e0b', balls: 7, sound: 'four' },
      six: { runs: 6, color: '#ef4444', balls: 9, sound: 'six' }
    }

    const config = shotConfig[shotType]
    createSound(config.sound, 1)

    // Enhanced score display
    const scoreDisplay = document.createElement('div')
    scoreDisplay.innerHTML = `
      <div style="
        background: linear-gradient(135deg, ${config.color}25, ${config.color}45);
        backdrop-filter: blur(15px);
        border: 2px solid ${config.color};
        color: white;
        padding: 10px 18px;
        border-radius: 15px;
        font-weight: bold;
        font-size: 15px;
        box-shadow: 
          0 5px 25px ${config.color}50,
          0 0 20px ${config.color}30;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
        position: relative;
        overflow: hidden;
      ">
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, ${config.color}15 0%, transparent 70%);
          animation: scoreShine 1.5s ease-out;
        "></div>
        <div style="position: relative; z-index: 2;">
          ${shotType === 'six' ? '🚀 MAXIMUM!' : shotType === 'four' ? '🔥 BOUNDARY!' : shotType === 'two' ? '⚡ TWO RUNS!' : '🏏 SINGLE!'}
        </div>
      </div>
    `
    
    scoreDisplay.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY - 60}px;
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -50%);
    `
    
    document.body.appendChild(scoreDisplay)
    
    gsap.timeline()
      .fromTo(scoreDisplay, 
        { scale: 0, opacity: 0, rotationY: -90 }, 
        { scale: 1, opacity: 1, rotationY: 0, duration: 0.4, ease: "back.out(1.7)" }
      )
      .to(scoreDisplay, {
        y: -90,
        duration: 1.8,
        ease: "power2.out"
      })
      .to(scoreDisplay, {
        opacity: 0,
        scale: 0.7,
        rotationY: 90,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => scoreDisplay.remove()
      })

    // Enhanced cricket balls with trail
    for (let i = 0; i < config.balls; i++) {
      setTimeout(() => {
        const ballContainer = document.createElement('div')
        ballContainer.innerHTML = `
          <div class="ball-trail" style="
            position: absolute;
            width: 40px;
            height: 2px;
            background: linear-gradient(90deg, transparent, ${config.color}60, transparent);
            top: 50%;
            left: -20px;
            transform: translateY(-50%);
            border-radius: 1px;
            opacity: 0.8;
          "></div>
          <div class="cricket-ball" style="
            width: 14px;
            height: 14px;
            background: 
              radial-gradient(ellipse at 25% 25%, #fff 12%, transparent 30%),
              radial-gradient(circle at center, #dc143c 60%, #8b0000 85%, #4a0000 100%);
            border-radius: 50%;
            position: relative;
            box-shadow: 
              0 4px 12px rgba(220, 20, 60, 0.5),
              0 2px 6px rgba(0,0,0,0.3);
            z-index: 10;
          ">
            <div style="
              position: absolute;
              top: 50%;
              left: 20%;
              right: 20%;
              height: 1px;
              background: #000;
              transform: translateY(-50%);
              border-radius: 0.5px;
            "></div>
            <div style="
              position: absolute;
              top: 20%;
              left: 50%;
              width: 1px;
              height: 30%;
              background: #000;
              transform: translateX(-50%) rotate(-10deg);
              border-radius: 0.5px;
            "></div>
            <div style="
              position: absolute;
              bottom: 20%;
              left: 50%;
              width: 1px;
              height: 30%;
              background: #000;
              transform: translateX(-50%) rotate(10deg);
              border-radius: 0.5px;
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
        `
        
        document.body.appendChild(ballContainer)
        
        const angle = (Math.PI * 2 * i) / config.balls + (Math.random() - 0.5) * 0.4
        const distance = 70 + Math.random() * 50
        const ball = ballContainer.querySelector('.cricket-ball')
        const trail = ballContainer.querySelector('.ball-trail')
        
        let vx = Math.cos(angle) * distance * 0.02
        let vy = Math.sin(angle) * distance * 0.02 - Math.random() * 2
        let currentX = 0, currentY = 0, rotation = 0
        
        const animateBall = () => {
          vy += 0.5 // gravity
          vx *= 0.995 // air resistance
          
          currentX += vx
          currentY += vy
          rotation += 15
          
          gsap.set(ballContainer, { x: currentX, y: currentY })
          gsap.set(ball, { rotation: rotation })
          gsap.set(trail, {
            rotation: Math.atan2(vy, vx) * 180 / Math.PI,
            scaleX: Math.min(2, Math.abs(vx) + Math.abs(vy))
          })
          
          if (currentY > 300 || Math.abs(currentX) > 400) {
            gsap.to(ballContainer, {
              opacity: 0,
              scale: 0.5,
              duration: 0.4,
              ease: "power2.in",
              onComplete: () => ballContainer.remove()
            })
          } else {
            requestAnimationFrame(animateBall)
          }
        }
        
        animateBall()
      }, i * 70)
    }

    // Impact effect
    const impact = document.createElement('div')
    impact.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 80px;
      height: 80px;
      border: 3px solid ${config.color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 30px ${config.color}60;
    `
    
    document.body.appendChild(impact)
    
    gsap.timeline()
      .to(impact, {
        scale: 2.5,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => impact.remove()
      })
  }

  const determineShotType = (chargeDuration) => {
    if (chargeDuration > 2200) return 'six'
    if (chargeDuration > 1400) return 'four'
    if (chargeDuration > 700) return 'two'
    return 'single'
  }

  useEffect(() => {
    if (!isActive || !isLargeScreen) {
      document.body.style.cursor = 'auto'
      return
    }

    document.body.style.cursor = 'none'

    const cursor = document.createElement('div')
    cursor.id = 'cricket-cursor'
    cursor.innerHTML = `
      <div class="realistic-bat-cursor">
        <!-- Realistic Cricket Bat -->
        <svg width="45" height="45" viewBox="0 0 45 45" class="bat-svg">
          <defs>
            <!-- Wood texture gradients -->
            <linearGradient id="willow-wood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f5f0e8"/>
              <stop offset="20%" style="stop-color:#ede2d0"/>
              <stop offset="40%" style="stop-color:#e6d4b7"/>
              <stop offset="60%" style="stop-color:#deb887"/>
              <stop offset="80%" style="stop-color:#d2b48c"/>
              <stop offset="100%" style="stop-color:#c19a6b"/>
            </linearGradient>
            
            <linearGradient id="wood-grain" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#deb887;stop-opacity:0.3"/>
              <stop offset="25%" style="stop-color:#cd853f;stop-opacity:0.6"/>
              <stop offset="50%" style="stop-color:#deb887;stop-opacity:0.3"/>
              <stop offset="75%" style="stop-color:#cd853f;stop-opacity:0.6"/>
              <stop offset="100%" style="stop-color:#deb887;stop-opacity:0.3"/>
            </linearGradient>
            
            <linearGradient id="handle-leather" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8b4513"/>
              <stop offset="30%" style="stop-color:#a0522d"/>
              <stop offset="70%" style="stop-color:#654321"/>
              <stop offset="100%" style="stop-color:#4a2c17"/>
            </linearGradient>
            
            <linearGradient id="rubber-grip" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#2a1810"/>
              <stop offset="50%" style="stop-color:#1a100a"/>
              <stop offset="100%" style="stop-color:#0f0805"/>
            </linearGradient>
            
            <!-- Realistic shadows and highlights -->
            <filter id="realistic-shadow">
              <feDropShadow dx="1.5" dy="3" stdDeviation="2.5" flood-color="rgba(0,0,0,0.4)"/>
            </filter>
            
            <filter id="wood-highlight">
              <feGaussianBlur stdDeviation="0.5"/>
              <feColorMatrix values="1 0 0 0 0.2  0 1 0 0 0.2  0 0 1 0 0.2  0 0 0 1 0"/>
            </filter>
          </defs>
          
          <!-- Bat shadow on ground -->
          <ellipse cx="23" cy="20" rx="3" ry="12" fill="rgba(0,0,0,0.15)" transform="rotate(12 23 20)"/>
          
          <!-- Main bat blade (realistic proportions) -->
          <path d="M22.5 3 
                   C25.8 3, 28.2 4.5, 29.5 7 
                   C30.8 9.5, 31 12.5, 31 15.5 
                   L31 26 
                   C31 28.5, 30.2 30.2, 28.5 31.5 
                   C26.8 32.8, 24 33, 22.5 33 
                   C21 33, 18.2 32.8, 16.5 31.5 
                   C14.8 30.2, 14 28.5, 14 26 
                   L14 15.5 
                   C14 12.5, 14.2 9.5, 15.5 7 
                   C16.8 4.5, 19.2 3, 22.5 3 Z" 
                fill="url(#willow-wood)" 
                stroke="#c19a6b" 
                stroke-width="0.5"
                filter="url(#realistic-shadow)"
                transform="rotate(12 22.5 18)"/>
          
          <!-- Wood grain texture overlay -->
          <path d="M22.5 3 
                   C25.8 3, 28.2 4.5, 29.5 7 
                   C30.8 9.5, 31 12.5, 31 15.5 
                   L31 26 
                   C31 28.5, 30.2 30.2, 28.5 31.5 
                   C26.8 32.8, 24 33, 22.5 33 
                   C21 33, 18.2 32.8, 16.5 31.5 
                   C14.8 30.2, 14 28.5, 14 26 
                   L14 15.5 
                   C14 12.5, 14.2 9.5, 15.5 7 
                   C16.8 4.5, 19.2 3, 22.5 3 Z" 
                fill="url(#wood-grain)" 
                transform="rotate(12 22.5 18)"/>
          
          <!-- Realistic wood grain lines -->
          <g transform="rotate(12 22.5 18)" opacity="0.4">
            <line x1="16" y1="8" x2="29" y2="8" stroke="#cd853f" stroke-width="0.3"/>
            <line x1="15.5" y1="12" x2="29.5" y2="12" stroke="#cd853f" stroke-width="0.2"/>
            <line x1="16" y1="16" x2="29" y2="16" stroke="#cd853f" stroke-width="0.3"/>
            <line x1="15.8" y1="20" x2="29.2" y2="20" stroke="#cd853f" stroke-width="0.25"/>
            <line x1="16.2" y1="24" x2="28.8" y2="24" stroke="#cd853f" stroke-width="0.2"/>
            <line x1="17" y1="28" x2="28" y2="28" stroke="#cd853f" stroke-width="0.3"/>
          </g>
          
          <!-- Sweet spot (realistic cricket bat marking) -->
          <ellipse cx="22.5" cy="20" rx="5.5" ry="8.5" 
                   fill="none" 
                   stroke="#b8860b" 
                   stroke-width="0.4" 
                   opacity="0.6" 
                   transform="rotate(12 22.5 20)"/>
          <ellipse cx="22.5" cy="18.5" rx="3.2" ry="5.5" 
                   fill="none" 
                   stroke="#daa520" 
                   stroke-width="0.5" 
                   stroke-dasharray="2,1" 
                   transform="rotate(12 22.5 18.5)"/>
          
          <!-- Bat edge (realistic thin side) -->
          <line x1="14.2" y1="15.5" x2="14.8" y2="26" 
                stroke="#a0522d" 
                stroke-width="1.2" 
                transform="rotate(12 22.5 18)"/>
          <line x1="30.2" y1="15.5" x2="30.8" y2="26" 
                stroke="#a0522d" 
                stroke-width="1.2" 
                transform="rotate(12 22.5 18)"/>
          
          <!-- Handle (realistic cricket bat handle) -->
          <rect x="21" y="33" width="3" height="10" rx="1.5" 
                fill="url(#handle-leather)" 
                stroke="#654321" 
                stroke-width="0.4" 
                transform="rotate(12 22.5 38)"
                filter="url(#realistic-shadow)"/>
          
          <!-- Rubber grip with realistic texture -->
          <rect x="21.3" y="34.5" width="2.4" height="7" rx="1.2" 
                fill="url(#rubber-grip)" 
                stroke="#0f0805" 
                stroke-width="0.3" 
                transform="rotate(12 22.5 38)"/>
          
          <!-- Grip spiral pattern (like real cricket bats) -->
          <g transform="rotate(12 22.5 38)" opacity="0.7">
            <path d="M21.5 35 Q22.5 35.5 23.5 36 Q22.5 36.5 21.5 37 Q22.5 37.5 23.5 38 Q22.5 38.5 21.5 39 Q22.5 39.5 23.5 40 Q22.5 40.5 21.5 41" 
                  stroke="#3a2818" 
                  stroke-width="0.2" 
                  fill="none"/>
          </g>
          
          <!-- Handle cap (realistic end piece) -->
          <ellipse cx="22.5" cy="43.5" rx="1.8" ry="0.8" 
                   fill="#654321" 
                   stroke="#4a2c17" 
                   stroke-width="0.3"
                   transform="rotate(12 22.5 43.5)"/>
          
          <!-- Brand logo area (subtle) -->
          <ellipse cx="22.5" cy="15" rx="2.5" ry="1.5" 
                   fill="none" 
                   stroke="#daa520" 
                   stroke-width="0.3" 
                   opacity="0.5"
                   transform="rotate(12 22.5 15)"/>
          
          <!-- Highlight on blade edge (realistic light reflection) -->
          <line x1="15" y1="10" x2="15.5" y2="25" 
                stroke="#f5f0e8" 
                stroke-width="0.6" 
                opacity="0.8"
                transform="rotate(12 22.5 18)"/>
          
          <!-- Power glow for charging -->
          <circle cx="22.5" cy="22" r="18" 
                  fill="none" 
                  stroke="#ffd700" 
                  stroke-width="2.5" 
                  opacity="0" 
                  class="power-glow"/>
        </svg>
        
        <!-- Enhanced power indicator -->
        <div class="power-indicator">
          <div class="power-fill"></div>
          <div class="power-segments">
            <div class="segment"></div>
            <div class="segment"></div>
            <div class="segment"></div>
            <div class="segment"></div>
          </div>
        </div>
        
        <!-- Subtle energy aura -->
        <div class="bat-aura"></div>
      </div>
    `

    const style = document.createElement('style')
    style.textContent = `
      .realistic-bat-cursor {
        position: relative;
        width: 45px;
        height: 45px;
        pointer-events: none;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
      }
      
      .bat-svg {
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center 85%;
      }
      
      .bat-aura {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.12) 0%, rgba(255, 193, 7, 0.08) 40%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.5;
        animation: realistic-glow 4s ease-in-out infinite alternate;
      }
      
      .power-indicator {
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 32px;
        height: 5px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 2.5px;
        opacity: 0;
        transition: opacity 0.3s ease;
        overflow: hidden;
        border: 0.5px solid rgba(255,255,255,0.4);
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }
      
      .power-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #10b981, #fbbf24, #f59e0b, #ef4444);
        border-radius: 2.5px;
        transition: width 0.08s ease;
        box-shadow: 0 0 8px rgba(255,255,255,0.5);
        position: relative;
      }
      
      .power-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2));
        border-radius: 2.5px 2.5px 0 0;
      }
      
      .power-segments {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
      }
      
      .segment {
        flex: 1;
        border-right: 0.5px solid rgba(255,255,255,0.4);
        height: 100%;
      }
      
      .segment:last-child {
        border-right: none;
      }
      
      .charging .bat-svg {
        transform: scale(1.12) rotate(8deg);
        filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.7)) drop-shadow(0 4px 12px rgba(0,0,0,0.3));
      }
      
      .charging .power-glow {
        opacity: 0.8;
        animation: enhanced-realistic-glow 1.2s ease-in-out infinite alternate;
      }
      
      .charging .power-indicator {
        opacity: 1;
        transform: translateX(-50%) scale(1.05);
      }
      
      .charging .bat-aura {
        animation-duration: 2s;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
      }
      
      @keyframes realistic-glow {
        0% { 
          transform: translate(-50%, -50%) scale(0.95); 
          opacity: 0.3; 
        }
        100% { 
          transform: translate(-50%, -50%) scale(1.15); 
          opacity: 0.7; 
        }
      }
      
      @keyframes enhanced-realistic-glow {
        0% { 
          opacity: 0.6; 
          stroke-width: 2.5;
          stroke: #ffd700;
        }
        100% { 
          opacity: 1; 
          stroke-width: 3.5;
          stroke: #ffed4e;
        }
      }
      
      @keyframes scoreShine {
        0% { opacity: 0; }
        50% { opacity: 0.8; }
        100% { opacity: 0; }
      }
    `
    document.head.appendChild(style)

    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 45px;
      height: 45px;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
    `

    document.body.appendChild(cursor)

    let mouseX = 0, mouseY = 0

    const updateCursor = () => {
      if (cursor && document.body.contains(cursor)) {
        const naturalFloat = Math.sin(Date.now() * 0.0015) * 0.8
        const subtleRotation = Math.cos(Date.now() * 0.001) * 1.2
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          duration: 0.15,
          ease: "power2.out",
          rotation: naturalFloat + subtleRotation + (isCharging ? 6 : 0)
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
      createSound('charge', 0.5)
      
      const powerFill = cursor.querySelector('.power-fill')
      if (powerFill) {
        gsap.to(powerFill, {
          width: '100%',
          duration: 2.8,
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
      const powerFill = cursor.querySelector('.power-fill')
      if (powerFill) {
        gsap.to(powerFill, { width: '0%', duration: 0.35 })
      }

      createBallEffect(e, shotType)
      
      // Enhanced realistic bat swing
      const batSvg = cursor.querySelector('.bat-svg')
      if (batSvg) {
        const intensity = {
          'six': 1.6,
          'four': 1.4,
          'two': 1.25,
          'single': 1.15
        }[shotType]
        
        gsap.timeline()
          .to(batSvg, {
            scale: intensity,
            rotation: 40,
            duration: 0.1,
            ease: "power3.out"
          })
          .to(batSvg, {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "elastic.out(1.4, 0.4)"
          })
      }
    }

    const handleClick = (e) => {
      if (!isCharging) {
        createBallEffect(e, 'single')
        
        const batSvg = cursor.querySelector('.bat-svg')
        if (batSvg) {
          gsap.timeline()
            .to(batSvg, { scale: 1.2, rotation: 25, duration: 0.08 })
            .to(batSvg, { scale: 1, rotation: 0, duration: 0.4, ease: "elastic.out(1.3, 0.4)" })
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
    const baseClasses = "fixed bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl shadow-lg z-[10000] transition-all duration-300 hover:scale-105 hover:rotate-3"
    const positionClasses = buttonPosition === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'
    return `${baseClasses} ${positionClasses}`
  }

  return (
    <>
      {isLargeScreen && (
        <>
          
          
          {isActive && (
            <div className="fixed bottom-20 right-6 bg-black/90 text-white p-4 rounded-xl shadow-xl z-[9996] backdrop-blur-sm max-w-[300px] border border-white/20">
              <div className="text-amber-400 font-bold mb-3 text-sm flex items-center gap-2">
                🏏 Realistic Cricket Bat Cursor
                <span className="text-xs bg-amber-500/20 px-2 py-1 rounded-full">Pro</span>
              </div>
              <div className="text-xs space-y-1.5 text-gray-300">
                <div className="flex items-center justify-between">
                  <span>• Quick tap:</span>
                  <span className="text-blue-400">Single (1 run)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• Short hold:</span>
                  <span className="text-green-400">Two (2 runs)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• Medium hold:</span>
                  <span className="text-yellow-400">Boundary (4 runs)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• Long hold:</span>
                  <span className="text-red-400">Maximum (6 runs)</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-400 italic border-t border-white/10 pt-2">
                Hold to charge power • Watch the willow glow! 🌟
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default CricketCursor