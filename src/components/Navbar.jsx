import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Menu, X, Trophy, Users, User, Phone, Sparkles } from 'lucide-react'
import { BUTTON_STYLES } from '../constants/styles'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const navRef = useRef(null)
  const location = useLocation()

  // Mouse tracking for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 20)
    }
    
    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  const navItems = [
    { name: 'Home', path: '/', icon: Trophy, badge: null },
    { name: 'Programs', path: '/programs', icon: Users, badge: 'New' },
    { name: 'About', path: '/about', icon: User, badge: null },
    { name: 'Contact', path: '/#contact', icon: Phone, badge: null },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    if (path.includes('#')) return location.pathname === '/' && location.hash === path.split('#')[1]
    return location.pathname.startsWith(path)
  }

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <motion.nav
      ref={navRef}
      className={`fixed w-full top-0 z-[9999] transition-all duration-700 ease-out ${
        scrolled 
          ? 'bg-white/98 backdrop-blur-xl shadow-lg shadow-gray-500/10 border-b border-gray-200/30 py-2' 
          : 'bg-white/95 backdrop-blur-xl shadow-md shadow-gray-500/10 border-b border-gray-200/20 py-4'
      }`}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo Section - Enhanced for visibility and responsiveness */}
          <motion.div
            className="flex items-center space-x-2 sm:space-x-3 relative group z-50"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div 
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden shadow-lg border-2 border-white/20 bg-white/95 backdrop-blur-sm"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#002B5B] via-[#4FC3F7] to-[#E63946] opacity-95"></div>
              <img 
                src="/DCA.jpg" 
                alt="DCA" 
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  e.target.style.display = 'none'
                  const fallback = e.target.nextElementSibling
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#002B5B] via-[#4FC3F7] to-[#E63946]" style={{ display: 'none' }}>
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  x: [-100, 100],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <Link to="/" className="relative z-50">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {/* Full name for larger screens - Always visible with better contrast */}
                <h1 className="hidden sm:block font-black text-lg sm:text-xl lg:text-2xl tracking-tight leading-tight drop-shadow-lg relative z-10">
                  <span className={`bg-gradient-to-r from-[#002B5B] via-[#4FC3F7] to-[#E63946] bg-clip-text text-transparent filter contrast-125 ${
                    scrolled ? 'drop-shadow-sm' : 'drop-shadow-md'
                  }`}>
                    Doars Cricket          
                  </span>
                  <br className="sm:hidden" />
                  <span className={`ml-1 sm:ml-0 font-black filter contrast-125 ${
                    scrolled 
                      ? 'text-[#002B5B] drop-shadow-sm' 
                      : 'text-[#002B5B] drop-shadow-md'
                  }`}>
                     Academy
                  </span>
                </h1>
                
                {/* Compact version for mobile - Always visible with better contrast */}
                <h1 className={`block sm:hidden font-black text-lg tracking-tight drop-shadow-lg relative z-10 ${
                  scrolled ? 'drop-shadow-sm' : 'drop-shadow-md'
                }`}>
                  <span className={`bg-gradient-to-r from-[#002B5B] via-[#4FC3F7] to-[#E63946] bg-clip-text text-transparent filter contrast-125 ${
                    scrolled ? 'drop-shadow-sm' : 'drop-shadow-md'
                  }`}>
                    DCA
                  </span>
                </h1>
                
                {/* Enhanced background for better visibility */}
                <div className={`absolute inset-0 rounded-lg -z-10 transition-all duration-300 ${
                  scrolled 
                    ? 'bg-white/20 backdrop-blur-sm' 
                    : 'bg-white/10 backdrop-blur-sm'
                }`}></div>
              </motion.div>
              
              {/* Subtle glow effect */}
              <motion.div
                className={`absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-lg -z-10 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10'
                    : 'bg-gradient-to-r from-amber-400/15 via-orange-400/15 to-red-400/15'
                }`}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation - Enhanced styling to match Hero */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const active = isActive(item.path)
              
              return (
                <motion.div
                  key={item.name}
                  className="relative"
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center space-x-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 group drop-shadow-sm ${
                      active
                        ? 'text-blue-600 bg-gradient-to-r from-blue-50/60 to-blue-50/40 shadow-sm border border-blue-200/40'
                        : scrolled 
                          ? 'text-gray-800 hover:text-blue-600 hover:bg-gradient-to-r hover:from-gray-50/40 hover:to-gray-50/20'
                          : 'text-gray-900 hover:text-amber-600 hover:bg-gradient-to-r hover:from-white/30 hover:to-white/10 hover:backdrop-blur-lg'
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    <span>{item.name}</span>
                    
                    {item.badge && (
                      <motion.span
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full shadow-lg"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                    
                    {active && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl -z-10"
                        layoutId="activeBackground"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {hoveredItem === item.name && !active && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-blue-500/5 rounded-2xl -z-10"
                        layoutId="hoverBackground"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
            
            <motion.div
              className="ml-4"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/auth"
                className="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 hover:from-blue-700 hover:via-purple-700 hover:to-red-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    x: [-100, 100],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                />
                <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Join Now</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button - Enhanced for better visibility */}
          <motion.button
            className={`lg:hidden relative p-2.5 sm:p-3 rounded-2xl transition-all duration-300 group z-50 ${
              scrolled 
                ? 'hover:bg-white/80 hover:shadow-sm border-2 border-gray-200/50 bg-white/70 backdrop-blur-sm' 
                : 'hover:bg-white/50 backdrop-blur-lg border-2 border-white/30 bg-white/30'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 drop-shadow-lg filter contrast-125" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 drop-shadow-lg filter contrast-125" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation - Enhanced styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl border-b border-gray-200/30 shadow-xl z-[9998]"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ 
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <motion.div 
              className="px-4 sm:px-6 py-4 sm:py-6 space-y-1 sm:space-y-2"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                
                return (
                  <motion.div
                    key={item.name}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 }
                    }}
                  >
                    <Link
                      to={item.path}
                      className={`relative flex items-center space-x-3 px-3 sm:px-4 py-3 sm:py-4 rounded-2xl transition-all duration-300 group drop-shadow-sm ${
                        active
                          ? 'text-blue-600 bg-gradient-to-r from-blue-50/50 to-blue-50/30'
                          : 'text-gray-800 hover:text-blue-600 hover:bg-gradient-to-r hover:from-gray-50/30 hover:to-gray-50/10'
                      }`}
                      onClick={handleNavClick}
                    >
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <span className="font-medium text-sm sm:text-base">{item.name}</span>
                      
                      {item.badge && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                          {item.badge}
                        </span>
                      )}
                      
                      {active && (
                        <motion.div
                          className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full"
                          layoutId="mobileActiveIndicator"
                          style={{ y: '-50%' }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
              
              <motion.div
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -20 }
                }}
                className="pt-4"
              >
                <Link
                  to="/auth"
                  className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white px-3 sm:px-4 py-3 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
                  onClick={handleNavClick}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Join Now</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Magnetic cursor effect */}
      <motion.div
        className="absolute w-3 h-3 bg-blue-500/10 rounded-full blur-sm pointer-events-none mix-blend-multiply opacity-0 hover:opacity-30 transition-opacity duration-500"
        style={{ x, y }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.nav>
  )
}

export default Navbar