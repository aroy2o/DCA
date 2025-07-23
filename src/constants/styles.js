// Cricket Academy UI Styles - Updated with Brand Colors

export const BUTTON_STYLES = {
  // Primary unified button (main CTA)
  primary: 'inline-flex items-center px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group hover:scale-105 transform',
  
  // Secondary unified button (clean outline)
  secondary: 'inline-flex items-center px-12 py-5 bg-white border-3 border-gray-300 text-gray-800 font-bold text-xl rounded-2xl hover:bg-gray-50 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105',
  
  // Navy outline button
  outline: 'inline-flex items-center px-8 py-4 border-2 border-gray-600 text-gray-600 font-semibold rounded-xl hover:bg-gray-600 hover:text-white transition-all duration-300 group',
  
  // Accent button (green)
  accent: 'inline-flex items-center px-6 py-3 bg-[#4FC3F7] hover:bg-[#29b6f6] text-white font-medium rounded-xl transition-all duration-300 group',
  
  // Ghost button
  ghost: 'inline-flex items-center px-6 py-3 text-[#002B5B] hover:text-[#FFD600] font-medium transition-colors duration-300'
}

export const CARD_STYLES = {
  // Unified card styles - matches Hero design
  default: 'bg-white border-2 border-gray-200/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-gray-300/50',
  accent: 'bg-white border-l-4 border-l-amber-500 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105',
  clean: 'bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105',
  featured: 'bg-white border-2 border-amber-200/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105',
  
  // Interactive cards
  interactive: 'bg-white border border-gray-100/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 rounded-xl',
  hero: 'bg-white border border-gray-100/50 hover:shadow-xl transition-all duration-500 rounded-3xl p-8 shadow-lg group',
  feature: 'text-center p-6 bg-white rounded-xl border border-gray-100 hover:border-[#4FC3F7] transition-all duration-300 group',
  stat: 'text-center p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 hover:border-[#FFD600] transition-all duration-300'
}

export const TEXT_STYLES = {
  // Unified headings - matches Hero design
  heading1: 'text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900',
  heading2: 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800',
  heading3: 'text-2xl md:text-3xl font-bold text-gray-800',
  
  // Unified accent text
  accent: 'text-amber-600 font-bold',
  success: 'text-green-600 font-bold',
  danger: 'text-red-600 font-medium',
  
  // Unified body text
  subtitle: 'text-xl md:text-2xl text-gray-600 leading-relaxed font-medium',
  body: 'text-gray-700 leading-relaxed',
  muted: 'text-gray-500',
  
  // Unified gradient text
  gradient: 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-bold'
}

export const LAYOUT_STYLES = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-24 relative',
  sectionLarge: 'py-32 relative',
  
  // Unified hero section
  hero: 'min-h-screen relative bg-white flex items-center justify-center overflow-hidden',
  heroContent: 'relative z-10 text-center',
  
  // Unified background patterns
  pattern: 'relative bg-white overflow-hidden',
  grid: 'absolute inset-0 opacity-[0.02] h-full w-full bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:4rem_4rem]'
}
