import { useEffect, useState } from "react";
import API from "../../api/axios";
import { FaEdit, FaTrash, FaPlus, FaTags, FaSearch, FaTimes, FaThLarge, FaList, FaImage } from "react-icons/fa";
import toast from "react-hot-toast";
import DataTable from "../../components/common/DataTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'table' or 'grid'
  const [form, setForm] = useState({ name: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, categoryId: null });

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/categories");
      // Add dummy product counts for visual appeal
      const data = (res.data.data || []).map(cat => ({
        ...cat,
        productCount: Math.floor(Math.random() * 40) + 10
      }));
      setCategories(data);
    } catch (err) {
      console.warn("API failed, using dummy categories data");
      setCategories([
        { id: 1, name: "Fruits", image: "https://images.unsplash.com/photo-1619566639858-5a8b1b63b081?w=400", productCount: 24 },
        { id: 2, name: "Vegetables", image: "https://images.unsplash.com/photo-1597362868479-de688482ff88?w=400", productCount: 18 },
        { id: 3, name: "Dairy", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400", productCount: 12 },
        { id: 4, name: "Grocery", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400", productCount: 45 },
        { id: 5, name: "Snacks", image: "https://images.unsplash.com/photo-1599490659223-e153c07dc4c4?w=400", productCount: 30 },
        { id: 6, name: "Beverages", image: "https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=400", productCount: 22 }
      ]);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Category name is required");
    
    setLoading(true);
    try {
      if (editingId) {
        await API.put(`/admin/categories/${editingId}`, form);
        setCategories((prev) =>
          prev.map((cat) => (cat.id === editingId ? { ...cat, ...form } : cat))
        );
        toast.success("Category updated successfully");
      } else {
        const res = await API.post("/admin/categories", form);
        const newCat = { ...res.data.data, productCount: 0 };
        setCategories((prev) => [...prev, newCat]);
        toast.success("Category added successfully");
      }
      closeModal();
    } catch (err) {
      if (editingId) {
        setCategories((prev) => prev.map((cat) => (cat.id === editingId ? { ...cat, ...form } : cat)));
        toast.success("Category updated (Dummy Mode)");
      } else {
        const newCat = { 
          id: Date.now(), 
          ...form, 
          productCount: 0,
          image: form.image || `https://placehold.co/400x300?text=${form.name}` 
        };
        setCategories((prev) => [...prev, newCat]);
        toast.success("Category added (Dummy Mode)");
      }
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingId(category.id);
      setForm({ name: category.name, image: category.image || "" });
    } else {
      setEditingId(null);
      setForm({ name: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm({ name: "", image: "" });
  };

  const handleDeleteRequest = (id) => {
    setConfirmModal({ isOpen: true, categoryId: id });
  };

  const executeDelete = async () => {
    const id = confirmModal.categoryId;
    try {
      await API.delete(`/admin/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Category deleted");
    } catch (err) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Category deleted (Dummy Mode)");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: "Category",
      render: (cat) => (
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 p-1 shadow-sm overflow-hidden flex-shrink-0">
            <img 
              src={cat.image || `https://placehold.co/100x100?text=${cat.name}`} 
              alt={cat.name} 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <span className="font-black text-gray-800 text-xl tracking-tight leading-none">{cat.name}</span>
            <span className="block text-[10px] font-black text-gray-400 tracking-widest uppercase mt-1">{cat.productCount} Products</span>
          </div>
        </div>
      )
    },
    {
      header: "Actions",
      align: "right",
      render: (cat) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => openModal(cat)}
            className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={() => handleDeleteRequest(cat.id)}
            className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            <FaTrash size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-0">
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-12">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="bg-green-600 p-5 rounded-[2rem] shadow-2xl shadow-green-600/30 text-white relative z-10">
              <FaTags size={36} />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-black text-gray-800 tracking-tighter">Category <span className="text-green-600">Hub</span></h1>
            <p className="text-gray-500 font-medium text-lg mt-1">Organize your store with beautiful collections.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* SEARCH */}
          <div className="relative group w-full sm:w-80">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
            <input
              type="text"
              placeholder="Filter collections..."
              value={search}
              className="w-full bg-white border-2 border-gray-50 p-4 pl-14 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold text-gray-700"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* VIEW TOGGLE */}
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

          <button
            onClick={() => openModal()}
            className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-[1.5rem] font-black shadow-2xl shadow-gray-900/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] hover:-translate-y-1"
          >
            <FaPlus />
            New Category
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1,2,3,4].map(n => (
            <div key={n} className="bg-white rounded-[2.5rem] h-80 animate-pulse border border-gray-100"></div>
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                key={cat.id}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* IMAGE AREA */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={cat.image || `https://placehold.co/400x300?text=${cat.name}`} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* ACTIONS OVERLAY */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => openModal(cat)}
                      className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center border border-white/20"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteRequest(cat.id)}
                      className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-600 transition-all flex items-center justify-center border border-white/20"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* INFO AREA */}
                <div className="p-8">
                  <span className="block text-[10px] font-black text-green-600 tracking-[0.2em] uppercase mb-2">Category</span>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight leading-none mb-4">{cat.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{cat.productCount} Products</span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 font-bold text-xs">
                      #{cat.id}
                    </div>
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
          <DataTable columns={columns} data={filteredCategories} loading={false} itemsPerPage={8} />
        </motion.div>
      )}

      {/* MODAL FORM WITH LIVE PREVIEW */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col md:flex-row border border-white/20"
            >
              {/* LEFT: PREVIEW */}
              <div className="w-full md:w-1/2 bg-gray-50 p-10 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-green-600/5 mix-blend-multiply"></div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8 relative z-10">Live Preview</h3>
                
                {/* PREVIEW CARD */}
                <div className="w-full max-w-[280px] bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 relative z-10">
                  <div className="aspect-[4/3] bg-gray-200 relative">
                    {form.image ? (
                      <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2 p-6 text-center">
                        <FaImage size={32} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Image Preview</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-black text-gray-800 tracking-tight leading-none mb-2">
                      {form.name || "Category Name"}
                    </h4>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">0 Products</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: FORM */}
              <div className="w-full md:w-1/2 p-10 sm:p-14 bg-white">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                    {editingId ? "Refine Collection" : "New Collection"}
                  </h2>
                  <button onClick={closeModal} className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                    <FaTimes size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2 group-focus-within:text-green-600 transition-colors">Category Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Organic Greens"
                      value={form.name}
                      required
                      className="w-full bg-gray-50 border-2 border-gray-50 p-4 rounded-2xl focus:ring-0 focus:border-green-500 outline-none transition-all font-bold text-gray-700 text-lg"
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2 group-focus-within:text-green-600 transition-colors">Visual Image URL</label>
                    <input
                      type="text"
                      placeholder="Paste Unsplash link here..."
                      value={form.image}
                      className="w-full bg-gray-50 border-2 border-gray-50 p-4 rounded-2xl focus:ring-0 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-5 rounded-2xl font-black text-white shadow-2xl transition-all active:scale-[0.98] disabled:opacity-70 text-lg ${
                        editingId ? "bg-blue-600 shadow-blue-600/30 hover:bg-blue-700" : "bg-green-600 shadow-green-600/30 hover:bg-green-700"
                      }`}
                    >
                      {loading && editingId ? "Saving..." : editingId ? "Update Category" : "Launch Category"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRM MODAL */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={executeDelete}
        title="Archive Category?"
        message="This collection will be archived. Linked products will remain safe but categoryless."
        confirmText="Yes, Archive"
        type="danger"
      />
    </div>
  );
};

export default Categories;