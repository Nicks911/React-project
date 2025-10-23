import { useState, useEffect } from "react";

const Book = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch services from API
    const mockServices = [
      {
        _id: "1",
        name: "Cutting",
        description: "Potong rambut profesional untuk tampilan fresh",
        priceMin: 50000,
        durationMinutes: 45,
      },
      {
        _id: "2",
        name: "Creambath",
        description: "Perawatan rambut dengan krim nutrisi",
        priceMin: 75000,
        durationMinutes: 60,
      },
      {
        _id: "3",
        name: "Hair Spa",
        description: "Perawatan spa untuk rambut sehat berkilau",
        priceMin: 85000,
        durationMinutes: 75,
      },
      {
        _id: "4",
        name: "Hair Mask",
        description: "Masker rambut untuk perawatan intensif",
        priceMin: 80000,
        durationMinutes: 50,
      },
      {
        _id: "5",
        name: "Pelurusan",
        description: "Pelurusan rambut permanen untuk tampilan sleek",
        priceMin: 150000,
        durationMinutes: 120,
      },
      {
        _id: "6",
        name: "Pengeritingan",
        description: "Pengeritingan rambut untuk tampilan volume",
        priceMin: 150000,
        durationMinutes: 120,
      },
      {
        _id: "7",
        name: "Pewarnaan",
        description: "Pewarnaan rambut dengan produk berkualitas",
        priceMin: 125000,
        durationMinutes: 90,
      },
      {
        _id: "8",
        name: "Cuci Blow",
        description: "Cuci rambut dan blow styling profesional",
        priceMin: 90000,
        durationMinutes: 40,
      },
      {
        _id: "9",
        name: "Hair Extension",
        description: "Sambung rambut untuk tampilan panjang instant",
        priceMin: 150000,
        durationMinutes: 90,
      },
      {
        _id: "10",
        name: "Facial",
        description: "Perawatan wajah untuk kulit bercahaya",
        priceMin: 125000,
        durationMinutes: 60,
      },
      {
        _id: "11",
        name: "Manicure",
        description: "Perawatan kuku tangan profesional",
        priceMin: 75000,
        durationMinutes: 45,
      },
      {
        _id: "12",
        name: "Perawatan Badan",
        description: "Perawatan tubuh untuk kulit halus",
        priceMin: 80000,
        durationMinutes: 60,
      },
      {
        _id: "13",
        name: "Relaxasi",
        description: "Pijat relaksasi untuk menghilangkan stress",
        priceMin: 85000,
        durationMinutes: 50,
      },
      {
        _id: "14",
        name: "Body Spa",
        description: "Spa tubuh lengkap untuk perawatan menyeluruh",
        priceMin: 125000,
        durationMinutes: 90,
      },
    ];

    setServices(mockServices);
    setFilteredServices(mockServices);
    setLoading(false);
  }, []);

  useEffect(() => {
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-15">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Services
          </h1>
          <p className="text-gray-600">
            Pilih layanan terbaik untuk Anda
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari layanan..."
              className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Layanan tidak ditemukan
            </h3>
            <p className="mt-2 text-gray-600">
              Coba kata kunci lain atau hapus filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Service Name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-400 transition-colors">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    {/* Duration */}
                    <div className="flex items-center text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 mr-2 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>{service.durationMinutes} menit</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 mr-2 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(service.priceMin)}
                      </span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button className="w-full py-2.5 bg-red-400 text-white font-medium rounded-lg hover:bg-red-500 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
