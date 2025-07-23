import { Users, Trophy, Star, Crown } from 'lucide-react'

export const programsData = [
  {
    id: 'junior',
    title: 'Junior Program',
    level: 'Foundation Level',
    ageGroup: 'Ages 6-12',
    price: '2,500',
    description: 'Perfect introduction to cricket with fun activities, basic skills development, and character building in a supportive environment.',
    icon: Users,
    gradientColor: 'bg-gradient-to-br from-amber-500 to-orange-600',
    textColor: 'text-amber-600',
    bgColor: 'bg-gradient-to-r from-amber-50 to-orange-100',
    badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-600',
    badge: 'Most Popular',
    students: 150,
    sessions: 3,
    features: [
      'Basic batting and bowling techniques',
      'Fun games and cricket activities',
      'Character development and teamwork',
      'Safety-first training approach',
      'Progress tracking and certificates'
    ],
    highlights: [
      'BCCI certified junior coaches',
      'Age-appropriate training methods',
      'Focus on fundamentals',
      'Safe and supportive environment'
    ],
    schedule: 'Monday, Wednesday, Friday - 4:00 PM to 5:30 PM',
    duration: '1.5 hours per session'
  },
  {
    id: 'youth',
    title: 'Youth Program',
    level: 'Advanced Level',
    ageGroup: 'Ages 13-17',
    price: '3,500',
    description: 'Advanced techniques, competitive training, and tactical understanding for developing serious young cricketers.',
    icon: Trophy,
    gradientColor: 'bg-gradient-to-br from-green-500 to-green-600',
    textColor: 'text-green-600',
    bgColor: 'bg-gradient-to-r from-green-50 to-green-100',
    badgeColor: 'bg-gradient-to-r from-green-500 to-green-600',
    badge: 'Competitive Track',
    students: 80,
    sessions: 4,
    features: [
      'Advanced batting and bowling techniques',
      'Match simulation and tactics',
      'Fitness and conditioning',
      'Mental preparation and strategy',
      'Selection for district teams'
    ],
    highlights: [
      'Ex-state player coaches',
      'Competitive match exposure',
      'Advanced technique refinement',
      'Leadership development'
    ],
    schedule: 'Tuesday, Thursday, Saturday, Sunday - 5:30 AM to 7:30 AM',
    duration: '2 hours per session'
  },
  {
    id: 'senior',
    title: 'Senior Program',
    level: 'Professional Level',
    ageGroup: 'Ages 18+',
    price: '4,500',
    description: 'Professional-level training with specialized coaching, fitness conditioning, and career guidance for serious aspirants.',
    icon: Star,
    gradientColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    textColor: 'text-purple-600',
    bgColor: 'bg-gradient-to-r from-purple-50 to-purple-100',
    badgeColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
    badge: 'Elite Training',
    students: 40,
    sessions: 5,
    features: [
      'Professional coaching techniques',
      'Specialized skill development',
      'Fitness and nutrition guidance',
      'Career pathway counseling',
      'State and national level preparation'
    ],
    highlights: [
      'Former professional players as coaches',
      'State-of-the-art facilities',
      'Individual attention and mentoring',
      'Career advancement opportunities'
    ],
    schedule: 'Monday to Friday - 5:00 AM to 7:30 AM, Saturday - 3:00 PM to 6:00 PM',
    duration: '2.5 hours per session'
  },
  {
    id: 'womens',
    title: "Women's Program",
    level: 'All Levels',
    ageGroup: 'Ages 12+',
    price: '3,000',
    description: 'Dedicated program for women cricketers with female coaches, safe environment, and specialized training methods.',
    icon: Crown,
    gradientColor: 'bg-gradient-to-br from-pink-500 to-pink-600',
    textColor: 'text-pink-600',
    bgColor: 'bg-gradient-to-r from-pink-50 to-pink-100',
    badgeColor: 'bg-gradient-to-r from-pink-500 to-pink-600',
    badge: 'Empowering Women',
    students: 60,
    sessions: 3,
    features: [
      'Female coaches and mentors',
      'Safe and supportive environment',
      'All skill levels welcome',
      'Confidence building programs',
      'Women-only training sessions'
    ],
    highlights: [
      'Experienced female coaching staff',
      'Empowerment through sports',
      'Flexible training schedules',
      'Supportive community'
    ],
    schedule: 'Tuesday, Thursday, Saturday - 6:00 PM to 7:30 PM',
    duration: '1.5 hours per session'
  },
  {
    id: 'elite',
    title: 'Elite Program',
    level: 'Championship Level',
    ageGroup: 'Selected Players',
    price: '6,000',
    description: 'Exclusive program for exceptional talents with personalized coaching, advanced facilities, and professional mentorship.',
    icon: Crown,
    gradientColor: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    textColor: 'text-yellow-600',
    bgColor: 'bg-gradient-to-r from-yellow-50 to-orange-100',
    badgeColor: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    badge: 'Invitation Only',
    students: 20,
    sessions: 6,
    features: [
      'One-on-one coaching sessions',
      'Video analysis and technique correction',
      'Professional fitness training',
      'Mental conditioning and sports psychology',
      'Tournament preparation and support'
    ],
    highlights: [
      'Hand-picked by academy scouts',
      'Personal coaching from ex-internationals',
      'State-of-the-art training technology',
      'Direct pathway to professional cricket'
    ],
    schedule: 'Daily - 5:00 AM to 8:00 AM',
    duration: '3 hours per session'
  },
  {
    id: 'weekend',
    title: 'Weekend Warriors',
    level: 'Recreational',
    ageGroup: 'All Ages',
    price: '2,000',
    description: 'Perfect for working professionals and students who want to enjoy cricket on weekends with flexible schedules.',
    icon: Users,
    gradientColor: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    textColor: 'text-indigo-600',
    bgColor: 'bg-gradient-to-r from-indigo-50 to-indigo-100',
    badgeColor: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
    badge: 'Flexible Schedule',
    students: 100,
    sessions: 2,
    features: [
      'Weekend-only sessions',
      'Flexible timing options',
      'Stress relief through cricket',
      'All skill levels welcome',
      'Family-friendly environment'
    ],
    highlights: [
      'Perfect work-life balance',
      'Social cricket environment',
      'No pressure, just fun',
      'Great for fitness and recreation'
    ],
    schedule: 'Saturday & Sunday - 7:00 AM to 9:00 AM OR 4:00 PM to 6:00 PM',
    duration: '2 hours per session'
  }
]
