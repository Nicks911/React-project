// import Navbar from "./Components/FrontEnd/Guest/Navbar"
import Navbar from "./Components/FrontEnd/User/Navbar"
import Footer from "./Components/FrontEnd/Shared/Footer"
import Home from "./Components/FrontEnd/Shared/Home"

const App = () => {
  return (
    <div>
      <section>
        {/* <Navbar /> */}
        <Navbar />
      </section>
      <section>
        <Home />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default App