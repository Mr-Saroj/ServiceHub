import React, { useState } from "react";
import "./TechnicianDashboard.css";

function TechnicianDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const availableRequests = [
    {
      id: 1,
      customer: "John Smith",
      service: "Plumbing Repair",
      location: "Downtown",
      date: "20 Feb 2026",
      price: "$120",
    },
    {
      id: 2,
      customer: "Sarah Lee",
      service: "Bathroom Installation",
      location: "Green Park",
      date: "22 Feb 2026",
      price: "$300",
    },
  ];

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>
            <i className="fas fa-hard-hat"></i> TechHub
          </h2>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li
              className={activePage === "dashboard" ? "active" : ""}
              onClick={() => setActivePage("dashboard")}
            >
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </li>

            <li
              className={activePage === "available" ? "active" : ""}
              onClick={() => setActivePage("available")}
            >
              <i className="fas fa-briefcase"></i> Available Requests
            </li>

            <li>
              <i className="fas fa-tasks"></i> My Jobs
            </li>

            <li>
              <i className="fas fa-dollar-sign"></i> Earnings
            </li>

            <li>
              <i className="fas fa-star"></i> Reviews
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* ================= DASHBOARD ================= */}
        {activePage === "dashboard" && (
          <>
            <div className="header">
              <h1>Welcome back, Mike!</h1>
              <p>Manage your profile and track your earnings</p>
            </div>

            <div className="dashboard-content">

              <div className="card">
                <div className="card-header">
                  <h2>Profile</h2>
                </div>

                <div className="profile-card">
                  <div className="profile-avatar">MJ</div>
                  <div className="profile-info">
                    <h3>Mike Johnson</h3>
                    <p>Plumbing Specialist</p>
                    <div className="profile-rating">
                      ⭐⭐⭐⭐☆ (4.7)
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2>Earnings Summary</h2>
                </div>

                <div className="earnings-summary">
                  <div className="earning-item">
                    <h3>This Month</h3>
                    <p>$2,450</p>
                  </div>
                  <div className="earning-item">
                    <h3>Total Jobs</h3>
                    <p>18</p>
                  </div>
                  <div className="earning-item">
                    <h3>Completion Rate</h3>
                    <p>94%</p>
                  </div>
                </div>
              </div>

            </div>
          </>
        )}

        {/* ================= AVAILABLE REQUESTS ================= */}
        {activePage === "available" && (
          <div className="dashboard-content">
            <div className="card">
              <div className="card-header">
                <h2>Available Service Requests</h2>
              </div>

              <div className="request-grid">
                {availableRequests.map((request) => (
                  <div key={request.id} className="request-card">
                    <h3>{request.service}</h3>
                    <p><strong>Customer:</strong> {request.customer}</p>
                    <p><strong>Location:</strong> {request.location}</p>
                    <p><strong>Date:</strong> {request.date}</p>
                    <p><strong>Budget:</strong> {request.price}</p>

                    <div className="request-actions">
                      <button className="accept-btn">
                        Accept
                      </button>
                      <button className="reject-btn">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default TechnicianDashboard;
