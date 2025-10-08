import GuestNavbar from '../Guest/Navbar'
import Footer from '../Shared/Footer'

const GuestLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <GuestNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default GuestLayout
