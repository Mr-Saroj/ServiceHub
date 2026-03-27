// TechnicianDashboard.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TechnicianDashboard.css";
import TechnicianHome from "./TechnicianHome";
import AvailableRequests from "./AvailableRequests";
import TechnicianEarnings from "./TechnicianEarnings";
import MyJobs from "./MyJobs";
import TechnicianProfile from "./TechnicianProfile"; // Import the new component

function TechnicianDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [technicianName, setTechnicianName] = useState("");
  const [availableRequests, setAvailableRequests] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    completedJobs: 0,
    jobs: []
  });
  const [totalStats, setTotalStats] = useState({
    totalEarnings: 0,
    completedJobs: 0,
  });

  const handlePageClick = (page) => {
    setActivePage(page);

    const offcanvasElement = document.getElementById("sidebarOffcanvas");
    if (offcanvasElement && window.bootstrap) {
      const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvas) offcanvas.hide();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setTechnicianName(payload.sub);

        fetchAvailableRequests(token);
        fetchMyJobs(token);
        fetchEarnings(token);
        fetchTotalEarnings(token);

      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  //fetch all request of customer 
  const fetchAvailableRequests = async (token) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/technician/requests",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setAvailableRequests(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //fetch only accepted job by technician
  const fetchMyJobs = async (token) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/technician/my-jobs",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("MY JOBS:", data); // ✅ debug
        setMyJobs(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openAcceptModal = (id, date, time) => {
    acceptJob(id, date, time);
  };

  //accept job
  const acceptJob = async (id, date, time) => {
    const token = localStorage.getItem("token");

    if (!id) {
      alert("Request ID missing ❌");
      return;
    }

    if (!date || !time) {
      alert("Please select date & time");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/technician/accept/${id}?date=${date}&time=${time}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        alert("Job Accepted Successfully ✅");
        fetchMyJobs(token);
        fetchAvailableRequests(token);
      } else {
        alert("Failed to accept job ❌");
      }

    } catch (error) {
      console.error(error);
    }
  };

  //Marked as complete 
  // ✅ COMPLETE JOB
  const completeJob = async (jobId) => {
    const token = localStorage.getItem("token");
    const amount = amounts[jobId];

    if (!amount) {
      alert("Enter amount");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/technician/complete/${jobId}?amount=${amount}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        alert("✅ Job Completed");
        fetchMyJobs(token);  // ✅ refresh jobs
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DOWNLOAD INVOICE
  const downloadInvoice = async (jobId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8080/api/technician/invoice/${jobId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${jobId}.pdf`;
    a.click();
  };

  //earning
  const fetchEarnings = async (token) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/technician/earnings",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setEarnings(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //fetch total earning
  const fetchTotalEarnings = async (token) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/technician/earnings/total",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setTotalStats(data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="d-flex flex-column vh-100">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container-fluid px-4">

          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler border-0 d-lg-none me-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebarOffcanvas"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-brand d-flex align-items-center m-0">
              <i className="fas fa-cogs text-primary me-2 fs-4"></i>
              <span className="fw-bold">ServiceHub</span>
            </div>
          </div>

          {/* Profile */}
          <div className="ms-auto">
            <div
              className="dropdown"
              onMouseEnter={() => setProfileDropdown(true)}
              onMouseLeave={() => setProfileDropdown(false)}
            >
              <div
                className="d-flex align-items-center profile-section"
                role="button"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="fas fa-user"></i>
                </div>
                <span className="d-none d-md-inline text-dark">
                  {technicianName || "Technician"}
                </span>
              </div>

              <ul className={`dropdown-menu dropdown-menu-end ${profileDropdown ? "show" : ""}`}>
                <li className="px-3 py-2">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                      style={{ width: "40px", height: "40px" }}
                    >
                      U
                    </div>
                    <div>
                      <div className="fw-bold">
                        {technicianName || "Technician"}
                      </div>
                      <small className="text-muted">Technician</small>
                    </div>
                  </div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger">
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </nav>

      {/* Layout */}
      <div className="d-flex flex-grow-1 overflow-hidden">

        {/* Sidebar Desktop */}
        <div
          className="d-none d-lg-block bg-dark text-white flex-shrink-0"
          style={{ width: "250px" }}
        >
          <div className="p-4">
            <ul className="nav nav-pills flex-column">

              <li className="nav-item">
                <button
                  className={`nav-link text-start w-100 ${activePage === "dashboard" ? "active" : "text-white"}`}
                  onClick={() => handlePageClick("dashboard")}
                >
                  <i className="fas fa-chart-line me-2"></i> Dashboard
                </button>
              </li>

              <li className="nav-item mt-2">
                <button
                  className={`nav-link text-start w-100 ${activePage === "available" ? "active" : "text-white"}`}
                  onClick={() => handlePageClick("available")}
                >
                  <i className="fas fa-clipboard-list me-2"></i> Available Requests
                </button>
              </li>

              <li className="nav-item mt-2">
                <button
                  className={`nav-link text-start w-100 ${activePage === "jobs" ? "active" : "text-white"}`}
                  onClick={() => handlePageClick("jobs")}
                >
                  <i className="fas fa-briefcase me-2"></i> My Jobs
                </button>
              </li>

              <li className="nav-item mt-2">
                <button
                  className={`nav-link text-start w-100 ${activePage === "earnings" ? "active" : "text-white"}`}
                  onClick={() => handlePageClick("earnings")}
                >
                  <i className="fas fa-wallet me-2"></i> Earnings
                </button>
              </li>

              <li className="nav-item mt-2">
                <button
                  className={`nav-link text-start w-100 ${activePage === "profile" ? "active" : "text-white"}`}
                  onClick={() => handlePageClick("profile")}
                >
                  <i className="fas fa-user-circle me-2"></i> Profile
                </button>
              </li>

              <li className="nav-item mt-2">
                <button
                  className={`nav-link text-start w-100 ${activePage === "reviews" ? "active" : "text-white"}`}
                  onClick={() => handlePageClick("reviews")}
                >
                  <i className="fas fa-star me-2"></i> Reviews
                </button>
              </li>

            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 bg-light d-flex flex-column overflow-hidden">
          <div className="p-4 overflow-auto" style={{ height: "100%" }}>
            <div className="card shadow-sm">
              <div className="card-body p-4">

                {activePage === "dashboard" && (
                  <TechnicianHome
                    totalEarnings={totalStats.totalEarnings}
                    completedJobs={totalStats.completedJobs}
                    totalJobs={myJobs.length}
                  />
                )}

                {activePage === "available" && (
                  <AvailableRequests
                    requests={availableRequests}
                    openAcceptModal={openAcceptModal}
                  />
                )}

                {activePage === "jobs" && (
                  <MyJobs
                    jobs={myJobs}   // ✅ correct
                    amounts={amounts}
                    setAmounts={setAmounts}
                    completeJob={completeJob}
                    downloadInvoice={downloadInvoice}
                  />
                )}

                {activePage === "earnings" && (
                  <TechnicianEarnings
                    earnings={earnings}
                    downloadInvoice={downloadInvoice}
                  />
                )}

                {activePage === "profile" && (
                  <TechnicianProfile />
                )}

              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Sidebar */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        id="sidebarOffcanvas"
        style={{ width: "100%" }}
      >
        <div className="offcanvas-header">
          <h5>ServiceHub</h5>
          <button className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <ul className="nav nav-pills flex-column">

            {/* Dashboard */}
            <li className="nav-item">
              <button
                className={`nav-link w-100 ${activePage === "dashboard" ? "active" : "text-white"
                  }`}
                onClick={() => handlePageClick("dashboard")}
              >
                <i className="fas fa-tachometer-alt me-2"></i> Dashboard
              </button>
            </li>

            {/* Available Requests */}
            <li className="nav-item mt-2">
              <button
                className={`nav-link w-100 ${activePage === "available" ? "active" : "text-white"
                  }`}
                onClick={() => handlePageClick("available")}
              >
                <i className="fas fa-clipboard-list me-2"></i> Available Requests
              </button>
            </li>

            {/* My Jobs */}
            <li className="nav-item mt-2">
              <button
                className={`nav-link w-100 ${activePage === "jobs" ? "active" : "text-white"
                  }`}
                onClick={() => handlePageClick("jobs")}
              >
                <i className="fas fa-briefcase me-2"></i> My Jobs
              </button>
            </li>

            {/* Earnings */}
            <li className="nav-item mt-2">
              <button
                className={`nav-link w-100 ${activePage === "earnings" ? "active" : "text-white"
                  }`}
                onClick={() => handlePageClick("earnings")}
              >
                <i className="fas fa-rupee-sign me-2"></i> Earnings
              </button>
            </li>

            {/* Profile */}
            <li className="nav-item mt-2">
              <button
                className={`nav-link w-100 ${activePage === "profile" ? "active" : "text-white"
                  }`}
                onClick={() => handlePageClick("profile")}
              >
                <i className="fas fa-user-circle me-2"></i> Profile
              </button>
            </li>

            {/* Reviews */}
            <li className="nav-item mt-2">
              <button
                className={`nav-link w-100 ${activePage === "reviews" ? "active" : "text-white"
                  }`}
                onClick={() => handlePageClick("reviews")}
              >
                <i className="fas fa-star me-2"></i> Reviews
              </button>
            </li>

          </ul>
        </div>
      </div>

    </div>
  );
}

export default TechnicianDashboard;