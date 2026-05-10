import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import API from "../../api/axios";
import { motion } from "framer-motion";

const OrderDetails = () => {
  const { id } = useParams();
  
  // Dummy data for now
  const dummyOrder = {
    id: id || "101",
    status: "Delivered",
    total_amount: 240,
    address_line: "123 Green Valley, Sunshine Apartment",
    city: "New Delhi",
    pincode: "110001",
    items: [
      { id: 1, name: "Fresh Apples", quantity: 2, price: 120 },
      { id: 2, name: "Milk", quantity: 1, price: 60 },
    ],
    date: "May 03, 2026",
  };

  const [order, setOrder] = useState(dummyOrder);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    /*
    try {
      setLoading(true);
      const res = await API.get(`/user/orders/${id}`);
      setOrder(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    */
  };

  useEffect(() => {
    // fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 md:p-12 pt-32">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/orders" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition text-gray-600">
            <span className="text-xl">←</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">Order Details</h2>
        </div>

        <div className="grid gap-8">
          
          {/* HEADER INFO */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-wrap justify-between items-center gap-6"
          >
            <div>
              <p className="text-sm text-gray-400 mb-1">Order ID</p>
              <h3 className="text-xl font-bold text-gray-800">#{order.id}</h3>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Placed On</p>
              <h3 className="text-lg font-semibold text-gray-700">{order.date}</h3>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Status</p>
              <span className={`px-4 py-1 rounded-full text-sm font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                {order.status}
              </span>
            </div>
          </motion.div>

          {/* ITEMS */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>📦</span> Order Items
            </h3>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 flex justify-between items-center text-lg">
                  <div>
                    <p className="font-bold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-400">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <p className="font-extrabold text-green-600">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Total Paid</h3>
              <h3 className="text-3xl font-extrabold text-green-600">₹{order.total_amount}</h3>
            </div>
          </motion.div>

          {/* ADDRESS */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📍</span> Delivery Address
            </h3>
            <div className="text-gray-600 space-y-1">
              <p className="font-bold text-gray-800">{order.address_line}</p>
              <p>{order.city} - {order.pincode}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
