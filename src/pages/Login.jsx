import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Quick Connect</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
						/>
            {error && <span >{error}</span>}
						<button type="submit">
							Sign In
						</button>
        </form>
        <p>
          You don't have an account? <Link to="/Register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
