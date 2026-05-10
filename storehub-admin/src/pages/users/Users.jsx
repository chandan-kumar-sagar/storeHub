import { useEffect, useState } from "react";
import API from "../../api/axios";
import { FaUserCircle, FaSearch, FaUserShield, FaUserCheck, FaUserSlash, FaTruck, FaUsers, FaThLarge, FaList, FaUserEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import DataTable from "../../components/common/DataTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('customers');
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null, type: 'delete' });

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data.data || []);
    } catch (err) {
      console.warn("API failed, using dummy users data");
      setUsers([
        { id: 1, name: "Chandan Kumar", email: "chandan@example.com", role: "admin", spent: "N/A", lastActive: "Just Now", is_blocked: false, created_at: "2024-01-10" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "customer", spent: "₹12,450", lastActive: "2 days ago", is_blocked: false, created_at: "2024-02-15" },
        { id: 3, name: "Amit Singh", email: "amit@fleet.com", role: "partner", spent: "N/A", lastActive: "Active Now", is_blocked: false, created_at: "2024-03-05" },
        { id: 4, name: "Sunil Verma", email: "sunil@fleet.com", role: "partner", spent: "N/A", lastActive: "1 hour ago", is_blocked: false, created_at: "2024-03-20" },
        { id: 5, name: "Priya Singh", email: "priya@example.com", role: "customer", spent: "₹5,200", lastActive: "5 mins ago", is_blocked: false, created_at: "2024-04-01" },
      ]);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  const handleDeleteRequest = (id, type) => {
    setConfirmModal({ isOpen: true, userId: id, type });
  };

  const executeAction = () => {
    toast.success("Action completed (Dummy Mode)");
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
    const matchesTab = 
      (activeTab === 'customers' && user.role === 'customer') ||
      (activeTab === 'admins' && user.role === 'admin') ||
      (activeTab === 'partners' && user.role === 'partner');
    return matchesSearch && matchesTab;
  });

  const columns = [
    {
      header: "User Identity",
      render: (user) => (
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm overflow-hidden flex-shrink-0 ${
            user.role === 'admin' ? 'bg-orange-50 text-orange-600' : 
            user.role === 'partner' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'
          }`}>
            {getInitials(user.name)}
          </div>
          <div>
            <p className="font-black text-gray-800 leading-tight">{user.name}</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{user.role}</p>
          </div>
        </div>
      )
    },
    {
      header: "Email",
      render: (user) => <span className="text-sm font-bold text-gray-500">{user.email}</span>
    },
    {
      header: "Metrics",
      render: (user) => (
        <div className="flex flex-col">
          <span className="text-sm font-black text-gray-800">{user.spent}</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Spent</span>
        </div>
      )
    },
    {
      header: "Actions",
      align: "right",
      render: (user) => (
        <div className="flex items-center justify-end gap-3">
          <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center">
            <FaUserEdit />
          </button>
          <button 
            onClick={() => handleDeleteRequest(user.id, "delete")}
            className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center"
          >
            <FaTrash />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="bg-orange-600 p-5 rounded-[2rem] shadow-2xl shadow-orange-600/30 text-white relative z-10">
              <FaUsers size={36} />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-black text-gray-800 tracking-tighter">Community <span className="text-green-600">Hub</span></h1>
            <p className="text-gray-500 font-medium text-lg mt-1">Manage users, partners, and platform permissions.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group w-full sm:w-80">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              className="w-full bg-white border-2 border-gray-50 p-4 pl-14 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-gray-700"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FaThLarge size={18} />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'table' ? 'bg-white text-orange-600 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FaList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ROLE TABS */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex gap-10">
          {[
            { id: 'customers', label: 'Customers', count: users.filter(u => u.role === 'customer').length, icon: <FaUsers /> },
            { id: 'partners', label: 'Delivery Partners', count: users.filter(u => u.role === 'partner').length, icon: <FaTruck /> },
            { id: 'admins', label: 'Administrators', count: users.filter(u => u.role === 'admin').length, icon: <FaUserShield /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-6 flex items-center gap-2 transition-all ${
                activeTab === tab.id ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-black text-sm uppercase tracking-widest">{tab.label}</span>
              <span className={`ml-1 px-2 py-0.5 rounded-lg text-[10px] font-black ${
                activeTab === tab.id ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
              }`}>{tab.count}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="activeUserTab" className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT AREA */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1,2,3,4].map(n => (
            <div key={n} className="bg-white rounded-[3rem] h-64 animate-pulse border border-gray-100"></div>
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredUsers.map((user, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                key={user.id}
                className="group bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 text-center relative"
              >
                <div className={`w-24 h-24 rounded-[2rem] mx-auto mb-6 flex items-center justify-center font-black text-2xl shadow-inner relative overflow-hidden group-hover:scale-110 transition-transform duration-500 ${
                  user.role === 'admin' ? 'bg-orange-50 text-orange-600' : 
                  user.role === 'partner' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  {getInitials(user.name)}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-gray-800 tracking-tight leading-none">{user.name}</h3>
                  <p className="text-sm font-bold text-gray-400 truncate px-4">{user.email}</p>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="bg-gray-50 px-4 py-2 rounded-2xl">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Status</p>
                    <p className="text-sm font-black text-gray-800 mt-1">{user.lastActive}</p>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 rounded-2xl">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Role</p>
                    <p className="text-sm font-black text-gray-800 mt-1 uppercase tracking-tighter">{user.role}</p>
                  </div>
                </div>

                {/* QUICK ACTIONS OVERLAY */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <button className="w-10 h-10 rounded-xl bg-white shadow-lg text-orange-600 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                    <FaUserEdit />
                  </button>
                  <button 
                    onClick={() => handleDeleteRequest(user.id, "delete")}
                    className="w-10 h-10 rounded-xl bg-white shadow-lg text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <DataTable columns={columns} data={filteredUsers} loading={false} itemsPerPage={8} />
        </motion.div>
      )}

      {/* CONFIRM MODAL */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={executeAction}
        title={confirmModal.type === 'delete' ? "Remove User?" : "Block User?"}
        message="This action will restrict platform access for this account. Proceed with caution."
        confirmText="Confirm Action"
        type="danger"
      />
    </div>
  );
};

export default Users;