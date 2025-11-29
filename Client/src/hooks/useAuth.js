import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, removeToken, decodeToken } from '../lib/auth'
import { getCurrentUser } from '../lib/api'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()
      
      if (!token) {
        setLoading(false)
        navigate('/login')
        return
      }

      try {
        const decoded = decodeToken(token)
        if (decoded && decoded.exp * 1000 > Date.now()) {
          const userData = await getCurrentUser()
          setUser(userData.user)
        } else {
          removeToken()
          navigate('/login')
        }
      } catch (error) {
        console.error('Auth error:', error)
        removeToken()
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

  const logout = () => {
    removeToken()
    setUser(null)
    navigate('/login')
  }

  return { user, loading, logout }
}
