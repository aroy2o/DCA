import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { programsData } from '../data/programs'
import { 
  ArrowRight, Users, Trophy, Calendar, Star, Award, Target, 
  CheckCircle, Crown, Play, Phone, Search, 
  TrendingUp, Sparkles, Activity,
  BarChart3
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Programs = () => {
  const heroRef = useRef(null)
  const programsGridRef = useRef(null)
  const ctaRef = useRef(null)

  // Simplified state management
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredPrograms, setFilteredPrograms] = useState(programsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isComparingMode, setIsComparingMode] = useState(false)
  const [comparisonList, setComparisonList] = useState([])

  useEffect(() => {
    // Clean hero animation
    gsap.fromTo(heroRef.current?.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }
    )

    // Programs grid animation
    gsap.fromTo(".program-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: programsGridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Filter and search functionality
  useEffect(() => {
    let filtered = programsData

    // Apply filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(program => {
        switch (activeFilter) {
          case 'junior':
            return program.id.includes('junior') || program.ageGroup.includes('6-12')
          case 'youth':
            return program.id.includes('youth') || program.ageGroup.includes('13-17')
          case 'adult':
            return program.id.includes('senior') || program.id.includes('elite') || program.ageGroup.includes('18+')
          case 'women':
            return program.id.includes('womens')
          case 'weekend':
            return program.id.includes('weekend')
          default:
            return true
        }
      })
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.level.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredPrograms(filtered)
  }, [activeFilter, searchTerm])

  // Program comparison functionality
  const toggleComparison = (program) => {
    if (comparisonList.find(p => p.id === program.id)) {
      setComparisonList(comparisonList.filter(p => p.id !== program.id))
    } else if (comparisonList.length < 3) {
      setComparisonList([...comparisonList, program])
    }
  }

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All Programs', icon: Target, count: programsData.length },
    { id: 'junior', label: 'Junior (6-12)', icon: Users, count: programsData.filter(p => p.ageGroup.includes('6-12')).length },
    { id: 'youth', label: 'Youth (13-17)', icon: Trophy, count: programsData.filter(p => p.ageGroup.includes('13-17')).length },
    { id: 'adult', label: 'Adult (18+)', icon: Star, count: programsData.filter(p => p.ageGroup.includes('18+')).length },
    { id: 'women', label: "Women's", icon: Crown, count: programsData.filter(p => p.id.includes('womens')).length },
    { id: 'weekend', label: 'Weekend Only', icon: Calendar, count: programsData.filter(p => p.id.includes('weekend')).length }
  ]

  // Stats data for the enhanced stats section
  const programStats = [
    { 
      number: programsData.length, 
      label: 'Training Programs', 
      icon: Target,
      description: 'Specialized courses for every skill level',
      color: 'text-amber-600',
      bgColor: 'from-amber-50 to-orange-100'
    },
    { 
      number: programsData.reduce((total, program) => total + program.students, 0), 
      label: 'Active Students', 
      icon: Users,
      description: 'Learning and growing with us',
      color: 'text-orange-600',
      bgColor: 'from-orange-50 to-red-100'
    },
    { 
      number: '98', 
      label: 'Success Rate', 
      icon: TrendingUp,
      description: 'Students achieving their cricket goals',
      color: 'text-red-600',
      bgColor: 'from-red-50 to-rose-100',
      suffix: '%'
    },
    { 
      number: '15', 
      label: 'Years Experience', 
      icon: Award,
      description: 'Proven track record of excellence',
      color: 'text-rose-600',
      bgColor: 'from-rose-50 to-pink-100',
      suffix: '+'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-white">
      {/* Clean Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 mt-20 overflow-hidden">
        <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Badge */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-bold mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              {programsData.length} Premium Training Programs Available
              <Sparkles className="w-4 h-4 ml-2" />
            </div>
          </motion.div>
          
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Choose Your
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Cricket Journey
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              From first-time players to future champions, discover the perfect training program 
              designed to unlock your potential and accelerate your cricket success.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl">
              
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search programs by name, level, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/50"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      activeFilter === filter.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <filter.icon className="w-4 h-4 mr-2" />
                    {filter.label}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                      activeFilter === filter.id 
                        ? 'bg-white/20' 
                        : 'bg-gray-100'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Compare Mode Toggle */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setIsComparingMode(!isComparingMode)}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isComparingMode
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Compare Programs ({comparisonList.length}/3)
                </button>
                
                <button className="flex items-center px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300">
                  <Phone className="w-4 h-4 mr-2" />
                  Get Recommendation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {programStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`relative p-8 bg-gradient-to-br ${stat.bgColor} rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2`}>
                  <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className={`w-16 h-16 ${stat.color} bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  
                  <div className={`text-4xl font-black ${stat.color} mb-2`}>
                    {stat.number}{stat.suffix || ''}
                  </div>
                  <div className="text-gray-900 font-bold text-lg mb-2">{stat.label}</div>
                  <div className="text-gray-600 text-sm">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Our Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Carefully crafted programs with proven methodologies, expert coaching, 
              and personalized attention to maximize your cricket potential.
            </p>
          </div>

          {/* Programs Grid */}
          <div ref={programsGridRef} className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="program-card relative group cursor-pointer bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-orange-200/50"
                  onMouseEnter={() => setHoveredCard(program.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Header */}
                  <div className="relative p-6 pb-4">
                    {/* Age Group Badge */}
                    <div className={`absolute -top-3 left-6 ${program.badgeColor} text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg transform transition-all duration-300 ${hoveredCard === program.id ? 'scale-110 -rotate-1' : ''}`}>
                      {program.ageGroup}
                    </div>
                    
                    {/* Premium Badge */}
                    {program.badge && (
                      <div className="absolute -top-3 right-6">
                        <div className={`${program.badgeColor} text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg`}>
                          {program.badge}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="px-6 pt-2 pb-6">
                    {/* Icon and Title */}
                    <div className="text-center mb-6">
                      <div className={`relative w-20 h-20 ${program.gradientColor} rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-xl transition-all duration-500 ${hoveredCard === program.id ? 'scale-110 rotate-6' : 'group-hover:scale-105'}`}>
                        <program.icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {program.title}
                      </h3>
                      <p className={`${program.textColor} font-bold text-lg`}>{program.level}</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-center mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Pricing */}
                    <div className={`text-center mb-6 p-4 ${program.bgColor} rounded-2xl border border-white/50 shadow-inner relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                      <div className="relative">
                        <div className={`text-4xl font-black ${program.textColor} mb-1`}>
                          ₹{program.price}
                        </div>
                        <div className="text-gray-600 font-semibold">per month</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {program.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className={`w-6 h-6 ${program.gradientColor} rounded-lg flex items-center justify-center mr-3 flex-shrink-0 shadow-md`}>
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed font-medium">{feature}</span>
                        </div>
                      ))}
                      {program.features.length > 3 && (
                        <div className="text-center pt-2">
                          <span className={`text-sm ${program.textColor} font-bold`}>
                            +{program.features.length - 3} more features
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <Users className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                        <div className="text-lg font-black text-gray-900">{program.students}+</div>
                        <div className="text-xs text-gray-500 font-medium">Students</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <Calendar className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                        <div className="text-lg font-black text-gray-900">{program.sessions}</div>
                        <div className="text-xs text-gray-500 font-medium">Sessions/Week</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Link
                        to={`/programs/${program.id}`}
                        className={`w-full ${program.gradientColor} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center group`}
                      >
                        <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Explore Program
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      
                      <div className="flex gap-2">
                        <Link
                          to={`/programs/${program.id}#enroll`}
                          className="flex-1 bg-white border-2 border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-600 font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md inline-flex items-center justify-center group text-sm"
                        >
                          <Trophy className="w-4 h-4 mr-1" />
                          Enroll Now
                        </Link>
                        
                        {isComparingMode && (
                          <button
                            onClick={() => toggleComparison(program)}
                            className={`px-3 py-3 rounded-lg font-bold transition-all duration-300 ${
                              comparisonList.find(p => p.id === program.id)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                            }`}
                          >
                            <BarChart3 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results State */}
          {filteredPrograms.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Programs Found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search terms or filters to find the perfect program.</p>
              <button
                onClick={() => {
                  setActiveFilter('all')
                  setSearchTerm('')
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Comparison Bar */}
      <AnimatePresence>
        {comparisonList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-orange-200 shadow-2xl z-40 p-6"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="w-6 h-6 text-orange-600 mr-3" />
                <span className="font-bold text-gray-900">
                  Comparing {comparisonList.length} programs
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {comparisonList.map(program => (
                    <div key={program.id} className="flex items-center bg-orange-100 px-3 py-2 rounded-lg">
                      <span className="text-sm font-medium text-orange-800">{program.title}</span>
                      <button
                        onClick={() => toggleComparison(program)}
                        className="ml-2 text-orange-600 hover:text-orange-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-xl transition-all duration-300">
                  Compare Details
                </button>
                
                <button
                  onClick={() => setComparisonList([])}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Cricket Journey?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of successful cricketers who have transformed their game with our proven training methods. 
              Your championship journey begins with the right program.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group hover:scale-105 transform overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 rounded-2xl transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                <Calendar className="w-6 h-6 mr-3 group-hover:scale-125 transition-transform relative z-10" />
                <span className="relative z-10">Book Free Assessment</span>
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
              </button>
              
              <a
                href="tel:+919876543210"
                className="relative inline-flex items-center px-10 py-4 bg-white border-2 border-gray-300 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 group"
              >
                <Phone className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
                Speak to Expert Coach
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-black text-orange-600 mb-2">{programsData.length}</div>
                <div className="text-gray-600 font-medium">Programs Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-red-600 mb-2">₹2,500+</div>
                <div className="text-gray-600 font-medium">Starting Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-amber-600 mb-2">15+</div>
                <div className="text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-rose-600 mb-2">100%</div>
                <div className="text-gray-600 font-medium">Personalized Training</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Programs
