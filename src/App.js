import { Routes, Route } from "react-router-dom";

import axios from "axios";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Wishlist from "./views/Wishlist";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider } from "./auth/userContext";
import About from "./views/About";
import Contact from "./views/Contact";
import { WishlistProvider } from "./context/WishlistContext";
import Account from "./views/Account";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <UserProvider>
        <WishlistProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/product-details" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </WishlistProvider>
      </UserProvider>
    </div>
  );
}

export default App;
