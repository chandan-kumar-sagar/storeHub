import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import Cart from './pages/user/Cart';
import Address from './pages/user/Address';
import OrderDetails from './pages/user/OrderDetails';
import Orders from './pages/user/Orders';
import ProductDetails from './pages/user/ProductDetails';
import Checkout from './pages/user/Checkout';
import CategoryProducts from './pages/user/CategoryProducts';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/category/:name" element={<CategoryProducts />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
