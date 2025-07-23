import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { BUTTON_STYLES } from '../../constants/styles'

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default',
  children, 
  ...props 
}, ref) => {
  const baseStyles = BUTTON_STYLES[variant] || BUTTON_STYLES.primary
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-8 py-4',
    lg: 'px-10 py-5 text-lg'
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }
