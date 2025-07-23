import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Calendar, ArrowDown, Star, CheckCircle, Users, Award, Target, Zap, Shield, Flame, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BUTTON_STYLES, TEXT_STYLES, LAYOUT_STYLES } from '../constants/styles'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const badgeRef = useRef(null)
  const buttonsRef = useRef(null)
  const trustRef = useRef(null)
  const statsRef = useRef(null)
  const backgroundRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline()
    const currentHeroRef = heroRef.current

    // Mouse tracking for interactive background
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    // Scroll tracking to hide scroll indicator
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowScrollIndicator(scrollY < 100) // Hide after scrolling 100px
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial setup - hide elements
    gsap.set([titleRef.current, subtitleRef.current, badgeRef.current, buttonsRef.current, trustRef.current, statsRef.current, scrollIndicatorRef.current], {
      opacity: 0,
      y: 60,
      scale: 0.95
    })

    // Enhanced entrance animations
    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.6")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "back.out(1.4)"
    }, "-=0.6")
    .to(statsRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(trustRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(scrollIndicatorRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.5)"
    }, "-=0.4")

    // Enhanced floating animations
    setTimeout(() => {
      gsap.utils.toArray('.floating-element').forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: -30 - (index * 5),
            rotation: 5 + (index * 2),
            scale: 1.1,
            duration: 4 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3
          })
        }
      })
    }, 500)

    // Interactive background animation
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: '200% 200%',
        duration: 20,
        repeat: -1,
        ease: "none"
      })
    }

    // Enhanced parallax effects
    if (currentHeroRef) {
      gsap.to('.parallax-slow', {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: currentHeroRef,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })

      gsap.to('.parallax-fast', {
        yPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: currentHeroRef,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      })
    }

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      gsap.killTweensOf('.floating-element')
      gsap.killTweensOf('.parallax-slow')
      gsap.killTweensOf('.parallax-fast')
      if (currentHeroRef) gsap.killTweensOf(currentHeroRef)
    }
  }, [])

  const trustIndicators = [
    { icon: CheckCircle, text: 'BCCI Certified', color: 'text-[#FFD600]' },
    { icon: Trophy, text: 'Award Winning', color: 'text-[#E63946]' },
    { icon: Star, text: '500+ Students', color: 'text-[#4FC3F7]' }
  ]

  const stats = [
    { number: '500+', label: 'Students Trained', icon: Users },
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '98%', label: 'Success Rate', icon: Target }
  ]

  return (
    <section 
      ref={heroRef} 
      className="relative mt-19 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-white"
    >
      {/* Unique Hero Background System - Distinguished from other sections */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero-specific subtle pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.03)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(5,150,105,0.02)_0%,transparent_50%)]"></div>
        </div>
        
        {/* Unique diagonal grid pattern for Hero only */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full bg-[linear-gradient(45deg,#D97706_1px,transparent_1px),linear-gradient(-45deg,#059669_1px,transparent_1px)] bg-[size:6rem_6rem]"></div>
        </div>
        
        {/* Hero-specific floating elements with cricket theme */}
        <div className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-br from-amber-400/6 to-orange-400/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-br from-green-400/5 to-emerald-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-44 h-44 bg-gradient-to-br from-red-400/4 to-pink-400/4 rounded-3xl blur-2xl rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-gray-300/8 to-slate-300/8 rounded-2xl blur-xl rotate-12"></div>
        
        {/* Cricket-themed accent lines */}
        <div className="absolute top-0 left-1/5 w-px h-full bg-gradient-to-b from-transparent via-amber-200/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-200/30 to-transparent"></div>
        <div className="absolute left-0 top-2/5 h-px w-full bg-gradient-to-r from-transparent via-red-200/30 to-transparent"></div>
        <div className="absolute right-0 bottom-1/3 h-px w-2/3 bg-gradient-to-l from-transparent via-gray-200/30 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="max-w-6xl mx-auto">
          {/* Unique Hero Badge - Distinguished from other sections */}
          <div ref={badgeRef} className="inline-flex items-center px-10 py-5 mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-gray-50/95 to-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-gray-100/50"></div>
            <div className="relative flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse shadow-lg"></div>
                <div className="w-2 h-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              </div>
              <span className="text-xl font-black text-gray-800 tracking-wider uppercase">
                🏏 West Bengal's Premier Academy
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Hero-Specific Typography - Unique from other sections */}
          <div ref={titleRef} className="mb-16">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-none tracking-tight">
              <span className="block text-gray-900 mb-6 drop-shadow-sm">
                Master The
              </span>
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6 filter drop-shadow-lg">
                Art of Cricket
              </span>
              <span className="block text-gray-800 text-5xl md:text-6xl lg:text-7xl">
                Excellence
              </span>
            </h1>
          </div>
          
          {/* Enhanced Hero Subtitle - More Distinctive */}
          <p ref={subtitleRef} className="text-2xl md:text-3xl text-gray-600 leading-relaxed font-semibold max-w-5xl mx-auto mb-20">
            Where passion meets precision. Join 
            <span className="text-amber-600 font-black"> West Bengal's most elite</span> cricket academy with 
            <span className="text-green-600 font-black"> 15+ years of proven excellence</span> and 
            <span className="text-red-600 font-black"> 500+ champion cricketers</span>
          </p>

          {/* Hero-Specific Stats Cards - Different from other sections */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 max-w-5xl mx-auto">
            {[
              { number: '500+', label: 'Champions Created', icon: Trophy, color: 'from-amber-500 to-orange-600' },
              { number: '15+', label: 'Years of Excellence', icon: Award, color: 'from-green-500 to-emerald-600' },
              { number: '98%', label: 'Success Rate', icon: Target, color: 'from-red-500 to-pink-600' }
            ].map((stat, index) => (
              <div key={index} className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border-2 border-gray-100/50 hover:border-gray-200/80 hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-800 mb-4">{stat.number}</div>
                <div className="text-gray-600 font-bold text-lg">{stat.label}</div>
                
                <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl`}></div>
              </div>
            ))}
          </div>
          
          {/* Hero-Specific Action Buttons - Unique Design */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
            <Link
              to="/programs"
              className="group relative inline-flex items-center px-16 py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 transform overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Trophy className="w-8 h-8 mr-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-500 relative z-10" />
              <span className="relative z-10">Begin Your Legacy</span>
              <Sparkles className="w-8 h-8 ml-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-500 relative z-10" />
            </Link>
            
            <a
              href="#contact"
              className="group relative inline-flex items-center px-16 py-6 bg-white/95 backdrop-blur-sm border-4 border-gray-300 text-gray-800 font-black text-2xl rounded-3xl hover:bg-gray-50 transition-all duration-700 shadow-2xl hover:shadow-3xl transform hover:scale-110 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Calendar className="w-8 h-8 mr-5 group-hover:scale-125 transition-transform duration-500 relative z-10" />
              <span className="relative z-10">Free Trial Session</span>
            </a>
          </div>
          
          {/* Hero-Specific Trust Indicators - Enhanced Design */}
          <div ref={trustRef} className="flex flex-wrap justify-center gap-8 mb-20">
            {[
              { icon: CheckCircle, text: 'BCCI CERTIFIED', color: 'from-green-500 to-emerald-600' },
              { icon: Trophy, text: 'AWARD WINNING', color: 'from-amber-500 to-orange-600' },
              { icon: Star, text: '500+ CHAMPIONS', color: 'from-red-500 to-pink-600' }
            ].map((item, index) => (
              <div
                key={index}
                className="group flex items-center px-10 py-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border-2 border-gray-100/50 hover:border-gray-200/80 hover:scale-105"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-gray-800 font-black text-lg tracking-wider">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hero-Specific Scroll Indicator - Unique Style */}
      {showScrollIndicator && (
        <div 
          ref={scrollIndicatorRef}
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[50] pointer-events-none"
        >
          <div className="relative group">
            <div className="flex flex-col items-center bg-white/95 backdrop-blur-xl rounded-3xl px-10 py-6 shadow-2xl border-2 border-gray-100 animate-bounce">
              <span className="text-gray-800 text-lg font-black tracking-wider mb-4 uppercase">
                Discover Excellence
              </span>
              <ArrowDown className="w-8 h-8 text-amber-600 animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-red-400/30 rounded-3xl blur-xl opacity-70 -z-10 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Hero-Specific Decorative Elements - Cricket Theme */}
      <div className="absolute top-1/2 left-8 w-2 h-40 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent rounded-full"></div>
      <div className="absolute top-1/2 right-8 w-2 h-40 bg-gradient-to-b from-transparent via-green-400/50 to-transparent rounded-full"></div>
      
      {/* Cricket-themed decorative icons */}
      <div className="absolute bottom-32 left-32 opacity-10">
        <div className="text-9xl filter grayscale">🏏</div>
      </div>
      <div className="absolute top-32 right-32 opacity-10">
        <div className="text-7xl filter grayscale">🏆</div>
      </div>
      
      {/* Corner accent elements with cricket theme */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-amber-400/40 rounded-tl-3xl"></div>
      <div className="absolute top-10 right-10 w-20 h-20 border-r-4 border-t-4 border-green-400/40 rounded-tr-3xl"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-4 border-b-4 border-red-400/40 rounded-bl-3xl"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-gray-400/40 rounded-br-3xl"></div>
    </section>
  )
}

export default Hero