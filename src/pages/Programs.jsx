import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { programsData } from '../data/programs';
import {
  ArrowRight, Users, Trophy, Calendar, Star, Award, Target,
  CheckCircle, Crown, Play, Phone, Search,
  TrendingUp, Sparkles, Activity,
  BarChart3, Clock, DollarSign, BookOpen, Heart // Added Heart import
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Programs = () => {
  const heroRef = useRef(null);
  const programsGridRef = useRef(null);
  const ctaRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredPrograms, setFilteredPrograms] = useState(programsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isComparingMode, setIsComparingMode] = useState(false);
  const [comparisonList, setComparisonList] = useState([]);

  // Helper for creating particles (placeholder - replace with actual implementation if needed)
  const createHoverParticles = (id) => {
    // console.log(`Creating particles for card: ${id}`);
    // Example: You might trigger a particle animation library here
  };

  // Helper for creating click effect (placeholder - replace with actual implementation if needed)
  const createClickEffect = (id) => {
    // console.log(`Applying click effect for card: ${id}`);
    // Example: You might trigger a subtle visual feedback here
  };

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current?.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

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
    );

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = programsData;

    // Apply filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(program => {
        switch (activeFilter) {
          case 'junior':
            return program.id.includes('junior') || program.ageGroup.includes('6-12');
          case 'youth':
            return program.id.includes('youth') || program.ageGroup.includes('13-17');
          case 'adult':
            // Check for 'senior' or 'elite' in ID, or '18+' in ageGroup
            return program.id.includes('senior') || program.id.includes('elite') || program.ageGroup.includes('18+');
          case 'women':
            return program.id.includes('womens');
          case 'weekend':
            return program.id.includes('weekend');
          default:
            return true;
        }
      });
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.level.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPrograms(filtered);
  }, [activeFilter, searchTerm]);

  // Program comparison functionality
  const toggleComparison = (program) => {
    if (comparisonList.find(p => p.id === program.id)) {
      setComparisonList(comparisonList.filter(p => p.id !== program.id));
    } else if (comparisonList.length < 3) {
      setComparisonList([...comparisonList, program]);
    }
  };

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All Programs', icon: Target, count: programsData.length },
    { id: 'junior', label: 'Junior (6-12)', icon: Users, count: programsData.filter(p => p.ageGroup.includes('6-12')).length },
    { id: 'youth', label: 'Youth (13-17)', icon: Trophy, count: programsData.filter(p => p.ageGroup.includes('13-17')).length },
    { id: 'adult', label: 'Adult (18+)', icon: Star, count: programsData.filter(p => p.ageGroup.includes('18+') || p.id.includes('senior') || p.id.includes('elite')).length },
    { id: 'women', label: "Women's", icon: Crown, count: programsData.filter(p => p.id.includes('womens')).length },
    { id: 'weekend', label: 'Weekend Only', icon: Calendar, count: programsData.filter(p => p.id.includes('weekend')).length }
  ];

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
  ];

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

      {/* --- INFRASTRUCTURE GALLERY & FEATURES SECTION --- */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.04)_0%,transparent_60%)]"></div>
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-xl border border-orange-200/50 rounded-2xl text-gray-800 font-semibold mb-6 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 group">
              <Trophy className="w-5 h-5 mr-2 text-orange-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <span className="text-sm tracking-wide font-bold">OUR INFRASTRUCTURE</span>
              <div className="w-2 h-2 bg-orange-500 rounded-full ml-3 animate-pulse"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              World-Class
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">Facilities & Features</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
              Explore our modern cricketing infrastructure designed for champions. From lush grounds to high-tech nets, we have it all!
            </p>
          </motion.div>

          {/* GALLERY GRID */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {[
              {
                src: 'https://content.jdmagicbox.com/v2/v2/comp/hyderabad/m7/040pxx40.xx40.240329000940.p5m7/catalogue/tjr-cricket-ground-nagaram-hyderabad-sports-ground-vs0vs9yfb3.jpg',
                alt: 'Cricket Ground',
                label: 'International Standard Ground',
              },
              {
                src: 'https://ngasafetynets.in/wp-content/uploads/2024/10/9-4.webp',
                alt: 'Practice Nets',
                label: 'All-weather Practice Nets',
              },
              {
                src: 'https://i0.wp.com/cricketgraph.com/wp-content/uploads/2018/07/logo-1.jpg?fit=569%2C282&ssl=1',
                alt: 'Bowling Machine',
                label: 'Bowling Machine Zone',
              },
              {
                src: 'https://www.omancricket.org/wp-content/uploads/2017/12/IMG-20171130-WA006.jpg',
                alt: 'Floodlights',
                label: 'Floodlit Evening Practice',
              },
              {
                src: 'https://media.istockphoto.com/id/998865276/photo/cricket-practice-nets-and-stumps.jpg?s=612x612&w=0&k=20&c=P7dwdK0hY5yWevIv7GeAwQd92s0iWDegHAvMoDzZ77Y=',
                alt: 'Indoor Nets',
                label: 'Indoor Training Arena',
              },
              {
                src: 'https://content.jdmagicbox.com/v2/comp/bangalore/g9/080pxx80.xx80.221118234004.x1g9/catalogue/4k-fitness-club-langford-road-bangalore-fitness-centres-17cn7ht1gx.jpg',
                alt: 'Fitness Zone',
                label: 'Modern Fitness Zone',
              },
            ].map((img, idx) => (
              <motion.div
                key={img.src}
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer hover:scale-105 hover:z-20 transition-transform duration-500"
                whileHover={{ scale: 1.07, boxShadow: '0 8px 32px rgba(251,191,36,0.18)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex items-end rounded-b-2xl">
                  <span className="text-white font-bold text-lg drop-shadow-lg animate-pulse group-hover:animate-none">{img.label}</span>
                </div>
                {/* Micro-interaction: floating badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg opacity-80 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {idx + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* FEATURES GRID */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {[
              { icon: Trophy, title: 'Match-Ready Ground', desc: 'Lush, well-maintained outfield with professional pitch.' },
              { icon: Users, title: 'Multiple Practice Nets', desc: 'All-weather nets for year-round training.' },
              { icon: Award, title: 'Bowling Machines', desc: 'Automated machines for advanced batting drills.' },
              { icon: Star, title: 'Floodlights', desc: 'Evening practice with stadium-grade lighting.' },
              { icon: Calendar, title: 'Indoor Arena', desc: 'Rain-proof indoor nets for uninterrupted sessions.' },
              { icon: Heart, title: 'Fitness Zone', desc: 'Modern gym and recovery area for athletes.' },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-white/95 backdrop-blur-xl border border-orange-200/30 rounded-3xl p-8 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 interactive-card text-center group cursor-pointer"
                whileHover={{ y: -8, scale: 1.04, boxShadow: '0 8px 32px rgba(251,191,36,0.18)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
                    setHoveredCard(program.id);
                    createHoverParticles(program.id);
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
                  {/* COMPACT CARD DESIGN START */}
                  <div className="relative p-4 sm:p-5 lg:p-6">
                    {/* Badges (Age Group & Premium) remain largely the same, but slightly adjusted padding */}
                    <motion.div
                      className={`absolute -top-2 sm:-top-3 left-4 sm:left-5 ${program.badgeBgColor || 'bg-gray-700'} text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold shadow-lg sm:shadow-xl z-10`}
                      animate={hoveredCard === program.id ? { scale: 1.05, rotate: -2 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {program.ageGroup}
                    </motion.div>

                    {program.badge && (
                      <motion.div
                        className="absolute -top-2 sm:-top-3 right-4 sm:right-5 z-10"
                        animate={hoveredCard === program.id ? { scale: 1.05, rotate: 2 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`${program.badgeBgColor || 'bg-gray-700'} text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-bold shadow-lg sm:shadow-xl relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-white/20 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <span className="relative z-10">{program.badge}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Gradient Overlay Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`}></div>

                    {/* Main Content Area - Reduced Padding */}
                    <div className="pt-8 sm:pt-10 pb-2 sm:pb-3 text-center">
                      {/* Icon */}
                      <motion.div
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 ${program.gradientColor} rounded-xl sm:rounded-2xl mx-auto flex items-center justify-center mb-3 sm:mb-4 shadow-lg sm:shadow-xl`}
                        animate={hoveredCard === program.id ? { scale: 1.1, rotate: 6 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <program.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>

                      {/* Title and Level */}
                      <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-1 sm:mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {program.title}
                      </h3>
                      <p className={`${program.textColor} font-bold text-sm sm:text-base mb-3`}>{program.level}</p>

                      {/* Compact Description (Optional: truncate for smaller screens if too long) */}
                      <p className="text-gray-600 text-center text-sm mb-4 leading-snug">
                        {program.description.length > 90 ? program.description.substring(0, 90) + '...' : program.description}
                      </p>

                      {/* Key Stats - Inline or smaller grid for compactness */}
                      <div className="flex justify-center items-center gap-x-4 sm:gap-x-6 mb-4 sm:mb-5">
                        <div className="flex items-center text-gray-700 text-xs sm:text-sm font-medium">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-500" /> {program.students}+ Students
                        </div>
                        <div className="flex items-center text-gray-700 text-xs sm:text-sm font-medium">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-500" /> {program.sessions} Sessions/Week
                        </div>
                      </div>

                      {/* Pricing - More compact display */}
                      <div className={`text-center p-2 sm:p-3 ${program.bgColor} rounded-xl sm:rounded-2xl border border-white/50 shadow-inner relative overflow-hidden group/pricing mb-4 sm:mb-5`}>
                         <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-xl sm:rounded-2xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative flex items-center justify-center">
                          <DollarSign className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 ${program.textColor}`} />
                          <div className={`text-xl sm:text-2xl font-black ${program.textColor}`}>
                            ₹{program.price}
                          </div>
                          <div className="text-gray-600 font-semibold text-xs sm:text-sm ml-1">/ month</div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover/pricing:translate-x-full transition-transform duration-1000"></div>
                      </div>

                      {/* Core Features - Show fewer, potentially with a "see all" */}
                      <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
                        {program.features.slice(0, 2).map((feature, idx) => ( // Show only 2 features
                          <motion.div
                            key={idx}
                            className="flex items-center group/feature text-left"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * idx }}
                          >
                            <CheckCircle className={`w-3 h-3 sm:w-4 sm:h-4 ${program.textColor} flex-shrink-0 mr-2`} />
                            <span className="text-gray-700 text-xs sm:text-sm font-medium">{feature}</span>
                          </motion.div>
                        ))}
                        {program.features.length > 2 && (
                          <div className="text-center pt-1">
                            <span className={`text-xs ${program.textColor} font-bold px-2 py-0.5 bg-gray-50 rounded-full`}>
                              +{program.features.length - 2} more
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons - Slightly smaller padding */}
                      <div className="space-y-2 sm:space-y-3">
                        <Link
                          to={`/programs/${program.id}`}
                          className={`w-full ${program.gradientColor} text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:hover:shadow-xl inline-flex items-center justify-center group/action relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-white/10 -skew-x-12 transform -translate-x-full group-hover/action:translate-x-full transition-transform duration-700"></div>
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover/action:scale-110 transition-transform duration-300 relative z-10" />
                          <span className="relative z-10 text-sm">View Details</span>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover/action:translate-x-1 transition-transform duration-300 relative z-10" />
                        </Link>

                        <div className="flex gap-2 sm:gap-3">
                          <Link
                            to={`/programs/${program.id}#enroll`}
                            className="flex-1 bg-white border border-gray-200 sm:border-2 hover:border-orange-300 text-gray-700 hover:text-orange-600 font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg inline-flex items-center justify-center group/enroll relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover/enroll:opacity-100 transition-opacity duration-300"></div>
                            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 group-hover/enroll:rotate-12 transition-transform duration-300 relative z-10" />
                            <span className="relative z-10 text-xs sm:text-sm">Enroll Now</span>
                          </Link>

                          {isComparingMode && (
                            <button
                              onClick={() => toggleComparison(program)}
                              className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] ${
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
                  </div>
                  {/* COMPACT CARD DESIGN END */}
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
                    setActiveFilter('all');
                    setSearchTerm('');
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
  );
};

export default Programs;