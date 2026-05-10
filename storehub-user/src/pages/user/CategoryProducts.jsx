import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

import { products as allProducts } from "../../data/products";


const CategoryProducts = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const filteredProducts = allProducts.filter(
    (p) => p.category.toLowerCase() === name.toLowerCase()
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 md:p-12 pt-32">
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate("/")}
            className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition text-gray-600"
          >
            <span className="text-xl">←</span>
          </button>
          <div>
            <h2 className="text-4xl font-black text-gray-900 capitalize">{name}</h2>
            <p className="text-gray-500 mt-1">Fresh products in this category</p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-bold text-gray-800">No products found</h3>
            <p className="text-gray-500">We're adding more products soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={p.id}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
