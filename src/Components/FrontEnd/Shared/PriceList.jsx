import { Link } from 'react-router-dom';

const PriceList = () => {
  const services = [
    { id: 1, name: "Cutting", price: "50.000" },
    { id: 2, name: "Creambath", price: "75.000" },
    { id: 3, name: "Hair Spa", price: "85.000" },
    { id: 4, name: "Hair Mask", price: "80.000" },
    { id: 5, name: "Pelurusan", price: "150.000" },
    { id: 6, name: "Pengeritingan", price: "150.000" },
    { id: 7, name: "Pewarnaan", price: "125.000" },
    { id: 8, name: "Cuci Blow", price: "90.000" },
    { id: 9, name: "Hair Extension", price: "150.000" },
    { id: 10, name: "Facial", price: "125.000" },
    { id: 11, name: "Manicure", price: "75.000" },
    { id: 12, name: "Perawatan Badan", price: "80.000" },
    { id: 13, name: "Relaxasi", price: "85.000" },
    { id: 14, name: "Body Spa", price: "125.000" },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-4">
            <div className="w-2 h-16 bg-gradient-to-b from-red-400 to-pink-400 rounded-full"></div>
            <div>
              <h1 className="text-6xl font-bold text-gray-900">Price List</h1>
              <p className="text-lg text-gray-600 mt-2">
                Layanan Kecantikan Premium dengan Harga Terjangkau
              </p>
            </div>
          </div>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 border-l-4 border-red-400 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="inline-block px-3 py-1 bg-red-400 text-white text-sm font-semibold rounded-full">
                      {String(service.id).padStart(2, '0')}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-pink-200 to-transparent"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500">Starting from</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Rp</div>
                  <div className="text-4xl font-bold text-red-500">
                    {service.price}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-100/50 to-transparent rounded-tl-full -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info Box */}
          <div className="lg:col-span-2 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-pink-200">
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="w-1 h-8 bg-red-400 rounded-full"></div>
              Catatan Penting
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Harga dapat berubah sewaktu-waktu tanpa pemberitahuan</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Untuk treatment khusus, mohon konsultasi terlebih dahulu</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Reservasi sangat disarankan untuk menghindari antrian</span>
              </li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-br from-red-400 to-pink-400 rounded-2xl p-8 flex flex-col justify-center items-center text-center text-white">
            <h4 className="text-2xl font-bold mb-3">Ready to Book?</h4>
            <p className="text-sm mb-6 opacity-90">
              Reservasi sekarang dan nikmati layanan terbaik
            </p>
            <Link
              to="/customer/book"
              className="bg-white text-red-500 font-bold py-3 px-8 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
