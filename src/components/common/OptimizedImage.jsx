import { memo, useState } from 'react'
import { cn } from '../../lib/utils'

// Optimized Image Component with lazy loading
const OptimizedImage = memo(({ 
  src, 
  alt, 
  className = '', 
  fallback = '/placeholder.jpg',
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setLoaded(true)
  }

  const handleError = () => {
    setError(true)
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        src={error ? fallback : src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
    </div>
  )
})

OptimizedImage.displayName = 'OptimizedImage'

export default OptimizedImage
