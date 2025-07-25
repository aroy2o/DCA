import { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone, Trophy, Star, CheckCircle, Shield, Zap, Award, Users, Loader2, ArrowRight, Sparkles, Target } from 'lucide-react'
import { BUTTON_STYLES, TEXT_STYLES, CARD_STYLES, LAYOUT_STYLES } from '../constants/styles'
import ParticleSystem from '../components/Home/ParticleSystem'
import { AuthContext } from '../constants/index.js'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const benefitsRef = useRef(null)
  const statsRef = useRef(null)
  
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    experience: ''
  })

  const { isAuthenticated, login } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  // Password strength calculator
  const calculatePasswordStrength = useCallback((password) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    return strength
  }, [])

  // Form validation for both Login and Registration
  const validateForm = useCallback(() => {
    const errors = {}
    
    if (!isLogin) {
      if (!formData.name.trim()) errors.name = 'Full name is required'
      if (!formData.phone.trim()) errors.phone = 'Phone number is required'
      if (!formData.age || formData.age < 6 || formData.age > 50) errors.age = 'Age must be between 6 and 50'
      if (!formData.experience) errors.experience = 'Experience level is required'
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid'
    
    if (!formData.password.trim()) errors.password = 'Password is required'
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters'
    
    return errors
  }, [formData, isLogin])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }, [formErrors, calculatePasswordStrength])

  // Handles both Login and Registration submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsLoading(true)
    setFormErrors({})
    
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (isLogin) {
      if (formData.email !== 'test@test.com' || formData.password !== 'test@password') {
        setFormErrors({ submit: 'Invalid email or password.' })
        setIsLoading(false)
        return
      }
      login({ email: formData.email })
    } else {
      // Simulate successful registration
      console.log('Registration data:', formData)
    }

    setIsSuccess(true)
    setTimeout(() => {
        setIsSuccess(false)
        if (!isLogin) {
          // After successful registration, switch to login view
          setIsLogin(true);
        }
    }, 2000)
    setIsLoading(false)
  }, [formData, isLogin, login, validateForm])

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  const toggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword(prev => !prev)
  }, [])

  const benefits = useMemo(() => [
    {
      icon: Trophy,
      title: 'BCCI Certified Training',
      description: 'Professional coaching with certified trainers following international standards and proven methodologies.',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      iconColor: 'text-amber-600'
    },
    {
      icon: Target,
      title: 'Personalized Coaching',
      description: 'Individual attention with AI-powered performance tracking and customized training plans for optimal skill development.',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      iconColor: 'text-orange-600'
    }
  ], [])

  const stats = useMemo(() => [
    { number: '500+', label: 'Students Trained', icon: Users, color: 'text-amber-600', bgColor: 'from-amber-50 to-orange-100' },
    { number: '50+', label: 'State Players', icon: Trophy, color: 'text-orange-600', bgColor: 'from-orange-50 to-red-100' },
    { number: '15+', label: 'Years Experience', icon: Award, color: 'text-red-600', bgColor: 'from-red-50 to-rose-100' },
    { number: '98%', label: 'Success Rate', icon: CheckCircle, color: 'text-rose-600', bgColor: 'from-rose-50 to-pink-100' }
  ], [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
      <div className="absolute inset-0 overflow-hidden">
        <ParticleSystem />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/20 via-transparent to-orange-100/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-200/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className={`${LAYOUT_STYLES.container} px-4 sm:px-6 lg:px-8`}>
        <div className="relative z-10 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
            
            <div ref={heroRef} className="space-y-8 sm:space-y-10 lg:space-y-12 order-2 lg:order-1">
              <div className="space-y-6 sm:space-y-8">
                <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200/50">
                  <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 mr-2" />
                  <span className="text-amber-700 font-medium text-sm sm:text-base">India's Premier Cricket Academy</span>
                </div>
                
                <div>
                  <h1 className={`${TEXT_STYLES.heading1} mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl`}>
                    Join Our
                    <span className={`${TEXT_STYLES.gradient} block`}>Cricket Family</span>
                  </h1>
                  <p className={`${TEXT_STYLES.subtitle} max-w-xl text-base sm:text-lg`}>
                    Create your account and embark on an extraordinary cricket journey with 
                    professional coaching, modern facilities, and a proven track record of success.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button className={`${BUTTON_STYLES.primary} group text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4`}>
                    <Trophy className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Start Your Journey
                  </button>
                  <button className={`${BUTTON_STYLES.secondary} group text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4`}>
                    <Star className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Learn More
                  </button>
                </div>
              </div>

              <div ref={benefitsRef} className="space-y-4 sm:space-y-6 hidden sm:block">
                <h3 className={`${TEXT_STYLES.heading3} text-gray-800 text-xl sm:text-2xl`}>
                  Why Choose Doars Cricket Academy?
                </h3>
                <div className="grid gap-4 sm:gap-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <div key={index} className={`${CARD_STYLES.feature} hover:shadow-premium group relative overflow-hidden cursor-pointer`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="flex items-start space-x-3 sm:space-x-4 relative z-10">
                          <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-white drop-shadow-md" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-amber-700 transition-colors duration-300">
                              {benefit.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-amber-400/30 group-hover:to-orange-400/30 transition-all duration-500"></div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className={`${CARD_STYLES.stat} bg-gradient-to-br ${stat.bgColor} hover:shadow-lg group p-3 sm:p-4 relative overflow-hidden cursor-pointer`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex justify-center">
                        <Icon className={`w-6 sm:w-8 h-6 sm:h-8 ${stat.color} mb-1 sm:mb-2 drop-shadow-md`} />
                      </div>
                      <div className={`text-xl sm:text-3xl font-black ${stat.color} mb-1 stat-number transition-all duration-300 group-hover:scale-110`}>
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {stat.label}
                      </div>
                      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/30 transition-all duration-500"></div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div ref={formRef} className="w-full max-w-md mx-auto lg:mx-0 order-1 lg:order-2">
              <div className={`${CARD_STYLES.hero} shadow-2xl border-2 border-gray-100/50 overflow-hidden backdrop-blur-sm mx-4 sm:mx-0 relative`}>
                <div className="flex bg-gradient-to-r from-gray-50 to-gray-100/50 p-1 sm:p-2 rounded-t-3xl">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 font-bold text-base sm:text-lg rounded-2xl transition-all duration-500 ${isLogin ? 'bg-white text-amber-600 shadow-lg scale-105' : 'text-gray-600 hover:text-amber-600 hover:bg-white/50'}`}
                  >
                    Welcome Back
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 font-bold text-base sm:text-lg rounded-2xl transition-all duration-500 ${!isLogin ? 'bg-white text-amber-600 shadow-lg scale-105' : 'text-gray-600 hover:text-amber-600 hover:bg-white/50'}`}
                  >
                    Join Academy
                  </button>
                </div>

                <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 text-center">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-xl">
                    <Trophy className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
                  </div>
                  <h2 className={`${TEXT_STYLES.heading3} text-gray-900 mb-2 sm:mb-3 text-xl sm:text-2xl`}>
                    {isLogin ? 'Sign In to Academy' : 'Begin Your Cricket Journey'}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-lg">
                    {isLogin ? 'Access your training dashboard and continue your path to excellence' : 'Join thousands of cricketers who trust us for their development'}
                  </p>
                </div>

                <div className="px-4 sm:px-8 pb-6 sm:pb-8">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* REGISTRATION FIELDS */}
                    {!isLogin && (
                      <div className="space-y-4 sm:space-y-6">
                        {/* Name Input */}
                        <div className="relative group">
                          <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-amber-600 transition-colors duration-300" />
                          <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleInputChange} className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-4 sm:py-5 border-2 rounded-2xl bg-gray-50/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:bg-white group hover:bg-white text-base sm:text-lg font-medium ${formErrors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`} required={!isLogin} />
                          {formErrors.name && (<p className="absolute -bottom-6 left-0 text-red-500 text-xs sm:text-sm font-medium">{formErrors.name}</p>)}
                        </div>
                        {/* Phone Input */}
                        <div className="relative group">
                          <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-amber-600 transition-colors duration-300" />
                          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-4 sm:py-5 border-2 rounded-2xl bg-gray-50/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:bg-white group hover:bg-white text-base sm:text-lg font-medium ${formErrors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`} required={!isLogin} />
                          {formErrors.phone && (<p className="absolute -bottom-6 left-0 text-red-500 text-xs sm:text-sm font-medium">{formErrors.phone}</p>)}
                        </div>
                        {/* Age & Experience */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="relative group">
                            <input type="number" name="age" placeholder="Age (6-50)" min="6" max="50" value={formData.age} onChange={handleInputChange} className={`w-full px-3 sm:px-4 py-4 sm:py-5 border-2 rounded-2xl bg-gray-50/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:bg-white group hover:bg-white text-base sm:text-lg font-medium ${formErrors.age ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`} required={!isLogin} />
                            {formErrors.age && (<p className="absolute -bottom-6 left-0 text-red-500 text-xs font-medium whitespace-nowrap">{formErrors.age}</p>)}
                          </div>
                          <div className="relative group">
                            <select name="experience" value={formData.experience} onChange={handleInputChange} className={`w-full px-3 sm:px-4 py-4 sm:py-5 border-2 rounded-2xl bg-gray-50/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:bg-white group hover:bg-white text-base sm:text-lg font-medium ${formErrors.experience ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`} required={!isLogin}>
                              <option value="">Experience Level</option>
                              <option value="beginner">Beginner (0-2 years)</option>
                              <option value="intermediate">Intermediate (2-5 years)</option>
                              <option value="advanced">Advanced (5+ years)</option>
                              <option value="professional">Professional</option>
                            </select>
                            {formErrors.experience && (<p className="absolute -bottom-6 left-0 text-red-500 text-xs font-medium whitespace-nowrap">{formErrors.experience}</p>)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* COMMON FIELDS (EMAIL/PASSWORD) */}
                    <div className="relative group">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-amber-600 transition-colors duration-300" />
                      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-4 sm:py-5 border-2 rounded-2xl bg-gray-50/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:bg-white group hover:bg-white text-base sm:text-lg font-medium ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`} required />
                      {formErrors.email && (<p className="absolute -bottom-6 left-0 text-red-500 text-xs sm:text-sm font-medium">{formErrors.email}</p>)}
                    </div>

                    <div className="relative group">
                      <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-amber-600 transition-colors duration-300" />
                      <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password (min 8 characters)" value={formData.password} onChange={handleInputChange} className={`w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-4 sm:py-5 border-2 rounded-2xl bg-gray-50/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:bg-white group hover:bg-white text-base sm:text-lg font-medium ${formErrors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`} required />
                      <button type="button" onClick={togglePassword} className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors duration-300">
                        {showPassword ? <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" /> : <Eye className="w-4 sm:w-5 h-4 sm:h-5" />}
                      </button>
                      
                      {!isLogin && formData.password && (
                        <div className="absolute -bottom-8 left-0 right-0">
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-300 ${passwordStrength <= 25 ? 'bg-red-500' : passwordStrength <= 50 ? 'bg-orange-500' : passwordStrength <= 75 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${passwordStrength}%` }} />
                            </div>
                            <span className={`text-xs font-medium ${passwordStrength <= 25 ? 'text-red-500' : passwordStrength <= 50 ? 'text-orange-500' : passwordStrength <= 75 ? 'text-yellow-500' : 'text-green-500'}`}>
                              {passwordStrength <= 25 ? 'Weak' : passwordStrength <= 50 ? 'Fair' : passwordStrength <= 75 ? 'Good' : 'Strong'}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {formErrors.password && (<p className={`absolute left-0 text-red-500 text-xs sm:text-sm font-medium ${!isLogin && formData.password ? '-bottom-12' : '-bottom-6'}`}>{formErrors.password}</p>)}
                    </div>
                    
                    {/* CONFIRM PASSWORD - Only for registration */}
                    {!isLogin && (
                        <div className="relative group">
                            <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-amber-600 transition-colors duration-300" />
                            <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} className={`w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-4 sm:py-5 border-2 rounded-2xl bg-gray-50/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:bg-white group hover:bg-white text-base sm:text-lg font-medium ${formErrors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`} required={!isLogin} />
                            <button type="button" onClick={toggleConfirmPassword} className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors duration-300">
                                {showConfirmPassword ? <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" /> : <Eye className="w-4 sm:w-5 h-4 sm:h-5" />}
                            </button>
                            {formErrors.confirmPassword && (<p className="absolute -bottom-6 left-0 text-red-500 text-xs sm:text-sm font-medium">{formErrors.confirmPassword}</p>)}
                        </div>
                    )}

                    {isLogin && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center group cursor-pointer">
                          <input type="checkbox" className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 border-2 border-gray-300 rounded-lg focus:ring-amber-500 focus:ring-2 group-hover:border-amber-400 transition-colors duration-300" />
                          <span className="ml-2 sm:ml-3 text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300 text-sm sm:text-base">Remember me</span>
                        </label>
                        <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-300 hover:underline text-sm sm:text-base">Forgot password?</a>
                      </div>
                    )}

                    {isSuccess && (
                      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-50">
                        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                          <CheckCircle className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{isLogin ? 'Welcome Back!' : 'Account Created!'}</h3>
                        <p className="text-gray-600 text-center text-sm sm:text-base px-4">{isLogin ? 'Redirecting to your dashboard...' : 'Welcome to the family!'}</p>
                      </div>
                    )}

                    {formErrors.submit && (
                      <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm sm:text-base font-medium text-center">{formErrors.submit}</div>
                    )}

                    <button type="submit" disabled={isLoading} className={`w-full ${BUTTON_STYLES.primary} py-4 sm:py-5 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-amber-500/25 group relative overflow-hidden ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="relative z-10">
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 animate-spin" />
                            <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <span>{isLogin ? 'Sign In to Academy' : 'Join Our Academy'}</span>
                            <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 ml-2 sm:ml-3" />
                          </div>
                        )}
                      </div>
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-gray-200"></div></div>
                      <div className="relative flex justify-center text-sm sm:text-lg"><span className="px-3 sm:px-4 bg-white text-gray-500 font-medium">or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <button type="button" disabled={isLoading} className={`flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl bg-white hover:bg-gray-50 transition-all duration-300 hover:border-gray-300 group relative overflow-hidden ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
                        <span className="font-semibold text-gray-700 group-hover:text-gray-900 text-sm sm:text-base">Google</span>
                      </button>
                      <button type="button" disabled={isLoading} className={`flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl bg-white hover:bg-gray-50 transition-all duration-300 hover:border-gray-300 group relative overflow-hidden ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <div className="w-5 sm:w-6 h-5 sm:h-6 bg-blue-600 rounded-lg mr-2 sm:mr-3 flex items-center justify-center"><span className="text-white text-xs sm:text-sm font-bold">f</span></div>
                        <span className="font-semibold text-gray-700 group-hover:text-gray-900 text-sm sm:text-base">Facebook</span>
                      </button>
                    </div>
                  </form>

                  {!isLogin && (
                    <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 text-center leading-relaxed px-2">
                      By creating an account, you agree to our{' '}
                      <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors duration-300">Terms of Service</a>{' '}
                      and{' '}
                      <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors duration-300">Privacy Policy</a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth