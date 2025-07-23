import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Trophy, Users, Award, Target, Star, Quote, Calendar, MapPin, CheckCircle, Heart, Zap, Shield, ArrowRight, Phone, Mail } from 'lucide-react'
import AwardWinningAnimations from '../components/AwardWinningAnimations'
import ParticleSystem from '../components/ParticleSystem'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const missionRef = useRef(null)
  const timelineRef = useRef(null)
  const coachesRef = useRef(null)
  const testimonialsRef = useRef(null)
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

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'West Bengal U-19 Team',
      quote: 'DCA transformed my cricket journey. The coaches here believe in every student and provide personalized attention that makes all the difference.',
      rating: 5,
      initials: 'RS'
    },
    {
      name: 'Priya Chatterjee',
      role: 'Bengal Women Team',
      quote: 'As a female cricketer, I found the most supportive environment at DCA. They truly empower women in cricket.',
      rating: 5,
      initials: 'PC'
    },
    {
      name: 'Arjun Das',
      role: 'District Level Player',
      quote: 'From a complete beginner to representing my district - DCA made this journey possible with their excellent training programs.',
      rating: 5,
      initials: 'AD'
    },
    {
      name: 'Sneha Roy',
      role: 'Parent',
      quote: 'My son has grown not just as a cricketer but as a confident individual. The values taught here go beyond cricket.',
      rating: 5,
      initials: 'SR'
    }
  ]

  const achievements = [
    { number: '15+', label: 'Years of Excellence', icon: Trophy, color: 'from-blue-500 to-blue-600' },
    { number: '500+', label: 'Students Trained', icon: Users, color: 'from-green-500 to-green-600' },
    { number: '50+', label: 'State Level Players', icon: Star, color: 'from-yellow-500 to-yellow-600' },
    { number: '6', label: 'Expert Coaches', icon: Award, color: 'from-purple-500 to-purple-600' },
    { number: '100%', label: 'BCCI Certified', icon: CheckCircle, color: 'from-red-500 to-red-600' },
    { number: '25+', label: 'Awards Won', icon: Trophy, color: 'from-indigo-500 to-indigo-600' }
  ]

  const coaches = [
    {
      name: 'Rajesh Kumar',
      role: 'Head Coach & Founder',
      experience: '20+ Years',
      specialty: 'Batting & Leadership',
      achievements: 'Former Ranji Player, BCCI Level A Coach',
      initials: 'RK',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Amit Ghosh',
      role: 'Senior Bowling Coach',
      experience: '15+ Years',
      specialty: 'Fast Bowling & Pace',
      achievements: 'Ex-Bengal Fast Bowler, 200+ Wickets',
      initials: 'AG',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Sunita Devi',
      role: 'Women\'s Coach',
      experience: '12+ Years',
      specialty: 'All-Round Training',
      achievements: 'Former Bengal Women Captain',
      initials: 'SD',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const values = [
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'Striving for the highest standards in every aspect of cricket training and development.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Fostering a deep love for cricket while maintaining the joy and spirit of the game.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Building character through honest play, ethical conduct, and respect for all.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Embracing modern training techniques while respecting cricket\'s rich traditions.',
      color: 'from-purple-500 to-purple-600'
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
    const sections = [missionRef, timelineRef, coachesRef, testimonialsRef, ctaRef]
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
      {/* Unified Global Background System */}
      <div className="fixed inset-0 -z-50">
        {/* Main Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white to-blue-50/80"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating Background Elements */}
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-green-500/3 to-teal-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Interactive Background Orbs */}
        <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-3xl blur-xl parallax-element"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-br from-red-500/8 to-pink-500/8 rounded-2xl blur-xl parallax-element"></div>
        <div className="absolute top-2/3 left-1/3 w-20 h-20 bg-gradient-to-br from-green-500/8 to-teal-500/8 rounded-xl blur-xl parallax-element"></div>
        <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-gradient-to-br from-yellow-500/8 to-orange-500/8 rounded-lg blur-xl parallax-element"></div>
      </div>

      {/* Award-Winning Animation System */}
      <AwardWinningAnimations />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleSystem count={15} color="#3b82f6" />
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-red-600/10"></div>
        
        <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center px-6 py-3 glass-card rounded-full text-blue-700 font-semibold mb-8 shadow-lg interactive-card">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            <span>About Our Legacy</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 animate-pulse"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8">
            Crafting Cricket
            <span className="gradient-text block">Champions Since 2009</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
            From humble beginnings to becoming West Bengal's premier cricket academy, 
            we've been nurturing talent with passion, dedication, and world-class training methodologies.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="inline-flex items-center px-4 py-2 glass-card rounded-full text-green-600 font-medium shadow-md">
              <CheckCircle className="w-4 h-4 mr-2" />
              BCCI Certified
            </div>
            <div className="inline-flex items-center px-4 py-2 glass-card rounded-full text-yellow-600 font-medium shadow-md">
              <Trophy className="w-4 h-4 mr-2" />
              Award Winning
            </div>
            <div className="inline-flex items-center px-4 py-2 glass-card rounded-full text-blue-600 font-medium shadow-md">
              <Star className="w-4 h-4 mr-2" />
              500+ Students
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full parallax-element"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-red-500/10 rounded-full parallax-element"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-purple-500/10 rounded-full parallax-element"></div>
      </section>

      {/* Achievement Stats */}
      <section ref={statsRef} className="py-20 lg:py-24 relative">
        <ParticleSystem count={8} color="#ef4444" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Our Journey in
              <span className="gradient-text block">Numbers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Every statistic tells a story of dedication, growth, and the relentless pursuit of excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div
                  key={index}
                  className="text-center p-6 lg:p-8 glass-card rounded-3xl shadow-premium hover:shadow-premium-hover transition-all duration-500 interactive-card magnetic-hover"
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

      {/* Mission & Values */}
      <section ref={missionRef} className="py-20 lg:py-24 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 glass-card rounded-full text-blue-700 font-semibold mb-8 shadow-lg interactive-card">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <span>Our Foundation</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 animate-pulse"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Mission, Vision &
              <span className="gradient-text block">Core Values</span>
            </h2>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-premium interactive-card">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To discover, nurture, and develop cricket talent from the grassroots level, 
                providing world-class training facilities and expert coaching that transforms 
                passionate individuals into skilled cricketers who excel both on and off the field.
              </p>
              <div className="flex items-center text-blue-600 font-semibold group cursor-pointer">
                <span>Learn More About Our Approach</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-premium interactive-card">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6">Our Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To be recognized as the premier cricket academy in Eastern India, 
                producing world-class cricketers who represent the country at international 
                levels while maintaining the highest standards of sportsmanship and integrity.
              </p>
              <div className="flex items-center text-purple-600 font-semibold group cursor-pointer">
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
                  className="text-center p-8 glass-card rounded-3xl shadow-premium hover:shadow-premium-hover transition-all duration-500 interactive-card magnetic-hover"
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

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 lg:py-24 relative">
        <ParticleSystem count={12} color="#10b981" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 glass-card rounded-full text-blue-700 font-semibold mb-8 shadow-lg interactive-card">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <span>Our Legacy</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 animate-pulse"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Journey of
              <span className="gradient-text block">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              From humble beginnings to becoming West Bengal's premier cricket academy - 
              here's our story of growth, achievements, and unwavering commitment.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 opacity-30"></div>
            
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
                    <div className="absolute left-8 lg:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full z-10 shadow-lg"></div>
                    
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? 'lg:pr-16 pl-20 lg:pl-0' : 'lg:pl-16 pl-20 lg:pr-0'}`}>
                      <div className="glass-card rounded-3xl p-8 shadow-premium hover:shadow-premium-hover transition-all duration-500 interactive-card">
                        <div className="flex items-center mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mr-6 shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <div className="text-3xl font-black text-blue-600 mb-1">{item.year}</div>
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

      {/* Coaches */}
      <section ref={coachesRef} className="py-20 lg:py-24 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 glass-card rounded-full text-blue-700 font-semibold mb-8 shadow-lg interactive-card">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <span>Expert Team</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 animate-pulse"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Meet Our
              <span className="gradient-text block">World-Class Coaches</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Learn from the best! Our team of experienced coaches brings years of professional 
              cricket experience and proven training methodologies to help you reach your potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div
                key={index}
                className="glass-card rounded-3xl p-8 shadow-premium hover:shadow-premium-hover transition-all duration-500 interactive-card magnetic-hover text-center"
              >
                <div className={`w-24 h-24 bg-gradient-to-br ${coach.color} rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {coach.initials}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{coach.name}</h3>
                <p className="text-blue-600 font-semibold text-lg mb-1">{coach.role}</p>
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

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-20 lg:py-24 relative">
        <ParticleSystem count={10} color="#8b5cf6" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 glass-card rounded-full text-blue-700 font-semibold mb-8 shadow-lg interactive-card">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <span>Success Stories</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 animate-pulse"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              What Our
              <span className="gradient-text block">Champions Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Don't just take our word for it. Hear from our students, parents, and success stories 
              about their transformative experience at Doars Cricket Academy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card rounded-3xl p-8 shadow-premium hover:shadow-premium-hover transition-all duration-500 interactive-card magnetic-hover relative"
              >
                <Quote className="w-8 h-8 text-blue-500 mb-6" />
                <p className="text-gray-700 leading-relaxed mb-8 italic text-lg">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-purple-800/90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8">
              Ready to Join Our
              <span className="block gradient-text-white">Cricket Family?</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Experience the difference at Doars Cricket Academy. Book your free trial session 
              and discover why we're West Bengal's premier cricket training destination.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="cricket-button interactive-card magnetic-hover inline-flex items-center px-8 py-4 text-white font-bold rounded-xl shadow-premium group glow-on-hover">
                <Trophy className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Book Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="interactive-card magnetic-hover inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 group shadow-premium-hover">
                <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Call Us Now
              </button>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="glass-card rounded-2xl p-6 text-center">
                <MapPin className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Visit Us</h3>
                <p className="text-blue-100 text-sm">Doars Cricket Academy<br />Alipurduar, West Bengal</p>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <Phone className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Call Us</h3>
                <p className="text-blue-100 text-sm">+91 98765 43210<br />Daily: 5:00 AM - 8:00 PM</p>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <Mail className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Email Us</h3>
                <p className="text-blue-100 text-sm">info@doarscricket.com<br />Quick Response Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
