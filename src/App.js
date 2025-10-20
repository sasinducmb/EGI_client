import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Wishlist from "./views/Wishlist";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider } from "./auth/userContext";
import About from "./views/About";
import Contact from "./views/Contact";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import Account from "./views/Account";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import { ProtectedRoute } from "./auth/protectRouter";
import Orders from "./views/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./views/Verify";
import PayementSuccess from "./views/PayementSuccess";
import Fedback from "./views/Fedback";
import Terms from "./views/Terms";
import Policy from "./views/Policy";
import Refund from "./views/Refund";
import Paycansel from "./views/Paycansel";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Header />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/productDetails/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/policy" element={<Policy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refund" element={<Refund />} />

              <Route path="/user/:id/verify/:token" element={<Verify />} />
              <Route path="/cancel" element={<Paycansel />} />
              <Route path="/success" element={<PayementSuccess />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/feedback/:id/:productName"
                element={
                  <ProtectedRoute>
                    <Fedback />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;