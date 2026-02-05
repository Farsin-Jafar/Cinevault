import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-yellow-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex justify-end items-center h-16">
          {/* Brand */}
          <div className="font-Gravitas absolute left-1/2 -translate-x-1/2 text-3xl font-bold text-gray-800">
            Cinevault
          </div>
          {/* go back button */}
          <button
            type="submit"
            className="absolute left-2 cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <Icon name="logout" size={28} />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              state={{ reset: true }}
              className="text-black hover:text-gray-500"
            >
              Home
            </Link>

            <Link to="/favorites" className="text-black hover:text-gray-500">
              Favorites
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/"
            state={{ reset: true }}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Home
          </Link>

          <Link
            to="/favorites"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
