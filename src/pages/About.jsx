import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Trophy, Users, Award, Target, Star, Quote, Calendar, MapPin, CheckCircle, Heart, Zap, Shield, ArrowRight, Phone, Mail, Crown } from 'lucide-react'
import AwardWinningAnimations from '../components/Home/AwardWinningAnimations'
import ParticleSystem from '../components/Home/ParticleSystem'
import ChampionSuccessStories from '../components/Home/ChampionSuccessStories'
import SectionSeparator from '../components/Home/SectionSeparator'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const missionRef = useRef(null)
  const timelineRef = useRef(null)
  const coachesRef = useRef(null)
  const ctaRef = useRef(null)

  const timeline = [
    {
      year: '2009',
      title: 'Academy Founded',
      description: 'Doars Cricket Academy was established with a vision to nurture cricket talent in West Bengal.',
      icon: Trophy,
      color: 'from-blue-500 to-blue-600'
    },
    {
      year: '2012',
      title: 'BCCI Certification',
      description: 'Received official certification from BCCI, establishing our credibility in professional cricket training.',
      icon: Award,
      color: 'from-green-500 to-green-600'
    },
    {
      year: '2015',
      title: 'First State Player',
      description: 'Our first student represented West Bengal at the state level, marking a major milestone.',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      year: '2018',
      title: 'Facility Expansion',
      description: 'Expanded our training facilities with modern equipment and dedicated practice areas.',
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      year: '2020',
      title: '500+ Students',
      description: 'Reached the milestone of training over 500 students across all age groups.',
      icon: Users,
      color: 'from-red-500 to-red-600'
    },
    {
      year: '2025',
      title: 'Excellence Continues',
      description: 'Today, we continue to be the premier cricket academy in the region with 50+ state players.',
      icon: Trophy,
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const achievements = [
    { number: '15+', label: 'Years of Excellence', icon: Trophy, color: 'from-amber-500 to-orange-600', bgColor: 'from-amber-50 to-orange-100' },
    { number: '500+', label: 'Students Trained', icon: Users, color: 'from-orange-500 to-red-600', bgColor: 'from-orange-50 to-red-100' },
    { number: '50+', label: 'State Level Players', icon: Star, color: 'from-red-500 to-rose-600', bgColor: 'from-red-50 to-rose-100' },
    { number: '6', label: 'Expert Coaches', icon: Award, color: 'from-rose-500 to-pink-600', bgColor: 'from-rose-50 to-pink-100' },
    { number: '100%', label: 'BCCI Certified', icon: CheckCircle, color: 'from-pink-500 to-pink-600', bgColor: 'from-pink-50 to-pink-100' },
    { number: '25+', label: 'Awards Won', icon: Trophy, color: 'from-amber-600 to-orange-600', bgColor: 'from-amber-100 to-orange-100' }
  ]

  const coaches = [
    {
      name: 'Rajesh Kumar',
      role: 'Head Coach & Founder',
      experience: '20+ Years',
      specialty: 'Batting & Leadership',
      achievements: 'Former Ranji Player, BCCI Level A Coach',
      initials: 'RK',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-50 to-orange-100'
    },
    {
      name: 'Amit Ghosh',
      role: 'Senior Bowling Coach',
      experience: '15+ Years',
      specialty: 'Fast Bowling & Pace',
      achievements: 'Ex-Bengal Fast Bowler, 200+ Wickets',
      initials: 'AG',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-100'
    },
    {
      name: 'Sunita Devi',
      role: 'Women\'s Coach',
      experience: '12+ Years',
      specialty: 'All-Round Training',
      achievements: 'Former Bengal Women Captain',
      initials: 'SD',
      color: 'from-red-500 to-rose-600',
      bgColor: 'from-red-50 to-rose-100'
    }
  ]

  const values = [
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'Striving for the highest standards in every aspect of cricket training and development.',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-50 to-orange-100'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Fostering a deep love for cricket while maintaining the joy and spirit of the game.',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-100'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Building character through honest play, ethical conduct, and respect for all.',
      color: 'from-red-500 to-rose-600',
      bgColor: 'from-red-50 to-rose-100'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Embracing modern training techniques while respecting cricket\'s rich traditions.',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'from-rose-50 to-pink-100'
    }
  ]

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
      const finalNumber = stat.dataset.number
      gsap.fromTo(stat, 
        { textContent: 0 },
        {
          textContent: finalNumber,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 80%"
          }
        }
      )
    })

    // Section animations
    const sections = [missionRef, timelineRef, coachesRef, ctaRef]
    sections.forEach((ref, index) => {
      if (ref.current) {
        gsap.fromTo(ref.current.children,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
              end: "bottom 25%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })

    // Interactive card hover effects
    gsap.utils.toArray('.interactive-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
          y: -8, 
          scale: 1.02,
          duration: 0.3, 
          ease: "power2.out" 
        })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
          y: 0, 
          scale: 1,
          duration: 0.3, 
          ease: "power2.out" 
        })
      })
    })

  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Award-Winning Animation System */}
      <AwardWinningAnimations />

      {/* Unified Background System - Consistent with Home */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-white via-amber-50/5 to-orange-50/10"></div>

      {/* Hero Section - Consistent with Home styling */}
      <section className="relative mt-25 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-white">
        {/* Consistent Hero Background System */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Hero-specific subtle pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.03)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(5,150,105,0.02)_0%,transparent_50%)]"></div>
          </div>
          
          {/* Consistent grid pattern */}
          <div className="absolute inset-0 opacity-[0.015]">
            <div className="h-full w-full bg-[linear-gradient(45deg,#D97706_1px,transparent_1px),linear-gradient(-45deg,#059669_1px,transparent_1px)] bg-[size:6rem_6rem]"></div>
          </div>
          
          {/* Consistent floating elements */}
          <div className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-br from-amber-400/6 to-orange-400/6 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-br from-green-400/5 to-emerald-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-44 h-44 bg-gradient-to-br from-red-400/4 to-pink-400/4 rounded-3xl blur-2xl rotate-45"></div>
          <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-gray-300/8 to-slate-300/8 rounded-2xl blur-xl rotate-12"></div>
          
          {/* Consistent accent lines */}
          <div className="absolute top-0 left-1/5 w-px h-full bg-gradient-to-b from-transparent via-amber-200/30 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-200/30 to-transparent"></div>
          <div className="absolute left-0 top-2/5 h-px w-full bg-gradient-to-r from-transparent via-red-200/30 to-transparent"></div>
          <div className="absolute right-0 bottom-1/3 h-px w-2/3 bg-gradient-to-l from-transparent via-gray-200/30 to-transparent"></div>
        </div>
        
        <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="max-w-6xl mx-auto">
            {/* Consistent Hero Badge */}
            <div className="inline-flex items-center px-10 py-5 mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-gray-50/95 to-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-gray-100/50"></div>
              <div className="relative flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-2 h-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="text-xl font-black text-gray-800 tracking-wider uppercase">
                  🏏 About Our Legacy
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                </div>
              </div>
            </div>
            
            {/* Consistent Typography */}
            <div className="mb-16">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-none tracking-tight">
                <span className="block text-gray-900 mb-6 drop-shadow-sm">
                  Crafting Cricket
                </span>
                <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6 filter drop-shadow-lg">
                  Champions Since
                </span>
                <span className="block text-gray-800 text-5xl md:text-6xl lg:text-7xl">
                  2009
                </span>
              </h1>
            </div>
            
            {/* Consistent Subtitle */}
            <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed font-semibold max-w-5xl mx-auto mb-20">
              From humble beginnings to becoming 
              <span className="text-amber-600 font-black"> West Bengal's most elite</span> cricket academy with 
              <span className="text-green-600 font-black"> 15+ years of proven excellence</span> and 
              <span className="text-red-600 font-black"> 500+ champion cricketers</span>
            </p>

            {/* Consistent Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mb-20">
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
        
        {/* Consistent Decorative Elements */}
        <div className="absolute top-1/2 left-8 w-2 h-40 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent rounded-full"></div>
        <div className="absolute top-1/2 right-8 w-2 h-40 bg-gradient-to-b from-transparent via-green-400/50 to-transparent rounded-full"></div>
        
        {/* Consistent cricket-themed decorative icons */}
        <div className="absolute bottom-32 left-32 opacity-10">
          <div className="text-9xl filter grayscale">🏏</div>
        </div>
        <div className="absolute top-32 right-32 opacity-10">
          <div className="text-7xl filter grayscale">🏆</div>
        </div>
        
        {/* Consistent corner accent elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-amber-400/40 rounded-tl-3xl"></div>
        <div className="absolute top-10 right-10 w-20 h-20 border-r-4 border-t-4 border-green-400/40 rounded-tr-3xl"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 border-l-4 border-b-4 border-red-400/40 rounded-bl-3xl"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-gray-400/40 rounded-br-3xl"></div>
      </section>

      {/* Achievement Stats - Consistent styling */}
      <section ref={statsRef} className="py-20 lg:py-24 relative bg-gradient-to-br from-amber-50/30 via-white to-orange-50/20">
        {/* Consistent Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.02)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.02] h-full w-full bg-[linear-gradient(to_right,#F59E0B_1px,transparent_1px),linear-gradient(to_bottom,#F59E0B_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Consistent Header Style */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-xl border border-amber-200/50 rounded-2xl text-gray-800 font-semibold mb-8 shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-500 group">
              <Crown className="w-5 h-5 mr-2 text-amber-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <span className="text-sm tracking-wide font-bold">OUR JOURNEY</span>
              <div className="w-2 h-2 bg-amber-500 rounded-full ml-3 animate-pulse"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Our Journey in
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-black mt-2">
                Numbers
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Every statistic tells a story of dedication, growth, and the relentless pursuit of excellence.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div
                  key={index}
                  className="text-center p-6 lg:p-8 bg-white/95 backdrop-blur-xl border border-amber-200/30 rounded-3xl shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 interactive-card magnetic-hover"
                >
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${achievement.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div 
                    className="stat-number text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mb-2"
                    data-number={achievement.number.replace('+', '').replace('%', '')}
                  >
                    {achievement.number}
                  </div>
                  <div className="text-sm lg:text-base font-semibold text-gray-600">
                    {achievement.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION (ADDED) --- */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.04)_0%,transparent_60%)]"></div>
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-xl border border-orange-200/50 rounded-2xl text-gray-800 font-semibold mb-6 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 group">
              <Star className="w-5 h-5 mr-2 text-orange-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <span className="text-sm tracking-wide font-bold">TESTIMONIALS</span>
              <div className="w-2 h-2 bg-orange-500 rounded-full ml-3 animate-pulse"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              What Our Champions Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
              Real stories from our students and parents about their journey with Doars Cricket Academy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Amit S.',
                photo: 'https://randomuser.me/api/portraits/men/32.jpg',
                quote: 'The coaching and facilities at Doars are world-class. My son has improved tremendously and loves every session!'
              },
              {
                name: 'Priya D.',
                photo: 'https://randomuser.me/api/portraits/women/44.jpg',
                quote: 'Joining Doars was the best decision for my cricket career. The personalized attention and modern training made all the difference.'
              },
              {
                name: 'Rahul K.',
                photo: 'https://randomuser.me/api/portraits/men/65.jpg',
                quote: 'From fitness to match preparation, everything is top-notch. The coaches truly care about our progress.'
              },
              {
                name: 'Sneha M.',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg',
                quote: 'The academy feels like family. I have made lifelong friends and grown so much as a player and person.'
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                className="bg-white/95 backdrop-blur-xl border border-orange-200/30 rounded-3xl p-8 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 interactive-card text-center group cursor-pointer flex flex-col items-center"
                whileHover={{ y: -8, scale: 1.04, boxShadow: '0 8px 32px rgba(251,191,36,0.18)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
              >
                <img src={testimonial.photo} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 border-4 border-orange-100 shadow-md group-hover:scale-110 transition-transform duration-300" />
                <blockquote className="text-gray-700 italic mb-4">“{testimonial.quote}”</blockquote>
                <div className="font-bold text-orange-700 text-lg">{testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values - Consistent styling */}
      <section ref={missionRef} className="py-20 lg:py-24 relative bg-gradient-to-br from-white via-gray-50/30 to-white">
        {/* Consistent Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.03)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(5,150,105,0.02)_0%,transparent_50%)]"></div>
          </div>
          <div className="absolute inset-0 opacity-[0.015]">
            <div className="h-full w-full bg-[linear-gradient(45deg,#D97706_1px,transparent_1px),linear-gradient(-45deg,#059669_1px,transparent_1px)] bg-[size:6rem_6rem]"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Consistent Header Style */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-10 py-5 mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-gray-50/95 to-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-gray-100/50"></div>
              <div className="relative flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-2 h-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="text-xl font-black text-gray-800 tracking-wider uppercase">
                  🏏 Our Foundation
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                </div>
              </div>
            </div>
            
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-none tracking-tight">
              <span className="block text-gray-900 mb-6 drop-shadow-sm">
                Mission, Vision &
              </span>
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6 filter drop-shadow-lg">
                Core Values
              </span>
            </h2>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-white/95 backdrop-blur-xl border border-amber-200/30 rounded-3xl p-8 lg:p-12 shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 interactive-card">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To discover, nurture, and develop cricket talent from the grassroots level, 
                providing world-class training facilities and expert coaching that transforms 
                passionate individuals into skilled cricketers who excel both on and off the field.
              </p>
              <div className="flex items-center text-amber-600 font-semibold group cursor-pointer">
                <span>Learn More About Our Approach</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-xl border border-amber-200/30 rounded-3xl p-8 lg:p-12 shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 interactive-card">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6">Our Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To be recognized as the premier cricket academy in Eastern India, 
                producing world-class cricketers who represent the country at international 
                levels while maintaining the highest standards of sportsmanship and integrity.
              </p>
              <div className="flex items-center text-orange-600 font-semibold group cursor-pointer">
                <span>Explore Our Success Stories</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="text-center p-8 bg-white/95 backdrop-blur-xl border border-amber-200/30 rounded-3xl shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 interactive-card magnetic-hover"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline - Consistent styling */}
      <section ref={timelineRef} className="py-20 lg:py-24 relative bg-gradient-to-br from-amber-50/30 via-white to-orange-50/20">
        {/* Consistent Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.02)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.02] h-full w-full bg-[linear-gradient(to_right,#F59E0B_1px,transparent_1px),linear-gradient(to_bottom,#F59E0B_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Consistent Header Style */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-xl border border-amber-200/50 rounded-2xl text-gray-800 font-semibold mb-8 shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-500 group">
              <Crown className="w-5 h-5 mr-2 text-amber-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <span className="text-sm tracking-wide font-bold">OUR LEGACY</span>
              <div className="w-2 h-2 bg-amber-500 rounded-full ml-3 animate-pulse"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Journey of
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-black mt-2">
                Excellence
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              From humble beginnings to becoming West Bengal's premier cricket academy - 
              here's our story of growth, achievements, and unwavering commitment.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-red-500 opacity-30"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const Icon = item.icon
                const isEven = index % 2 === 0
                
                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    {/* Timeline marker */}
                    <div className="absolute left-8 lg:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-amber-500 rounded-full z-10 shadow-lg"></div>
                    
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? 'lg:pr-16 pl-20 lg:pl-0' : 'lg:pl-16 pl-20 lg:pr-0'}`}>
                      <div className="bg-white/95 backdrop-blur-xl border border-amber-200/30 rounded-3xl p-8 shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 interactive-card">
                        <div className="flex items-center mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mr-6 shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <div className="text-3xl font-black text-amber-600 mb-1">{item.year}</div>
                            <div className="text-xl font-bold text-gray-900">{item.title}</div>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Coaches - Consistent styling */}
      <section ref={coachesRef} className="py-20 lg:py-24 relative bg-gradient-to-br from-white via-gray-50/30 to-white">
        {/* Consistent Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.03)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(5,150,105,0.02)_0%,transparent_50%)]"></div>
          </div>
          <div className="absolute inset-0 opacity-[0.015]">
            <div className="h-full w-full bg-[linear-gradient(45deg,#D97706_1px,transparent_1px),linear-gradient(-45deg,#059669_1px,transparent_1px)] bg-[size:6rem_6rem]"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Consistent Header Style */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-10 py-5 mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-gray-50/95 to-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-gray-100/50"></div>
              <div className="relative flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-2 h-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="text-xl font-black text-gray-800 tracking-wider uppercase">
                  🏏 Expert Team
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                </div>
              </div>
            </div>
            
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-none tracking-tight">
              <span className="block text-gray-900 mb-6 drop-shadow-sm">
                Meet Our
              </span>
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6 filter drop-shadow-lg">
                World-Class
              </span>
              <span className="block text-gray-800 text-5xl md:text-6xl lg:text-7xl">
                Coaches
              </span>
            </h2>
            
            <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed font-semibold max-w-5xl mx-auto mb-20">
              Learn from the best! Our team of 
              <span className="text-amber-600 font-black"> experienced coaches</span> brings years of 
              <span className="text-green-600 font-black"> professional cricket experience</span> and 
              <span className="text-red-600 font-black"> proven training methodologies</span> to help you reach your potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-xl border border-amber-200/30 rounded-3xl p-8 shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 interactive-card magnetic-hover text-center"
              >
                <div className={`w-24 h-24 bg-gradient-to-br ${coach.color} rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {coach.initials}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{coach.name}</h3>
                <p className="text-amber-600 font-semibold text-lg mb-1">{coach.role}</p>
                <p className="text-gray-600 mb-4">{coach.experience} • {coach.specialty}</p>
                <p className="text-gray-700 leading-relaxed mb-6">{coach.achievements}</p>
                
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator variant="wave" />

      {/* Champion Success Stories Component */}
      <div className="champion-success-stories-section">
        <ChampionSuccessStories />
      </div>

      {/* Section Separator */}
      <SectionSeparator variant="wave" />

      {/* CTA Section - Consistent styling */}
      <section ref={ctaRef} className="py-20 relative overflow-hidden bg-gradient-to-br from-amber-50/30 via-white to-orange-50/20">
        {/* Consistent Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.02)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.02] h-full w-full bg-[linear-gradient(to_right,#F59E0B_1px,transparent_1px),linear-gradient(to_bottom,#F59E0B_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="max-w-6xl mx-auto">
            {/* Consistent Header Style */}
            <div className="inline-flex items-center px-10 py-5 mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-gray-50/95 to-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-gray-100/50"></div>
              <div className="relative flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-2 h-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="text-xl font-black text-gray-800 tracking-wider uppercase">
                  🏏 Join Our Family
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                </div>
              </div>
            </div>
            
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-none tracking-tight">
              <span className="block text-gray-900 mb-6 drop-shadow-sm">
                Ready to Join Our
              </span>
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6 filter drop-shadow-lg">
                Cricket Family?
              </span>
            </h2>
            
            <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed font-semibold max-w-5xl mx-auto mb-20">
              Experience the difference at 
              <span className="text-amber-600 font-black"> Doars Cricket Academy.</span> Book your 
              <span className="text-green-600 font-black"> free trial session</span> and discover why we're 
              <span className="text-red-600 font-black"> West Bengal's premier</span> cricket training destination.
            </p>
            
            {/* Consistent Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
              <button className="group relative inline-flex items-center px-16 py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 transform overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Trophy className="w-8 h-8 mr-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-500 relative z-10" />
                <span className="relative z-10">Book Free Trial</span>
              </button>
              
              <button className="group relative inline-flex items-center px-16 py-6 bg-white/95 backdrop-blur-sm border-4 border-gray-300 text-gray-800 font-black text-2xl rounded-3xl hover:bg-gray-50 transition-all duration-700 shadow-2xl hover:shadow-3xl transform hover:scale-110 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Phone className="w-8 h-8 mr-5 group-hover:scale-125 transition-transform duration-500 relative z-10" />
                <span className="relative z-10">Contact Us</span>
              </button>
            </div>
            
            {/* Consistent Contact Info */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Phone, label: 'Call Us', value: '+91 98765 43210', color: 'from-green-500 to-emerald-600' },
                { icon: Mail, label: 'Email Us', value: 'info@doarscricket.com', color: 'from-amber-500 to-orange-600' },
                { icon: MapPin, label: 'Visit Us', value: 'Siliguri, West Bengal', color: 'from-red-500 to-pink-600' }
              ].map((contact, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border-2 border-gray-100/50 hover:border-gray-200/80 hover:scale-105"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-gray-800 font-black text-lg mb-2">{contact.label}</span>
                  <span className="text-gray-600 font-semibold">{contact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About