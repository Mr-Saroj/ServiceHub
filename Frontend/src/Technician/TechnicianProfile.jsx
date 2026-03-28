// TechnicianProfile.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TechnicianProfile.css";

function TechnicianProfile({ profile, refreshProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  const [editedInfo, setEditedInfo] = useState({
    name: profile?.name || "",
    mobileNumber: profile?.mobileNumber || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    profile?.profileImageUrl || null
  );

  // ✅ Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle image selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ SAVE PROFILE (API CALL)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", editedInfo.name);
      formData.append("mobileNumber", editedInfo.mobileNumber);

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      alert("✅ Profile Updated Successfully");

      setIsEditing(false);

      // 🔥 Refresh parent data
      refreshProfile();

    } catch (error) {
      console.error(error);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <div className="profile-container p-4">
      <div className="row">
        
        {/* LEFT CARD */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">

              {/* Profile Image */}
              <div className="profile-image-container mb-3 position-relative">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: "150px", height: "150px", fontSize: "3rem" }}
                  >
                    {profile?.name
                      ? profile.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}

                {isEditing && (
                  <label
                    className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-camera"></i>
                    <input
                      type="file"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>

              <h4>{profile?.name || "N/A"}</h4>
              <p className="text-muted">{profile?.role || "N/A"}</p>

              {!isEditing ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="col-md-8">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5>Profile Information</h5>
            </div>

            <div className="card-body">

              {/* Name */}
              <div className="row mb-3">
                <div className="col-md-4 fw-bold">Full Name</div>
                <div className="col-md-8">
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={editedInfo.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profile?.name || "N/A"}</p>
                  )}
                </div>
              </div>

              {/* Email (readonly) */}
              <div className="row mb-3">
                <div className="col-md-4 fw-bold">Email</div>
                <div className="col-md-8">
                  <p>{profile?.email || "N/A"}</p>
                </div>
              </div>

              {/* Mobile */}
              <div className="row mb-3">
                <div className="col-md-4 fw-bold">Mobile</div>
                <div className="col-md-8">
                  {isEditing ? (
                    <input
                      type="tel"
                      className="form-control"
                      name="mobileNumber"
                      value={editedInfo.mobileNumber}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profile?.mobileNumber || "N/A"}</p>
                  )}
                </div>
              </div>

              {/* Role */}
              <div className="row mb-3">
                <div className="col-md-4 fw-bold">Role</div>
                <div className="col-md-8">
                  <p>{profile?.role || "N/A"}</p>
                </div>
              </div>

              {/* Category */}
              <div className="row mb-3">
                <div className="col-md-4 fw-bold">Category</div>
                <div className="col-md-8">
                  <p>{profile?.category || "N/A"}</p>
                </div>
              </div>

              {/* Status */}
              <div className="row">
                <div className="col-md-4 fw-bold">Status</div>
                <div className="col-md-8">
                  <span className="badge bg-success">Active</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TechnicianProfile;