import React, { useState } from "react";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [location, setLocation] = useState("");

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
              <a href="#" className="active">
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setShowForm(true)}>
                <i className="fas fa-plus-circle"></i> Create Service Request
              </a>
            </li>
            
            
            <li><a href="#"><i className="fas fa-credit-card"></i> Payment History</a></li>
            <li><a href="#"><i className="fas fa-star"></i> Reviews</a></li>
            <li><a href="#"><i className="fas fa-user"></i> Profile</a></li>
            <li><a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="header">
          <div className="welcome-section">
            <h1>Welcome back, John!</h1>
            <p>Track and manage your service requests</p>
          </div>

          <div className="user-info">
            <div className="user-avatar">JD</div>
            <div className="user-name">John Doe</div>
            <button
              className="btn btn-sm"
              onClick={() => setShowForm(true)}
            >
              New Request
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="card">
            <div className="card-header">
              <h2>My Service Requests</h2>
              <button
                className="btn btn-success"
                onClick={() => setShowForm(true)}
              >
                Create Request
              </button>
            </div>

            {/* 🔥 SERVICE REQUEST FORM */}
            {showForm && (
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
                    <option>Painter</option>
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

                <div className="form-buttons">
                  <button className="btn btn-success">Submit</button>
                  <button
                    className="btn btn-cancel"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Existing Table */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Technician</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>#SR001</td>
                    <td>Plumbing</td>
                    <td>Feb 15, 2026</td>
                    <td>Mike Johnson</td>
                    <td>
                      <span className="badge badge-completed">
                        Completed
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <a href="#" className="btn btn-sm btn-view">View</a>
                        <a href="#" className="btn btn-sm btn-success">Review</a>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>#SR002</td>
                    <td>Electrical</td>
                    <td>Feb 18, 2026</td>
                    <td>-</td>
                    <td>
                      <span className="badge badge-pending">
                        Pending
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <a href="#" className="btn btn-sm btn-view">View</a>
                        <a href="#" className="btn btn-sm btn-cancel">Cancel</a>
                      </div>
                    </td>
                  </tr>
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;
