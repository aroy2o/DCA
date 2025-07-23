import { motion } from 'framer-motion'

const ScrollProgress = ({ progress }) => {
  return (
    <motion.div
      className="scroll-indicator"
      style={{ width: `${progress}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  )
}

export default ScrollProgress
