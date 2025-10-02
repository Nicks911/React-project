const Navbar = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <div className="text-2xl font-bold  bg-red-300 bg-clip-text text-transparent">
              Flower Beauty Salon
            </div>
            
            {/* Navigation Menu */}
            <ul className="flex space-x-8 items-center">
              <li className="relative group">
                <a href="#" className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative">
                  Blog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5  bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li className="relative group">
                <a href="#" className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative">
                  Gallery
                  <span className="absolute bottom-0 left-0 w-0 h-0.5  bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li className="relative group">
                <a href="#" className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative">
                  Price List
                  <span className="absolute bottom-0 left-0 w-0 h-0.5  bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <button className="relative overflow-hidden bg-red-300 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 group">
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar