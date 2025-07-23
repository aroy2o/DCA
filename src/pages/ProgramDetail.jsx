import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { programsData } from '../data/programs'
import { ArrowLeft, Calendar, Clock, Users, Star, CheckCircle, Trophy, Target, Award, Shield, Zap, Crown, Play, Phone, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ProgramDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const program = programsData.find(p => p.id === id)
  const heroRef = useRef(null)
  const detailsRef = useRef(null)
  const benefitsRef = useRef(null)
  const enrollRef = useRef(null)
  const [enrollmentForm, setEnrollmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: 'beginner'
  })

  useEffect(() => {
    if (!program) return

    // Reset scroll position
    window.scrollTo(0, 0)

    // Enhanced entrance animations
    const tl = gsap.timeline()

    // Hide elements initially
    gsap.set([heroRef.current, detailsRef.current, benefitsRef.current, enrollRef.current], {
      opacity: 0,
      y: 60
    })

    // Animate elements in sequence
    tl.to(heroRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(detailsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(benefitsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.4")
    .to(enrollRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.4")

    // Parallax effects
    gsap.utils.toArray('.parallax-element').forEach((element) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })
    })

    // Floating animations for decorative elements
    gsap.utils.toArray('.floating-element').forEach((element, index) => {
      gsap.to(element, {
        y: -20,
        rotation: 5,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.3
      })
    })

  }, [program])

  const handleEnrollmentSubmit = (e) => {
    e.preventDefault()
    console.log('Enrollment submitted:', enrollmentForm)
    alert('Thank you! We will contact you soon to complete your enrollment.')
    setEnrollmentForm({
      name: '',
      email: '',
      phone: '',
      age: '',
      experience: 'beginner'
    })
  }

  const handleInputChange = (e) => {
    setEnrollmentForm({
      ...enrollmentForm,
      [e.target.name]: e.target.value
    })
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <p className="text-gray-600 mb-8">The program you're looking for doesn't exist.</p>
          <Link
            to="/programs"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>
        </div>
      </div>
    )
  }

  const benefits = [
    {
      icon: Shield,
      title: 'BCCI Certified Coaching',
      description: 'Learn from certified coaches with proven track records and international training standards.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Personalized Training Plans',
      description: 'Customized training programs tailored to your specific skill level and career goals.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Trophy,
      title: 'Competition Preparation',
      description: 'Advanced match preparation and selection guidance for tournaments and team selections.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Modern Training Methods',
      description: 'Latest training methodologies and technology for accelerated skill development.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const relatedPrograms = programsData.filter(p => p.id !== program.id).slice(0, 3)

  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      {/* Global Background System */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating Background Elements */}
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center mb-8 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/programs" className="hover:text-blue-600 transition-colors">Programs</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{program.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Program Info */}
            <div>
              <div className="flex items-center mb-4">
                <button
                  onClick={() => navigate('/programs')}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
                >
                  <ArrowLeft className="w-5 h-5 mr-1" />
                  Back to Programs
                </button>
                <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${program.badgeColor}`}>
                  {program.badge}
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                {program.title}
                <span className="block text-2xl lg:text-3xl font-semibold text-gray-600 mt-2">
                  {program.level}
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {program.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100">
                  <Users className={`w-6 h-6 mx-auto mb-2 ${program.textColor}`} />
                  <div className="font-bold text-gray-900">{program.students}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100">
                  <Calendar className={`w-6 h-6 mx-auto mb-2 ${program.textColor}`} />
                  <div className="font-bold text-gray-900">{program.sessions}</div>
                  <div className="text-sm text-gray-600">Sessions/Week</div>
                </div>
                <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100">
                  <Clock className={`w-6 h-6 mx-auto mb-2 ${program.textColor}`} />
                  <div className="font-bold text-gray-900">{program.duration}</div>
                  <div className="text-sm text-gray-600">Per Session</div>
                </div>
                <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100">
                  <Trophy className={`w-6 h-6 mx-auto mb-2 ${program.textColor}`} />
                  <div className="font-bold text-gray-900">₹{program.price}</div>
                  <div className="text-sm text-gray-600">Per Month</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#enroll"
                  className={`inline-flex items-center justify-center px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group ${program.gradientColor}`}
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Enroll Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-gray-400 transition-all duration-300 group"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Call Us
                </a>
              </div>
            </div>

            {/* Program Visual */}
            <div className="relative">
              <div className={`relative p-8 rounded-3xl ${program.bgColor} border border-gray-200/50 shadow-2xl`}>
                <div className="text-center">
                  <program.icon className={`w-24 h-24 mx-auto mb-6 ${program.textColor}`} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.ageGroup}</h3>
                  <div className="space-y-3">
                    {program.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400/20 rounded-full floating-element"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-400/20 rounded-full floating-element"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section ref={detailsRef} className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">What You'll Learn</h2>
              <div className="space-y-4">
                {program.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Training Schedule</h2>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <Calendar className={`w-8 h-8 mr-4 ${program.textColor}`} />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Weekly Schedule</h3>
                    <p className="text-gray-600">Consistent training for optimal progress</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">{program.schedule}</div>
                      <div className="text-sm text-gray-600">Duration: {program.duration}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-20 bg-gray-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience world-class cricket training with benefits that extend beyond the field
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors group">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll" ref={enrollRef} className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Join?</h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll contact you to complete your enrollment
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className={`p-8 text-white ${program.gradientColor}`}>
              <h3 className="text-2xl font-bold mb-2">Enroll in {program.title}</h3>
              <p className="text-white/90">Start your cricket journey with us today!</p>
            </div>

            <form onSubmit={handleEnrollmentSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={enrollmentForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={enrollmentForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={enrollmentForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={enrollmentForm.age}
                    onChange={handleInputChange}
                    required
                    min="6"
                    max="50"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your age"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cricket Experience</label>
                <select
                  name="experience"
                  value={enrollmentForm.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="beginner">Complete Beginner</option>
                  <option value="basic">Basic Knowledge</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <button
                type="submit"
                className={`w-full py-4 px-8 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group ${program.gradientColor}`}
              >
                <span className="flex items-center justify-center">
                  <Trophy className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Submit Enrollment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      {relatedPrograms.length > 0 && (
        <section className="py-20 bg-gray-50/50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Programs</h2>
              <p className="text-lg text-gray-600">Explore our other cricket training programs</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPrograms.map((relatedProgram) => (
                <Link
                  key={relatedProgram.id}
                  to={`/programs/${relatedProgram.id}`}
                  className="block bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className={`p-6 rounded-t-xl ${relatedProgram.bgColor}`}>
                    <relatedProgram.icon className={`w-12 h-12 mb-4 ${relatedProgram.textColor}`} />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{relatedProgram.title}</h3>
                    <p className="text-gray-600 text-sm">{relatedProgram.ageGroup}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{relatedProgram.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">₹{relatedProgram.price}/month</span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default ProgramDetail
