import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative h-64 overflow-hidden p-6 bg-gray-50/50">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={product.image}
          className="w-full h-full object-contain mix-blend-multiply"
          alt={product.name}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/80 backdrop-blur-md text-green-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
            Top Choice
          </span>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 font-medium">{product.category || "General"} • Premium Quality</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Price</p>
            <p className="text-2xl font-black text-gray-900">₹{product.price}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-12 h-12 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-100 hover:bg-green-700 transition-colors"
          >
            <span className="text-2xl font-bold">+</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
