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

      {/* Hero Section - Mobile-First Modern Design */}
      <section className="relative mt-16 sm:mt-20 min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-amber-50/10 to-orange-50/20">
        {/* Mobile-Optimized Background System */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Simplified gradient overlays for better mobile performance */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.03)_0%,transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(5,150,105,0.02)_0%,transparent_50%)]"></div>
          </div>
          
          {/* Simplified grid pattern for mobile */}
          <div className="absolute inset-0 opacity-[0.01] sm:opacity-[0.015]">
            <div className="h-full w-full bg-[linear-gradient(45deg,#D97706_1px,transparent_1px),linear-gradient(-45deg,#059669_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:6rem_6rem]"></div>
          </div>
          
          {/* Mobile-optimized floating elements */}
          <div className="absolute top-10 sm:top-20 left-5 sm:left-20 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-amber-400/5 sm:from-amber-400/8 to-orange-400/5 sm:to-orange-400/8 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-orange-400/4 sm:from-orange-400/6 to-red-400/4 sm:to-red-400/6 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center py-8 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            
            {/* Mobile-Optimized Hero Badge */}
            <motion.div 
              className="inline-flex items-center px-4 sm:px-8 py-3 sm:py-4 mb-8 sm:mb-12 relative group"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-amber-50/98 to-white/98 backdrop-blur-3xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-amber-200/40 group-hover:border-orange-300/60 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/8 to-red-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-2 h-2 sm:w-4 sm:h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-pulse shadow-md" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-black text-gray-800 tracking-wider text-sm sm:text-base lg:text-lg">
                  {programsData.length} ELITE PROGRAMS
                </span>
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                <div className="hidden sm:flex items-center space-x-1">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
            </motion.div>
            
            {/* Mobile-First Hero Title */}
            <motion.div 
              className="mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
                <span className="block text-gray-900 mb-3 sm:mb-4 md:mb-6 drop-shadow-sm relative">
                  Unlock Your
                  <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-amber-200/10 via-orange-200/20 to-red-200/10 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl -z-10 animate-pulse"></div>
                </span>
                <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 filter drop-shadow-lg relative">
                  Cricket Potential
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-orange-400/5 to-red-400/5 blur-xl sm:blur-2xl animate-pulse"></div>
                </span>
                <span className="block text-gray-800 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl relative">
                  Championship Awaits
                  <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full transform scale-x-0 animate-[expandLine_2s_ease-out_1s_forwards]"></div>
                </span>
              </h1>

              <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl sm:max-w-4xl lg:max-w-5xl mx-auto leading-relaxed font-medium px-4 sm:px-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                From aspiring beginners to future champions, discover 
                <span className="text-amber-600 font-bold"> proven training programs</span> that unlock your potential and 
                <span className="text-orange-600 font-bold"> accelerate your cricket excellence</span> journey.
              </motion.p>
            </motion.div>

            {/* Mobile-First Search and Filters Container */}
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="bg-white/95 backdrop-blur-3xl border border-gray-200 sm:border-2 sm:border-gradient-to-r from-amber-200/50 via-orange-200/50 to-red-200/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg sm:shadow-xl lg:shadow-2xl hover:shadow-xl sm:hover:shadow-2xl lg:hover:shadow-3xl transition-all duration-700 group">
                
                {/* Mobile-Optimized Search Bar */}
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/3 via-orange-500/3 to-red-500/3 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Search className="absolute left-3 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:text-amber-600 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="🏏 Search programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 sm:pl-12 lg:pl-16 pr-4 sm:pr-6 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg border border-gray-200 sm:border-2 rounded-xl sm:rounded-2xl focus:border-orange-400 focus:ring-2 sm:focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/90 hover:bg-white font-medium placeholder:text-gray-400 hover:border-amber-300"
                  />
                  <div className="hidden sm:flex absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 items-center space-x-1 sm:space-x-2">
                    <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">⌘</kbd>
                    <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">K</kbd>
                  </div>
                </div>

                {/* Mobile-First Filter Buttons */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center">
                  {filterOptions.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`group relative flex items-center justify-center px-3 sm:px-4 lg:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 ${
                        activeFilter === filter.id
                          ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-orange-500/30'
                          : 'bg-white border border-gray-200 sm:border-2 text-gray-700 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        activeFilter === filter.id ? 'opacity-0' : ''
                      }`}></div>
                      <filter.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2 lg:mr-3 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300" />
                      <span className="hidden sm:inline">{filter.label}</span>
                      <span className="sm:hidden text-xs">{filter.label.split(' ')[0]}</span>
                      <span className={`ml-1 sm:ml-2 lg:ml-3 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 rounded-full text-xs font-black transition-all duration-300 ${
                        activeFilter === filter.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-700'
                      }`}>
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Mobile-Optimized Action Buttons */}
                <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => setIsComparingMode(!isComparingMode)}
                      className={`group relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transform hover:scale-105 overflow-hidden ${
                        isComparingMode
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/30'
                          : 'bg-white border border-gray-200 sm:border-2 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                      <span className="relative z-10">Compare ({comparisonList.length}/3)</span>
                    </button>
                    
                    <motion.a
                      href="#contact"
                      className="group relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-md sm:shadow-lg shadow-purple-500/30 hover:shadow-lg sm:hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                      <span className="relative z-10">Book Free Trial</span>
                      <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile-Optimized Decorative Elements */}
        <div className="absolute top-1/2 left-1 sm:left-2 md:left-4 w-1 sm:w-2 h-16 sm:h-32 md:h-48 bg-gradient-to-b from-transparent via-amber-400/30 sm:via-amber-400/60 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1 sm:right-2 md:right-4 w-1 sm:w-2 h-16 sm:h-32 md:h-48 bg-gradient-to-b from-transparent via-green-400/30 sm:via-green-400/60 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Mobile-optimized corner accents */}
        <div className="absolute top-5 sm:top-8 md:top-10 left-5 sm:left-8 md:left-10 w-8 sm:w-16 md:w-24 h-8 sm:h-16 md:h-24 border-l-2 sm:border-l-3 md:border-l-4 border-t-2 sm:border-t-3 md:border-t-4 border-amber-400/30 sm:border-amber-400/40 rounded-tl-xl sm:rounded-tl-2xl md:rounded-tl-3xl"></div>
        <div className="absolute top-5 sm:top-8 md:top-10 right-5 sm:right-8 md:right-10 w-8 sm:w-16 md:w-24 h-8 sm:h-16 md:h-24 border-r-2 sm:border-r-3 md:border-r-4 border-t-2 sm:border-t-3 md:border-t-4 border-green-400/30 sm:border-green-400/40 rounded-tr-xl sm:rounded-tr-2xl md:rounded-tr-3xl"></div>
        
        {/* Mobile-optimized cricket elements */}
        <div className="absolute top-10 sm:top-16 md:top-20 right-10 sm:right-16 md:right-20 opacity-5 sm:opacity-10 hover:opacity-15 sm:hover:opacity-20 transition-opacity duration-300">
          <div className="text-3xl sm:text-4xl md:text-6xl filter grayscale">🏏</div>
        </div>
        <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-10 sm:left-16 md:left-20 opacity-5 sm:opacity-10 hover:opacity-15 sm:hover:opacity-20 transition-opacity duration-300">
          <div className="text-2xl sm:text-3xl md:text-5xl filter grayscale">🏆</div>
        </div>
      </section>

      {/* Mobile-Optimized Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative bg-gradient-to-br from-amber-50/30 via-white to-orange-50/20">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.02)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02] h-full w-full bg-[linear-gradient(to_right,#F59E0B_1px,transparent_1px),linear-gradient(to_bottom,#F59E0B_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {programStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br ${stat.bgColor} rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/50 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1 sm:group-hover:-translate-y-2`}>
                  <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 ${stat.color} bg-white rounded-lg sm:rounded-xl lg:rounded-2xl mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center shadow-md sm:shadow-lg group-hover:scale-105 sm:group-hover:scale-110 transition-all duration-300`}>
                    <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                  </div>
                  
                  <div className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black ${stat.color} mb-1 sm:mb-2`}>
                    {stat.number}{stat.suffix || ''}
                  </div>
                  <div className="text-gray-900 font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">{stat.label}</div>
                  <div className="text-gray-600 text-xs sm:text-sm leading-relaxed hidden sm:block">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile-First Section Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <motion.div 
              className="inline-flex items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white/98 backdrop-blur-3xl border border-amber-200/50 sm:border-2 rounded-2xl sm:rounded-3xl text-gray-800 font-semibold mb-6 sm:mb-8 lg:mb-10 shadow-lg sm:shadow-xl lg:shadow-2xl hover:shadow-xl sm:hover:shadow-2xl lg:hover:shadow-3xl transition-all duration-700 group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/8 to-red-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 text-amber-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <span className="text-sm sm:text-base tracking-wide font-black relative z-10">ELITE TRAINING PROGRAMS</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-2 sm:ml-3 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-6 lg:mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Championship-Level
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Training Programs
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-medium px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Carefully designed programs with 
              <span className="text-amber-600 font-bold"> proven methodologies</span>, 
              expert coaching, and 
              <span className="text-orange-600 font-bold"> personalized attention</span> to 
              maximize your cricket potential.
            </motion.p>
          </div>

          {/* Mobile-First Programs Grid */}
          <div ref={programsGridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <AnimatePresence mode="wait">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: 60 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 60 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="program-card magic-hover interactive-element relative group cursor-pointer bg-white/95 backdrop-blur-sm border border-gray-100 sm:border-2 hover:border-orange-200/80 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-700 rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105"
                  onMouseEnter={() => {
                    setHoveredCard(program.id)
                    // Create floating particles on hover
                    createHoverParticles(program.id)
                  }}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => createClickEffect(program.id)}
                  whileHover={{ 
                    y: -8, 
                    rotateY: 3,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                  }}
                  whileTap={{ 
                    scale: 0.98, 
                    rotateY: -1,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Mobile-Optimized Card Header */}
                  <div className="relative p-4 sm:p-6 lg:p-8 pb-3 sm:pb-4 lg:pb-6">
                    {/* Mobile-Optimized Age Group Badge */}
                    <motion.div 
                      className={`absolute -top-2 sm:-top-3 lg:-top-4 left-4 sm:left-6 lg:left-8 ${program.badgeColor} text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold shadow-lg sm:shadow-xl z-10`}
                      animate={hoveredCard === program.id ? { scale: 1.05, rotate: -2 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {program.ageGroup}
                    </motion.div>
                    
                    {/* Mobile-Optimized Premium Badge */}
                    {program.badge && (
                      <motion.div 
                        className="absolute -top-2 sm:-top-3 lg:-top-4 right-4 sm:right-6 lg:right-8 z-10"
                        animate={hoveredCard === program.id ? { scale: 1.05, rotate: 2 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`${program.badgeColor} text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg sm:rounded-xl text-xs font-bold shadow-lg sm:shadow-xl relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-white/20 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <span className="relative z-10">{program.badge}</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Gradient Overlay Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`}></div>
                  </div>

                  {/* Mobile-Optimized Card Content */}
                  <div className="px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 lg:pt-4 pb-4 sm:pb-6 lg:pb-8">
                    {/* Icon and Title Section */}
                    <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                      <motion.div 
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${program.gradientColor} rounded-2xl sm:rounded-3xl mx-auto flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 shadow-lg sm:shadow-xl lg:shadow-2xl`}
                        animate={hoveredCard === program.id ? { scale: 1.1, rotate: 6 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <program.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                        <div className="absolute inset-0 bg-white/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                      
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        {program.title}
                      </h3>
                      <p className={`${program.textColor} font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2`}>{program.level}</p>
                    </div>

                    {/* Mobile-Optimized Description */}
                    <p className="text-gray-600 text-center mb-4 sm:mb-6 lg:mb-8 leading-relaxed text-sm sm:text-base">
                      {program.description}
                    </p>

                    {/* Mobile-Optimized Pricing Section */}
                    <div className={`text-center mb-4 sm:mb-6 lg:mb-8 p-3 sm:p-4 lg:p-6 ${program.bgColor} rounded-2xl sm:rounded-3xl border border-white/50 sm:border-2 shadow-inner relative overflow-hidden group/pricing`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-2xl sm:rounded-3xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative">
                        <div className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black ${program.textColor} mb-1 sm:mb-2 group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300`}>
                          ₹{program.price}
                        </div>
                        <div className="text-gray-600 font-semibold text-sm sm:text-base lg:text-lg">per month</div>
                      </div>
                      
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover/pricing:translate-x-full transition-transform duration-1000"></div>
                    </div>
                      
                    {/* Mobile-Optimized Features Section */}
                    <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8">
                      {program.features.slice(0, 3).map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-start group/feature"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${program.gradientColor} rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 lg:mr-4 flex-shrink-0 shadow-md sm:shadow-lg group-hover/feature:scale-105 sm:group-hover/feature:scale-110 transition-transform duration-300`}>
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <span className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed font-medium group-hover/feature:text-gray-900 transition-colors duration-300">{feature}</span>
                        </motion.div>
                      ))}
                      {program.features.length > 3 && (
                        <div className="text-center pt-2 sm:pt-3">
                          <span className={`text-xs sm:text-sm ${program.textColor} font-bold px-2 sm:px-3 py-1 bg-gray-50 rounded-full`}>
                            +{program.features.length - 3} more features
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Mobile-Optimized Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                      <div className="text-center p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 group/stat">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600 mx-auto mb-1 sm:mb-2 group-hover/stat:scale-105 sm:group-hover/stat:scale-110 transition-transform duration-300" />
                        <div className="text-sm sm:text-lg lg:text-xl font-black text-gray-900">{program.students}+</div>
                        <div className="text-xs text-gray-500 font-medium">Students</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 group/stat">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600 mx-auto mb-1 sm:mb-2 group-hover/stat:scale-105 sm:group-hover/stat:scale-110 transition-transform duration-300" />
                        <div className="text-sm sm:text-lg lg:text-xl font-black text-gray-900">{program.sessions}</div>
                        <div className="text-xs text-gray-500 font-medium">Sessions/Week</div>
                      </div>
                    </div>

                    {/* Mobile-Optimized Action Buttons */}
                    <div className="space-y-3 sm:space-y-4">
                      <Link
                        to={`/programs/${program.id}`}
                        className={`w-full ${program.gradientColor} text-white font-bold py-3 sm:py-4 lg:py-5 px-4 sm:px-5 lg:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg sm:hover:shadow-xl inline-flex items-center justify-center group/action relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-white/10 -skew-x-12 transform -translate-x-full group-hover/action:translate-x-full transition-transform duration-700"></div>
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover/action:scale-110 transition-transform duration-300 relative z-10" />
                        <span className="relative z-10 text-sm sm:text-base">Explore Program</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover/action:translate-x-1 transition-transform duration-300 relative z-10" />
                      </Link>
                      
                      <div className="flex gap-2 sm:gap-3">
                        <Link
                          to={`/programs/${program.id}#enroll`}
                          className="flex-1 bg-white border border-gray-200 sm:border-2 hover:border-orange-300 text-gray-700 hover:text-orange-600 font-bold py-3 sm:py-4 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-lg inline-flex items-center justify-center group/enroll relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover/enroll:opacity-100 transition-opacity duration-300"></div>
                          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover/enroll:rotate-12 transition-transform duration-300 relative z-10" />
                          <span className="relative z-10 text-xs sm:text-sm">Enroll Now</span>
                        </Link>
                        
                        {isComparingMode && (
                          <button
                            onClick={() => toggleComparison(program)}
                            className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                              comparisonList.find(p => p.id === program.id)
                                ? 'bg-blue-500 text-white shadow-md sm:shadow-lg shadow-blue-500/30'
                                : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                          >
                            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile-Optimized No Results State */}
          {filteredPrograms.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="text-center py-12 sm:py-16 lg:py-20"
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full animate-pulse"></div>
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-lg sm:shadow-xl">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-400" />
                </div>
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-3 sm:mb-4">
                No Programs Found
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xs sm:max-w-md mx-auto leading-relaxed px-4 sm:px-0">
                We couldn't find any programs matching your criteria. 
                Try adjusting your search or filters.
              </p>
              
              <div className="flex flex-col gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <button
                  onClick={() => {
                    setActiveFilter('all')
                    setSearchTerm('')
                  }}
                  className="group relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 hover:scale-105 transform overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10 text-sm sm:text-base">Clear All Filters</span>
                </button>
                
                <button className="group relative bg-white border border-gray-200 sm:border-2 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 hover:scale-105">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                  <span className="text-sm sm:text-base">Contact Us for Help</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Mobile-Optimized Comparison Bar */}
      <AnimatePresence>
        {comparisonList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 sm:border-t-2 shadow-lg sm:shadow-2xl z-40 p-3 sm:p-4 lg:p-6"
          >
            <div className="max-w-7xl mx-auto">
              {/* Mobile Layout */}
              <div className="sm:hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <BarChart3 className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="font-bold text-gray-900 text-sm">
                      Comparing {comparisonList.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setComparisonList([])}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="flex gap-2 mb-3 overflow-x-auto">
                  {comparisonList.map(program => (
                    <div key={program.id} className="flex items-center bg-orange-100 px-2 py-1 rounded-lg whitespace-nowrap">
                      <span className="text-xs font-medium text-orange-800">{program.title}</span>
                      <button
                        onClick={() => toggleComparison(program)}
                        className="ml-1 text-orange-600 hover:text-orange-800 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 text-sm">
                  Compare Details
                </button>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600 mr-3" />
                  <span className="font-bold text-gray-900 text-base lg:text-lg">
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
                  
                  <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-bold hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 text-sm lg:text-base">
                    Compare Details
                  </button>
                  
                  <button
                    onClick={() => setComparisonList([])}
                    className="text-gray-500 hover:text-gray-700 text-sm lg:text-base"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile-First CTA Section */}
      <section ref={ctaRef} className="py-12 sm:py-16 lg:py-20 xl:py-24 relative overflow-hidden bg-gradient-to-br from-amber-50/30 via-white to-orange-50/20">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.02)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02] h-full w-full bg-[linear-gradient(to_right,#F59E0B_1px,transparent_1px),linear-gradient(to_bottom,#F59E0B_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem]"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Mobile-Optimized Hero Badge */}
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/95 backdrop-blur-xl border border-amber-200/50 rounded-xl sm:rounded-2xl text-gray-800 font-semibold mb-6 sm:mb-8 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 group">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 text-amber-600 group-hover:scale-105 sm:group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <span className="text-xs sm:text-sm tracking-wide font-bold">READY TO START</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-6 lg:mb-8">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Cricket Journey?
              </span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              Join thousands of successful cricketers who have transformed their game with our proven training methods. 
              Your championship journey begins with the right program.
            </p>
            
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-8 sm:mb-10 lg:mb-12 xl:mb-16 px-4 sm:px-0">
              <button className="relative inline-flex items-center px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 group hover:scale-105 transform overflow-hidden w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 rounded-xl sm:rounded-2xl transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 group-hover:scale-110 sm:group-hover:scale-125 transition-transform relative z-10" />
                <span className="relative z-10">Book Free Assessment</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform relative z-10" />
              </button>
              
              <a
                href="tel:+919876543210"
                className="relative inline-flex items-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-white border border-gray-300 sm:border-2 text-gray-800 font-bold rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-500 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transform hover:scale-105 group w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:scale-110 sm:group-hover:scale-125 transition-transform" />
                <span className="text-sm sm:text-base">Speak to Expert Coach</span>
              </a>
            </div>

            {/* Mobile-Optimized Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-0">
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-orange-600 mb-1 sm:mb-2">{programsData.length}</div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm">Programs Available</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-red-600 mb-1 sm:mb-2">₹2,500+</div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm">Starting Price</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-amber-600 mb-1 sm:mb-2">15+</div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-rose-600 mb-1 sm:mb-2">100%</div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm">Personalized Training</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Programs
