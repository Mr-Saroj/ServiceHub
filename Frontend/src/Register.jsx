import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("CUSTOMER");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const requestData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: role,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const message = await response.text();

      if (response.ok) {
        alert("Account Created Successfully!");

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
      } else {
        alert(message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error! Please try again.");
    }
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
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
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
                placeholder="Create a password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Role Selection (Highlight Fixed) */}
          <div className="form-group">
            <label>I am a:</label>
            <div className="role-selection">

              <div
                className={`role-option ${
                  role === "CUSTOMER" ? "active" : ""
                }`}
                onClick={() => setRole("CUSTOMER")}
              >
                <input
                  type="radio"
                  name="role"
                  value="CUSTOMER"
                  checked={role === "CUSTOMER"}
                  readOnly
                />
                <label>
                  <i className="fas fa-user"></i>
                  Customer
                </label>
              </div>

              <div
                className={`role-option ${
                  role === "TECHNICIAN" ? "active" : ""
                }`}
                onClick={() => setRole("TECHNICIAN")}
              >
                <input
                  type="radio"
                  name="role"
                  value="TECHNICIAN"
                  checked={role === "TECHNICIAN"}
                  readOnly
                />
                <label>
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