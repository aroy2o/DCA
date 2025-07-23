import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  ArrowUp,
  Heart,
  Star,
  Award,
  Users,
  Send
} from 'lucide-react'
import { BUTTON_STYLES } from '../constants/styles'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Programs', href: '/programs' },
      { name: 'Coaches', href: '/about#coaches' },
      { name: 'Success Stories', href: '/about#success' },
    ],
    programs: [
      { name: 'Junior Cricket', href: '/programs#junior' },
      { name: 'Senior Training', href: '/programs#senior' },
      { name: 'Women Cricket', href: '/programs#women' },
      { name: 'Professional Coaching', href: '/programs#professional' },
    ],
    support: [
      { name: 'Contact Us', href: '/#contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Admissions', href: '/admissions' },
      { name: 'Facilities', href: '/facilities' },
    ]
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Call Us',
      value: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: Mail,
      label: 'Email Us',
      value: 'info@doarscricket.com',
      href: 'mailto:info@doarscricket.com'
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: 'Alipurduar, West Bengal, India',
      href: 'https://maps.google.com'
    },
    {
      icon: Clock,
      label: 'Training Hours',
      value: '6:00 AM - 8:00 PM',
      href: null
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-[#4FC3F7]' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-[#E63946]' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-[#4FC3F7]' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-[#E63946]' },
  ]

  const achievements = [
    { icon: Users, number: '500+', label: 'Students Trained' },
    { icon: Award, number: '15+', label: 'Years Experience' },
    { icon: Star, number: '50+', label: 'State Players' },
    { icon: Trophy, number: '98%', label: 'Success Rate' }
  ]

  return (
    <footer className="relative py-16 lg:py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900">
        {/* Main Footer Content */}
        <div className="py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Company Info & Newsletter */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo with Cricket Academy Colors */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#002B5B] via-[#4FC3F7] to-[#E63946] rounded-2xl flex items-center justify-center shadow-lg">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#002B5B]">Doars Cricket</h3>
                    <p className="text-sm text-gray-600">Academy</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  West Bengal's premier cricket academy dedicated to nurturing talent and creating champions. 
                  Join us to transform your passion into excellence.
                </p>

                {/* Newsletter Signup with Cricket Academy Colors */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-[#002B5B] mb-4">Stay Updated</h4>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4FC3F7] transition-all duration-300 shadow-lg shadow-gray-500/10"
                        required
                      />
                      <motion.button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-[#002B5B] via-[#4FC3F7] to-[#E63946] text-white font-semibold rounded-2xl hover:from-[#001f42] hover:via-[#29b6f6] hover:to-[#d1222f] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#002B5B]/25 hover:shadow-xl hover:shadow-[#002B5B]/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Send className="w-4 h-4" />
                        {subscribed ? 'Subscribed!' : 'Subscribe'}
                      </motion.button>
                    </div>
                  </form>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 hover:scale-110 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-blue-500/20`}
                        whileHover={{ y: -3 }}
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Company Links */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Company</h4>
                  <ul className="space-y-4">
                    {footerLinks.company.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 inline-block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Programs Links */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Programs</h4>
                  <ul className="space-y-4">
                    {footerLinks.programs.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 inline-block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Support Links */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Support</h4>
                  <ul className="space-y-4">
                    {footerLinks.support.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 inline-block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-bold text-gray-900 mb-6">Contact Info</h4>
                <div className="space-y-6">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-gray-500/10">
                        <contact.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{contact.label}</p>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="text-gray-900 hover:text-blue-600 transition-colors duration-300 text-sm font-medium"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-gray-900 text-sm font-medium">{contact.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="py-8 border-t border-gray-200/30"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-black text-gray-900 mb-1">{achievement.number}</div>
                <div className="text-sm text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-200/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-gray-600"
            >
              <span className="text-gray-600">© 2025 Doars Cricket Academy. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-gray-600">in West Bengal</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6"
            >
              <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                Terms of Service
              </Link>
              <motion.button
                onClick={scrollToTop}
                className="w-10 h-10 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-blue-500/20"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
