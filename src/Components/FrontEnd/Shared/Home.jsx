const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          {/* Carousel Container */}
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            {/* Carousel Placeholder */}
            <div className="flex items-center justify-center h-full bg-gradient-to-r from-gray-200 to-gray-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Carousel Placeholder</h2>
                <p className="text-gray-500">Image carousel will be displayed here</p>
              </div>
            </div>
            
            {/* Carousel Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
              <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
              <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
            </div>
            
            {/* Carousel Navigation Arrows */}
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-300">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-300">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to Our Website</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
          <button className="bg-red-300 hover:bg-red-400 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Book Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home