import CustomerNavbar from '../User/Navbar'
import Footer from '../Shared/Footer'

const CustomerLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default CustomerLayout
