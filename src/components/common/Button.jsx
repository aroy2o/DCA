import { memo } from 'react'
import { cn } from '../../lib/utils'
import { BUTTON_STYLES } from '../../constants/styles'

// Optimized Button Component with Cricket Academy Colors
const Button = memo(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-[#FFD600] text-[#002B5B] border-2 border-[#FFD600] hover:bg-[#e6c100] hover:border-[#e6c100] focus:ring-[#FFD600] shadow-lg hover:shadow-xl hover:scale-105',
    secondary: 'bg-[#E63946] text-white border-2 border-[#E63946] hover:bg-[#d1222f] hover:border-[#d1222f] focus:ring-[#E63946] shadow-lg hover:shadow-xl hover:scale-105',
    outline: 'border-2 border-[#002B5B] text-[#002B5B] hover:bg-[#002B5B] hover:text-white focus:ring-[#002B5B]',
    accent: 'bg-[#4FC3F7] text-white border-2 border-[#4FC3F7] hover:bg-[#29b6f6] hover:border-[#29b6f6] focus:ring-[#4FC3F7]'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
