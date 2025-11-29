import { motion } from 'framer-motion'

const GlassCard = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      className={`glass-strong rounded-2xl p-8 ${className}`}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard
