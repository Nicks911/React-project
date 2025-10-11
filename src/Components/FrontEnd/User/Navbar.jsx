import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-red-300 bg-clip-text text-transparent"
            >
              Flower Beauty Salon
            </Link>

            {/* Navigation Menu */}
            <ul className="flex space-x-8 items-center">
              <li className="relative group">
                <Link
                  to="/"
                  className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5  bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li className="relative group">
                <Link
                  to="/blog"
                  className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative"
                >
                  Blog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li className="relative group">
                <Link
                  to="/gallery"
                  className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative"
                >
                  Gallery
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li className="relative group">
                <Link
                  to="/pricelist"
                  className="text-gray-800 font-semibold text-lg transition-all duration-300 ease-in-out hover:text-red-400 relative"
                >
                  Price List
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <span className="text-gray-800 font-semibold text-lg">
                  {user?.fullName || "User"}
                </span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-400 hover:bg-red-500 rounded-full transition"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
