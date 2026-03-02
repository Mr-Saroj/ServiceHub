import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {

                alert("Login Successful!");

                // Save user in localStorage
                localStorage.setItem("user", JSON.stringify(data));

                // 🔥 Role Based Redirect
                if (data.role === "CUSTOMER") {
                    navigate("/customerdashboard");
                } else if (data.role === "TECHNICIAN") {
                    navigate("/techniciandashboard");
                }

            } else {
                alert(data);
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Server Error!");
        }
    };

    return (
        <main className="login-main">
            <div className="login-container">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Login to access your ServiceHub account</p>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-group">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-options">
                        <div className="checkbox-group">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password">
                            Forgot password?
                        </a>
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <div className="social-login">
                    <a href="#" className="social-btn">
                        <i className="fab fa-google"></i>
                        Google
                    </a>
                    <a href="#" className="social-btn">
                        <i className="fab fa-facebook-f"></i>
                        Facebook
                    </a>
                </div>

                <div className="register-link">
                    Don't have an account? <Link to="/register">Register now</Link>
                </div>
            </div>
        </main>
    );
}

export default Login;