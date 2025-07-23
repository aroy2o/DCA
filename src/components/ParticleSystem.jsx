import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const ParticleSystem = ({ count = 20, color = '#0ea5e9' }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create particles
    const particles = []
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.backgroundColor = color
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 8 + 's'
      particle.style.animationDuration = (8 + Math.random() * 4) + 's'
      
      container.appendChild(particle)
      particles.push(particle)
    }

    // GSAP animation for interactive particles
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      particles.forEach((particle) => {
        const particleRect = particle.getBoundingClientRect()
        const particleX = particleRect.left - rect.left + particleRect.width / 2
        const particleY = particleRect.top - rect.top + particleRect.height / 2
        
        const distance = Math.sqrt((x - particleX) ** 2 + (y - particleY) ** 2)
        const maxDistance = 100
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(particleY - y, particleX - x)
          const moveX = Math.cos(angle) * force * 20
          const moveY = Math.sin(angle) * force * 20
          
          gsap.to(particle, {
            x: moveX,
            y: moveY,
            scale: 1 + force * 0.5,
            duration: 0.3,
            ease: "power2.out"
          })
        } else {
          gsap.to(particle, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          })
        }
      })
    }

    container.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [count, color])

  return <div ref={containerRef} className="particles-container"></div>
}

export default ParticleSystem
