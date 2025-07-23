import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

const PremiumLoader = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing...')
  const loaderRef = useRef()

  useEffect(() => {
    // Loading text updates
    const textUpdates = [
      { progress: 0, text: 'Initializing...' },
      { progress: 20, text: 'Loading Academy Data...' },
      { progress: 40, text: 'Setting up Training Ground...' },
      { progress: 60, text: 'Preparing Cricket Equipment...' },
      { progress: 80, text: 'Finalizing Experience...' },
      { progress: 95, text: 'Almost Ready...' },
      { progress: 100, text: 'Welcome to Excellence!' }
    ]

    // Realistic progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 8 + 2, 100)
        
        // Update loading text based on progress
        const currentText = textUpdates.find(update => 
          newProgress >= update.progress && 
          (!textUpdates.find(u => u.progress > update.progress) || newProgress < textUpdates.find(u => u.progress > update.progress).progress)
        )
        if (currentText) {
          setLoadingText(currentText.text)
        }
        
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return newProgress
      })
    }, 120)

    // Modern entrance animations
    const tl = gsap.timeline()
    
    tl.fromTo('.modern-loader', {
      scale: 0.8,
      opacity: 0,
      filter: 'blur(20px)'
    }, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power3.out"
    })

    .fromTo('.logo-container', {
      scale: 0,
      rotation: -180,
      opacity: 0
    }, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.6")

    .fromTo('.brand-text', {
      y: 50,
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")

    .fromTo('.progress-section', {
      scaleX: 0,
      opacity: 0
    }, {
      scaleX: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2")

    // Floating animations
    gsap.to('.floating-orb', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.3
    })

    // Cricket icon rotation
    gsap.to('.cricket-icon', {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: "none"
    })

    // Check for completion
    const checkProgress = () => {
      if (progress >= 100) {
        setTimeout(() => {
          // Modern exit animation
          tl.to('.modern-loader', {
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)',
            duration: 0.8,
            ease: "power3.in",
            onComplete: () => {
              setIsLoading(false)
              if (onLoadingComplete) {
                onLoadingComplete()
              }
            }
          })
        }, 800)
      } else {
        requestAnimationFrame(checkProgress)
      }
    }
    checkProgress()

    return () => {
      clearInterval(progressInterval)
      tl.kill()
    }
  }, [progress, onLoadingComplete])

  if (!isLoading) return null

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      {/* Modern Background with Animated Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-red-600/20 animate-pulse"></div>
      
      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent"></div>
      </div>
      
      {/* Floating Orbs */}
            <div className="floating-orb absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full blur-xl"></div>
      <div className="floating-orb absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl"></div>
      <div className="floating-orb absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full blur-lg"></div>
      
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
      </div>

      {/* Main Loader Content */}
      <div className="modern-loader relative text-center text-white z-10 max-w-md mx-auto px-8">
        
        {/* Logo Container */}
        <div className="logo-container mb-8">
          <div className="relative inline-block">
            {/* Main Logo Circle */}
            <div className="w-24 h-24 mx-auto mb-4 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
              <div className="absolute inset-1 bg-gradient-to-br from-slate-900 to-indigo-900 rounded-full flex items-center justify-center">
                <img 
                  src="/DCA.jpg" 
                  alt="DCA" 
                  className="w-16 h-16 object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="cricket-icon w-16 h-16 text-white hidden items-center justify-center text-2xl">
                  🏏
                </div>
              </div>
            </div>
            
            {/* Glowing Rings */}
            <div className="absolute inset-0 w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border border-purple-400/50 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Brand Text */}
        <div className="brand-text mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Doars Cricket Academy
          </h1>
          <p className="text-blue-200/80 text-lg font-medium tracking-wide">
            Excellence in Cricket Training
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Progress Section */}
        <div className="progress-section space-y-6">
          {/* Modern Progress Bar */}
          <div className="relative">
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-full transition-all duration-300 ease-out relative shadow-lg"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/40 animate-pulse rounded-full"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-white to-orange-100 rounded-full shadow-xl border-2 border-white/60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
              </div>
            </div>
            
            {/* Progress glow effect */}
            <div 
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-amber-400/50 via-orange-400/50 to-yellow-400/50 rounded-full blur-sm -z-10 transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>

          {/* Progress Percentage */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/60">{loadingText}</span>
            <span className="text-white font-semibold">{Math.round(Math.min(progress, 100))}%</span>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center items-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 space-y-2">
          <div className="text-white/40 text-xs animate-pulse">
            Crafting Champions Since 2009
          </div>
          <div className="flex justify-center items-center space-x-2 text-white/30 text-xs">
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span>Premium Cricket Training</span>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border border-white/20 rounded-full animate-spin" style={{animationDuration: '10s'}}></div>
      <div className="absolute bottom-8 right-8 w-8 h-8 border-2 border-blue-400/30 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '6s'}}></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '50px 50px'
      }}></div>
    </div>
  )
}

export default PremiumLoader