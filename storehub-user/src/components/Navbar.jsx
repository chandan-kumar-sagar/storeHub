import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll for navbar background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate total quantity of items in cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "/cart" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg py-3" : "bg-transparent py-5"}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
        
        <Link to="/" className="text-2xl font-black text-green-600 tracking-tighter flex items-center gap-1 group">
          <span className="bg-green-600 text-white p-1 rounded-lg group-hover:rotate-12 transition-transform">SH</span>
          StoreHub
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center font-semibold text-gray-700">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`relative hover:text-green-600 transition-colors ${location.pathname === link.path ? "text-green-600" : ""}`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div layoutId="navline" className="absolute -bottom-1 left-0 right-0 h-1 bg-green-600 rounded-full" />
              )}
            </Link>
          ))}

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 hover:bg-green-50 rounded-full transition group">
            <span className="text-2xl group-hover:scale-110 transition-transform block">🛒</span>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right hidden lg:block">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold leading-none">Account</p>
                <p className="text-sm font-bold text-gray-800">{user.name}</p>
              </div>
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-green-100 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
           {/* Mobile Cart Icon */}
           <Link to="/cart" className="relative text-gray-700">
             <span className="text-2xl">🛒</span>
             {totalItems > 0 && (
               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold border border-white">
                 {totalItems}
               </span>
             )}
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-800 focus:outline-none"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/30 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-5 font-bold">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  onClick={() => setIsOpen(false)} 
                  to={link.path} 
                  className={`text-xl ${location.pathname === link.path ? "text-green-600" : "text-gray-700"}`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="h-px bg-gray-100 w-full" />
              
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="text-gray-800">{user.name}</span>
                  </div>
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="bg-red-500 text-white px-4 py-3 rounded-2xl shadow-lg shadow-red-100 font-bold"
                  >
                    Logout Account
                  </button>
                </div>
              ) : (
                <Link onClick={() => setIsOpen(false)} to="/login" className="bg-green-600 text-white px-4 py-3 rounded-2xl shadow-lg shadow-green-100 text-center font-bold">
                  Login to StoreHub
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacer for non-fixed pages */}
      {!scrolled && location.pathname === "/" && <div className="hidden lg:block h-2" />}
    </nav>
  );
};

export default Navbar;
