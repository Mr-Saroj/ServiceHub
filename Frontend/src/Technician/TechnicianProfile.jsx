// TechnicianProfile.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TechnicianProfile.css";
function TechnicianProfile() {
  const [technicianInfo, setTechnicianInfo] = useState({
    name: "",
    email: "",
    role: "Technician",
    mobileNumber: "",
    profileImage: null,
    isEditing: false,
  });

  const [editedInfo, setEditedInfo] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });

  useEffect(() => {
    // Fetch technician profile information
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setTechnicianInfo(prev => ({
          ...prev,
          name: payload.sub || "Technician Name",
          email: payload.email || "technician@example.com",
          mobileNumber: payload.mobileNumber || "+1234567890",
        }));
        setEditedInfo({
          name: payload.sub || "Technician Name",
          email: payload.email || "technician@example.com",
          mobileNumber: payload.mobileNumber || "+1234567890",
        });
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  const handleEditToggle = () => {
    if (technicianInfo.isEditing) {
      // Save the changes
      setTechnicianInfo({
        ...technicianInfo,
        name: editedInfo.name,
        email: editedInfo.email,
        mobileNumber: editedInfo.mobileNumber,
        isEditing: false,
      });
      // Here you would typically make an API call to update the profile
      // updateProfile(editedInfo);
    } else {
      // Enter edit mode
      setEditedInfo({
        name: technicianInfo.name,
        email: technicianInfo.email,
        mobileNumber: technicianInfo.mobileNumber,
      });
      setTechnicianInfo({
        ...technicianInfo,
        isEditing: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditedInfo({
      name: technicianInfo.name,
      email: technicianInfo.email,
      mobileNumber: technicianInfo.mobileNumber,
    });
    setTechnicianInfo({
      ...technicianInfo,
      isEditing: false,
    });
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTechnicianInfo({
          ...technicianInfo,
          profileImage: event.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="profile-container p-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <div className="profile-image-container mb-3 position-relative">
                {technicianInfo.profileImage ? (
                  <img
                    src={technicianInfo.profileImage}
                    alt="Profile"
                    className="rounded-circle profile-image"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: "150px", height: "150px", fontSize: "3rem" }}
                  >
                    {technicianInfo.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {technicianInfo.isEditing && (
                  <label htmlFor="profileImageUpload" className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2" style={{ cursor: "pointer" }}>
                    <i className="fas fa-camera"></i>
                    <input
                      type="file"
                      id="profileImageUpload"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              <h4 className="mb-1">{technicianInfo.name}</h4>
              <p className="text-muted mb-3">{technicianInfo.role}</p>
              
              <div className="d-flex justify-content-center gap-2 mb-3">
                <button
                  className={`btn ${technicianInfo.isEditing ? "btn-success" : "btn-primary"}`}
                  onClick={handleEditToggle}
                >
                  {technicianInfo.isEditing ? (
                    <>
                      <i className="fas fa-save me-2"></i> Save
                    </>
                  ) : (
                    <>
                      <i className="fas fa-edit me-2"></i> Edit Profile
                    </>
                  )}
                </button>
                {technicianInfo.isEditing && (
                  <button className="btn btn-secondary" onClick={handleCancelEdit}>
                    <i className="fas fa-times me-2"></i> Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-user-circle me-2"></i> Profile Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Full Name</label>
                </div>
                <div className="col-md-8">
                  {technicianInfo.isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={editedInfo.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="form-control-plaintext">{technicianInfo.name}</p>
                  )}
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Email Address</label>
                </div>
                <div className="col-md-8">
                  {technicianInfo.isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={editedInfo.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="form-control-plaintext">{technicianInfo.email}</p>
                  )}
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Mobile Number</label>
                </div>
                <div className="col-md-8">
                  {technicianInfo.isEditing ? (
                    <input
                      type="tel"
                      className="form-control"
                      name="mobileNumber"
                      value={editedInfo.mobileNumber}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="form-control-plaintext">{technicianInfo.mobileNumber}</p>
                  )}
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Role</label>
                </div>
                <div className="col-md-8">
                  <p className="form-control-plaintext">{technicianInfo.role}</p>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Member Since</label>
                </div>
                <div className="col-md-8">
                  <p className="form-control-plaintext">January 1, 2023</p>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Status</label>
                </div>
                <div className="col-md-8">
                  <span className="badge bg-success">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-chart-line me-2"></i> Performance Stats
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4">
                  <div className="stat-item">
                    <h3 className="text-primary">152</h3>
                    <p className="text-muted mb-0">Jobs Completed</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-item">
                    <h3 className="text-success">4.8</h3>
                    <p className="text-muted mb-0">Average Rating</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-item">
                    <h3 className="text-info">98%</h3>
                    <p className="text-muted mb-0">On-time Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-certificate me-2"></i> Certifications
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Certified HVAC Technician
                  </div>
                  <span className="badge bg-primary rounded-pill">2022</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Electrical Repair License
                  </div>
                  <span className="badge bg-primary rounded-pill">2021</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Plumbing Certification
                  </div>
                  <span className="badge bg-primary rounded-pill">2020</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianProfile;