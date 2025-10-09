import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/FrontEnd/Admin/Dashboard";
import AccountManage from "./Components/FrontEnd/Admin/AccountManage";
import BookManage from "./Components/FrontEnd/Admin/BookManage";
import CouponManage from "./Components/FrontEnd/Admin/CouponManage";
import ServiceManage from "./Components/FrontEnd/Admin/ServiceManage";
import Transaction from "./Components/FrontEnd/Admin/Transaction";
import GuestLayout from "./Components/FrontEnd/Layouts/GuestLayout";
import CustomerLayout from "./Components/FrontEnd/Layouts/CustomerLayout";
import Home from "./Components/FrontEnd/Shared/Home";
import Login from "./Components/FrontEnd/Shared/Login";
import Register from "./Components/FrontEnd/Shared/Register";
import Blog from "./Components/FrontEnd/Guest/Blog";
import Gallery from "./Components/FrontEnd/Guest/Gallery";
import PriceList from "./Components/FrontEnd/Guest/PriceList";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./Components/FrontEnd/Shared/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/accounts"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AccountManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/books"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <BookManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/coupons"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CouponManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ServiceManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/transactions"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Transaction />
              </ProtectedRoute>
            }
          />

          {/* Guest Routes - Before Login (with Guest Navbar) */}
          <Route
            path="/"
            element={
              <GuestLayout>
                <Home />
              </GuestLayout>
            }
          />
          <Route
            path="/blog"
            element={
              <GuestLayout>
                <Blog />
              </GuestLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <GuestLayout>
                <Gallery />
              </GuestLayout>
            }
          />
          <Route
            path="/pricelist"
            element={
              <GuestLayout>
                <PriceList />
              </GuestLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer Routes - After Login (with Customer Navbar) */}
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <GuestLayout>
                  <Home />
                </GuestLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
