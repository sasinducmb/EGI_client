import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import DefaultLayout from "./components/DefaultLayout";
import Navbar from "./components/Navbar";

axios.defaults.baseURL="http://localhost:5000";
axios.defaults.withCredentials=true;

function App() {
	const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="container">
            <Navbar/>
			<Routes>
				<Route
					exact
					path="/"
					element={<Home/>}
                    />
				<Route
					exact
					path="/Login"
					element={<Login />}
                    />
				<Route
					path="/signup"
					element={<Signup />}
                    />
			</Routes>
     
		</div>
	);
}

export default App;