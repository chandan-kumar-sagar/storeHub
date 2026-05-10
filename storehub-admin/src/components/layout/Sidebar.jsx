import { Link, useLocation } from "react-router-dom";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaThLarge,
  FaTags,
  FaSignOutAlt,
  FaChevronLeft,
  FaBoxOpen,
  FaTruck,
} from "react-icons/fa";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout } = useAdminAuth();

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <FaThLarge /> },
    { path: '/categories', label: 'Categories Managment', icon: <FaTags /> },
    { path: '/products', label: 'Products Managment', icon: <FaBoxOpen /> },
    { path: '/orders', label: 'Orders Managment', icon: <FaShoppingCart /> },
    { path: '/delivery', label: 'Delivery Managments', icon: <FaTruck /> },
    { path: '/users', label: 'Users Managments', icon: <FaUsers /> },
  ];

  return (
    <>
      {/* OVERLAY FOR MOBILE */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <div className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-500 ease-in-out z-[100] lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-200 overflow-hidden relative group cursor-pointer">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative z-10"
              >
                SH
              </motion.span>
            </div>
            <span className="text-2xl font-black text-gray-800 tracking-tight">StoreHub<span className="text-green-600">.</span></span>
          </div>
          
          {/* CLOSE BUTTON FOR MOBILE */}
          <button 
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
          >
            <FaChevronLeft />
          </button>
        </div>

        <div className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 group ${
                  isActive
                    ? 'bg-green-600 text-white shadow-xl shadow-green-600/20 active-nav'
                    : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                  {link.icon}
                </span>
                <span className="tracking-wide">{link.label}</span>
              </Link>
            );
          })}
          
          <button
            onClick={logout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all duration-300 mt-10 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">
              <FaSignOutAlt />
            </span>
            Logout
          </button>
        </div>

        <div className="p-6 border-t border-gray-100 m-5 rounded-2xl bg-gray-50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">System Status</p>
          <div className="flex items-center gap-2 text-xs font-bold text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            All Systems Operational
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;