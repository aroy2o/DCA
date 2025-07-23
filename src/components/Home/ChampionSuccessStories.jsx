import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trophy, Award, Target, Users, TrendingUp, Zap, ChevronLeft, ChevronRight, Play, Quote, ArrowRight, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const ChampionSuccessStories = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [hoveredMetric, setHoveredMetric] = useState(null)

  const testimonials = [
    {
      id: 1,
      name: "Arjun Sharma",
      age: 16,
      role: "Batsman",
      achievement: "Selected for U-19 State Team",
      story: "From a complete beginner to state-level cricket in just 2 years. The personalized coaching approach and modern training facilities transformed my batting technique completely.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      stats: {
        before: "Club Level",
        after: "State Team",
        improvement: "300% batting average",
        matchesPlayed: "45+",
        centuries: "8"
      },
      gradient: "from-amber-500 via-orange-600 to-red-600",
      bgGradient: "from-gray-50/80 via-white/60 to-gray-50/80",
      accentColor: "blue",
      icon: Trophy,
      quote: "The academy didn't just teach me cricket; it taught me to dream bigger."
    },
    {
      id: 2,
      name: "Priya Patel",
      age: 14,
      role: "All-rounder",
      achievement: "Women's State Cricket Team Captain",
      story: "The academy's women-focused training program helped me develop leadership skills alongside cricket excellence. Now I'm inspiring other girls to pursue cricket professionally.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
      stats: {
        before: "School Cricket",
        after: "State Captain",
        improvement: "50+ wickets taken",
        matchesPlayed: "38+",
        centuries: "5"
      },
      gradient: "from-pink-500 via-rose-600 to-red-600",
      bgGradient: "from-pink-50/80 via-rose-50/60 to-red-50/80",
      accentColor: "pink",
      icon: Award,
      quote: "They believed in my potential when no one else did."
    },
    {
      id: 3,
      name: "Rohit Mehta",
      age: 18,
      role: "Fast Bowler",
      achievement: "IPL Academy Selection",
      story: "The advanced training modules and mental conditioning prepared me for professional cricket. The cutting-edge technology and expert coaches helped me reach 145 kmph consistently.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      stats: {
        before: "District Level",
        after: "IPL Academy",
        improvement: "145 kmph speed",
        matchesPlayed: "52+",
        centuries: "N/A"
      },
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      bgGradient: "from-green-50/80 via-emerald-50/60 to-teal-50/80",
      accentColor: "green",
      icon: Target,
      quote: "Professional cricket felt impossible until I joined this academy."
    },
    {
      id: 4,
      name: "Sneha Kumar",
      age: 12,
      role: "Wicket Keeper",
      achievement: "Junior National Camp Selection",
      story: "Starting at age 8, the junior program's focus on fundamentals and fun approach kept me motivated. The coaches made learning enjoyable while maintaining high standards.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      stats: {
        before: "Complete Beginner",
        after: "National Camp",
        improvement: "Youngest selection",
        matchesPlayed: "25+",
        centuries: "3"
      },
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      bgGradient: "from-yellow-50/80 via-orange-50/60 to-red-50/80",
      accentColor: "yellow",
      icon: Star,
      quote: "This academy turned my passion into my profession."
    }
  ]

  const successMetrics = [
    { 
      number: "50+", 
      label: "State Players", 
      icon: Trophy, 
      color: "text-blue-600",
      bgColor: "bg-gray-100",
      description: "Students selected for state-level cricket"
    },
    { 
      number: "15", 
      label: "National Selections", 
      icon: Award, 
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Players representing at national level"
    },
    { 
      number: "8", 
      label: "Professional Contracts", 
      icon: Target, 
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Students with professional cricket contracts"
    },
    { 
      number: "200+", 
      label: "Tournament Wins", 
      icon: TrendingUp, 
      color: "text-red-600",
      bgColor: "bg-red-100",
      description: "Championships won by our students"
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  // Advanced GSAP animations
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Enhanced entrance animations
      const tl = gsap.timeline({ delay: 0.2 })
      
      // Title animation with morphing effect
      tl.from(titleRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: -45,
        transformOrigin: 'center bottom',
        duration: 1.2,
        ease: 'back.out(1.7)'
      })

      // Staggered card animations
      tl.from('.testimonial-card', {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotationY: 15,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.6')

      // Metrics animation
      tl.from('.metric-card', {
        opacity: 0,
        y: 60,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, '-=0.4')

      // Floating elements animation
      gsap.to('.floating-orb', {
        y: -30,
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        stagger: 5
      })

      // Parallax background elements
      gsap.to('.parallax-slow', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      gsap.to('.parallax-fast', {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [testimonials.length])

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [testimonials.length])

  const goToSlide = useCallback((index) => {
    setCurrentTestimonial(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [])

  const currentTestimonialData = testimonials[currentTestimonial]

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50/90 via-white to-gray-50/80"
    >
      {/* Modern Background with Geometric Patterns */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white to-gray-50/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-100/20 via-transparent to-gray-100/20"></div>
        </div>
        
        {/* Modern floating orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-full blur-3xl floating-orb"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/5 to-red-500/5 rounded-full blur-3xl floating-orb"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-green-500/3 to-teal-500/3 rounded-full blur-3xl floating-orb"></div>

        {/* Geometric elements */}
                        <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-br from-amber-500/8 to-orange-500/8 rounded-3xl blur-xl parallax-slow"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-br from-red-500/8 to-pink-500/8 rounded-2xl blur-xl parallax-fast"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(#000_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-100/80 to-gray-100/80 backdrop-blur-sm text-gray-700 rounded-full text-sm font-bold mb-8 shadow-lg border border-gray-200/30"
          >
            <Trophy className="w-5 h-5 mr-2 animate-bounce" />
            Champion Success Stories
            <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
          </motion.div>
          
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
          >
            From Dreams to
            <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mt-2">
              Championships
            </span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Witness the incredible transformation of our students from passionate beginners to 
            professional cricketers. These are real stories of dedication, expert coaching, and championship success.
          </motion.p>
        </div>

        {/* Modern Testimonial Showcase */}
        <div className="mb-24">
          <div className="relative max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 300, rotateY: 45 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -300, rotateY: -45 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="testimonial-card"
              >
                <div className={`relative p-8 md:p-12 rounded-3xl bg-gradient-to-br ${currentTestimonialData.bgGradient} border border-white/50 shadow-2xl backdrop-blur-sm overflow-hidden`}>
                  {/* Quote decoration */}
                  <div className="absolute top-8 left-8 opacity-10">
                    <Quote className="w-16 h-16 text-gray-900" />
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Profile Section */}
                    <div className="text-center lg:text-left">
                      <div className="relative mb-8 inline-block">
                        <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto lg:mx-0 bg-gradient-to-br ${currentTestimonialData.gradient} p-1`}>
                          <img
                            src={currentTestimonialData.image}
                            alt={currentTestimonialData.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className={`absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r ${currentTestimonialData.gradient} rounded-full flex items-center justify-center shadow-xl animate-pulse`}>
                          {React.createElement(currentTestimonialData.icon, { className: "w-8 h-8 text-white" })}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-black text-gray-900 mb-2">
                        {currentTestimonialData.name}
                      </h3>
                      <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                        <span className="text-gray-600 font-medium">Age: {currentTestimonialData.age}</span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        <span className="text-gray-600 font-medium">{currentTestimonialData.role}</span>
                      </div>
                      <div className={`inline-block px-4 py-2 bg-gradient-to-r ${currentTestimonialData.gradient} text-white font-bold rounded-full text-lg shadow-lg`}>
                        {currentTestimonialData.achievement}
                      </div>
                    </div>
                    
                    {/* Story Section */}
                    <div className="space-y-8">
                      <blockquote className="text-xl text-gray-700 leading-relaxed font-medium">
                        "{currentTestimonialData.story}"
                      </blockquote>
                      
                      <div className={`p-4 bg-gradient-to-r ${currentTestimonialData.gradient} text-white rounded-2xl shadow-lg`}>
                        <Quote className="w-6 h-6 mb-2 opacity-70" />
                        <p className="font-semibold italic">
                          {currentTestimonialData.quote}
                        </p>
                      </div>
                      
                      {/* Enhanced Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 text-center">
                          <div className="text-2xl font-black text-gray-900 mb-1">{currentTestimonialData.stats.matchesPlayed}</div>
                          <div className="text-sm text-gray-600">Matches</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 text-center">
                          <div className="text-2xl font-black text-gray-900 mb-1">{currentTestimonialData.stats.centuries}</div>
                          <div className="text-sm text-gray-600">Centuries</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 text-center col-span-2 md:col-span-1">
                          <div className={`text-lg font-bold bg-gradient-to-r ${currentTestimonialData.gradient} bg-clip-text text-transparent mb-1`}>
                            {currentTestimonialData.stats.improvement}
                          </div>
                          <div className="text-sm text-gray-600">Achievement</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Navigation */}
            <div className="flex items-center justify-center mt-12 space-x-6">
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 bg-white/90 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200/50 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </motion.button>
              
              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? `bg-gradient-to-r ${testimonials[index].gradient} shadow-lg scale-125` 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 bg-white/90 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200/50 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </motion.button>
            </div>

            {/* Auto-play indicator */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Play className={`w-4 h-4 ${isAutoPlaying ? 'animate-pulse' : ''}`} />
                <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modernized Success Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {successMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="metric-card relative group"
              onMouseEnter={() => setHoveredMetric(index)}
              onMouseLeave={() => setHoveredMetric(null)}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`relative p-8 text-center bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${metric.bgColor}/20`}>
                {/* Hover effect background */}
                <div className={`absolute inset-0 ${metric.bgColor}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl ${metric.bgColor}/30 flex items-center justify-center shadow-inner group-hover:shadow-lg transition-all duration-300`}>
                  {React.createElement(metric.icon, { 
                    className: `w-8 h-8 ${metric.color} group-hover:scale-110 transition-transform duration-300` 
                  })}
                </div>
                
                <div className={`text-4xl font-black ${metric.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {metric.number}
                </div>
                
                <div className="text-gray-700 font-bold text-lg mb-2 group-hover:text-gray-900 transition-colors duration-300">
                  {metric.label}
                </div>
                
                {/* Hover description */}
                <AnimatePresence>
                  {hoveredMetric === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-gray-600 mt-2"
                    >
                      {metric.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Ready to write your own success story? Join hundreds of champions who started their journey with us.
          </motion.p>
          
          <motion.a
            href="/programs"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg overflow-hidden relative"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <Zap className="relative z-10 w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Begin Your Journey</span>
            <ArrowRight className="relative z-10 w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default ChampionSuccessStories
