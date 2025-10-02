const Navbar = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-red-300 bg-clip-text text-transparent">
              Flower Beauty Salon
            </div>
            
            {/* Navigation Menu */}
            <ul className="flex space-x-8 items-center">
              <li className="relative group">
                <a href="#" className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative">
                  Blog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li className="relative group">
                <a href="#" className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative">
                  Gallery
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li className="relative group">
                <a href="#" className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative">
                  Price List
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <span className="text-gray-800 font-semibold text-lg">User Name</span>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar