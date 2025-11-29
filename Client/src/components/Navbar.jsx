import { useNavigate } from 'react-router-dom'
import { removeToken } from '../lib/auth'

const Navbar = ({ user }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <nav className="glass-strong border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold glow-text">AI Image Transformer</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-300 hover:text-neon-blue transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/history')}
            className="text-gray-300 hover:text-neon-blue transition-colors"
          >
            History
          </button>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-neon-pink transition-colors"
          >
            Logout
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
