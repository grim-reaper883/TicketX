import Link from 'next/link'
import React from 'react'
import { FaEnvelope, FaGoogle, FaLock, FaUser } from 'react-icons/fa'

const signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white text-black rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">Create Account</h1>
          </div>

         

          {/* Form Fields */}
          <form  className="space-y-6">
            {/* Full Name Field */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            {/* Role Selection Field */}
            <div className="relative">
              <select
                name="role"
                className="w-full pl-4 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              >
                <option value="">Select a role</option>
                <option value="student">User</option>
                <option value="instructor">Admin</option>
              </select>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-b from-blue-900 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center mb-8">
            <button
              
              className="p-4 px-8 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-black text-xl mx-auto group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href='/signin'>
                <button className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  Log In
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signup