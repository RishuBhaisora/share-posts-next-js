'use client'

import { useAuthStore } from '@/app/stores/authStore'

export default function HomePage() {
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hello, {user?.name || user?.username}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Dashboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Info Card */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                User Information
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-indigo-700">
                  <span className="font-medium">Name:</span> {user?.name || 'Not provided'}
                </p>
                <p className="text-sm text-indigo-700">
                  <span className="font-medium">Username:</span> {user?.username}
                </p>
                <p className="text-sm text-indigo-700">
                  <span className="font-medium">User ID:</span> {user?.id}
                </p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Create New Project
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  View Profile
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Settings
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">
                Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-purple-700">Projects</span>
                  <span className="text-sm font-medium text-purple-900">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-purple-700">Tasks</span>
                  <span className="text-sm font-medium text-purple-900">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-purple-700">Completed</span>
                  <span className="text-sm font-medium text-purple-900">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">
              🎉 Welcome to Your Dashboard!
            </h3>
            <p className="text-blue-100">
              You're successfully logged in. This is your personalized dashboard where you can manage your projects, tasks, and settings.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 