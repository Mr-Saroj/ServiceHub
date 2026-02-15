import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
function Register() {
  const [role, setRole] = useState("customer");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account Created Successfully!");
  };

  return (
    <main className="register-main">
      <div className="register-container">
        <div className="register-header">
          <h2>Create Account</h2>
          <p>Join ServiceHub to book or provide services</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="confirm-password"
                className="form-control"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="form-group">
            <label>I am a:</label>
            <div className="role-selection">
              <div className="role-option">
                <input
                  type="radio"
                  id="customer"
                  name="role"
                  value="customer"
                  checked={role === "customer"}
                  onChange={() => setRole("customer")}
                />
                <label htmlFor="customer">
                  <i className="fas fa-user"></i>
                  Customer
                </label>
              </div>

              <div className="role-option">
                <input
                  type="radio"
                  id="technician"
                  name="role"
                  value="technician"
                  checked={role === "technician"}
                  onChange={() => setRole("technician")}
                />
                <label htmlFor="technician">
                  <i className="fas fa-tools"></i>
                  Technician
                </label>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="checkbox-group">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>

          {/* Updated Button Class */}
          <button type="submit" className="register-btn">
            Create Account
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

        <div className="login-link">
          Already have an account? <Link to="/login">Login now</Link>
        </div>
      </div>
    </main>
  );
}

export default Register;
