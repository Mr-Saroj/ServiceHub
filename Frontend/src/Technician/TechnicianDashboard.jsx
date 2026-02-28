import React, { useState } from "react";
import "./TechnicianDashboard.css";

function TechnicianDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const [availableRequests, setAvailableRequests] = useState([
    {
      id: 1,
      customer: "John Smith",
      service: "Plumbing Repair",
      location: "Downtown",
      date: "20 Feb 2026",
      price: 120,
      status: "Pending",
    },
    {
      id: 2,
      customer: "Sarah Lee",
      service: "Bathroom Installation",
      location: "Green Park",
      date: "22 Feb 2026",
      price: 300,
      status: "Pending",
    },
  ]);

  const [myJobs, setMyJobs] = useState([]);

  const [reviews] = useState([
    {
      id: 1,
      customer: "David Miller",
      rating: 5,
      comment: "Excellent work! Very professional.",
    },
    {
      id: 2,
      customer: "Emma Watson",
      rating: 4,
      comment: "Good service and on time.",
    },
  ]);

  /* ================= ACCEPT JOB ================= */
  const acceptJob = (job) => {
    const updatedJob = { ...job, status: "In Progress" };
    setMyJobs([...myJobs, updatedJob]);
    setAvailableRequests(
      availableRequests.filter((req) => req.id !== job.id)
    );
  };

  /* ================= COMPLETE JOB ================= */
  const completeJob = (id) => {
    const updatedJobs = myJobs.map((job) =>
      job.id === id ? { ...job, status: "Completed" } : job
    );
    setMyJobs(updatedJobs);
  };

  /* ================= CALCULATE EARNINGS ================= */
  const totalCompletedJobs = myJobs.filter(
    (job) => job.status === "Completed"
  );

  const totalEarnings = totalCompletedJobs.reduce(
    (acc, job) => acc + job.price,
    0
  );

  const completionRate =
    myJobs.length === 0
      ? 0
      : Math.round((totalCompletedJobs.length / myJobs.length) * 100);

  return (
    <div className="dashboard-container">
      {/* ================= SIDEBAR ================= */}
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

            <li
              className={activePage === "myjobs" ? "active" : ""}
              onClick={() => setActivePage("myjobs")}
            >
              <i className="fas fa-tasks"></i> My Jobs
            </li>

            <li
              className={activePage === "earnings" ? "active" : ""}
              onClick={() => setActivePage("earnings")}
            >
              <i className="fas fa-dollar-sign"></i> Earnings
            </li>

            <li
              className={activePage === "reviews" ? "active" : ""}
              onClick={() => setActivePage("reviews")}
            >
              <i className="fas fa-star"></i> Reviews
            </li>
          </ul>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
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
                    <h3>Total Earnings</h3>
                    <p>${totalEarnings}</p>
                  </div>
                  <div className="earning-item">
                    <h3>Total Jobs</h3>
                    <p>{myJobs.length}</p>
                  </div>
                  <div className="earning-item">
                    <h3>Completion Rate</h3>
                    <p>{completionRate}%</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================= AVAILABLE REQUESTS ================= */}
        {activePage === "available" && (
          <div className="available-wrapper">
            <div className="available-header">
              <h2>Available Service Requests</h2>
              <p>New job opportunities waiting for you</p>
            </div>

            <div className="request-grid">
              {availableRequests.length === 0 ? (
                <p>No available requests.</p>
              ) : (
                availableRequests.map((request) => (
                  <div key={request.id} className="request-card-modern">
                    <div className="request-top">
                      <div className="service-icon">
                        <i className="fas fa-tools"></i>
                      </div>
                      <div>
                        <h3>{request.service}</h3>
                        <span className="price-badge">
                          ${request.price}
                        </span>
                      </div>
                    </div>

                    <div className="request-info">
                      <p>
                        <i className="fas fa-user"></i> {request.customer}
                      </p>
                      <p>
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {request.location}
                      </p>
                      <p>
                        <i className="fas fa-calendar-alt"></i>{" "}
                        {request.date}
                      </p>
                    </div>

                    <div className="request-actions-modern">
                      <button
                        className="btn-accept"
                        onClick={() => acceptJob(request)}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= MY JOBS ================= */}
        {activePage === "myjobs" && (
          <div className="available-wrapper">
            <div className="available-header">
              <h2>My Jobs</h2>
            </div>

            <div className="request-grid">
              {myJobs.length === 0 ? (
                <p>No jobs accepted yet.</p>
              ) : (
                myJobs.map((job) => (
                  <div key={job.id} className="request-card-modern">
                    <h3>{job.service}</h3>
                    <p>Customer: {job.customer}</p>
                    <p>Status: {job.status}</p>
                    <p>Price: ${job.price}</p>

                    {job.status === "In Progress" && (
                      <button
                        className="btn-accept"
                        onClick={() => completeJob(job.id)}
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= EARNINGS ================= */}
        {activePage === "earnings" && (
          <div className="available-wrapper">
            <div className="available-header">
              <h2>Earnings Overview</h2>
            </div>

            <div className="card">
              <h3>Total Completed Jobs</h3>
              <p>{totalCompletedJobs.length}</p>

              <h3 style={{ marginTop: "15px" }}>Total Earnings</h3>
              <p style={{ fontSize: "22px", color: "green" }}>
                ${totalEarnings}
              </p>
            </div>
          </div>
        )}

        {/* ================= REVIEWS ================= */}
        {activePage === "reviews" && (
          <div className="available-wrapper">
            <div className="available-header">
              <h2>Customer Reviews</h2>
            </div>

            <div className="request-grid">
              {reviews.map((review) => (
                <div key={review.id} className="request-card-modern">
                  <h3>{review.customer}</h3>
                  <p>⭐ {review.rating} / 5</p>
                  <p>"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default TechnicianDashboard;