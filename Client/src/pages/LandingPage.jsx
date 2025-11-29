import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloatingShape from '../components/FloatingShape'
import NeonButton from '../components/NeonButton'
import GlassCard from '../components/GlassCard'

const LandingPage = () => {
  const navigate = useNavigate()

  const styles = [
    { name: 'Pencil Sketch', icon: '✏️', color: 'from-gray-400 to-gray-600' },
    { name: 'Oil Painting', icon: '🎨', color: 'from-orange-400 to-red-600' },
    { name: '2D Cartoon', icon: '🖼️', color: 'from-yellow-400 to-orange-500' },
    { name: '3D Cartoon', icon: '🎭', color: 'from-green-400 to-teal-500' },
    { name: 'Comic Style', icon: '💥', color: 'from-blue-400 to-purple-500' },
    { name: 'Anime Style', icon: '⚡', color: 'from-pink-400 to-purple-600' },
  ]

  const features = [
    { title: 'AI-Powered', desc: 'Advanced neural networks', icon: '🤖' },
    { title: 'Instant Transform', desc: 'Real-time processing', icon: '⚡' },
    { title: 'HD Quality', desc: 'Premium output', icon: '✨' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <FloatingShape 
          className="w-96 h-96 bg-neon-blue/20 top-20 -left-20" 
          delay={0} 
        />
        <FloatingShape 
          className="w-80 h-80 bg-neon-purple/20 top-40 right-10" 
          delay={1} 
        />
        <FloatingShape 
          className="w-72 h-72 bg-neon-pink/20 bottom-20 left-1/3" 
          delay={2} 
        />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-7xl md:text-8xl font-bold mb-6 glow-text"
            animate={{ 
              textShadow: [
                '0 0 10px rgba(0, 212, 255, 0.5)',
                '0 0 20px rgba(181, 55, 255, 0.5)',
                '0 0 10px rgba(0, 212, 255, 0.5)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            AI Image Transformer
          </motion.h1>
          
          <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Transform your images into stunning artistic styles
          </p>

          <div className="flex gap-6 justify-center mb-20">
            <NeonButton onClick={() => navigate('/login')}>
              Login
            </NeonButton>
            <NeonButton variant="secondary" onClick={() => navigate('/signup')}>
              Sign Up
            </NeonButton>
          </div>

          {/* 3D Style Preview Cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {styles.map((style, index) => (
              <motion.div
                key={style.name}
                className="glass-strong rounded-2xl p-6 cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)'
                }}
              >
                <div className={`text-5xl mb-3 bg-gradient-to-br ${style.color} bg-clip-text text-transparent`}>
                  {style.icon}
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-neon-blue transition-colors">
                  {style.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <GlassCard key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-neon-blue">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage
