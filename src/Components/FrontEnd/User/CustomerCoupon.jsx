import CustomerDashboardLayout from "./CustomerDashboardLayout";

const CustomerCoupon = () => {
  return (
    <CustomerDashboardLayout title="My Coupons">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            className="h-24 w-24 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Coupons Coming Soon
          </h2>
          <p className="text-gray-500">
            Your available coupons will be displayed here.
          </p>
        </div>
      </div>
      </div>
    </CustomerDashboardLayout>
  );
};

export default CustomerCoupon;
