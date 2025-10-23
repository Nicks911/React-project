import CustomerDashboardLayout from "./CustomerDashboardLayout";

const CustomerHistory = () => {
  return (
    <CustomerDashboardLayout title="Booking History">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            History Coming Soon
          </h2>
          <p className="text-gray-500">
            Your booking history will be displayed here.
          </p>
        </div>
      </div>
      </div>
    </CustomerDashboardLayout>
  );
};

export default CustomerHistory;
