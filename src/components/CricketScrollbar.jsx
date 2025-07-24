import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CricketScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [currentSection, setCurrentSection] = useState('')
  const scrollTimeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / scrollHeight) * 100

      setScrollProgress(progress)
      setIsScrolling(true)

      // Detect current section
      const sections = document.querySelectorAll('section[id], div[id]')
      let current = ''
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = section.id || section.className.split(' ')[0]
        }
      })
      
      setCurrentSection(current)

      // Hide scrolling indicator after 1 second
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 1500)
    }

    const handleMouseMove = (e) => {
      const rightZone = window.innerWidth - 50
      setShowTooltip(e.clientX > rightZone)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const scrollToPosition = (percentage) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const targetPosition = (percentage / 100) * scrollHeight
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }

  const getSectionName = (section) => {
    const sectionNames = {
      'hero': '🏏 Home',
      'features': '⭐ Features',
      'stats': '📊 Stats',
      'programs': '🎯 Programs',
      'testimonials': '💬 Reviews',
      'contact': '📞 Contact',
      'about': '👥 About',
      'Home': '🏏 Home',
      'Features': '⭐ Features',
      'Stats': '📊 Stats'
    }
    return sectionNames[section] || '📄 Content'
  }

  return (
    <>
      {/* Enhanced Right-side Scrollbar */}
      <motion.div
        className="cricket-scrollbar-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: isScrolling || showTooltip ? 1 : 0.3,
          x: 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="cricket-scrollbar-track">
          {/* Section Markers */}
          <div className="section-markers">
            {[20, 40, 60, 80].map((pos, index) => (
              <motion.div
                key={index}
                className="section-marker"
                style={{ top: `${pos}%` }}
                whileHover={{ scale: 1.5, backgroundColor: '#22c55e' }}
                onClick={() => scrollToPosition(pos)}
              />
            ))}
          </div>
          
          {/* Cricket Ball Thumb */}
          <motion.div
            className="cricket-scrollbar-thumb"
            style={{ top: `${scrollProgress}%` }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            whileHover={{ scale: 1.2 }}
            whileDrag={{ scale: 1.3 }}
            onDrag={(e, info) => {
              const container = e.target.closest('.cricket-scrollbar-track')
              const rect = container.getBoundingClientRect()
              const percentage = Math.max(0, Math.min(100, (info.point.y - rect.top) / rect.height * 100))
              scrollToPosition(percentage)
            }}
          >
            <div className="ball-texture">
              <div className="seam-line"></div>
              <div className="seam-curve seam-curve-1"></div>
              <div className="seam-curve seam-curve-2"></div>
            </div>
            
            {/* Progress Ring */}
            <svg className="progress-ring" width="32" height="32">
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="rgba(34, 197, 94, 0.2)"
                strokeWidth="2"
              />
              <motion.circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={87.96}
                strokeDashoffset={87.96 - (87.96 * scrollProgress) / 100}
                initial={{ strokeDashoffset: 87.96 }}
                animate={{ strokeDashoffset: 87.96 - (87.96 * scrollProgress) / 100 }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </motion.div>
          
          {/* Progress Percentage */}
          <motion.div
            className="scroll-percentage"
            animate={{ opacity: isScrolling ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(scrollProgress)}%
          </motion.div>
        </div>
        
        {/* Current Section Tooltip */}
        <AnimatePresence>
          {(showTooltip || isScrolling) && currentSection && (
            <motion.div
              className="section-tooltip"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="tooltip-content">
                <span className="section-name">
                  {getSectionName(currentSection)}
                </span>
                <div className="cricket-field-mini">
                  <div className="mini-pitch"></div>
                  <div 
                    className="mini-ball" 
                    style={{ left: `${scrollProgress}%` }}
                  ></div>
                </div>
              </div>
              <div className="tooltip-arrow"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrollProgress > 20 && (
          <motion.button
            className="scroll-to-top-cricket"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToPosition(0)}
            transition={{ duration: 0.3 }}
          >
            <div className="cricket-bat">
              <div className="bat-blade"></div>
              <div className="bat-handle"></div>
            </div>
            <span className="scroll-text">Top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default CricketScrollbar
