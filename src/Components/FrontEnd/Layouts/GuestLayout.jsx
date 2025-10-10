import GuestNavbar from '../Guest/Navbar'
import Footer from '../Shared/Footer'
import LoadingScreen from '../Shared/LoadingScreen'
import useBackendHealth from '../../BackEnd/Utils/useBackendHealth'

const GuestLayout = ({ children }) => {
  const { isBackendReady } = useBackendHealth()

  if (!isBackendReady) {
    return <LoadingScreen />
  }

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
