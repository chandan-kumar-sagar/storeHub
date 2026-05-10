import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Address = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    line1: "",
    city: "",
    pincode: "",
  });
  const [locating, setLocating] = useState(false);

  const handleContinue = () => {
    if (!address.line1 || !address.city || !address.pincode) {
      alert("Please fill in all address fields");
      return;
    }
    localStorage.setItem("address", JSON.stringify(address));
    navigate("/checkout");
  };

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Using OpenStreetMap Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data.address) {
            const addr = data.address;
            setAddress({
              line1: `${addr.road || ""} ${addr.suburb || ""} ${addr.neighbourhood || ""}`.trim() || data.display_name.split(",")[0],
              city: addr.city || addr.town || addr.village || addr.state_district || "",
              pincode: addr.postcode || "",
            });
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Failed to get address details. Please enter manually.");
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Permission denied or location unavailable.");
        setLocating(false);
      }
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-xl mx-auto p-6 md:p-10 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Delivery Address</h2>
            <button 
              onClick={fetchCurrentLocation}
              disabled={locating}
              className="text-green-600 text-sm font-bold flex items-center gap-1 hover:underline disabled:opacity-50"
            >
              {locating ? "Locating..." : "📍 Use My Location"}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line</label>
              <input
                value={address.line1}
                placeholder="Apartment, Street, Area"
                className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none p-3 rounded-xl transition-all"
                onChange={(e) =>
                  setAddress({ ...address, line1: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  value={address.city}
                  placeholder="Your City"
                  className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none p-3 rounded-xl transition-all"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                <input
                  value={address.pincode}
                  placeholder="110001"
                  className="w-full border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none p-3 rounded-xl transition-all"
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-100 transition-all mt-6"
            >
              Continue to Checkout
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Address;
