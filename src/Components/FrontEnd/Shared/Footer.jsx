const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1">
            <div className="text-6xl font-bold text-white mb-8">
              Flower Beauty Salon
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-gray-400 mt-12">
              <p>©2025 PLACEHOLDER. All rights reserved.</p>
              <p className="mt-2">No part of this website may be reproduced without permission.</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-6">NAVIGATION</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    BLOG
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    GALLERY
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    PRICE LIST
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    CONTACT
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Studio Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">STUDIO</h3>
            <div className="space-y-2 text-gray-300">
              <p>Placeholder Studios</p>
              <p>1500 S Placeholder Drive</p>
              <p>City, State, 12345</p>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="col-span-1">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-6">GET IN TOUCH</h3>
              <p className="text-gray-300">info@placeholder.com</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">SOCIALS</h3>
              <div className="space-y-2">
                <p>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Instagram
                  </a>
                </p>
                <p>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Twitter
                  </a>
                </p>
              </div>
            </div>
            
            {/* Design Credit */}
            <div className="text-right mt-12 text-sm text-gray-400">
              <p>Design by <span className="text-white">Rexs</span></p>
              <p>Development <span className="text-white">Sean,Sebas, Nicho, Tegar</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
