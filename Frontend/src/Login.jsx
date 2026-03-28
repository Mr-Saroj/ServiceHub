import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

    // ✅ Custom Styled Alert
    const CustomAlert = Swal.mixin({
        background: "#ffffff",
        color: "#333",
        confirmButtonColor: "#4A90E2",
        customClass: {
            popup: "swal-popup",
            title: "swal-title",
            confirmButton: "swal-confirm-btn"
        },
        buttonsStyling: false
    });

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorText = await response.text();

            CustomAlert.fire({
                icon: "error",
                title: "Login Failed",
                text: errorText
            });

            return;
        }

        let token = await response.text();

        // Remove Bearer if backend sends it
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        localStorage.setItem("token", token);

        CustomAlert.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Welcome back to ServiceHub",
            timer: 1500,
            showConfirmButton: false
        });

        const payload = JSON.parse(atob(token.split(".")[1]));

        if (payload.role === "CUSTOMER") {
            navigate("/customerdashboard");
        } else if (payload.role === "TECHNICIAN") {
            navigate("/techniciandashboard");
        }

    } catch (error) {
        console.error("Error:", error);

        CustomAlert.fire({
            icon: "error",
            title: "Server Error",
            text: "Something went wrong. Please try again."
        });
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