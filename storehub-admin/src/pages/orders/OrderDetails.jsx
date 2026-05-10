import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import API from "../../api/axios";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const res = await API.get(`/admin/orders/${id}`);
      setOrder(res.data.data);
    } catch (err) {
      console.warn("API failed, using dummy order details data");
      setOrder({
        id: id || "1001",
        user_name: "John Doe",
        email: "john@example.com",
        address_line: "123 Main Street, Apt 4B",
        city: "Mumbai",
        pincode: "400001",
        status: "processing",
        total_amount: 1450,
        created_at: new Date().toISOString(),
        items: [
          { id: 1, name: "Fresh Bananas", price: 60, quantity: 2, image: "https://images.unsplash.com/photo-1571501474524-18151df95213?w=200" },
          { id: 2, name: "Organic Tomatoes", price: 80, quantity: 1, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200" }
        ]
      });
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => window.history.back()}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors"
        >
          <span className="font-bold text-xl leading-none">&larr;</span>
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-gray-800">Order #{order.id}</h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold border capitalize bg-blue-100 text-blue-700 border-blue-200">
              {order.status}
            </span>
          </div>
          <p className="text-gray-500 mt-1">
            Placed on {new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Items & Summary */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ITEMS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 pb-4 border-b border-gray-100">
              Order Items
            </h2>

            <div className="space-y-4">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-1">
                      <img src={item.image || 'https://placehold.co/50x50?text=No+Image'} alt={item.name} className="w-full h-full object-contain rounded" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-sm font-medium text-gray-500">₹{item.price} × {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-800">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-500 uppercase tracking-widest text-sm">
                Total Amount
              </h2>
              <h2 className="font-black text-green-600 text-3xl">
                ₹{order.total_amount}
              </h2>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Customer Details */}
        <div className="space-y-6">
          
          {/* CUSTOMER */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              Customer Details
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                {order.user_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-800">{order.user_name}</p>
                <p className="text-sm text-gray-500">{order.email}</p>
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              Shipping Address
            </h2>
            <div className="text-gray-700 font-medium leading-relaxed bg-gray-50 p-4 rounded-xl">
              <p>{order.user_name}</p>
              <p>{order.address_line}</p>
              <p>{order.city}, {order.pincode}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;