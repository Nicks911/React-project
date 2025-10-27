import CustomerDashboardLayout from "./CustomerDashboardLayout";
import CouponIcon from "../../../assets/SharedAsset/Coupon.png";

const CustomerCoupon = () => {
  const coupons = [
    {
      id: 1,
      type: "SURPRISE",
      discount: "SURPRISE",
      description: "Get a surprise discount on your next visit!",
      code: "SURPRISE2025",
      validUntil: "Dec 31, 2025",
      isUsed: false,
    },
    {
      id: 2,
      type: "WELCOME COUPON",
      discount: "30% OFF",
      description: "Welcome! Enjoy 30% off on your first salon service",
      code: "WELCOME30",
      validUntil: "Nov 30, 2025",
      isUsed: true,
    },
    {
      id: 3,
      type: "SEASONAL PROMO",
      discount: "25% OFF",
      description: "Celebrate the season with amazing discounts",
      code: "HOLIDAY25",
      validUntil: "Dec 25, 2025",
      isUsed: false,
    },
    {
      id: 4,
      type: "LOYALTY REWARD",
      discount: "40% OFF",
      description: "Thank you for your loyalty! Special discount for VIP members",
      code: "VIP40",
      validUntil: "Dec 31, 2025",
      isUsed: true,
    },
    {
      id: 5,
      type: "REFERRAL BONUS",
      discount: "20% OFF",
      description: "Share the love! Get 20% off when you refer a friend",
      code: "REFER20",
      validUntil: "Jan 15, 2026",
      isUsed: false,
    },
  ];

  return (
    <CustomerDashboardLayout title="My Coupons">
      <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Coupons</h2>
        
        <div className="space-y-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="relative"
            >
              {/* USED Badge - positioned absolutely at top right */}
              {coupon.isUsed && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-red-500 text-white font-bold px-6 py-2 rounded-full shadow-lg transform rotate-12 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    USED
                  </div>
                </div>
              )}
              
              {/* Coupon Card with notch effect */}
              <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${coupon.isUsed ? 'opacity-60' : ''}`}>
                <div className="flex items-stretch">
                  {/* Left side - Icon */}
                  <div className="w-64 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 relative">
                    <img 
                      src={CouponIcon} 
                      alt="Coupon Icon" 
                      className="w-52 h-52 object-contain"
                    />
                    {/* Notch circles on right side */}
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                      <div className="w-6 h-6 bg-amber-100 rounded-full border-2 border-amber-200"></div>
                      <div className="w-6 h-6 bg-amber-100 rounded-full border-2 border-amber-200"></div>
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="flex-1 p-8 bg-gradient-to-r from-amber-50 to-orange-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-orange-600 bg-white px-4 py-1 rounded-full shadow-sm">
                        {coupon.type}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 mb-3">
                        {coupon.discount}
                      </h3>
                      <p className="text-gray-700 text-base leading-relaxed font-medium">
                        {coupon.description}
                      </p>
                    </div>

                    <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1 font-semibold">Coupon Code:</p>
                          <p className="text-xl font-bold text-gray-900 font-mono tracking-wider">{coupon.code}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1 font-semibold">Valid Until:</p>
                          <p className="text-base font-bold text-gray-800">{coupon.validUntil}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};

export default CustomerCoupon;
