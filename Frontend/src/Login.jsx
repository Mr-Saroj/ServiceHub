import "./Login.css";
import { Link } from "react-router-dom";
function Login() {

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Login Successful!");
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
                            />
                        </div>
                    </div>

                    {/* Options */}
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
