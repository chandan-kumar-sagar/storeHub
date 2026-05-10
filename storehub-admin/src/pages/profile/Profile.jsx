import { useState, useRef } from "react";
import { FaUserCircle, FaCamera, FaSave, FaLock, FaEnvelope, FaUser, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@storehub.com",
    phone: "+91 9876543210",
    role: "Super Admin"
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        toast.success("Image selected!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-10 px-4 sm:px-0"
    >
      {/* HEADER */}
      <div>
        <h1 className="text-5xl font-black text-gray-800 tracking-tighter leading-tight">
          Admin <span className="text-green-600">Profile</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg mt-2">Manage your account details and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT CARD - AVATAR */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-50 p-10 flex flex-col items-center text-center">
          <div className="relative group">
            <div 
              onClick={() => fileInputRef.current.click()}
              className="w-32 h-32 rounded-[2.5rem] bg-green-100 text-green-600 flex items-center justify-center text-5xl shadow-inner relative overflow-hidden cursor-pointer group-hover:ring-4 group-hover:ring-green-500/20 transition-all duration-500"
            >
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaCamera className="text-white text-2xl" />
              </div>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageChange}
            />

            <button 
              onClick={() => fileInputRef.current.click()}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-green-600 border border-gray-100 hover:bg-green-600 hover:text-white transition-all z-10"
            >
              <FaCamera size={16} />
            </button>
          </div>
          
          <div className="mt-8 space-y-2">
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">{profile.name}</h3>
            <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest shadow-sm">
              {profile.role}
            </span>
          </div>

          <div className="w-full mt-10 pt-10 border-t border-gray-50 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 font-bold">Status</span>
              <span className="text-green-600 font-black flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                Active Now
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 font-bold">Member Since</span>
              <span className="text-gray-800 font-black tracking-tight">Jan 2024</span>
            </div>
          </div>
        </div>

        {/* RIGHT CARD - FORM */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-50 p-10">
          <form onSubmit={handleUpdate} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                <div className="relative group">
                  <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent p-4 pl-14 rounded-2xl focus:bg-white focus:border-green-500 outline-none transition-all font-bold text-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                <div className="relative group opacity-60">
                  <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    value={profile.email}
                    disabled
                    className="w-full bg-gray-50 border-2 border-transparent p-4 pl-14 rounded-2xl outline-none font-bold text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
                <div className="relative group">
                  <FaPhoneAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  <input 
                    type="tel" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent p-4 pl-14 rounded-2xl focus:bg-white focus:border-green-500 outline-none transition-all font-bold text-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Role Permission</label>
                <div className="relative group opacity-60">
                  <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    value={profile.role}
                    disabled
                    className="w-full bg-gray-50 border-2 border-transparent p-4 pl-14 rounded-2xl outline-none font-bold text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex items-center justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-400">Security Warning</p>
                <p className="text-xs text-gray-500 mt-1">Changes to email require multi-factor verification.</p>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-gray-900/20 flex items-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : <FaSave />}
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
