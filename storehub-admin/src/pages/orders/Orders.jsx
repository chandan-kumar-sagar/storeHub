import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaShoppingCart, FaSearch, FaFilter, FaClock, FaCheckCircle, FaTruck, FaEllipsisV, FaUserPlus, FaTimes } from "react-icons/fa";
import DataTable from "../../components/common/DataTable";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState('all');
  const [assignModal, setAssignModal] = useState({ isOpen: false, orderId: null });
  const navigate = useNavigate();

  const dummyPartners = [
    { id: "DP-001", name: "Amit Singh", status: "Available" },
    { id: "DP-002", name: "Sunil Verma", status: "On Duty" },
    { id: "DP-003", name: "Rahul S.", status: "Available" },
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.warn("API failed, using dummy orders data");
      setOrders([
        { id: "ORD-7721", user_name: "John Doe", total_amount: 1450, status: "delivered", partner: "Amit Singh", items: 4, created_at: new Date().toISOString() },
        { id: "ORD-7722", user_name: "Jane Smith", total_amount: 850, status: "processing", partner: null, items: 2, created_at: new Date(Date.now() - 86400000).toISOString() },
        { id: "ORD-7723", user_name: "Rahul Kumar", total_amount: 2200, status: "pending", partner: null, items: 7, created_at: new Date(Date.now() - 172800000).toISOString() },
        { id: "ORD-7724", user_name: "Priya Sharma", total_amount: 340, status: "cancelled", partner: null, items: 1, created_at: new Date(Date.now() - 259200000).toISOString() },
        { id: "ORD-7725", user_name: "Amit Patel", total_amount: 1200, status: "shipped", partner: "Sunil V.", items: 3, created_at: new Date(Date.now() - 345600000).toISOString() },
      ]);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((order) => order.id === id ? { ...order, status } : order));
      toast.success(`Order #${id} marked as ${status}`);
    } catch (err) {
      setOrders((prev) => prev.map((order) => order.id === id ? { ...order, status } : order));
      toast.success(`Order #${id} status updated (Dummy Mode)`);
    }
  };

  const handleAssign = (partnerName) => {
    setOrders(prev => prev.map(o => o.id === assignModal.orderId ? { ...o, partner: partnerName, status: 'processing' } : o));
    toast.success(`Assigned to ${partnerName}`);
    setAssignModal({ isOpen: false, orderId: null });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = [
    { label: 'Total Orders', count: orders.length, icon: <FaShoppingCart />, color: 'blue' },
    { label: 'Pending', count: orders.filter(o => o.status === 'pending').length, icon: <FaClock />, color: 'amber' },
    { label: 'Processing', count: orders.filter(o => o.status === 'processing').length, icon: <FaTruck />, color: 'indigo' },
    { label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length, icon: <FaCheckCircle />, color: 'green' },
  ];

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.user_name.toLowerCase().includes(search.toLowerCase()) || o.id.toString().toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || o.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const columns = [
    {
      header: "Order Info",
      render: (order) => (
        <div className="flex flex-col">
          <span className="font-black text-gray-800 text-lg tracking-tight leading-none mb-1">#{order.id}</span>
          <span className="text-sm font-medium text-gray-400">{order.user_name}</span>
        </div>
      )
    },
    {
      header: "Total Amount",
      render: (order) => (
        <span className="font-black text-gray-800 text-lg">₹{order.total_amount}</span>
      )
    },
    {
      header: "Status",
      render: (order) => (
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
          order.status === 'delivered' ? 'bg-green-50 text-green-600 border-green-100' :
          order.status === 'processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
          order.status === 'shipped' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
          order.status === 'cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
          'bg-amber-50 text-amber-600 border-amber-100'
        }`}>
          {order.status}
        </span>
      )
    },
    {
      header: "Date",
      render: (order) => (
        <p className="text-sm font-bold text-gray-500">
          {new Date(order.created_at).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric'
          })}
        </p>
      )
    },
    {
      header: "Actions",
      align: "right",
      render: (order) => (
        <div className="flex items-center justify-end gap-3">
          <select
            value={order.status}
            onChange={(e) => updateStatus(order.id, e.target.value)}
            className="hidden sm:block bg-gray-50 border border-gray-100 text-gray-700 text-xs rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 p-2.5 outline-none font-black uppercase tracking-widest cursor-pointer transition-all hover:bg-white"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {!order.partner && order.status !== 'Delivered' && (
            <button 
              onClick={() => setAssignModal({ isOpen: true, orderId: order.id })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
            >
              <FaUserPlus />
              Assign Partner
            </button>
          )}
          <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-100 hover:text-gray-600 transition-all">
            <FaEllipsisV />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 pb-20">
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-4">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="bg-indigo-600 p-5 rounded-[2rem] shadow-2xl shadow-indigo-600/30 text-white relative z-10">
              <FaShoppingCart size={36} />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-black text-gray-800 tracking-tighter">Order <span className="text-green-600">Hub</span></h1>
            <p className="text-gray-500 font-medium text-lg mt-1">Track and manage customer fulfillments globally.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group w-full sm:w-80">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search Order ID or Name..."
              value={search}
              className="w-full bg-white border-2 border-gray-50 p-4 pl-14 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-gray-700"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            onClick={() => setActiveTab(stat.label === 'Total Orders' ? 'all' : stat.label)}
            className={`p-8 rounded-[2.5rem] border cursor-pointer transition-all duration-300 group ${
              (activeTab === 'all' && stat.label === 'Total Orders') || activeTab.toLowerCase() === stat.label.toLowerCase()
              ? `bg-${stat.color}-600 border-${stat.color}-600 shadow-2xl shadow-${stat.color}-600/20` 
              : 'bg-white border-gray-50 shadow-xl shadow-gray-200/50 hover:-translate-y-1'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all ${
               (activeTab === 'all' && stat.label === 'Total Orders') || activeTab.toLowerCase() === stat.label.toLowerCase()
               ? 'bg-white/20 text-white'
               : `bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110`
            }`}>
              {stat.icon}
            </div>
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${
              (activeTab === 'all' && stat.label === 'Total Orders') || activeTab.toLowerCase() === stat.label.toLowerCase()
              ? 'text-white/60' : 'text-gray-400'
            }`}>{stat.label}</p>
            <h3 className={`text-3xl font-black tracking-tighter ${
              (activeTab === 'all' && stat.label === 'Total Orders') || activeTab.toLowerCase() === stat.label.toLowerCase()
              ? 'text-white' : 'text-gray-800'
            }`}>{stat.count}</h3>
          </motion.div>
        ))}
      </div>

      {/* DATA TABLE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <DataTable columns={columns} data={filteredOrders} loading={loading} itemsPerPage={8} />
      </motion.div>

      {/* ASSIGN PARTNER MODAL */}
      <AnimatePresence>
        {assignModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setAssignModal({ isOpen: false, orderId: null })}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">Dispatch Order</h3>
                  <button 
                    onClick={() => setAssignModal({ isOpen: false, orderId: null })}
                    className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    <FaTimes />
                  </button>
                </div>

                <p className="text-gray-500 font-medium mb-8">Select a delivery partner to assign to <span className="font-black text-gray-800">{assignModal.orderId}</span>.</p>

                <div className="space-y-4">
                  {dummyPartners.map((partner) => (
                    <button
                      key={partner.id}
                      onClick={() => handleAssign(partner.name)}
                      className="w-full flex items-center justify-between p-6 rounded-[2rem] bg-gray-50 border-2 border-transparent hover:border-indigo-600 hover:bg-white transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                          {partner.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="text-left">
                          <p className="font-black text-gray-800">{partner.name}</p>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{partner.status}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-600 transition-all">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100"></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;