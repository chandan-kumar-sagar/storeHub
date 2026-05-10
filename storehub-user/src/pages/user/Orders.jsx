import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import API from "../../api/axios";
import { motion } from "framer-motion";

const Orders = () => {
  // Dummy data for now
  const dummyOrders = [
    { id: 101, status: "Delivered", total_amount: 240 },
    { id: 102, status: "On the way", total_amount: 120 },
  ];

  const [orders, setOrders] = useState(dummyOrders);
  const [loading, setLoading] = useState(false);

  // We'll keep the function but comment out the API call for now
  const fetchOrders = async () => {
    /*
    try {
      setLoading(true);
      const res = await API.get("/user/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    */
  };

  useEffect(() => {
    // fetchOrders();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="pt-32 p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">My Orders</h2>
          <Link to="/" className="text-green-600 font-medium hover:underline">
            Back to Shopping
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-3xl shadow-sm text-center"
          >
            <span className="text-6xl mb-4 block">📦</span>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
            <Link to="/" className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 transition">
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={order.id}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 font-bold text-xl">
                    #{order.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Order Placed
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Status: <span className={`font-semibold ${order.status === 'delivered' ? 'text-green-600' : 'text-orange-500'}`}>{order.status}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-0 pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Amount</p>
                    <p className="text-xl font-extrabold text-green-600">₹{order.total_amount}</p>
                  </div>

                  <Link 
                    to={`/order-details/${order.id}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-xl font-bold transition text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
