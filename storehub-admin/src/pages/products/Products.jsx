import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { FaEdit, FaTrash, FaPlus, FaBoxOpen, FaSearch, FaThLarge, FaList, FaFilter } from 'react-icons/fa';
import toast from "react-hot-toast";
import DataTable from "../../components/common/DataTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'table' or 'grid'
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState('all'); // 'all', 'instock', 'lowstock'
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, productId: null });

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/products");
      setProducts(res.data.data || []);
    } catch (err) {
      console.warn("API failed, using dummy products data");
      setProducts([
        { id: 1, name: "Fresh Bananas", price: 60, stock: 150, image: "https://images.unsplash.com/photo-1571501474524-18151df95213?w=400", category: "Fruits" },
        { id: 2, name: "Whole Wheat Bread", price: 40, stock: 50, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400", category: "Grocery" },
        { id: 3, name: "Organic Tomatoes", price: 80, stock: 5, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", category: "Vegetables" },
        { id: 4, name: "Farm Fresh Milk", price: 65, stock: 30, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400", category: "Dairy" },
        { id: 5, name: "Green Apples", price: 120, stock: 80, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400", category: "Fruits" },
        { id: 6, name: "Oat Milk", price: 180, stock: 2, image: "https://images.unsplash.com/photo-1627914602302-3907c130325d?w=400", category: "Dairy" },
        { id: 7, name: "Organic Carrots", price: 45, stock: 120, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400", category: "Vegetables" },
        { id: 8, name: "Natural Honey", price: 350, stock: 15, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400", category: "Grocery" }
      ]);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleDeleteRequest = (id) => {
    setConfirmModal({ isOpen: true, productId: id });
  };

  const executeDelete = async () => {
    const id = confirmModal.productId;
    try {
      await API.delete(`/admin/products/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      setProducts((prev) => prev.filter((item) => item.id !== id));
      toast.success("Product deleted (Dummy Mode)");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'lowstock' ? p.stock < 10 : p.stock >= 10);
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      header: "Product",
      render: (product) => (
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 p-1 shadow-sm overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
            <img
              src={product.image || 'https://placehold.co/100x100?text=Product'}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100?text=Product'; }}
            />
          </div>
          <div>
            <span className="block text-[10px] font-black text-green-600/50 tracking-widest uppercase mb-1">{product.category}</span>
            <span className="font-black text-gray-800 text-lg tracking-tight leading-none">{product.name}</span>
          </div>
        </div>
      )
    },
    {
      header: "Price",
      render: (product) => (
        <span className="font-black text-gray-800 text-lg">₹{product.price}</span>
      )
    },
    {
      header: "Inventory",
      render: (product) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min((product.stock / 200) * 100, 100)}%` }}
              ></div>
            </div>
            <span className={`font-black text-xs ${product.stock > 10 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock}
            </span>
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Units in stock</span>
        </div>
      )
    },
    {
      header: "Actions",
      align: "right",
      render: (product) => (
        <div className="flex items-center justify-end gap-3">
          <Link
            to={`/products/edit/${product.id}`}
            className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
            title="Edit"
          >
            <FaEdit size={20} />
          </Link>
          <button
            onClick={() => handleDeleteRequest(product.id)}
            className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
            title="Delete"
          >
            <FaTrash size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-0 space-y-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-4">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="bg-green-600 p-5 rounded-[2rem] shadow-2xl shadow-green-600/30 text-white relative z-10">
              <FaBoxOpen size={36} />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-black text-gray-800 tracking-tighter">Products <span className="text-green-600">Catalog</span></h1>
            <p className="text-gray-500 font-medium text-lg mt-1">Manage your store's primary inventory and pricing.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group w-full sm:w-64">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
            <input
              type="text"
              placeholder="Filter catalog..."
              value={search}
              className="w-full bg-white border-2 border-gray-50 p-4 pl-14 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold text-gray-700"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-green-600 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FaThLarge size={18} />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'table' ? 'bg-white text-green-600 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FaList size={18} />
            </button>
          </div>

          <Link
            to="/products/add"
            className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-[1.5rem] font-black shadow-2xl shadow-gray-900/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] hover:-translate-y-1 whitespace-nowrap flex-shrink-0"
          >
            <FaPlus className="text-lg" />
            New Product
          </Link>
        </div>
      </div>

      {/* FILTER CHIPS */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 mr-2">
          <FaFilter size={14} />
        </div>
        {[
          { id: 'all', label: 'All Products', count: products.length },
          { id: 'instock', label: 'In Stock', count: products.filter(p => p.stock >= 10).length },
          { id: 'lowstock', label: 'Low Stock', count: products.filter(p => p.stock < 10).length },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all ${
              filter === btn.id 
              ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' 
              : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {btn.label} <span className={`ml-2 ${filter === btn.id ? 'text-green-100' : 'text-gray-300'}`}>{btn.count}</span>
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1,2,3,4].map(n => (
            <div key={n} className="bg-white rounded-[2.5rem] h-96 animate-pulse border border-gray-100"></div>
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                key={product.id}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* IMAGE AREA */}
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={product.image || 'https://placehold.co/400x400?text=Product'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40"></div>
                  
                  {/* STOCK BADGE */}
                  <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    product.stock > 10 ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                  }`}>
                    {product.stock} left
                  </div>

                  {/* PRICE OVERLAY */}
                  <div className="absolute bottom-4 left-6 text-white">
                    <span className="block text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{product.category}</span>
                    <h3 className="text-2xl font-black tracking-tight leading-none">₹{product.price}</h3>
                  </div>

                  {/* ACTIONS OVERLAY */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <Link 
                      to={`/products/edit/${product.id}`}
                      className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center border border-white/20"
                    >
                      <FaEdit />
                    </Link>
                    <button 
                      onClick={() => handleDeleteRequest(product.id)}
                      className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-600 transition-all flex items-center justify-center border border-white/20"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* INFO AREA */}
                <div className="p-8">
                  <h3 className="text-xl font-black text-gray-800 tracking-tight leading-none">{product.name}</h3>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min((product.stock / 200) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <DataTable columns={columns} data={filteredProducts} loading={false} itemsPerPage={8} />
        </motion.div>
      )}

      {/* CONFIRM MODAL */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={executeDelete}
        title="Remove Product?"
        message="This will permanently remove this item from your catalog. Are you absolutely sure?"
        confirmText="Yes, Delete Product"
        type="danger"
      />
    </div>
  );
};

export default Products;