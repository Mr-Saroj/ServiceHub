import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("CUSTOMER");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Same styled alert used in Login page
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
      CustomAlert.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields!"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      CustomAlert.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!"
      });
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

        CustomAlert.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your ServiceHub account was created successfully.",
          timer: 1800,
          showConfirmButton: false
        });

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1800);

      } else {

        CustomAlert.fire({
          icon: "error",
          title: "Registration Failed",
          text: message || "Registration failed!"
        });

      }

    } catch (error) {
      console.error("Error:", error);

      CustomAlert.fire({
        icon: "error",
        title: "Server Error",
        text: "Server error! Please try again later."
      });
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

          {/* Role Selection */}
          <div className="form-group">
            <label>I am a:</label>
            <div className="role-selection">

              <div
                className={`role-option ${role === "CUSTOMER" ? "active" : ""}`}
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
                className={`role-option ${role === "TECHNICIAN" ? "active" : ""}`}
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