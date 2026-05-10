import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const address = JSON.parse(localStorage.getItem("address"));

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    /*
    try {
      const orderData = {
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        address,
        total_amount: total,
      };

      await API.post("/user/orders", orderData);
    } catch (err) {
      alert("Order failed. Please try again.");
      return;
    }
    */

    clearCart();
    alert("Order placed successfully! 🎉 (Dummy Mode)");
    navigate("/orders");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 md:p-12 pt-32">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Order Summary</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Items and Address */}
          <div className="md:col-span-2 space-y-6">
            
            {/* ITEMS */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>🛒</span> Your Items
              </h3>
              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-extrabold text-green-600">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ADDRESS */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📍</span> Delivery Address
              </h3>
              <div className="text-gray-600 space-y-1">
                <p className="font-medium text-gray-800">{address?.line1}</p>
                <p>{address?.city} - {address?.pincode}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Total and Action */}
          <div className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24"
            >
              <h3 className="text-xl font-bold mb-6">Payment Details</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-extrabold text-green-600">₹{total}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={placeOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-100 transition-all flex justify-center items-center gap-2"
              >
                Place Order 🎉
              </motion.button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Secure SSL Encrypted Payment
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
