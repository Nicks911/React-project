// MASIH BELUM SELESAI !!!!

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    services: [{ service: '', extension: '' }],
    notes: ''
  });

  const serviceOptions = [
    'Cutting',
    'Creambath',
    'Hair Spa',
    'Hair Mask',
    'Pelurusan',
    'Pengeritingan',
    'Pewarnaan',
    'Cuci Blow',
    'Hair Extension',
    'Facial',
    'Manicure',
    'Perawatan Badan',
    'Relaxasi',
    'Body Spa'
  ];

  const extensionOptions = [
    'None',
    'Premium Treatment',
    'Extra Time',
    'VIP Service',
    'Combination Package'
  ];

  const handleServiceChange = (index, field, value) => {
    const newServices = [...formData.services];
    newServices[index][field] = value;
    setFormData({ ...formData, services: newServices });
  };

  const addServiceField = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { service: '', extension: '' }]
    });
  };

  const removeServiceField = (index) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Data:', formData);
    // TODO: Send data to backend
    alert('Booking berhasil! Kami akan menghubungi Anda segera.');
    navigate('/customer/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-4">
            <div className="w-2 h-16 bg-gradient-to-b from-red-400 to-pink-400 rounded-full"></div>
            <div>
              <h1 className="text-5xl font-bold text-gray-900">Book Appointment</h1>
              <p className="text-lg text-gray-600 mt-2">
                Isi form di bawah untuk reservasi layanan
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-red-400">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-red-400 rounded-full"></div>
              Informasi Pribadi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
                  placeholder="08XX-XXXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Waktu <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-red-400">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-1 h-8 bg-red-400 rounded-full"></div>
                Pilih Layanan
              </h3>
              <button
                type="button"
                onClick={addServiceField}
                className="px-4 py-2 bg-red-400 text-white font-semibold rounded-full hover:bg-red-500 transition-all text-sm"
              >
                + Tambah Layanan
              </button>
            </div>

            <div className="space-y-6">
              {formData.services.map((serviceItem, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-pink-200"
                >
                  {formData.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeServiceField(index)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service #{index + 1} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={serviceItem.service}
                        onChange={(e) =>
                          handleServiceChange(index, 'service', e.target.value)
                        }
                        required
                        className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="">Pilih layanan</option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Extension (Optional)
                      </label>
                      <select
                        value={serviceItem.extension}
                        onChange={(e) =>
                          handleServiceChange(index, 'extension', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="">Pilih extension</option>
                        {extensionOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes Section */}
          <div className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-red-400">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-red-400 rounded-full"></div>
              Catatan Tambahan
            </h3>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Catatan khusus atau permintaan tambahan (opsional)"
            ></textarea>
          </div>

          {/* Submit Section */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-4 border-2 border-red-400 text-red-400 font-bold rounded-full hover:bg-red-50 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-gradient-to-r from-red-400 to-pink-400 text-white font-bold rounded-full hover:from-red-500 hover:to-pink-500 transition-all transform hover:scale-105 shadow-lg"
            >
              Konfirmasi Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Book;
