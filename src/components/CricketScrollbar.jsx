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
        whileHover={{ 
          scale: 1.02,
          x: -2,
          transition: { duration: 0.2 }
        }}
      >
        <motion.div 
          className="cricket-scrollbar-track"
          whileHover={{ 
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Section Markers */}
          <div className="section-markers">
            {[20, 40, 60, 80].map((pos, index) => (
              <motion.div
                key={index}
                className="section-marker"
                style={{ top: `${pos}%` }}
                whileHover={{ 
                  scale: 1.8, 
                  backgroundColor: '#22c55e',
                  boxShadow: "0 0 15px rgba(34, 197, 94, 0.6)"
                }}
                whileTap={{ scale: 1.2 }}
                onClick={() => scrollToPosition(pos)}
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ 
                  scale: 1, 
                  opacity: Math.abs(scrollProgress - pos) < 10 ? 1 : 0.6,
                  backgroundColor: Math.abs(scrollProgress - pos) < 10 ? '#22c55e' : '#64748b'
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          
          {/* Progress Trail */}
          <motion.div
            className="progress-trail"
            style={{ 
              height: `${scrollProgress}%`,
              background: `linear-gradient(to bottom, 
                rgba(34, 197, 94, 0.8) 0%, 
                rgba(34, 197, 94, 0.4) 50%, 
                rgba(34, 197, 94, 0.1) 100%)`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isScrolling ? 0.8 : 0.4 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Cricket Ball Thumb */}
          <motion.div
            className="cricket-scrollbar-thumb"
            style={{ top: `${scrollProgress}%` }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            whileHover={{ 
              scale: 1.3,
              rotateZ: 360,
              transition: { 
                scale: { duration: 0.2 },
                rotateZ: { duration: 0.8, ease: "easeInOut" }
              }
            }}
            whileDrag={{ 
              scale: 1.4,
              rotateZ: 180,
              boxShadow: "0 0 25px rgba(34, 197, 94, 0.8)",
              transition: { duration: 0.2 }
            }}
            animate={{
              y: isScrolling ? [0, -2, 0] : 0,
              transition: { 
                y: { duration: 0.6, repeat: isScrolling ? Infinity : 0, ease: "easeInOut" }
              }
            }}
            onDrag={(e, info) => {
              const container = e.target.closest('.cricket-scrollbar-track')
              const rect = container.getBoundingClientRect()
              const percentage = Math.max(0, Math.min(100, (info.point.y - rect.top) / rect.height * 100))
              scrollToPosition(percentage)
            }}
          >
            <motion.div 
              className="ball-texture"
              whileHover={{
                boxShadow: "inset 0 0 15px rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="seam-line"
                animate={{
                  opacity: isScrolling ? [0.5, 1, 0.5] : 0.7,
                  transition: { 
                    duration: 1, 
                    repeat: isScrolling ? Infinity : 0,
                    ease: "easeInOut"
                  }
                }}
              ></motion.div>
              <motion.div 
                className="seam-curve seam-curve-1"
                animate={{
                  scale: isScrolling ? [1, 1.1, 1] : 1,
                  transition: { 
                    duration: 0.8, 
                    repeat: isScrolling ? Infinity : 0,
                    ease: "easeInOut"
                  }
                }}
              ></motion.div>
              <motion.div 
                className="seam-curve seam-curve-2"
                animate={{
                  scale: isScrolling ? [1, 1.1, 1] : 1,
                  transition: { 
                    duration: 0.8, 
                    repeat: isScrolling ? Infinity : 0,
                    ease: "easeInOut",
                    delay: 0.2
                  }
                }}
              ></motion.div>
            </motion.div>
            
            {/* Progress Ring */}
            <svg className="progress-ring" width="32" height="32">
              <motion.circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="rgba(34, 197, 94, 0.2)"
                strokeWidth="2"
                animate={{
                  scale: isScrolling ? [1, 1.1, 1] : 1,
                  transition: { 
                    duration: 1, 
                    repeat: isScrolling ? Infinity : 0,
                    ease: "easeInOut"
                  }
                }}
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
                animate={{ 
                  strokeDashoffset: 87.96 - (87.96 * scrollProgress) / 100,
                  filter: isScrolling ? 
                    "drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))" : 
                    "drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))"
                }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  stroke: "#10b981",
                  filter: "drop-shadow(0 0 12px rgba(16, 185, 129, 1))",
                  transition: { duration: 0.2 }
                }}
              />
            </svg>
          </motion.div>
          
          {/* Progress Percentage */}
          <motion.div
            className="scroll-percentage"
            animate={{ 
              opacity: isScrolling ? 1 : 0,
              scale: isScrolling ? 1 : 0.9,
              y: isScrolling ? 0 : 5
            }}
            transition={{ duration: 0.3 }}
            whileHover={{
              scale: 1.1,
              color: "#10b981",
              textShadow: "0 0 10px rgba(16, 185, 129, 0.8)",
              transition: { duration: 0.2 }
            }}
          >
            <motion.span
              animate={{
                rotateX: isScrolling ? [0, 360] : 0,
                transition: { 
                  duration: 2, 
                  repeat: isScrolling ? Infinity : 0,
                  ease: "linear"
                }
              }}
            >
              {Math.round(scrollProgress)}%
            </motion.span>
          </motion.div>
        </motion.div>
        
        {/* Current Section Tooltip */}
        <AnimatePresence>
          {(showTooltip || isScrolling) && currentSection && (
            <motion.div
              className="section-tooltip"
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                rotateY: [0, 5, 0],
                transition: { 
                  opacity: { duration: 0.2 },
                  x: { duration: 0.2 },
                  scale: { duration: 0.3 },
                  rotateY: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }
              }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              whileHover={{
                scale: 1.05,
                x: -5,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="tooltip-content"
                whileHover={{
                  background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.1))",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.span 
                  className="section-name"
                  animate={{
                    color: isScrolling ? ["#22c55e", "#10b981", "#22c55e"] : "#22c55e",
                    transition: { 
                      duration: 2, 
                      repeat: isScrolling ? Infinity : 0,
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 10px rgba(34, 197, 94, 0.8)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {getSectionName(currentSection)}
                </motion.span>
                <motion.div 
                  className="cricket-field-mini"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="mini-pitch"
                    animate={{
                      backgroundColor: isScrolling ? 
                        ["rgba(34, 197, 94, 0.3)", "rgba(16, 185, 129, 0.5)", "rgba(34, 197, 94, 0.3)"] :
                        "rgba(34, 197, 94, 0.3)",
                      transition: { 
                        duration: 1.5, 
                        repeat: isScrolling ? Infinity : 0,
                        ease: "easeInOut"
                      }
                    }}
                  ></motion.div>
                  <motion.div 
                    className="mini-ball" 
                    style={{ left: `${scrollProgress}%` }}
                    animate={{
                      scale: isScrolling ? [1, 1.3, 1] : 1,
                      rotateZ: isScrolling ? 360 : 0,
                      boxShadow: isScrolling ? 
                        ["0 0 5px rgba(34, 197, 94, 0.8)", "0 0 15px rgba(16, 185, 129, 1)", "0 0 5px rgba(34, 197, 94, 0.8)"] :
                        "0 0 5px rgba(34, 197, 94, 0.5)",
                      transition: { 
                        scale: { duration: 0.8, repeat: isScrolling ? Infinity : 0, ease: "easeInOut" },
                        rotateZ: { duration: 1, repeat: isScrolling ? Infinity : 0, ease: "linear" },
                        boxShadow: { duration: 1.2, repeat: isScrolling ? Infinity : 0, ease: "easeInOut" }
                      }
                    }}
                    whileHover={{
                      scale: 1.5,
                      transition: { duration: 0.2 }
                    }}
                  ></motion.div>
                </motion.div>
              </motion.div>
              <motion.div 
                className="tooltip-arrow"
                animate={{
                  borderLeftColor: isScrolling ? 
                    ["rgba(34, 197, 94, 0.9)", "rgba(16, 185, 129, 1)", "rgba(34, 197, 94, 0.9)"] :
                    "rgba(34, 197, 94, 0.9)",
                  transition: { 
                    duration: 2, 
                    repeat: isScrolling ? Infinity : 0,
                    ease: "easeInOut"
                  }
                }}
              ></motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrollProgress > 20 && (
          <motion.button
            className="scroll-to-top-cricket"
            initial={{ opacity: 0, scale: 0.8, y: 20, rotateZ: -180 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              rotateZ: 0,
              transition: { 
                opacity: { duration: 0.3 },
                scale: { duration: 0.4, type: "spring", stiffness: 300 },
                y: { duration: 0.4, type: "spring", stiffness: 300 },
                rotateZ: { duration: 0.6, ease: "easeOut" }
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 20, 
              rotateZ: 180,
              transition: { 
                duration: 0.3,
                rotateZ: { duration: 0.5 }
              }
            }}
            whileHover={{ 
              scale: 1.15, 
              y: -5,
              rotateZ: [0, -10, 10, 0],
              boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)",
              transition: { 
                scale: { duration: 0.2 },
                y: { duration: 0.2 },
                rotateZ: { duration: 0.6, ease: "easeInOut" },
                boxShadow: { duration: 0.3 }
              }
            }}
            whileTap={{ 
              scale: 0.9,
              y: 0,
              transition: { duration: 0.1 }
            }}
            onClick={() => scrollToPosition(0)}
            animate={{
              y: isScrolling ? [0, -3, 0] : 0,
              transition: { 
                y: { 
                  duration: 1.5, 
                  repeat: isScrolling ? Infinity : 0, 
                  ease: "easeInOut" 
                }
              }
            }}
          >
            <motion.div 
              className="cricket-bat"
              whileHover={{
                rotateZ: [0, 15, -15, 0],
                scale: 1.1,
                transition: { 
                  rotateZ: { duration: 0.8, ease: "easeInOut" },
                  scale: { duration: 0.2 }
                }
              }}
              animate={{
                rotateZ: isScrolling ? [0, 5, -5, 0] : 0,
                transition: { 
                  duration: 2, 
                  repeat: isScrolling ? Infinity : 0,
                  ease: "easeInOut"
                }
              }}
            >
              <motion.div 
                className="bat-blade"
                animate={{
                  background: isScrolling ? 
                    ["linear-gradient(45deg, #8B4513, #D2691E)", "linear-gradient(45deg, #D2691E, #CD853F)", "linear-gradient(45deg, #8B4513, #D2691E)"] :
                    "linear-gradient(45deg, #8B4513, #D2691E)",
                  transition: { 
                    duration: 1.5, 
                    repeat: isScrolling ? Infinity : 0,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{
                  boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.3)",
                  transition: { duration: 0.3 }
                }}
              ></motion.div>
              <motion.div 
                className="bat-handle"
                animate={{
                  scale: isScrolling ? [1, 1.05, 1] : 1,
                  transition: { 
                    duration: 1, 
                    repeat: isScrolling ? Infinity : 0,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{
                  background: "linear-gradient(to bottom, #654321, #8B4513)",
                  transition: { duration: 0.3 }
                }}
              ></motion.div>
            </motion.div>
            <motion.span 
              className="scroll-text"
              animate={{
                color: isScrolling ? ["#22c55e", "#10b981", "#22c55e"] : "#22c55e",
                textShadow: isScrolling ? 
                  ["0 0 5px rgba(34, 197, 94, 0.8)", "0 0 10px rgba(16, 185, 129, 1)", "0 0 5px rgba(34, 197, 94, 0.8)"] :
                  "0 0 5px rgba(34, 197, 94, 0.5)",
                transition: { 
                  duration: 2, 
                  repeat: isScrolling ? Infinity : 0,
                  ease: "easeInOut"
                }
              }}
              whileHover={{
                scale: 1.1,
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              Top
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default CricketScrollbar
