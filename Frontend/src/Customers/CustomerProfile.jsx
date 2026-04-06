import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerProfile.css";

function CustomerProfile({ token }) {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    name: "",
    mobileNumber: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await res.json();

      setProfile(data);

      setEditedInfo({
        name: data.name || "",
        mobileNumber: data.mobileNumber || "",
      });

      setPreviewImage(data.profileImageUrl || null);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  // ================= INPUT CHANGE =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= IMAGE UPLOAD =================
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

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    try {
      setIsSaving(true); // ✅ start loading

      const formData = new FormData();
      formData.append("name", editedInfo.name);
      formData.append("mobileNumber", editedInfo.mobileNumber);

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error();

      alert("✅ Profile Updated");
      setIsEditing(false);
      fetchProfile();

    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    } finally {
      setIsSaving(false); // ✅ stop loading
    }
  };
  return (
    <div className="container-fluid profile-page">
      <div className="row">

        {/* LEFT CARD */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm text-center p-4 profile-card">

            {/* IMAGE */}
            <div className="profile-image-container position-relative mb-3">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="rounded-circle profile-img"
                />
              ) : (
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto profile-placeholder">
                  {profile?.name
                    ? profile.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}

              {isEditing && (
                <label className="upload-btn">
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

            <h4>{profile?.name || "User"}</h4>
            <p className="text-muted">Customer</p>

            {!isEditing ? (
              <button
                className="btn btn-primary w-100"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-success"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="col-md-8">
          <div className="card shadow-sm">

            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Profile Information</h5>
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
                    <p>{profile?.name}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="row mb-3">
                <div className="col-md-4 fw-bold">Email</div>
                <div className="col-md-8">
                  <p>{profile?.email}</p>
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
                    <p>{profile?.mobileNumber}</p>
                  )}
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

export default CustomerProfile;