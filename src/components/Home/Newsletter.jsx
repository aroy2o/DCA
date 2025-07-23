import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, Phone, MapPin, Clock, User, MessageSquare, Calendar, Trophy, Star, Shield, Zap } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    program: '',
    experience: 'beginner'
  })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('contact') // 'contact' or 'newsletter'

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Frontend-only: Log the subscription
    console.log('Newsletter subscription:', { email })
    
    // Show success message
    setSubscribed(true)
    
    // Reset form after delay
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 3000)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    
    // Frontend-only: Log the contact form data
    console.log('Contact form submission:', contactForm)
    
    // Show success message
    setContactSubmitted(true)
    
    // Reset form after delay
    setTimeout(() => {
      setContactSubmitted(false)
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        program: '',
        experience: 'beginner'
      })
    }, 4000)
  }

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 98765 43210',
      subDetails: 'Mon-Sun: 5:00 AM - 8:00 PM',
      color: 'from-green-500 to-green-600',
      action: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Doars Cricket Academy',
      subDetails: 'Alipurduar, West Bengal, India',
      color: 'from-blue-500 to-blue-600',
      action: 'https://maps.google.com/?q=Alipurduar,West+Bengal'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@doarscricket.com',
      subDetails: 'Quick response guaranteed',
      color: 'from-purple-500 to-purple-600',
      action: 'mailto:info@doarscricket.com'
    },
    {
      icon: Clock,
      title: 'Training Hours',
      details: '6:00 AM - 8:00 PM',
      subDetails: 'All days of the week',
      color: 'from-red-500 to-red-600',
      action: null
    }
  ]

  const programs = [
    'Junior Cricket (5-12 years)',
    'Youth Training (13-18 years)',
    'Senior Cricket (18+ years)',
    'Women Cricket',
    'Professional Coaching',
    'General Inquiry'
  ]

  const features = [
    { icon: Trophy, text: 'BCCI Certified', color: 'text-blue-600' },
    { icon: Star, text: '500+ Students', color: 'text-yellow-600' },
    { icon: Shield, text: '15+ Years', color: 'text-green-600' },
    { icon: Zap, text: '50+ State Players', color: 'text-purple-600' }
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/80"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-xl border border-white/30 rounded-full text-blue-700 font-semibold mb-6 shadow-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            <span>Contact Us</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Ready to Start Your
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
              Cricket Journey?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Get in touch with us today! Whether you want to enroll, have questions about our programs, 
            or need more information, we're here to help you achieve your cricket dreams.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-xl border border-white/30 rounded-full shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <p className="text-gray-600 mb-8">
                We're always ready to help you start or advance your cricket journey. 
                Reach out through any of these channels.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={index}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {info.action ? (
                        <a
                          href={info.action}
                          target={info.action.startsWith('http') ? '_blank' : '_self'}
                          rel={info.action.startsWith('http') ? 'noopener noreferrer' : ''}
                          className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/60 transition-all duration-300 cursor-pointer group-hover:transform group-hover:scale-105"
                        >
                          <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{info.title}</h4>
                            <p className="text-gray-800 font-medium">{info.details}</p>
                            <p className="text-sm text-gray-500">{info.subDetails}</p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-start space-x-4 p-4 rounded-xl">
                          <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{info.title}</h4>
                            <p className="text-gray-800 font-medium">{info.details}</p>
                            <p className="text-sm text-gray-500">{info.subDetails}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form and Newsletter */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => {
                      setActiveTab('contact')
                      // Smooth scroll to contact form if we're switching tabs
                      const contactSection = document.getElementById('contact')
                      if (contactSection) {
                        contactSection.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        })
                      }
                    }}
                    className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-300 ${
                      activeTab === 'contact'
                        ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 inline-block mr-2" />
                    Send Message
                  </button>
                  <button
                    onClick={() => setActiveTab('newsletter')}
                    className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-300 ${
                      activeTab === 'newsletter'
                        ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Mail className="w-5 h-5 inline-block mr-2" />
                    Newsletter
                  </button>
                </div>
              </div>

              <div className="p-8">
                {activeTab === 'contact' ? (
                  // Contact Form
                  <div data-contact-form>
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <MessageSquare className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Send Us A Message</h3>
                      <p className="text-gray-600">
                        Fill out the form below and we'll get back to you within 24 hours.
                      </p>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactChange}
                            placeholder="Your Full Name"
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                            required
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactChange}
                            placeholder="Your Email Address"
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={contactForm.phone}
                            onChange={handleContactChange}
                            placeholder="Your Phone Number"
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                            required
                          />
                        </div>
                        <div className="relative">
                          <Trophy className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                          <select
                            name="program"
                            value={contactForm.program}
                            onChange={handleContactChange}
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                            required
                          >
                            <option value="">Select Program of Interest</option>
                            {programs.map((program, index) => (
                              <option key={index} value={program}>{program}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="relative">
                        <Star className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <select
                          name="experience"
                          value={contactForm.experience}
                          onChange={handleContactChange}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="professional">Professional</option>
                        </select>
                      </div>

                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                          name="message"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          placeholder="Tell us about your cricket goals and any questions you have..."
                          rows="5"
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white resize-none"
                          required
                        />
                      </div>
                      
                      <motion.button
                        type="submit"
                        className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                          contactSubmitted
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                        }`}
                        whileTap={{ scale: 0.98 }}
                        disabled={contactSubmitted}
                      >
                        {contactSubmitted ? (
                          <span className="flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Message Sent Successfully!
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </span>
                        )}
                      </motion.button>
                    </form>
                  </div>
                ) : (
                  // Newsletter Signup
                  <div>
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h3>
                      <p className="text-gray-600">
                        Subscribe to our newsletter for latest updates, training tips, success stories, and academy news.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                          required
                        />
                      </div>
                      
                      <motion.button
                        type="submit"
                        className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                          subscribed
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                        }`}
                        whileTap={{ scale: 0.98 }}
                        disabled={subscribed}
                      >
                        {subscribed ? (
                          <span className="flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Subscribed Successfully!
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Send className="w-5 h-5 mr-2" />
                            Subscribe Now
                          </span>
                        )}
                      </motion.button>
                    </form>

                    <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-3">What you'll receive:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          Weekly training tips and techniques
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          Student success stories and achievements
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          Academy events and tournament updates
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          Exclusive offers and early enrollment access
                        </li>
                      </ul>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-6">
                      We respect your privacy. Unsubscribe at any time. No spam, we promise!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Book Your Free Trial?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Experience our world-class training firsthand. No commitment required!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
              <button
                onClick={() => {
                  setActiveTab('contact')
                  // Ensure contact form is visible
                  setTimeout(() => {
                    const contactForm = document.querySelector('[data-contact-form]')
                    if (contactForm) {
                      contactForm.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                      })
                    }
                  }, 100)
                }}
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Online
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
