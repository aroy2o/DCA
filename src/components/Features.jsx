import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleSystem from './ParticleSystem'
import { CARD_STYLES, TEXT_STYLES } from '../constants/styles'

gsap.registerPlugin(ScrollTrigger)

const Features = ({ features = [] }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!features.length) return
    
    // Initialize cardsRef array
    cardsRef.current = []
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    })

    // Unique header animation - different from Hero
    tl.fromTo(headerRef.current, 
      { opacity: 0, scale: 0.8, rotationX: -45 },
      { opacity: 1, scale: 1, rotationX: 0, duration: 1, ease: "power4.out" }
    )

    // Card animations with unique entrance
    tl.fromTo(cardsRef.current, 
      { opacity: 0, y: 100, rotateX: 45, scale: 0.7 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      },
      "-=0.5"
    )

    // Distinctive hover animations
    cardsRef.current.forEach((card) => {
      if (card) {
        const icon = card.querySelector('.feature-icon')
        const content = card.querySelector('.feature-content')
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            y: -20, 
            scale: 1.05,
            rotateZ: 2,
            duration: 0.5, 
            ease: "power3.out" 
          })
          gsap.to(icon, { 
            rotation: 180, 
            scale: 1.2,
            y: -5,
            duration: 0.6, 
            ease: "back.out(1.7)" 
          })
          gsap.to(content, {
            y: -8,
            duration: 0.4,
            ease: "power3.out"
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            y: 0, 
            scale: 1,
            rotateZ: 0,
            duration: 0.4, 
            ease: "power3.out" 
          })
          gsap.to(icon, { 
            rotation: 0, 
            scale: 1,
            y: 0,
            duration: 0.5, 
            ease: "power3.out" 
          })
          gsap.to(content, {
            y: 0,
            duration: 0.4,
            ease: "power3.out"
          })
        })
      }
    })

  }, [features.length])

  return (
    <section ref={sectionRef} className="py-28 lg:py-32 relative bg-gradient-to-br from-white via-gray-50/30 to-slate-100/50">
      {/* Unique Background Pattern - Different from Hero */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern instead of stadium atmosphere */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Diagonal lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-300/30 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-gray-300/30 to-transparent"></div>
      </div>

      <ParticleSystem count={8} color="#10B981" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Distinctive Header Design */}
        <div ref={headerRef} className="text-center mb-20 lg:mb-24">
          {/* Hexagonal badge design */}
          <div className="inline-flex items-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 transform rotate-45 rounded-lg shadow-xl"></div>
              <div className="absolute inset-0 w-20 h-20 bg-white transform rotate-45 rounded-lg scale-75 flex items-center justify-center">
                <div className="transform -rotate-45">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="mx-8 text-center">
              <span className="text-2xl font-black text-emerald-700 tracking-wider">OUR FEATURES</span>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-2 rounded-full"></div>
            </div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 transform -rotate-45 rounded-lg shadow-xl"></div>
              <div className="absolute inset-0 w-20 h-20 bg-white transform -rotate-45 rounded-lg scale-75 flex items-center justify-center">
                <div className="transform rotate-45">
                  <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            What Makes Us
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </span>
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Experience the perfect blend of traditional cricket wisdom and cutting-edge
            training methodologies that sets our academy apart from the rest.
          </p>
        </div>

        {/* Hexagonal Grid Layout - Unique Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                ref={el => {
                  if (el && cardsRef.current) {
                    cardsRef.current[index] = el
                  }
                }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 border-2 border-gray-100 hover:border-gray-200 overflow-hidden transform-gpu"
              >
                {/* Hexagonal accent */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 transform rotate-45 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Icon with hexagonal background */}
                <div className="feature-icon relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-lg`}>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-white/90 rounded-2xl scale-75 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-gray-700" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="feature-content">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`}></div>
                
                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transitionDelay: '100ms' }}></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
