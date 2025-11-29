import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FloatingShape from '../components/FloatingShape'
import Navbar from '../components/Navbar'
import { getHistory, getCurrentUser } from '../lib/api'

const HistoryPage = () => {
  const [user, setUser] = useState(null)
  const [historyItems, setHistoryItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, historyData] = await Promise.all([
          getCurrentUser(),
          getHistory()
        ])
        setUser(userData.user)
        setHistoryItems(historyData.history)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const baseURL = import.meta.env.VITE_API_URL.replace('/api', '')

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <FloatingShape 
          className="w-96 h-96 bg-neon-blue/20 top-20 -left-20" 
          delay={0} 
        />
        <FloatingShape 
          className="w-80 h-80 bg-neon-purple/20 bottom-20 -right-20" 
          delay={1.5} 
        />
      </div>

      {/* Navigation */}
      <Navbar user={user} />

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-2 text-center">Transformation History</h2>
          <p className="text-gray-400 text-center mb-12">View all your AI-transformed images</p>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
              <p className="text-gray-400 mt-4">Loading history...</p>
            </div>
          ) : historyItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No transformations yet</p>
              <p className="text-gray-500 mt-2">Start transforming images to see them here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {historyItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-strong rounded-2xl overflow-hidden group cursor-pointer"
                  whileHover={{ 
                    y: -10, 
                    scale: 1.03,
                    boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)'
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={baseURL + item.transformedImage} 
                      alt={item.style}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/1a1a2e/00d4ff?text=Image'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-neon-blue group-hover:text-neon-purple transition-colors">
                      {item.style}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Created: {formatDate(item.createdAt)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default HistoryPage
