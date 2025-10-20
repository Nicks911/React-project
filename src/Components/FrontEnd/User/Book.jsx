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
    paymentMethod: '',
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

  const paymentOptions = [
    'Cash',
    'Debit Card',
    'Credit Card',
    'GoPay',
    'OVO',
    'Dana',
    'ShopeePay',
    'Transfer Bank (BCA)',
    'Transfer Bank (Mandiri)',
    'Transfer Bank (BRI)',
    'Transfer Bank (BNI)'
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
          <p className="text-gray-600">
            Isi form di bawah untuk reservasi layanan
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              Informasi Pribadi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nama Lengkap <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 outline-none"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nomor Telepon <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 outline-none"
                  placeholder="08XX-XXXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Tanggal <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Waktu <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Pilih Layanan
              </h3>
              <button
                type="button"
                onClick={addServiceField}
                className="px-4 py-1.5 bg-red-400 text-white text-sm font-medium rounded-md hover:bg-red-500 transition-colors"
              >
                + Tambah Layanan
              </button>
            </div>

            <div className="space-y-4">
              {formData.services.map((serviceItem, index) => (
                <div
                  key={index}
                  className="relative bg-gray-50 rounded-md p-4 border border-gray-200"
                >
                  {formData.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeServiceField(index)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-sm font-medium"
                    >
                      ✕
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Service #{index + 1} <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={serviceItem.service}
                        onChange={(e) =>
                          handleServiceChange(index, 'service', e.target.value)
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 outline-none bg-white"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Extension <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={serviceItem.extension}
                        onChange={(e) =>
                          handleServiceChange(index, 'extension', e.target.value)
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 outline-none bg-white"
                      >
                        <option value="">Pilih extension</option>
                        {serviceOptions.map((option) => (
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

          {/* Payment Method Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              Metode Pembayaran
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Pilih Metode Pembayaran <span className="text-red-400">*</span>
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 outline-none bg-white"
              >
                <option value="">Pilih metode pembayaran</option>
                {paymentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Notes Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              Catatan Tambahan
            </h3>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 outline-none resize-none"
              placeholder="Catatan khusus atau permintaan tambahan (opsional)"
            ></textarea>
          </div>

          {/* Total Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Total
              </h3>
              <div className="text-right">
                <p className="text-2xl font-bold text-red-400">Rp 100.000</p>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-red-400 text-white font-medium rounded-md hover:bg-red-500 transition-colors"
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
