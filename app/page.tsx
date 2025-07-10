'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/app/stores/authStore'
import AuthTabs from '@/app/components/AuthTabs'
import HomePage from '@/app/components/HomePage'

export default function App() {
  const { user, loading, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show auth pages if user is not logged in
  if (!user) {
    return <AuthTabs />
  }

  // Show home page if user is logged in
  return <HomePage />
}
