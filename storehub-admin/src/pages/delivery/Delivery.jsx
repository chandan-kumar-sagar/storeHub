import { useEffect, useState } from "react";
import { FaTruck, FaUserFriends, FaCheckCircle, FaClock, FaMapMarkerAlt, FaPlus, FaSearch, FaChevronRight, FaTimes, FaSave, FaMotorcycle } from "react-icons/fa";
import DataTable from "../../components/common/DataTable";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const Delivery = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('shipments'); // 'shipments' or 'partners'
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPartner, setNewPartner] = useState({ name: "", phone: "", email: "", vehicle: "Bike" });

  const shipments = [
    { id: "SH-1021", order: "#ORD-7721", customer: "Rahul Kumar", partner: "Amit Singh", status: "Out for Delivery", location: "Sector 15, Dwarka", eta: "10 mins" },
    { id: "SH-1022", order: "#ORD-7722", customer: "Priya Singh", partner: "Sunil V.", status: "Picked Up", location: "Near Store", eta: "25 mins" },
    { id: "SH-1023", order: "#ORD-7723", customer: "Amit Shah", partner: "Pending Assignment", status: "Waiting", location: "Warehouse", eta: "--" },
  ];

  const partners = [
    { id: "DP-001", name: "Amit Singh", status: "On Duty", deliveries: 12, rating: 4.8, phone: "9876543210", vehicle: "Bike" },
    { id: "DP-002", name: "Sunil Verma", status: "On Duty", deliveries: 8, rating: 4.5, phone: "9876543211", vehicle: "Scooter" },
    { id: "DP-003", name: "Rahul S.", status: "Available", deliveries: 0, rating: 5.0, phone: "9876543212", vehicle: "Bike" },
    { id: "DP-004", name: "Karan Johar", status: "Offline", deliveries: 5, rating: 4.2, phone: "9876543213", vehicle: "Van" },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleAddPartner = (e) => {
    e.preventDefault();
    toast.success(`${newPartner.name} registered successfully!`);
    setIsModalOpen(false);
    setNewPartner({ name: "", phone: "", email: "", vehicle: "Bike" });
  };

  const shipmentColumns = [
    {
      header: "Shipment Details",
      render: (s) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
            <FaTruck size={20} />
          </div>
          <div>
            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.id}</span>
            <span className="font-black text-gray-800 text-lg tracking-tight leading-none">{s.order}</span>
          </div>
        </div>
      )
    },
    {
      header: "Customer / Partner",
      render: (s) => (
        <div>
          <p className="font-bold text-gray-700">{s.customer}</p>
          <p className="text-xs text-indigo-600 font-black uppercase tracking-widest mt-1 flex items-center gap-1">
             {s.partner}
          </p>
        </div>
      )
    },
    {
      header: "Status",
      render: (s) => (
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
          s.status === 'Out for Delivery' ? 'bg-green-50 text-green-600 ring-1 ring-green-600/20' : 
          s.status === 'Picked Up' ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-600/20' : 'bg-amber-50 text-amber-600 ring-1 ring-amber-600/20'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
          {s.status}
        </span>
      )
    },
    {
      header: "Tracking",
      render: (s) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt size={12} />
            <span className="text-sm font-bold">{s.location}</span>
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ETA: {s.eta}</span>
        </div>
      )
    },
    {
      header: "Action",
      align: "right",
      render: () => (
        <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-100 hover:text-indigo-600 transition-all">
          <FaChevronRight />
        </button>
      )
    }
  ];

  const partnerColumns = [
    {
      header: "Partner Identity",
      render: (p) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm shadow-sm relative">
             {p.name.split(' ').map(n => n[0]).join('')}
             <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg shadow-sm border border-gray-50">
               <FaMotorcycle size={8} />
             </div>
          </div>
          <div>
            <span className="font-black text-gray-800 text-lg tracking-tight leading-none">{p.name}</span>
            <span className="block text-xs font-medium text-gray-400 mt-1">{p.phone}</span>
          </div>
        </div>
      )
    },
    {
      header: "Work Status",
      render: (p) => (
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
          p.status === 'Available' ? 'bg-green-50 text-green-600 ring-1 ring-green-600/20' : 
          p.status === 'On Duty' ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-600/20' : 'bg-gray-50 text-gray-400 border border-gray-100'
        }`}>
          {p.status}
        </span>
      )
    },
    {
      header: "Performance",
      render: (p) => (
        <div className="flex flex-col">
          <span className="font-black text-gray-800 tracking-tighter">★ {p.rating}</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.deliveries} Deliveries</span>
        </div>
      )
    },
    {
      header: "Action",
      align: "right",
      render: () => (
        <button className="px-4 py-2 rounded-xl bg-gray-50 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
          Manage
        </button>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="bg-indigo-600 p-5 rounded-[2rem] shadow-2xl shadow-indigo-600/30 text-white relative z-10">
              <FaTruck size={36} />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-black text-gray-800 tracking-tighter">Delivery <span className="text-green-600">Fleet</span></h1>
            <p className="text-gray-500 font-medium text-lg mt-1">Manual dispatch and delivery partner management.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group w-full sm:w-80">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search partner or order..."
              value={search}
              className="w-full bg-white border-2 border-gray-50 p-4 pl-14 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-gray-700"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-[1.5rem] font-black shadow-2xl shadow-gray-900/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] hover:-translate-y-1 whitespace-nowrap"
          >
            <FaPlus />
            Register Partner
          </button>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {[
          { label: 'Active Fleet', value: '24 Partners', icon: <FaUserFriends />, color: 'orange' },
          { label: 'In Transit', value: '18 Shipments', icon: <FaTruck />, color: 'blue' },
          { label: 'Completed Today', value: '142 Orders', icon: <FaCheckCircle />, color: 'green' },
        ].map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-xl shadow-gray-200/50 group hover:-translate-y-2 transition-all duration-500"
          >
            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center text-2xl mb-8 group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-500 shadow-inner`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <h3 className="text-4xl font-black text-gray-800 tracking-tighter">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* TABS & DATA */}
      <div className="space-y-8">
        <div className="flex items-center gap-10 border-b border-gray-100">
          {[
            { id: 'shipments', label: 'Live Shipments', count: shipments.length, icon: <FaTruck /> },
            { id: 'partners', label: 'Partner Fleet', count: partners.length, icon: <FaUserFriends /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-6 flex items-center gap-2 transition-all ${
                activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-black text-sm uppercase tracking-widest">{tab.label}</span>
              <span className={`ml-1 px-2 py-0.5 rounded-lg text-[10px] font-black ${
                activeTab === tab.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'
              }`}>{tab.count}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="activeDeliveryTab" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'shipments' ? (
            <DataTable columns={shipmentColumns} data={shipments} loading={loading} itemsPerPage={8} />
          ) : (
            <DataTable columns={partnerColumns} data={partners} loading={loading} itemsPerPage={8} />
          )}
        </motion.div>
      </div>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleAddPartner} className="p-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-black text-gray-800 tracking-tight leading-none mb-2">Partner Onboarding</h3>
                    <p className="text-gray-400 font-medium">Create a new delivery partner profile.</p>
                  </div>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all">
                    <FaTimes />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. John Doe"
                      className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-700"
                      value={newPartner.name}
                      onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="91XXXXXXXX"
                      className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-700"
                      value={newPartner.phone}
                      onChange={(e) => setNewPartner({...newPartner, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="partner@fleet.com"
                      className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-700"
                      value={newPartner.email}
                      onChange={(e) => setNewPartner({...newPartner, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Vehicle Type</label>
                    <select 
                      className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-700 appearance-none cursor-pointer"
                      value={newPartner.vehicle}
                      onChange={(e) => setNewPartner({...newPartner, vehicle: e.target.value})}
                    >
                      <option>Bike</option>
                      <option>Scooter</option>
                      <option>Electric Cycle</option>
                      <option>Van</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-8 py-4 rounded-2xl bg-gray-50 text-gray-500 font-black uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                  <button type="submit" className="flex-[2] px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                    <FaSave />
                    Register Partner
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Delivery;
