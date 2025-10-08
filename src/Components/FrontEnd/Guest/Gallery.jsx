import { useState } from 'react'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Haircut', 'Hair Color', 'Treatment', 'Bridal', 'Styling', 'Spa']

  const galleryItems = [
    { id: 1, category: 'Haircut', title: 'Modern Bob Cut', description: 'Sleek and stylish bob haircut' },
    { id: 2, category: 'Hair Color', title: 'Balayage Highlights', description: 'Natural-looking blonde balayage' },
    { id: 3, category: 'Treatment', title: 'Hair Spa Treatment', description: 'Relaxing hair spa session' },
    { id: 4, category: 'Bridal', title: 'Wedding Updo', description: 'Elegant bridal hairstyle' },
    { id: 5, category: 'Styling', title: 'Beach Waves', description: 'Casual beach wave styling' },
    { id: 6, category: 'Hair Color', title: 'Ombre Color', description: 'Trendy ombre hair color' },
    { id: 7, category: 'Haircut', title: 'Layered Cut', description: 'Textured layered haircut' },
    { id: 8, category: 'Spa', title: 'Scalp Treatment', description: 'Therapeutic scalp massage' },
    { id: 9, category: 'Styling', title: 'Formal Upstyle', description: 'Sophisticated updo styling' },
    { id: 10, category: 'Treatment', title: 'Keratin Treatment', description: 'Smoothing keratin therapy' },
    { id: 11, category: 'Hair Color', title: 'Platinum Blonde', description: 'Bold platinum blonde color' },
    { id: 12, category: 'Bridal', title: 'Bridal Makeup', description: 'Complete bridal makeover' },
    { id: 13, category: 'Haircut', title: 'Pixie Cut', description: 'Edgy pixie haircut' },
    { id: 14, category: 'Styling', title: 'Curly Style', description: 'Voluminous curly hairstyle' },
    { id: 15, category: 'Treatment', title: 'Hair Botox', description: 'Deep conditioning treatment' }
  ]

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-400 to-purple-400 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explore our stunning transformations and beauty creations
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-pink-400 text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Results Count */}
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-pink-500">{filteredItems.length}</span> result{filteredItems.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                  index % 7 === 0 ? 'sm:row-span-2' : ''
                }`}
              >
                {/* Image Placeholder */}
                <div className={`bg-gradient-to-br from-pink-200 to-purple-300 ${
                  index % 7 === 0 ? 'h-96' : 'h-72'
                } flex items-center justify-center relative overflow-hidden`}>
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-white/90 text-sm mb-4">{item.description}</p>
                      <button className="bg-white text-pink-500 px-6 py-2 rounded-full font-medium hover:bg-pink-50 transition-colors duration-300">
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Placeholder Icon */}
                  <svg className="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-pink-500 px-3 py-1 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Load More Images
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-400 to-purple-400 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Your Transformation?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Book an appointment today and let our expert stylists create your perfect look
          </p>
          <button className="bg-white text-pink-500 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Book Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default Gallery
