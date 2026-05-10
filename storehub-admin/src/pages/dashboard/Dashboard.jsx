import { FaBox, FaShoppingCart, FaUsers, FaRupeeSign, FaArrowUp, FaArrowDown, FaEllipsisH, FaBell } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { motion } from "framer-motion";

const revenueData = [
  { name: 'Mon', revenue: 4000, trend: 10 },
  { name: 'Tue', revenue: 3000, trend: -5 },
  { name: 'Wed', revenue: 5000, trend: 15 },
  { name: 'Thu', revenue: 2780, trend: -8 },
  { name: 'Fri', revenue: 6890, trend: 20 },
  { name: 'Sat', revenue: 8390, trend: 25 },
  { name: 'Sun', revenue: 10490, trend: 30 },
];

const categoryData = [
  { name: 'Fruits', sales: 400, color: '#10b981' },
  { name: 'Veg', sales: 300, color: '#3b82f6' },
  { name: 'Dairy', sales: 550, color: '#8b5cf6' },
  { name: 'Grocery', sales: 200, color: '#f59e0b' },
  { name: 'Snacks', sales: 150, color: '#ef4444' },
];

const recentOrders = [
  { id: '#1001', user: 'John Doe', amount: '₹1,450', status: 'Delivered', time: '2 mins ago' },
  { id: '#1002', user: 'Jane Smith', amount: '₹850', status: 'Processing', time: '15 mins ago' },
  { id: '#1003', user: 'Rahul K.', amount: '₹2,200', status: 'Pending', time: '1 hour ago' },
];

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-10 px-4 sm:px-0"
    >
      {/* PREMIUM HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10"></div>
        <div>
          <h1 className="text-5xl font-black text-gray-800 tracking-tighter leading-tight">
            Dashboard <span className="text-green-600">Overview</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            Real-time store performance and analytics.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center text-gray-400 hover:text-green-600 transition-all hover:-translate-y-1 relative">
            <FaBell size={20} />
            <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Last Updated</p>
              <p className="text-sm font-black text-gray-700 mt-1">Just Now</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300">
              <FaEllipsisH />
            </div>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: 'Total Revenue', value: '₹45,231', icon: <FaRupeeSign />, trend: '+12.5%', isUp: true, color: 'green' },
          { title: 'Total Orders', value: '1,284', icon: <FaShoppingCart />, trend: '+8.2%', isUp: true, color: 'blue' },
          { title: 'Active Stock', value: '584', icon: <FaBox />, trend: '-3.1%', isUp: false, color: 'purple' },
          { title: 'Total Customers', value: '3,420', icon: <FaUsers />, trend: '+15.3%', isUp: true, color: 'orange' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className="group relative bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50 overflow-hidden hover:-translate-y-2 transition-all duration-500"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center text-2xl group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-500 shadow-sm shadow-${stat.color}-200`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black ${stat.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.isUp ? <FaArrowUp /> : <FaArrowDown />}
                {stat.trend}
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-3xl font-black text-gray-800 mt-2 tracking-tighter">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS & ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* REVENUE AREA CHART */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-50 p-10 overflow-hidden group">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-black text-gray-800 tracking-tight leading-none mb-2">Revenue Growth</h2>
              <p className="text-gray-400 font-medium">Weekly sales performance analytics</p>
            </div>
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-500 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  cursor={{stroke: '#16a34a', strokeWidth: 2, strokeDasharray: '5 5'}}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#16a34a" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CATEGORY BAR CHART */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-50 p-10 flex flex-col">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight leading-none mb-2">Category Sales</h2>
          <p className="text-gray-400 font-medium mb-10">Product distribution by sales</p>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 13, fontWeight: 800}} width={80} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sales" radius={[0, 10, 10, 0]} barSize={24}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 space-y-4">
            {categoryData.slice(0, 3).map((cat, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <span className="font-bold text-gray-700">{cat.name}</span>
                </div>
                <span className="font-black text-gray-900">{cat.sales} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-50 p-10 overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight leading-none mb-2">Recent Transactions</h2>
            <p className="text-gray-400 font-medium">Latest customer activity across the store</p>
          </div>
          <button className="text-green-600 font-black text-sm uppercase tracking-widest hover:underline">View All Orders</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="pb-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order, i) => (
                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-6 font-black text-gray-800">{order.id}</td>
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center font-black text-xs">
                        {order.user.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-700">{order.user}</span>
                    </div>
                  </td>
                  <td className="py-6 font-black text-gray-900">{order.amount}</td>
                  <td className="py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 
                      order.status === 'Processing' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-6 text-right font-bold text-gray-400 text-sm">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;