import { Link } from "react-router-dom";
import { useAuth, ROLE_REDIRECTS } from "../../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/SharedAsset/logo.png"
                alt="Flower Beauty Salon Logo"
                className="h-12 w-12 object-cover rounded-full"
              />
              <span className="text-2xl font-bold bg-red-300 bg-clip-text text-transparent">
                Flower Beauty Salon
              </span>
            </Link>

            {/* Navigation Menu */}
            <ul
              className={`flex ${
                isAuthenticated ? "space-x-4" : "space-x-6"
              } items-center`}
            >
              <li className="relative group">
                <Link
                  to="/blog"
                  className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative"
                >
                  Blog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5  bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li className="relative group">
                <Link
                  to="/gallery"
                  className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative"
                >
                  Gallery
                  <span className="absolute bottom-0 left-0 w-0 h-0.5  bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li className="relative group">
                <Link
                  to="/pricelist"
                  className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative"
                >
                  Price List
                  <span className="absolute bottom-0 left-0 w-0 h-0.5  bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="text-red-400 ps-5 font-semibold underline text-lg">
                    Hi, {user?.fullName?.split(" ")[0] || "Guest"}
                  </li>
                  <li>
                    <Link
                      to={ROLE_REDIRECTS[user?.role?.toLowerCase?.()] || "/"}
                    >
                      <button className="relative overflow-hidden hover:bg-red-50 text-red-500 border-2 border-red-500 font-bold px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-red-200/30 group cursor-pointer">
                        <span className="relative z-10">Dashboard</span>
                        <div className="absolute inset-0 bg-red-500 opacity-0 transition-opacity duration-300"></div>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="relative overflow-hidden bg-red-400 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 group cursor-pointer"
                    >
                      <span className="relative z-10">Log out</span>
                      <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">
                    <button className="relative overflow-hidden bg-red-400 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 group cursor-pointer">
                      <span className="relative z-10">Login</span>
                      <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
