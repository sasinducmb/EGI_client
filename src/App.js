import { Routes, Route } from "react-router-dom";

import axios from "axios";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider } from "./auth/userContext";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="container">
      <UserProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
