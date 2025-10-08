import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from "./Components/FrontEnd/Admin/Dashboard"
import AccountManage from "./Components/FrontEnd/Admin/AccountManage"
import BookManage from "./Components/FrontEnd/Admin/BookManage"
import CouponManage from "./Components/FrontEnd/Admin/CouponManage"
import ServiceManage from "./Components/FrontEnd/Admin/ServiceManage"
import Transaction from "./Components/FrontEnd/Admin/Transaction"
import GuestLayout from "./Components/FrontEnd/Layouts/GuestLayout"
import CustomerLayout from "./Components/FrontEnd/Layouts/CustomerLayout"
import Home from "./Components/FrontEnd/Shared/Home"
import Login from "./Components/FrontEnd/Shared/Login"
import Register from "./Components/FrontEnd/Shared/Register"
import Blog from "./Components/FrontEnd/Guest/Blog"
import Gallery from "./Components/FrontEnd/Guest/Gallery"
import PriceList from "./Components/FrontEnd/Guest/PriceList"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/accounts" element={<AccountManage />} />
        <Route path="/admin/books" element={<BookManage />} />
        <Route path="/admin/coupons" element={<CouponManage />} />
        <Route path="/admin/services" element={<ServiceManage />} />
        <Route path="/admin/transactions" element={<Transaction />} />
        
        {/* Guest Routes - Before Login (with Guest Navbar) */}
        <Route path="/" element={<GuestLayout><Home /></GuestLayout>} />
        <Route path="/blog" element={<GuestLayout><Blog /></GuestLayout>} />
        <Route path="/gallery" element={<GuestLayout><Gallery /></GuestLayout>} />
        <Route path="/pricelist" element={<GuestLayout><PriceList /></GuestLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Customer Routes - After Login (with Customer Navbar) */}
        <Route path="/home" element={<CustomerLayout><Home /></CustomerLayout>} />
      </Routes>
    </Router>
  )
}

export default App