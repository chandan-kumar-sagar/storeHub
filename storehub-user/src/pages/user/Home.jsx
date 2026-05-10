import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import bannerImg from "../../assets/images/banner/mart-banner.png";

import { products } from "../../data/products";

import fruitsImg from "../../assets/images/categories/fruits.png";
import dairyImg from "../../assets/images/categories/dairy.jpg";
import snacksImg from "../../assets/images/categories/snacks.jpg";
import vegImg from "../../assets/images/categories/vegetables.png";
import groceryImg from "../../assets/images/categories/grocery.jpg";
import flourRiceImg from "../../assets/images/categories/flour-rice.jpg";
import stationeryImg from "../../assets/images/categories/stationery.jpg";

const categories = [
  { name: "Fruits", image: fruitsImg, color: "bg-orange-50" },
  { name: "Vegetables", image: vegImg, color: "bg-green-50" },
  { name: "Dairy", image: dairyImg, color: "bg-blue-50" },
  { name: "Grocery", image: groceryImg, color: "bg-yellow-50" },
  { name: "Flour & Rice", image: flourRiceImg, color: "bg-amber-50" },
  { name: "Stationery", image: stationeryImg, color: "bg-purple-50" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative pt-20">
        <div 
          className="mx-6 md:mx-10 h-[300px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group"
        >
          <img 
            src={bannerImg} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
            alt="Hero Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-10 md:px-20 text-white">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-green-500 text-white text-xs md:text-sm font-bold uppercase tracking-widest py-1 px-3 rounded-full w-fit mb-4"
            >
              Fresh & Fast
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black leading-tight mb-6 max-w-2xl"
            >
              Fresh Groceries <br /> 
              <span className="text-green-400">Delivered Fast 🛒</span>
            </motion.h1>
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg w-fit shadow-xl hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1"
            >
              Shop Now
            </motion.button>
          </div>
        </div>
      </div>

      {/* 🔥 CATEGORIES */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Browse Categories</h2>
            <p className="text-gray-500 mt-2">Find what you need in seconds</p>
          </div>
          <button 
            onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
            className="text-green-600 font-bold hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat, i) => (
            <motion.div
              whileHover={{ y: -10 }}
              key={i}
              onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
              className={`relative h-48 md:h-64 rounded-[2rem] overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all ${cat.color}`}
            >
              <img
                src={cat.image}
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <p className="text-white font-black text-xl md:text-2xl tracking-tight">
                  {cat.name}
                </p>
                <p className="text-white/70 text-sm font-medium">Explore Collection →</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products-section" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2">Handpicked for your health and happiness</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={p.id}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER / FOOTER SECTION */}
      <div className="mx-6 md:mx-10 mb-10 bg-green-600 rounded-[3rem] p-10 md:p-20 flex flex-col items-center text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />
        
        <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">Get 20% Off Your First Order</h2>
        <p className="text-green-100 text-lg mb-10 max-w-xl relative z-10">Subscribe to our newsletter and stay updated with the latest fresh arrivals and exclusive offers.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg relative z-10">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 outline-none placeholder:text-white/60 font-medium"
          />
          <button 
            onClick={() => alert('Thanks for subscribing!')}
            className="bg-white text-green-600 px-8 py-4 rounded-2xl font-black hover:bg-green-50 transition-colors"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
