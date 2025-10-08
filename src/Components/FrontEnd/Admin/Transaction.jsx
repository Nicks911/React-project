import AdminLayout from './AdminLayout'

const Transaction = () => {
  return (
    <AdminLayout title="Transaction Management">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Transaction Management</h3>
          <p className="text-gray-500">This page is under construction. Transaction management features will be available soon.</p>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Transaction
