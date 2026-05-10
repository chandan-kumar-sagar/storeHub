import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

import { products } from "../../data/products";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Navbar />
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Link to="/" className="mt-4 text-green-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto p-4 md:p-12 pt-32">
        {/* Mobile Back Button */}
        <div className="md:hidden mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 font-medium"
          >
            <span className="text-xl">←</span> Back
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* IMAGE SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-4"
          >
            <div className="relative h-[400px] md:h-full overflow-hidden rounded-2xl shadow-inner bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* DETAILS SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12 flex flex-col justify-center"
          >
            <nav className="mb-6 text-sm text-gray-500">
              <Link to="/" className="hover:text-green-600">Home</Link> / <span className="text-gray-900 font-medium">Product Details</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                In Stock
              </span>
            </div>

            <div className="space-y-6 mb-10">
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500 font-bold">✓</span>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-200 transition-colors duration-300"
              >
                Add to Cart
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-gray-200 hover:border-green-600 hover:text-green-600 rounded-2xl font-bold text-lg transition-all duration-300"
              >
                Buy Now
              </motion.button>
            </div>
            
            <p className="mt-8 text-sm text-gray-400 text-center sm:text-left">
              📦 Fast delivery within 24 hours in your area.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
