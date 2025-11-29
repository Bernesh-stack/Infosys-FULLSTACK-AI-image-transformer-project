import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloatingShape from '../components/FloatingShape'
import NeonButton from '../components/NeonButton'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { signup } = await import('../lib/api')
      const { saveToken } = await import('../lib/auth')
      
      const data = await signup(formData.name, formData.email, formData.password)
      saveToken(data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-12">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <FloatingShape 
          className="w-96 h-96 bg-neon-purple/20 top-10 right-10" 
          delay={0} 
        />
        <FloatingShape 
          className="w-80 h-80 bg-neon-pink/20 bottom-10 left-10" 
          delay={1.5} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-10 neon-border relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 blur-xl -z-10" />
          
          <motion.h2 
            className="text-4xl font-bold text-center mb-2 glow-text"
            animate={{ 
              textShadow: [
                '0 0 10px rgba(181, 55, 255, 0.5)',
                '0 0 20px rgba(255, 46, 151, 0.5)',
                '0 0 10px rgba(181, 55, 255, 0.5)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Create Account
          </motion.h2>
          <p className="text-center text-gray-400 mb-8">Join the AI transformation revolution</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 mb-4">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-strong border border-neon-purple/30 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/50 transition-all text-white placeholder-gray-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-strong border border-neon-purple/30 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/50 transition-all text-white placeholder-gray-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-strong border border-neon-purple/30 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/50 transition-all text-white placeholder-gray-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-strong border border-neon-purple/30 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/50 transition-all text-white placeholder-gray-500"
                placeholder="••••••••"
                required
              />
            </div>

            <NeonButton className="w-full mt-6" type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </NeonButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-neon-purple hover:text-neon-pink transition-colors font-semibold"
              >
                Login
              </button>
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-6 text-gray-500 hover:text-gray-300 transition-colors text-sm w-full"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUpPage
