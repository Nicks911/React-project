const PriceList = () => {
  const services = [
    {
      category: 'Hair Cut Services',
      icon: '✂️',
      color: 'from-red-400 to-pink-400',
      items: [
        { name: 'Regular Hair Cut', price: 'Rp 30,000', duration: '30 min', popular: false },
        { name: 'Premium Hair Cut', price: 'Rp 50,000', duration: '45 min', popular: true },
        { name: 'Kids Hair Cut', price: 'Rp 25,000', duration: '30 min', popular: false },
        { name: 'Trimming', price: 'Rp 20,000', duration: '20 min', popular: false }
      ]
    },
    {
      category: 'Hair Wash & Treatment',
      icon: '💆',
      color: 'from-purple-400 to-indigo-400',
      items: [
        { name: 'Hair Wash', price: 'Rp 15,000', duration: '15 min', popular: false },
        { name: 'Hair Cut + Wash', price: 'Rp 40,000', duration: '45 min', popular: true },
        { name: 'Creambath', price: 'Rp 60,000', duration: '60 min', popular: true },
        { name: 'Hair Spa', price: 'Rp 80,000', duration: '75 min', popular: false },
        { name: 'Hair Mask Treatment', price: 'Rp 70,000', duration: '60 min', popular: false }
      ]
    },
    {
      category: 'Hair Coloring',
      icon: '🎨',
      color: 'from-pink-400 to-rose-400',
      items: [
        { name: 'Basic Hair Color', price: 'Rp 150,000', duration: '120 min', popular: false },
        { name: 'Premium Hair Color', price: 'Rp 250,000', duration: '150 min', popular: true },
        { name: 'Highlight', price: 'Rp 200,000', duration: '120 min', popular: false },
        { name: 'Balayage', price: 'Rp 300,000', duration: '180 min', popular: true },
        { name: 'Ombre', price: 'Rp 280,000', duration: '150 min', popular: false },
        { name: 'Full Bleaching', price: 'Rp 350,000', duration: '180 min', popular: false }
      ]
    },
    {
      category: 'Hair Styling',
      icon: '💇',
      color: 'from-amber-400 to-orange-400',
      items: [
        { name: 'Blow Dry', price: 'Rp 35,000', duration: '30 min', popular: false },
        { name: 'Hair Setting', price: 'Rp 50,000', duration: '45 min', popular: false },
        { name: 'Curling', price: 'Rp 60,000', duration: '60 min', popular: true },
        { name: 'Hair Straightening', price: 'Rp 100,000', duration: '90 min', popular: false },
        { name: 'Updo Styling', price: 'Rp 150,000', duration: '90 min', popular: false }
      ]
    },
    {
      category: 'Smoothing & Rebonding',
      icon: '✨',
      color: 'from-teal-400 to-cyan-400',
      items: [
        { name: 'Hair Smoothing', price: 'Rp 400,000', duration: '180 min', popular: true },
        { name: 'Hair Rebonding', price: 'Rp 500,000', duration: '240 min', popular: true },
        { name: 'Keratin Treatment', price: 'Rp 450,000', duration: '180 min', popular: false },
        { name: 'Brazilian Blowout', price: 'Rp 550,000', duration: '210 min', popular: false }
      ]
    },
    {
      category: 'Bridal Package',
      icon: '👰',
      color: 'from-rose-400 to-pink-500',
      items: [
        { name: 'Bridal Hair & Makeup', price: 'Rp 1,500,000', duration: '180 min', popular: true },
        { name: 'Pre-Wedding Treatment', price: 'Rp 800,000', duration: '120 min', popular: false },
        { name: 'Bridesmaid Package', price: 'Rp 600,000', duration: '90 min', popular: false },
        { name: 'Engagement Package', price: 'Rp 1,000,000', duration: '150 min', popular: false }
      ]
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services & Pricing</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Transparent pricing for premium beauty services
          </p>
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Professional Staff</p>
                <p className="text-sm text-gray-600">Certified & Experienced</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Flexible Schedule</p>
                <p className="text-sm text-gray-600">Book Anytime</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Best Price</p>
                <p className="text-sm text-gray-600">Quality Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{service.icon}</span>
                    <h2 className="text-2xl font-bold">{service.category}</h2>
                  </div>
                </div>

                {/* Services List */}
                <div className="p-6">
                  <div className="space-y-4">
                    {service.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                          item.popular
                            ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                            {item.popular && (
                              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {item.duration}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Special Note */}
          <div className="mt-12 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Important Notes:</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Prices may vary depending on hair length and condition</li>
                  <li>Consultation is free for all services</li>
                  <li>Book in advance to get special discounts</li>
                  <li>All prices include consultation and after-care advice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book Your Service?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and experience our premium beauty services
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-pink-500 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Appointment
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-pink-500 transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PriceList
