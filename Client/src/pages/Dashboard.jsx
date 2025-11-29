import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloatingShape from '../components/FloatingShape'
import NeonButton from '../components/NeonButton'
import Navbar from '../components/Navbar'
import { transformImage } from '../lib/api'
import { getCurrentUser } from '../lib/api'

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [transformedImage, setTransformedImage] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser()
        setUser(data.user)
      } catch (err) {
        console.error('Failed to fetch user:', err)
      }
    }
    fetchUser()
  }, [])

  const transformStyles = [
    { 
      id: 1, 
      name: 'Pencil Sketch', 
      value: 'Pencil Sketch',
      icon: '✏️', 
      gradient: 'from-gray-400 via-gray-500 to-gray-600',
      glow: 'hover:shadow-[0_0_30px_rgba(156,163,175,0.5)]'
    },
    { 
      id: 2, 
      name: 'Oil Painting', 
      value: 'Oil Painting',
      icon: '🎨', 
      gradient: 'from-orange-400 via-red-500 to-red-600',
      glow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]'
    },
    { 
      id: 3, 
      name: '2D Cartoon', 
      value: '2D Cartoon',
      icon: '🖼️', 
      gradient: 'from-yellow-400 via-orange-400 to-orange-500',
      glow: 'hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]'
    },
    { 
      id: 4, 
      name: '3D Cartoon', 
      value: '3D Cartoon',
      icon: '🎭', 
      gradient: 'from-green-400 via-teal-400 to-teal-500',
      glow: 'hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]'
    },
    { 
      id: 5, 
      name: 'Comic Style', 
      value: 'Comic Style',
      icon: '💥', 
      gradient: 'from-blue-400 via-purple-400 to-purple-500',
      glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'
    },
    { 
      id: 6, 
      name: 'Anime Style', 
      value: 'Anime Style',
      icon: '⚡', 
      gradient: 'from-pink-400 via-purple-500 to-purple-600',
      glow: 'hover:shadow-[0_0_30px_rgba(192,38,211,0.5)]'
    },
  ]

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result)
      }
      reader.readAsDataURL(file)
      setTransformedImage(null)
      setError('')
    }
  }

  const handleTransform = async () => {
    if (!uploadedFile) {
      setError('Please upload an image first')
      return
    }

    if (!selectedStyle) {
      setError('Please select a transformation style')
      return
    }

    setLoading(true)
    setError('')
    setTransformedImage(null)

    try {
      const selectedStyleObj = transformStyles.find(s => s.id === selectedStyle)
      const data = await transformImage(uploadedFile, selectedStyleObj.value)
      
      const baseURL = import.meta.env.VITE_API_URL.replace('/api', '')
      setTransformedImage(baseURL + data.transformedImage)
    } catch (err) {
      setError(err.response?.data?.message || 'Transformation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
          <h2 className="text-4xl font-bold mb-2 text-center">Welcome, {user?.name || 'User'}!</h2>
          <p className="text-gray-400 text-center mb-12">Upload an image and choose your transformation style</p>

          {error && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
                <p className="text-red-400 text-center">{error}</p>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <motion.div
              className="glass-strong rounded-3xl p-12 border-2 border-dashed border-neon-blue/30 hover:border-neon-purple/50 transition-all cursor-pointer relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              
              <div className="text-center">
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded" 
                      className="max-h-64 mx-auto rounded-xl shadow-2xl"
                    />
                    <p className="text-neon-blue font-semibold">Image uploaded! Select a style below</p>
                  </div>
                ) : (
                  <>
                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">📸</div>
                    <h3 className="text-2xl font-bold mb-2 text-neon-blue">Upload Your Image</h3>
                    <p className="text-gray-400">Click or drag and drop your image here</p>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Transformation Styles */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Choose Transformation Style</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {transformStyles.map((style, index) => (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-strong rounded-2xl p-8 cursor-pointer relative overflow-hidden group ${
                    selectedStyle === style.id ? 'ring-4 ring-neon-purple' : ''
                  }`}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                  }}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">
                      {style.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-neon-blue group-hover:to-neon-purple transition-all">
                      {style.name}
                    </h4>
                  </div>

                  {selectedStyle === style.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-neon-purple rounded-full flex items-center justify-center"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Transform Button */}
            <div className="text-center mb-12">
              <NeonButton 
                className="px-16 py-4 text-lg"
                onClick={handleTransform}
                disabled={loading || !uploadedFile || !selectedStyle}
              >
                {loading ? 'Transforming... ⏳' : 'Transform Image ✨'}
              </NeonButton>
            </div>

            {/* Transformed Result */}
            {transformedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong rounded-3xl p-8 max-w-3xl mx-auto"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-neon-purple">
                  Transformation Complete! 🎉
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-2 text-center">Original</p>
                    <img 
                      src={uploadedImage} 
                      alt="Original" 
                      className="w-full rounded-xl shadow-2xl"
                    />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2 text-center">Transformed</p>
                    <img 
                      src={transformedImage} 
                      alt="Transformed" 
                      className="w-full rounded-xl shadow-2xl"
                    />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <a
                    href={transformedImage}
                    download
                    className="inline-block px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-semibold hover:scale-105 transition-transform"
                  >
                    Download Image 📥
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
