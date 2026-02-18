import React, { useState } from "react";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [location, setLocation] = useState("");
  const [openTrackId, setOpenTrackId] = useState(null);

  // ⭐ Review States
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(
          `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
        );
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  return (
    <div className="dashboard-container">

      {/* Mobile Toggle */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <h2>
            <i className="fas fa-user-circle"></i> My Account
          </h2>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <a
                href="#"
                className={activePage === "dashboard" ? "active" : ""}
                onClick={() => setActivePage("dashboard")}
              >
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </a>
            </li>

            <li>
              <a
                href="#"
                className={activePage === "create" ? "active" : ""}
                onClick={() => setActivePage("create")}
              >
                <i className="fas fa-plus-circle"></i> Create Service Request
              </a>
            </li>

            <li>
              <a
                href="#"
                className={activePage === "reviews" ? "active" : ""}
                onClick={() => setActivePage("reviews")}
              >
                <i className="fas fa-star"></i> Reviews
              </a>
            </li>

            <li>
              <a href="#">
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="header">
          <div className="welcome-section">
            <h1>Welcome back, John!</h1>
            <p>Manage your service requests easily</p>
          </div>

          <div className="user-info">
            <div className="user-avatar">JD</div>
            <div className="user-name">John Doe</div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="card">

            {/* ================= DASHBOARD TABLE ================= */}
            {activePage === "dashboard" && (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>#SR001</td>
                      <td>Plumbing</td>
                      <td>Feb 15, 2026</td>
                      <td>
                        <span className="badge badge-completed">
                          Completed
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-view"
                          onClick={() =>
                            setOpenTrackId(
                              openTrackId === "SR001" ? null : "SR001"
                            )
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>

                    {openTrackId === "SR001" && (
                      <tr>
                        <td colSpan="5">
                          <div className="track-dropdown">
                            <div className="track-step completed">✔ Request Placed</div>
                            <div className="track-step completed">✔ Technician Assigned</div>
                            <div className="track-step completed">✔ Work In Progress</div>
                            <div className="track-step completed">✔ Service Completed</div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* ================= CREATE FORM ================= */}
            {activePage === "create" && (
              <div className="request-form">
                <h3>Create Service Request</h3>

                <div className="form-group">
                  <label>Technician Type Required</label>
                  <select className="form-control">
                    <option>Select Technician</option>
                    <option>Plumber</option>
                    <option>Electrician</option>
                    <option>AC Repair</option>
                    <option>Carpenter</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Upload Damage / Repair Photo</label>
                  <input type="file" className="form-control" />
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

                <button className="btn btn-success">Submit</button>
              </div>
            )}

            {/* ================= REVIEWS PAGE ================= */}
            {activePage === "reviews" && (
              <div className="reviews-section">

                {!selectedService ? (
                  <>
                    <h3>Completed Services</h3>

                    <div className="review-service-card">
                      <h4>Plumbing Service</h4>
                      <p>Technician: Rahul Sharma</p>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          setSelectedService("Plumbing Service")
                        }
                      >
                        Give Review
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="give-review-card">
                    <h3>Review for {selectedService}</h3>

                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`fas fa-star ${
                            star <= (hover || rating) ? "active-star" : ""
                          }`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(0)}
                        ></i>
                      ))}
                    </div>

                    <textarea
                      className="review-textarea"
                      placeholder="Write your experience..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>

                    <div className="review-buttons">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          alert("Review Submitted Successfully!");
                          setSelectedService(null);
                          setRating(0);
                          setReviewText("");
                        }}
                      >
                        Submit Review
                      </button>

                      <button
                        className="btn btn-cancel"
                        onClick={() => setSelectedService(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;
