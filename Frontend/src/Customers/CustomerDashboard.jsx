// CustomerDashboard.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerDashboard.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import CreateServiceRequest from "./CreateServiceRequest";
import CustomerProfile from "./CustomerProfile";
import CustomerPaidHistory from "./CustomerPaidHistory";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [userName, setUserName] = useState("");
  const [requests, setRequests] = useState([]);
  const [token, setToken] = useState("");
  const [profileDropdown, setProfileDropdown] = useState(false);

  // ================= FETCH CUSTOMER PROFILE =================
  const fetchProfile = async (token) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/profile`,
        { headers: { Authorization: "Bearer " + token } }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.fullName) setUserName(data.fullName);
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  // ================= FETCH CUSTOMER SERVICE REQUESTS =================
  const fetchRequests = async (token) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/requests/my`,
        { headers: { Authorization: "Bearer " + token } }
      );

      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Request fetch error:", error);
    }
  };

  // ================= HANDLE PAYMENT =================
  const handlePayment = async (requestId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/requests/pay/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        alert("Payment confirmed!");
        fetchRequests(token); // Refresh requests
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // ================= INITIALIZATION =================
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

      setToken(token);
      setUserName(payload.sub);
      fetchProfile(token);
      fetchRequests(token);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const refreshRequests = () => {
    if (token) fetchRequests(token);
  };

  const handlePageClick = (page) => {
    setActivePage(page);
    // Close offcanvas on mobile after selection
    const offcanvasElement = document.getElementById("sidebarOffcanvas");
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvas) offcanvas.hide();
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler border-0 d-lg-none me-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebarOffcanvas"
              aria-controls="sidebarOffcanvas"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-brand d-flex align-items-center m-0">
              <i className="fas fa-cogs text-primary me-2 fs-4"></i>
              <span className="fw-bold">ServiceHub</span>
            </div>
          </div>

          <div className="ms-auto">
            <div
              className="dropdown"
              onMouseEnter={() => setProfileDropdown(true)}
              onMouseLeave={() => setProfileDropdown(false)}
            >
              <div
                className="d-flex align-items-center profile-section"
                role="button"
                id="profileDropdown"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="fas fa-user"></i>
                </div>
                <span className="d-none d-md-inline text-dark">{userName}</span>
              </div>
              <ul
                className={`dropdown-menu dropdown-menu-end ${profileDropdown ? "show" : ""
                  }`}
                aria-labelledby="profileDropdown"
              >
                <li className="px-3 py-2">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                      style={{ width: "40px", height: "40px" }}
                    >
                      {userName ? userName.charAt(0).toUpperCase() : ""}
                    </div>
                    <div>
                      <div className="fw-bold">{userName}</div>
                      <small className="text-muted">Customer</small>
                    </div>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar Desktop */}
        <div
          className="d-none d-lg-block bg-dark text-white flex-shrink-0"
          style={{ width: "250px", minWidth: "250px", maxWidth: "250px" }}
        >
          <div className="p-4 h-100">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 ${activePage === "dashboard" ? "active" : "text-white"
                    }`}
                  onClick={() => handlePageClick("dashboard")}
                >
                  <i className="fas fa-tachometer-alt me-2"></i> Dashboard
                </button>
              </li>
              <li className="nav-item mt-2">
                <button
                  className={`nav-link text-start w-100 ${activePage === "create" ? "active" : "text-white"
                    }`}
                  onClick={() => handlePageClick("create")}
                >
                  <i className="fas fa-plus-circle me-2"></i> Create Service Request
                </button>
              </li>
              <li className="nav-item mt-2">
                <button
                  className={`nav-link text-start w-100 ${activePage === "paidHistory" ? "active" : "text-white"
                    }`}
                  onClick={() => handlePageClick("paidHistory")}
                >
                  <i className="fas fa-money-bill-wave me-2"></i>History
                </button>
              </li>
              <li className="nav-item mt-2">
                <button
                  className={`nav-link text-start w-100 ${activePage === "profile" ? "active" : "text-white"
                    }`}
                  onClick={() => handlePageClick("profile")}
                >
                  <i className="fas fa-user me-2"></i> Profile
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow-1 bg-light overflow-hidden">
          <div className="main-content-scroll">
            <div className="p-4">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  {activePage === "dashboard" && (
                    <div className="fade-in">
                      <Dashboard
                        requests={requests}
                        refreshRequests={refreshRequests}
                        token={token}
                        onPay={handlePayment} // ✅ Pass payment handler
                      />
                    </div>
                  )}

                  {activePage === "create" && (
                    <div className="fade-in">
                      <CreateServiceRequest
                        refreshRequests={refreshRequests}
                        setActivePage={setActivePage}
                        token={token}
                      />
                    </div>
                  )}

                  {activePage === "profile" && (
                    <CustomerProfile token={token} />
                  )}

                  {/* ✅ ADDED THIS BLOCK TO SHOW PAID HISTORY ✅ */}
                  {activePage === "paidHistory" && (
                    <div className="fade-in">
                      <CustomerPaidHistory token={token} />
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
        style={{ width: "100%" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">
            ServiceHub
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <button
                className={`nav-link text-start w-100 ${activePage === "dashboard" ? "active" : "text-white"
                  }`}
                onClick={() => handlePageClick("dashboard")}
              >
                <i className="fas fa-tachometer-alt me-2"></i> Dashboard
              </button>
            </li>
            <li className="nav-item mt-2">
              <button
                className={`nav-link text-start w-100 ${activePage === "create" ? "active" : "text-white"
                  }`}
                onClick={() => handlePageClick("create")}
              >
                <i className="fas fa-plus-circle me-2"></i> Create Service Request
              </button>
            </li>
            <li className="nav-item mt-2">
              <button
                className={`nav-link text-start w-100 ${activePage === "paidHistory" ? "active" : "text-white"
                  }`}
                onClick={() => handlePageClick("paidHistory")}
              >
                <i className="fas fa-money-bill-wave me-2"></i>History
              </button>
            </li>
            <li className="nav-item mt-2">
              <button
                className={`nav-link text-start w-100 ${activePage === "profile" ? "active" : "text-white"
                  }`}
                onClick={() => handlePageClick("profile")}
              >
                <i className="fas fa-user me-2"></i> Profile
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;