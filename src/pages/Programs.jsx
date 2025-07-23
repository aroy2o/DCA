import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { programsData } from '../data/programs'
import { ArrowRight, ArrowDown, Users, Trophy, Calendar, Star, Award, Target, CheckCircle, Zap, Shield, Crown, Play, Phone } from 'lucide-react'
import AwardWinningAnimations from '../components/AwardWinningAnimations'

gsap.registerPlugin(ScrollTrigger)

const Programs = () => {
  const heroRef = useRef(null)
  const programsGridRef = useRef(null)
  const ctaRef = useRef(null)

  // Reusable class names to reduce repetition
  const cardBaseClass = "glass-card interactive-card border border-gray-100/50 hover:shadow-premium transition-all duration-500"
  const heroCardClass = `${cardBaseClass} rounded-3xl p-8 shadow-premium hover:shadow-premium-hover group`
  const smallCardClass = `${cardBaseClass} rounded-xl p-4 duration-300`
  const navCardClass = `${cardBaseClass} cursor-pointer group`
  const buttonPrimaryClass = "inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 shadow-lg group"
  const buttonSecondaryClass = "inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 group"
  const statCardClass = "text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300"
  const programButtonClass = "w-full text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 group-hover:scale-105 inline-flex items-center justify-center"
  const featureCardClass = "text-center p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors group"

  useEffect(() => {
    // Enhanced hero animation
    gsap.fromTo(heroRef.current?.children,
      { 
        opacity: 0, 
        y: 100,
        scale: 0.9,
        rotationX: 15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      }
    )

    // Programs grid stagger animation
    gsap.fromTo(programsGridRef.current?.children,
      { 
        opacity: 0, 
        y: 80,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: programsGridRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // CTA section animation
    gsap.fromTo(ctaRef.current,
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Floating animations for interactive elements
    gsap.utils.toArray('.float-animation').forEach((element, index) => {
      gsap.to(element, {
        y: -15,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden mt-20">
      {/* Simple, Clean Background - Different from Home */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30"></div>
        <div className="absolute inset-0 opacity-[0.01]">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}></div>
        </div>
      </div>

      {/* Unique Programs Hero Section - Focused on Program Selection */}
      <section className="relative py-16 overflow-hidden">
        <div ref={heroRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Program Selection Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium mb-6">
              <Trophy className="w-4 h-4 mr-2" />
              Training Programs Available
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect
              <span className="text-blue-600 block">Training Program</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From beginners taking their first steps to advanced players preparing for professional cricket, 
              we have specialized programs designed for every skill level and ambition.
            </p>
          </div>

          {/* Program Selection Features - Unique to Programs Page */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className={featureCardClass}>
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="font-semibold text-gray-900">Age Groups</div>
              <div className="text-sm text-gray-500">6 to 40+ years</div>
            </div>
            
            <div className={featureCardClass}>
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="font-semibold text-gray-900">Skill Levels</div>
              <div className="text-sm text-gray-500">Beginner to elite</div>
            </div>
            
            <div className={featureCardClass}>
              <div className="w-12 h-12 bg-red-100 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <div className="font-semibold text-gray-900">Schedule Options</div>
              <div className="text-sm text-gray-500">Morning & evening</div>
            </div>

            <div className={featureCardClass}>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="font-semibold text-gray-900">Specializations</div>
              <div className="text-sm text-gray-500">Batting, bowling, all-round</div>
            </div>
          </div>

          {/* Program Navigation */}
          <div className="text-center">
            <a
              href="#programs-list"
              className={buttonPrimaryClass}
            >
              Explore All Programs
              <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Programs Showcase Grid */}
      <section id="programs-list" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Program Directory
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Detailed information about each training program including curriculum, schedules, 
              pricing, and what makes each program unique for different skill levels and goals.
            </p>
          </div>
          
          <div ref={programsGridRef} className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {programsData.map((program, index) => (
              <motion.div
                key={program.id}
                className={`group ${cardBaseClass} magnetic-hover rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 lazy-animate`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Enhanced Age Badge with Glow */}
                <div className="relative p-6 pb-4">
                  <div className={`absolute -top-4 left-6 ${program.badgeColor} text-white px-4 py-2 rounded-full text-sm font-bold shadow-premium glow-on-hover`}>
                    {program.ageGroup}
                  </div>
                </div>

                {/* Icon and Title with Premium Effects */}
                <div className="px-6 pt-4 pb-6">
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 ${program.gradientColor} rounded-3xl mx-auto flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-premium`}>
                      <program.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{program.title}</h3>
                    <p className={`${program.textColor} font-semibold text-lg`}>{program.level}</p>
                  </div>

                  {/* Enhanced Description */}
                  <p className="text-gray-600 text-center mb-6 leading-relaxed text-sm">
                    {program.description}
                  </p>

                  {/* Premium Pricing Display */}
                  <div className={`text-center mb-6 p-6 ${program.bgColor} rounded-2xl border border-white/50 shadow-inner`}>
                    <div className={`text-4xl font-black ${program.textColor} mb-1`}>
                      ₹{program.price}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">per month</div>
                    {program.badge && (
                      <div className={`mt-3 inline-block ${program.badgeColor} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-pulse`}>
                        {program.badge}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Features List */}
                  <div className="space-y-3 mb-6">
                    {program.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start group/feature">
                        <div className={`w-6 h-6 ${program.gradientColor} rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover/feature:scale-110 transition-transform duration-300`}>
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                    {program.features.length > 4 && (
                      <div className="text-center">
                        <span className={`text-xs ${program.textColor} font-medium`}>
                          +{program.features.length - 4} more features
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Stats with Icons */}
                                    {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={statCardClass}>
                      <Users className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                      <div className="text-sm font-bold text-gray-900">{program.students}+</div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                    <div className={statCardClass}>
                      <Calendar className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                      <div className="text-sm font-bold text-gray-900">{program.sessions}</div>
                      <div className="text-xs text-gray-500">Sessions/Week</div>
                    </div>
                  </div>

                  {/* Enhanced CTA Buttons */}
                  <div className="space-y-3">
                    <Link
                      to={`/programs/${program.id}`}
                      className={`${programButtonClass} ${program.gradientColor}`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to={`/programs/${program.id}#enroll`}
                      className="w-full bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md inline-flex items-center justify-center group"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Consultation CTA */}
      <section ref={ctaRef} className="py-20 bg-blue-50 relative">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Still Deciding Which Program Fits?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Our expert coaches will assess your current skill level and cricket goals 
            to recommend the perfect training program for your development journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={buttonPrimaryClass}>
              <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Get Program Recommendation
            </button>
            <a
              href="tel:+919876543210"
              className={buttonSecondaryClass}
            >
              <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Speak to Coach
            </a>
          </div>

          {/* Quick Program Facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{programsData.length}</div>
              <div className="text-sm text-gray-500">Programs Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">₹2,500+</div>
              <div className="text-sm text-gray-500">Starting Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">3-6</div>
              <div className="text-sm text-gray-500">Sessions/Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">100%</div>
              <div className="text-sm text-gray-500">Personalized</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Programs
