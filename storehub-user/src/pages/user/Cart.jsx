import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import API from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    navigate("/address");
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 md:p-12 pt-32">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900">Your Shopping Cart</h2>
            <p className="text-gray-500 mt-2">You have {cart.length} items in your bag</p>
          </div>
          {cart.length > 0 && (
            <button 
              onClick={() => navigate("/")}
              className="text-green-600 font-bold hover:underline mb-1"
            >
              Continue Shopping
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-20 rounded-[3rem] shadow-sm text-center border border-gray-100"
          >
            <span className="text-8xl mb-6 block animate-float">🛒</span>
            <h3 className="text-2xl font-black text-gray-800 mb-2">Your cart is feeling lonely</h3>
            <p className="text-gray-500 mb-10 max-w-sm mx-auto">Add some fresh groceries to your cart and make it happy!</p>
            <button 
              onClick={() => navigate("/")}
              className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-green-100 hover:bg-green-700 transition-all hover:-translate-y-1"
            >
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* ITEMS LIST */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    key={item.id}
                    className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8 group hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-3xl p-4 group-hover:scale-105 transition-transform">
                        <img
                          src={item.image}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-black text-xl text-gray-800 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-400 font-medium mb-3">Fresh Picked • 500g</p>
                        <p className="text-xl font-black text-green-600">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-10">
                      {/* Quantity Control */}
                      <div className="flex items-center bg-gray-50 p-2 rounded-2xl border border-gray-100">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 transition font-bold"
                        >
                          -
                        </button>
                        <span className="font-black text-lg w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 transition font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-12 h-12 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition"
                        title="Remove Item"
                      >
                        <span className="text-2xl">🗑️</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* SUMMARY */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 sticky top-32"
              >
                <h3 className="text-2xl font-black text-gray-900 mb-8">Order Summary</h3>
                
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Tax Estimate</span>
                    <span>₹0</span>
                  </div>
                  <div className="border-t border-dashed pt-6 flex justify-between items-center">
                    <span className="font-black text-gray-900 text-lg">Total Amount</span>
                    <span className="text-3xl font-black text-green-600">₹{total}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-green-100 transition-all flex justify-center items-center gap-3 text-lg"
                >
                  Proceed to Delivery 🚀
                </motion.button>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Secure Checkout
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
