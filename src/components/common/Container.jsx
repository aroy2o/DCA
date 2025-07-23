import { memo } from 'react'
import { cn } from '../../lib/utils'

// Optimized Container Component
const Container = memo(({ 
  children, 
  size = 'default', 
  className = '', 
  ...props 
}) => {
  const sizes = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-full',
    full: 'w-full'
  }

  return (
    <div
      className={cn(
        sizes[size],
        'mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Container.displayName = 'Container'

export default Container
