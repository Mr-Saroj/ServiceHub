import React, { useState, useEffect } from "react";
import "./CustomerDashboard.css";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [location, setLocation] = useState("");
  const [openTrackId, setOpenTrackId] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [userName, setUserName] = useState("");

  // ✅ STATES
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [damagePhoto, setDamagePhoto] = useState(null); // ✅ NEW

  // ===============================
  // 🔐 CHECK LOGIN
  // ===============================

  const fetchProfile = async (token) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/customer/profile",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.fullName) {
          setUserName(data.fullName);
        }
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role !== "CUSTOMER") {
        navigate("/login");
        return;
      }

      setUserName(payload.sub);
      fetchProfile(token);

    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // ===============================
  // 📦 FETCH CATEGORIES
  // ===============================

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Category fetch error:", err));
  }, []);

  // ===============================
  // 📍 LOCATION
  // ===============================

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        setLocation(
          `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
        );
      });
    }
  };

  // ===============================
  // 📨 SUBMIT REQUEST (UPDATED)
  // ===============================

  const handleSubmitRequest = async () => {

    const token = localStorage.getItem("token");

    if (!categoryId || !problemDescription || !location || !damagePhoto) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();

    formData.append("categoryId", categoryId);
    formData.append("problemDescription", problemDescription);
    formData.append("locationAddress", location);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("damagePhoto", damagePhoto); // ✅ FILE

    try {
      const response = await fetch(
        "http://localhost:8080/api/customer/requests",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Service Request Submitted Successfully!");

        setCategoryId("");
        setProblemDescription("");
        setLocation("");
        setLatitude("");
        setLongitude("");
        setDamagePhoto(null);
        setActivePage("dashboard");

      } else {
        alert("Failed to submit request");
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      <button
        className="mobile-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <h2>
            <i className="fas fa-user-circle"></i> My Account
          </h2>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li
              className={activePage === "dashboard" ? "active" : ""}
              onClick={() => setActivePage("dashboard")}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </li>

            <li
              className={activePage === "create" ? "active" : ""}
              onClick={() => setActivePage("create")}
            >
              <i className="fas fa-plus-circle"></i>
              <span>Create Service Request</span>
            </li>

            <li onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </aside>

      <main className="main-content">
        <div className="header">
          <div className="welcome-section">
            <h1>Welcome back, {userName}!</h1>
            <p>Manage your service requests easily</p>
          </div>

          <div className="user-info">
            <div className="user-avatar">
              {userName ? userName.charAt(0).toUpperCase() : ""}
            </div>
            <div className="user-name">{userName}</div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="card">

            {activePage === "create" && (
              <div className="request-form">
                <h3>Create Service Request</h3>

                <div className="form-group">
                  <label>Technician Type Required</label>
                  <select
                    className="form-control"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Select Technician</option>
                    {categories.map((cat) => (
                      <option key={cat.categoryId} value={cat.categoryId}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Problem Description</label>
                  <textarea
                    className="form-control"
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* ✅ FILE INPUT ADDED */}
                <div className="form-group">
                  <label>Upload Damage Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setDamagePhoto(e.target.files[0])}
                  />
                </div>

                <div className="form-group">
                  <label>Current Location</label>
                  <div className="location-box">
                    <input
                      type="text"
                      value={location}
                      readOnly
                      placeholder="Click share location"
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={handleLocation}
                    >
                      Share Location
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-success"
                  onClick={handleSubmitRequest}
                >
                  Submit
                </button>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;