import { useState } from 'react'

const AccountManage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        {/* Navigation Menu */}
        <nav className="mt-5 px-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="group flex items-center px-4 py-4 text-m font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                <img 
                  src="/AdminAsset/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector-removebg-preview.png" 
                  alt="Account Icon"
                  className="mr-3 h-5 w-5 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                />
                Account Manage
              </a>
            </li>
            <li>
              <a href="#" className="group flex items-center px-4 py-4 text-m font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Book Manage
              </a>
            </li>
            <li>
              <a href="#" className="group flex items-center px-4 py-4 text-m font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                Coupon Manage
              </a>
            </li>
            <li>
              <a href="#" className="group flex items-center px-4 py-4 text-m font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Service Manage
              </a>
            </li>
            <li>
              <a href="#" className="group flex items-center px-4 py-4 text-m font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                Transaction
              </a>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4">
          <button className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-500 transition-all duration-200 transform hover:scale-105">
            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 lg:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            {/* Hamburger Icon - Bootstrap Style */}
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <div className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${sidebarOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Account Management</h2>
            </div>
            <div className="ml-4 flex items-center space-x-3">
              <span className="text-m text-gray-500">Welcome, Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
        </div>
      )}
    </div>
  )
}

export default AccountManage