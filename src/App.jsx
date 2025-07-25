import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import CricketCursor from './components/CricketCursor'
import SmoothScrolling from './components/SmoothScrolling'
import Home from './pages/Home'
import Programs from './pages/Programs'
import ProgramDetail from './pages/ProgramDetail'
import About from './pages/About'
import Auth from './pages/Auth'
import './index.css'

// Hash navigation handler component
const HashNavigationHandler = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))
      if (element) {
        // Add a small delay to ensure the page is rendered
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
        return
      }
    }
    // Always scroll to top on route change if no hash
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])
  
  return null
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.pageYOffset / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Router>
      <div className="min-h-screen relative font-sans antialiased">
        {/* Global Unified Background System */}
        <div className="fixed inset-0 -z-50">
          {/* Main Background Gradient */}
          <div className="absolute inset-0 bg-white"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(209, 213, 219, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(209, 213, 219, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* Floating Background Elements */}
          <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-gray-200/20 to-gray-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-gray-100/20 to-gray-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-green-500/3 to-teal-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          
          {/* Interactive Background Orbs */}
          <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-br from-amber-500/8 to-orange-500/8 rounded-3xl blur-xl"></div>
          <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-br from-red-500/8 to-pink-500/8 rounded-2xl blur-xl"></div>
          <div className="absolute top-2/3 left-1/3 w-20 h-20 bg-gradient-to-br from-green-500/8 to-teal-500/8 rounded-xl blur-xl"></div>
          <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-gradient-to-br from-yellow-500/8 to-orange-500/8 rounded-lg blur-xl"></div>
        </div>

        <ScrollProgress progress={scrollProgress} />
        <Navbar />
        <CricketCursor />
        <HashNavigationHandler />
        
        {/* Main content with proper navbar spacing */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:id" element={<ProgramDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>

        {/* Universal Footer */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
