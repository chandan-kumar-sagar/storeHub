import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <div className="bg-white h-20 border-b border-gray-100 px-8 flex justify-between items-center sticky top-0 z-20">
      
      {/* Search Bar */}
      <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 w-96 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-100 focus-within:border-green-300 transition-all">
        <FaSearch className="text-gray-400 mr-3" />
        <input 
          type="text" 
          placeholder="Search across your store..." 
          className="bg-transparent border-none outline-none text-sm w-full font-medium text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        
        <button className="relative text-gray-400 hover:text-green-600 transition-colors">
          <FaBell className="text-xl" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-200"></div>

        <Link to="/profile" className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800 leading-tight">Admin User</p>
            <p className="text-xs font-medium text-gray-400">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
            <FaUserCircle />
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Topbar;