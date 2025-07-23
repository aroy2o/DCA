import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, Trophy, Star, CheckCircle } from 'lucide-react'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    experience: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle authentication logic here
    console.log('Form submitted:', formData)
  }

  const benefits = [
    {
      icon: Trophy,
      title: 'Exclusive Access',
      description: 'Get access to premium training sessions and personalized coaching plans.'
    },
    {
      icon: Star,
      title: 'Progress Tracking',
      description: 'Track your improvement with detailed performance analytics and reports.'
    },
    {
      icon: CheckCircle,
      title: 'Community',
      description: 'Join a community of passionate cricketers and share your journey.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block"
            >
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Join Our
                <span className="gradient-text block">Cricket Family</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Create your account and embark on an extraordinary cricket journey with 
                India's premier cricket academy.
              </p>

              <div className="space-y-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">State Players</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-1">15+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Auth Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md mx-auto lg:mx-0"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Toggle Buttons */}
                <div className="flex bg-gray-50">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                      isLogin
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                      !isLogin
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {isLogin ? 'Welcome Back!' : 'Join Our Academy'}
                    </h2>
                    <p className="text-gray-600">
                      {isLogin 
                        ? 'Sign in to access your cricket training dashboard'
                        : 'Create your account and start your cricket journey'
                      }
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {!isLogin && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          {/* Name */}
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              name="name"
                              placeholder="Full Name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                              required={!isLogin}
                            />
                          </div>

                          {/* Phone */}
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone Number"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                              required={!isLogin}
                            />
                          </div>

                          {/* Age & Experience */}
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="number"
                              name="age"
                              placeholder="Age"
                              value={formData.age}
                              onChange={handleInputChange}
                              className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                              required={!isLogin}
                            />
                            <select
                              name="experience"
                              value={formData.experience}
                              onChange={handleInputChange}
                              className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                              required={!isLogin}
                            >
                              <option value="">Experience</option>
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                            </select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Confirm Password for Sign Up */}
                    <AnimatePresence>
                      {!isLogin && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                            required={!isLogin}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Remember Me / Forgot Password */}
                    {isLogin && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Forgot password?
                        </a>
                      </div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="w-full btn-primary py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </motion.button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or continue with</span>
                      </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                      >
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Google</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                      >
                        <div className="w-5 h-5 bg-blue-600 rounded mr-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">f</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Facebook</span>
                      </button>
                    </div>
                  </form>

                  {/* Terms */}
                  {!isLogin && (
                    <p className="mt-6 text-xs text-gray-500 text-center">
                      By creating an account, you agree to our{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                    </p>
                  )}
                </div>
              </div>

              {/* Mobile Benefits */}
              <div className="lg:hidden mt-8 space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
