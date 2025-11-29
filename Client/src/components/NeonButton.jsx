import { motion } from 'framer-motion'

const NeonButton = ({ children, variant = 'primary', className = '', onClick, disabled = false }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink',
    secondary: 'glass-strong hover:glass border-2 border-neon-blue/50 hover:border-neon-purple',
  }

  return (
    <motion.button
      className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={disabled ? {} : { scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

export default NeonButton
