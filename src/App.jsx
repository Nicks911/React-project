import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AccountManage from "./Components/FrontEnd/Admin/AccountManage"
import BookManage from "./Components/FrontEnd/Admin/BookManage"
import CouponManage from "./Components/FrontEnd/Admin/CouponManage"
import ServiceManage from "./Components/FrontEnd/Admin/ServiceManage"
import Transaction from "./Components/FrontEnd/Admin/Transaction"
import Navbar from "./Components/FrontEnd/Guest/Navbar"
// import Navbar from "./Components/FrontEnd/User/Navbar"
import Footer from "./Components/FrontEnd/Shared/Footer"
import Home from "./Components/FrontEnd/Shared/Home"
import Login from "./Components/FrontEnd/Shared/Login"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/accounts" element={<AccountManage />} />
        <Route path="/admin/books" element={<BookManage />} />
        <Route path="/admin/coupons" element={<CouponManage />} />
        <Route path="/admin/services" element={<ServiceManage />} />
        <Route path="/admin/transactions" element={<Transaction />} />
        
        {/* Redirect root to accounts by default */}
        <Route path="/" element={<Navigate to="/admin/accounts" replace />} />
        
        {/* Future routes can be added here */}
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  )
}

export default App