import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Users, Award, Star, ArrowRight, Play, CheckCircle, Zap, Shield, Target, Crown, Sparkles, MousePointer, Calendar, Phone, Mail, MapPin, ChevronDown, TrendingUp, Heart, Flame, BarChart3, Brain, Rocket, Globe, Medal, Activity } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Features from '../components/Features'
import Newsletter from '../components/Newsletter'
import AwardWinningAnimations from '../components/AwardWinningAnimations'
import MicroInteractions from '../components/MicroInteractions'
import ChampionSuccessStories from '../components/ChampionSuccessStories'
import SectionSeparator from '../components/SectionSeparator'


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin)

const Home = () => {
  const ctaRef = useRef(null)
  const testimonialRef = useRef(null)
  const interactiveRef = useRef(null)
  const magicCursorRef = useRef(null)
  const heroSectionRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const specializationRef = useRef(null)
  const programsPreviewRef = useRef(null)
  const coachesRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isVisible, setIsVisible] = useState({})
  const [testimonialAnimated, setTestimonialAnimated] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    // Smooth scroll tracking for parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Enhanced Mouse Tracking with Magic Cursor
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Update magic cursor position with smooth easing
      if (magicCursorRef.current) {
        gsap.to(magicCursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out"
        })
      }
    }

    // Interactive Elements Detection with enhanced effects
    const interactiveElements = document.querySelectorAll('.magic-hover')
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        setCursorVariant('hover')
        gsap.to(magicCursorRef.current, {
          scale: 2.5,
          backgroundColor: 'rgba(79, 195, 247, 0.4)',
          borderColor: 'rgba(255, 214, 0, 0.6)',
          duration: 0.3,
          ease: "back.out(1.7)"
        })
      })
      
      element.addEventListener('mouseleave', () => {
        setCursorVariant('default')
        gsap.to(magicCursorRef.current, {
          scale: 1,
          backgroundColor: 'rgba(0, 43, 91, 0.2)',
          borderColor: 'transparent',
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Enhanced CTA section animation with advanced effects
    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onEnter: () => setIsVisible(prev => ({ ...prev, cta: true })),
        onLeave: () => setIsVisible(prev => ({ ...prev, cta: false }))
      }
    })

    // ADVANCED PRE-LOADING: Set up animations before scroll events
    const preLoadAnimations = () => {
      // Pre-cache all animation elements
      const textElements = document.querySelectorAll('.animate-text')
      const cardElements = document.querySelectorAll('.success-story-card')
      
      // Immediately prepare elements for animation only if they exist
      if (textElements.length > 0) {
        textElements.forEach(el => {
          gsap.set(el, {
            opacity: 0,
            y: 3,
            force3D: true,
            transformOrigin: 'center center'
          })
        })
      }
      
      if (cardElements.length > 0) {
        cardElements.forEach(el => {
          gsap.set(el, {
            opacity: 0,
            y: 5,
            scale: 0.999,
            force3D: true,
            transformOrigin: 'center center'
          })
        })
      }
    }

    // Run pre-loading immediately
    preLoadAnimations()

    // PERFORMANCE BOOST: Custom Intersection Observer for ultra-fast detection
    const observerOptions = {
      root: null,
      rootMargin: '50px 0px 0px 0px', // Trigger even earlier
      threshold: 0.01
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('success-story-section')) {
          // Ultra-fast simultaneous animation with perfect sync
          const textElements = entry.target.querySelectorAll('.animate-text')
          const cardElements = entry.target.querySelectorAll('.success-story-card')
          
          // Only animate if elements exist
          if (textElements.length > 0 && cardElements.length > 0) {
            // Create a single timeline for perfect synchronization
            const syncTl = gsap.timeline()
            
            syncTl
              .to(textElements, {
                opacity: 1,
                y: 0,
                duration: 0.12,
                stagger: 0.001,
                ease: "power1.out"
              }, 0) // Start at time 0
              .to(cardElements, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.12,
                stagger: 0.001,
                ease: "power1.out"
              }, 0) // Start at exact same time
          }
        }
      })
    }, observerOptions)

    // Observe success stories section
    const successSection = document.querySelector('.success-story-section')
    if (successSection) {
      observer.observe(successSection)
    }

    // ZERO-LAG SYSTEM: Instant pre-setup with aggressive optimization
    if (typeof window !== 'undefined') {
      // Force immediate visibility for all elements with hardware acceleration
      const elements = document.querySelectorAll('.animate-text, .success-story-card, .testimonial-float, .cta-stagger')
      elements.forEach(el => {
        el.style.visibility = 'visible'
        el.style.willChange = 'transform, opacity'
        el.style.transform = 'translateZ(0)' // Force GPU acceleration
        el.style.backfaceVisibility = 'hidden'
      })
    }

    // Success Stories section removed - now handled by separate component

    // ULTRA-FAST: Testimonials with instant mounting - REDUCED LAG  
    const testimonialTl = gsap.timeline({
      scrollTrigger: {
        trigger: testimonialRef.current,
        start: "top 99%", // Even earlier trigger
        toggleActions: "play none none reverse", 
        refreshPriority: 25,
        once: false,
        fastScrollEnd: true // Prevent lag on fast scroll
      }
    })

    // Pre-setup for zero-delay mounting with GPU acceleration
    if (testimonialRef.current) {
      gsap.set([testimonialRef.current], { 
        visibility: 'visible',
        force3D: true,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden'
      })
    }

    // Success Stories animations removed - handled by separate component

    // TESTIMONIALS: Ultra-fast appearance
    if (testimonialRef.current) {
      testimonialTl.fromTo(testimonialRef.current, {
        opacity: 0,
        y: 8
      }, {
        opacity: 1,
        y: 0,
        duration: 0.25, // Faster duration
        ease: "power1.out"
      })
    }

    // PERFECT SYNCHRONIZATION: Text and cards appear simultaneously with ZERO lag  
    const textElements = document.querySelectorAll('.success-story-section .animate-text')
    const cardElements = document.querySelectorAll('.success-story-card')
    
    if (textElements.length > 0 && cardElements.length > 0) {
      gsap.set(textElements, { 
        visibility: 'visible',
        opacity: 0,
        force3D: true,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden'
      })
      
      gsap.set(cardElements, { 
        visibility: 'visible',
        opacity: 0,
        force3D: true,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden'
      })
    }

    // INSTANT SYNC: Text and cards appear at exactly the same time - OPTIMIZED
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.success-story-section',
        start: "top 99%", // Even earlier
        toggleActions: "play none none reverse",
        refreshPriority: 30, // Highest priority
        fastScrollEnd: true
      }
    })

    masterTl
      .fromTo('.success-story-section .animate-text', {
        opacity: 0,
        y: 3
      }, {
        opacity: 1,
        y: 0,
        duration: 0.2, // Ultra-fast
        stagger: 0.001, // Microsecond stagger
        ease: "power1.out"
      }, 0) // Start immediately
      .fromTo('.success-story-card', {
        opacity: 0,
        y: 5,
        scale: 0.999
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.2, // Ultra-fast
        stagger: 0.001, // Same microsecond stagger
        ease: "power1.out"
      }, 0) // Start at EXACT same time as text

    // PREMIUM: Advanced performance-optimized parallax animations
    gsap.utils.toArray('.parallax-element').forEach((element, index) => {
      gsap.to(element, {
        yPercent: -40 - (index * 8),
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // Smoother scrub for better performance
          refreshPriority: -1 // Lower priority for performance
        }
      })
    })

    // ENHANCED: Cricket Ball Physics Animation with realistic motion
    const ballMotionPath = "M50,320 Q180,80 320,320 Q480,580 620,320 Q760,80 900,320"
    
    gsap.utils.toArray('.cricket-ball').forEach((ball, index) => {
      gsap.to(ball, {
        motionPath: {
          path: ballMotionPath,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        duration: 16 + index * 2.5, // Faster, more dynamic movement
        repeat: -1,
        ease: "none",
        delay: index * 3
      })
    })

    // ADVANCED: Dynamic text reveal with word-based animation
    gsap.utils.toArray('.premium-text-reveal').forEach(text => {
      const words = text.textContent.split(' ')
      text.innerHTML = words.map(word => 
        `<span class="word" style="display: inline-block; transform: translateY(100px) rotateX(90deg); opacity: 0; margin-right: 0.25em;">${word}</span>`
      ).join('')
      
      gsap.to(text.querySelectorAll('.word'), {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Testimonial cards floating animation with physics
    gsap.utils.toArray('.testimonial-float').forEach((element, index) => {
      const floatTl = gsap.timeline({ repeat: -1, yoyo: true })
      
      floatTl.to(element, {
        y: -20 - (index * 4),
        rotation: 3 + (index * 1.5),
        scale: 1.03,
        duration: 5 + index * 1.2,
        ease: "sine.inOut"
      })
    })

    // Enhanced Interactive Section Animation
    const interactiveTl = gsap.timeline({
      scrollTrigger: {
        trigger: interactiveRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onEnter: () => setIsVisible(prev => ({ ...prev, interactive: true })),
        onLeave: () => setIsVisible(prev => ({ ...prev, interactive: false }))
      }
    })

    interactiveTl.fromTo(interactiveRef.current,
      { 
        opacity: 0, 
        y: 120,
        scale: 0.95,
        rotationX: 10
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    )

    // Enhanced Parallax and Floating Animations
    gsap.utils.toArray('.parallax-element').forEach((element, index) => {
      gsap.to(element, {
        yPercent: -30 - (index * 10),
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8
        }
      })
    })

    // Cricket Ball Bounce Animation with improved physics
    gsap.utils.toArray('.cricket-ball').forEach((ball, index) => {
      const bounceTl = gsap.timeline({ repeat: -1 })
      bounceTl.to(ball, {
        y: -25,
        rotation: 180,
        duration: 1,
        ease: "power2.out"
      }).to(ball, {
        y: 0,
        rotation: 360,
        duration: 1,
        ease: "bounce.out"
      })
      
      bounceTl.delay(index * 0.5)
    })

    // Advanced Text Animation on Scroll with character reveals
    gsap.utils.toArray('.animate-text').forEach(text => {
      const chars = text.textContent.split('')
      text.innerHTML = chars.map(char => 
        char === ' ' ? ' ' : `<span class="char" style="display: inline-block; transform: translateY(120px) rotateX(90deg); opacity: 0;">${char}</span>`
      ).join('')
      
      gsap.to(text.querySelectorAll('.char'), {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.06,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    })

    ctaTl.fromTo(ctaRef.current,
      { 
        opacity: 0, 
        y: 120,
        scale: 0.9,
        rotationX: 15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.4,
        ease: "power3.out"
      }
    )

    // Advanced staggered animations for CTA elements
    gsap.fromTo('.cta-stagger', {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotationY: 10
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 1,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    })

    // Enhanced floating animations with physics
    gsap.utils.toArray('.cta-float').forEach((element, index) => {
      const floatTl = gsap.timeline({ repeat: -1, yoyo: true })
      
      floatTl.to(element, {
        y: -25 - (index * 6),
        rotation: 6 + (index * 2),
        scale: 1.06,
        duration: 4 + index * 0.8,
        ease: "sine.inOut"
      })
    })

    // Interactive Parallax Effects with scroll-based transforms
    gsap.utils.toArray('.parallax-element').forEach((element) => {
      gsap.to(element, {
        yPercent: -60,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      })
    })

    // Advanced Morphing Background
    const morphingBg = gsap.timeline({ repeat: -1 })
    morphingBg.to('.morphing-gradient', {
      backgroundPosition: '200% 200%',
      duration: 25,
      ease: "none"
    })

    // Cricket Ball Physics Animation with motion paths
    const ballPath = "M50,320 Q180,80 320,320 Q480,580 620,320 Q760,80 900,320"
    
    gsap.utils.toArray('.cricket-ball').forEach((ball, index) => {
      gsap.to(ball, {
        motionPath: {
          path: ballPath,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        duration: 18 + index * 3,
        repeat: -1,
        ease: "none",
        delay: index * 4
      })
    })

    // Enhanced Magnetic Effect for Interactive Elements
    const magneticElements = document.querySelectorAll('.magnetic')
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * 0.4
        const deltaY = (e.clientY - centerY) * 0.4
        
        gsap.to(element, {
          x: deltaX,
          y: deltaY,
          rotation: deltaX * 0.1,
          duration: 0.4,
          ease: "power2.out"
        })
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        })
      })
    })

    // Micro-interactions for buttons and cards
    gsap.utils.toArray('.micro-interact').forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          y: -3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          duration: 0.3,
          ease: "power2.out"
        })
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    // ULTIMATE: Performance-optimized smooth scroll and enhanced interactions
    const setupAdvancedInteractions = () => {
      // Smooth scroll enhancement for all navigation
      const smoothScrollLinks = document.querySelectorAll('a[href^="#"]')
      smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const target = document.querySelector(link.getAttribute('href'))
          if (target) {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: { y: target, offsetY: 100 },
              ease: "power3.inOut"
            })
          }
        })
      })

      // PREMIUM: Advanced cursor trail system
      const cursorTrail = []
      const trailLength = 8
      
      for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div')
        trail.className = 'fixed w-2 h-2 bg-[#4FC3F7]/30 rounded-full pointer-events-none z-[9998] transition-all duration-300'
        trail.style.transform = 'scale(0)'
        document.body.appendChild(trail)
        cursorTrail.push(trail)
      }

      let trailIndex = 0
      const updateCursorTrail = (e) => {
        const trail = cursorTrail[trailIndex]
        if (trail) {
          gsap.set(trail, {
            x: e.clientX - 4,
            y: e.clientY - 4,
            scale: 1 - (trailIndex * 0.1),
            opacity: 1 - (trailIndex * 0.15)
          })
          
          gsap.to(trail, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
          })
        }
        trailIndex = (trailIndex + 1) % trailLength
      }

      document.addEventListener('mousemove', updateCursorTrail)

      // Advanced intersection observer for performance
      const observerOptions = {
        root: null,
        rootMargin: '20%',
        threshold: [0.1, 0.5, 0.9]
      }

      const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport')
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('success-story-card')) {
              gsap.to(entry.target, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
              })
            }
          } else {
            entry.target.classList.remove('in-viewport')
          }
        })
      }, observerOptions)

      // Observe all interactive elements
      document.querySelectorAll('.success-story-card, .testimonial-float, .interactive-card').forEach(el => {
        performanceObserver.observe(el)
      })

      return () => {
        document.removeEventListener('mousemove', updateCursorTrail)
        cursorTrail.forEach(trail => document.body.removeChild(trail))
        performanceObserver.disconnect()
      }
    }

    // Initialize advanced interactions
    const cleanupAdvanced = setupAdvancedInteractions()
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', () => {})
        element.removeEventListener('mouseleave', () => {})
      })
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      if (cleanupAdvanced) cleanupAdvanced()
      observer.disconnect() // Cleanup intersection observer
    }
  }, [])

  const achievements = [
    { number: '500+', label: 'Students Trained', icon: Users },
    { number: '15+', label: 'Years Experience', icon: Trophy },
    { number: '50+', label: 'State Players', icon: Award },
    { number: '6', label: 'Expert Coaches', icon: Star },
  ]

  const features = [
    {
      icon: Trophy,
      title: 'BCCI Certified Training',
      description: 'Professional coaching with certified trainers following international standards.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Users,
      title: 'All Age Groups',
      description: 'Specialized programs for juniors, youth, seniors, and women cricketers.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: 'State-Level Success',
      description: 'Over 50 students have represented at state and national levels.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Star,
      title: 'Modern Facilities',
      description: 'World-class infrastructure with latest training equipment and technology.',
      color: 'from-red-500 to-red-600'
    }
  ]

    return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Simple Whitish Background */}
      <div className="fixed inset-0 -z-50 bg-white"></div>

      {/* Award-Winning Animation System */}
      <AwardWinningAnimations />

      {/* Enhanced Magic Cursor */}
      <div
        ref={magicCursorRef}
        className="fixed w-8 h-8 bg-[#002B5B]/20 rounded-full pointer-events-none z-[9999] mix-blend-multiply magic-cursor border-2 border-transparent backdrop-blur-sm"
        style={{ 
          left: mousePosition.x - 16, 
          top: mousePosition.y - 16,
          transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.1s ease'
        }}
      />

      {/* Simple Whitish Background */}
      <div className="fixed inset-0 -z-50 bg-white"></div>

      {/* Award-Winning Animation System */}
      <AwardWinningAnimations />

      
      {/* Hero Section */}
      <div className="hero-section">
        <Hero />
      </div>

      {/* Section Separator */}
      <SectionSeparator variant="wave" />

      {/* Stats Section */}
      <div className="stats-section">
        <Stats achievements={achievements} />
      </div>

      {/* Section Separator */}
      {/* <SectionSeparator variant="wave" /> */}

      {/* Features Section */}
      <div className="features-section">
        <Features features={features} />
      </div>

      {/* Section Separator */}
      {/* <SectionSeparator variant="wave" /> */}

      {/* Revolutionary "Why Choose DCA" Section - Ultra Clean Design */}
      <section ref={interactiveRef} className="why-choose-section py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {/* Modern Background Pattern - Consistent with app */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03)_0%,transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Modern Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Crown className="w-5 h-5 mr-2 text-amber-600" />
              <span className="text-sm tracking-wide">WHY CHOOSE DCA</span>
              <div className="w-2 h-2 bg-green-500 rounded-full ml-3"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Excellence Through
              <span className="block text-amber-600 font-black mt-2">
                Innovation
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experience next-generation cricket training with our cutting-edge methodologies
            </p>
          </div>

          {/* Modern Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: BarChart3,
                title: "AI-Powered Analytics",
                description: "Revolutionary performance tracking with machine learning insights and real-time biomechanical analysis",
                gradient: "from-blue-500 to-blue-600",
                accent: "blue"
              },
              {
                icon: Target,
                title: "Precision Training",
                description: "Millimeter-perfect training drills with haptic feedback technology and personalized skill development",
                gradient: "from-emerald-500 to-emerald-600",
                accent: "emerald"
              },
              {
                icon: Medal,
                title: "Elite Coaching",
                description: "One-on-one guidance from international champions and former national team players",
                gradient: "from-amber-500 to-amber-600",
                accent: "amber"
              },
              {
                icon: Rocket,
                title: "Advanced Tech",
                description: "Cutting-edge biomechanics lab with motion capture technology for technique optimization",
                gradient: "from-purple-500 to-purple-600",
                accent: "purple"
              },
              {
                icon: Trophy,
                title: "Match Preparation",
                description: "Advanced match simulation with VR technology and psychological conditioning programs",
                gradient: "from-red-500 to-red-600",
                accent: "red"
              },
              {
                icon: Activity,
                title: "Success Methodology",
                description: "Data-driven methodology with 98.7% success rate and guaranteed skill advancement tracking",
                gradient: "from-indigo-500 to-indigo-600",
                accent: "indigo"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="why-choose-item group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-gray-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
                
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`}></div>
              </div>
            ))}
          </div>

          {/* Modern CTA */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 p-2 bg-white rounded-2xl border border-gray-200 shadow-lg">
              <Link
                to="/programs"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <Trophy className="w-5 h-5 mr-3" />
                <span>START YOUR JOURNEY</span>
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 text-slate-700 font-semibold hover:text-slate-900 transition-colors"
              >
                <Play className="w-5 h-5 mr-2" />
                <span>LEARN MORE</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator variant="wave" />

      {/* Clean CTA Section */}
      <section ref={ctaRef} className="cta-section py-32 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {/* Simple Background - Consistent with app */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
          {/* Simple floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gray-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gray-200 rounded-full opacity-20"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gray-200 rounded-full opacity-20"></div>
            <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gray-200 rounded-full opacity-20"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="max-w-5xl mx-auto">
            {/* Clean Heading Section */}
            <div className="mb-12">
              <div className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-800 font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Rocket className="w-5 h-5 mr-2 text-yellow-600 group-hover:scale-110 transition-transform duration-300" />
                <span>Ready to Begin?</span>
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-800 mb-8 leading-tight">
                Ready to Start Your
                <span className="block text-yellow-600 mt-2">
                  Cricket Journey?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium max-w-4xl mx-auto">
                Join India's premier cricket academy and train with the best coaches in West Bengal.
                <span className="block font-bold text-yellow-600 mt-3 text-2xl">
                  🏏 Book your free trial session today!
                </span>
              </p>
            </div>

            {/* Clean Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/programs"
                className="cta-button group relative inline-flex items-center px-12 py-6 bg-yellow-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform overflow-hidden hover:bg-yellow-700"
              >
                <Trophy className="w-6 h-6 mr-3 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-black">Explore Programs</span>
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <a
                href="#contact"
                className="cta-button group relative inline-flex items-center px-12 py-6 border-2 border-gray-300 text-gray-800 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Play className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                <span className="font-black">Book Free Trial</span>
                <Calendar className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
            
            {/* Clean Activity Indicator */}
            <div className="inline-flex items-center px-8 py-4 bg-white border border-gray-200 rounded-2xl text-gray-800 mb-12 hover:bg-gray-50 transition-all duration-300 shadow-lg">
              <div className="relative mr-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <Activity className="w-5 h-5 mr-2 text-green-500" />
              <span className="font-bold text-lg">243 active students training right now</span>
              <TrendingUp className="w-5 h-5 ml-3 text-yellow-600" />
            </div>

            {/* Clean Success Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { number: "98%", label: "Success Rate", icon: Target, color: "text-green-600" },
                { number: "500+", label: "Champions Trained", icon: Trophy, color: "text-yellow-600" },
                { number: "50+", label: "State Players", icon: Award, color: "text-orange-600" },
                { number: "15+", label: "Years Excellence", icon: Star, color: "text-red-600" }
              ].map((metric, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                >
                  <metric.icon className={`w-8 h-8 ${metric.color} mb-3 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`} />
                  <div className="text-3xl lg:text-4xl font-black text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
                    {metric.number}
                  </div>
                  <div className="text-gray-600 font-semibold text-sm lg:text-base">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Simple particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator variant="wave" />
      
      {/* Champion Success Stories Component */}
      <ChampionSuccessStories />

      {/* Section Separator */}
      <SectionSeparator variant="wave" />

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <Newsletter />
      </div>
    </div>
  )
}

export default Home
