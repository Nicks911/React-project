import CustomerNavbar from '../User/Navbar'
import Footer from '../Shared/Footer'
import LoadingScreen from '../Shared/LoadingScreen'
import useBackendHealth from '../../BackEnd/Utils/useBackendHealth'

const CustomerLayout = ({ children }) => {
  const { isBackendReady } = useBackendHealth()

  if (!isBackendReady) {
    return <LoadingScreen />
  }

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
