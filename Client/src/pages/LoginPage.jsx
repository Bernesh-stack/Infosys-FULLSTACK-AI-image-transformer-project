import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloatingShape from '../components/FloatingShape'
import NeonButton from '../components/NeonButton'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { login: loginApi } = await import('../lib/api')
      const { saveToken } = await import('../lib/auth')
      
      const data = await loginApi(email, password)
      saveToken(data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <FloatingShape 
          className="w-96 h-96 bg-neon-blue/20 top-10 -left-20" 
          delay={0} 
        />
        <FloatingShape 
          className="w-80 h-80 bg-neon-purple/20 bottom-10 -right-20" 
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
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 blur-xl -z-10" />
          
          <motion.h2 
            className="text-4xl font-bold text-center mb-2 glow-text"
            animate={{ 
              textShadow: [
                '0 0 10px rgba(0, 212, 255, 0.5)',
                '0 0 20px rgba(181, 55, 255, 0.5)',
                '0 0 10px rgba(0, 212, 255, 0.5)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Welcome Back
          </motion.h2>
          <p className="text-center text-gray-400 mb-8">Login to transform your images</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 mb-4">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-strong border border-neon-blue/30 focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple/50 transition-all text-white placeholder-gray-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-strong border border-neon-blue/30 focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple/50 transition-all text-white placeholder-gray-500"
                placeholder="••••••••"
                required
              />
            </div>

            <NeonButton className="w-full" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </NeonButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-neon-blue hover:text-neon-purple transition-colors font-semibold"
              >
                Create Account
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

export default LoginPage
