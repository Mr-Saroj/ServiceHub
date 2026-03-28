import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form } from "react-bootstrap";

function CreateServiceRequest({ refreshRequests, setActivePage, token }) {

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [damagePhoto, setDamagePhoto] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setLatitude(lat);
      setLongitude(lng);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        setLocation(data.display_name || `${lat}, ${lng}`);
      } catch {
        setLocation(`${lat}, ${lng}`);
      }
    });
  };

  const handleSubmitRequest = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("problemDescription", problemDescription);
    formData.append("locationAddress", location);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("mobileNumber", mobileNumber);
    formData.append("damagePhoto", damagePhoto);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/requests`,
        {
          method: "POST",
          headers: { Authorization: "Bearer " + token },
          body: formData,
        }
      );

      if (res.ok) {
        setActivePage("dashboard");
        refreshRequests();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">

          <div className="card-header bg-white border-0 py-3">
            <h4 className="fw-bold text-primary mb-0">
              <i className="bi bi-tools me-2"></i>
              Create Service Request
            </h4>
          </div>

          <Form noValidate validated={validated} onSubmit={handleSubmitRequest}>

            {/* CATEGORY */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Technician Type *
              </label>

              <select
                className={`form-select form-select-lg ${!categoryId && validated ? "is-invalid" : ""}`}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Select Technician</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* PROBLEM */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Problem Description *
              </label>

              <textarea
                className={`form-control ${!problemDescription && validated ? "is-invalid" : ""}`}
                rows="4"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                required
              />
            </div>

            {/* ROW */}
            <div className="row g-3 mb-4">

              {/* MOBILE */}
              <div className="col-md-5">
                <label className="form-label fw-semibold">Mobile Number *</label>

                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-telephone"></i>
                  </span>

                  <input
                    type="tel"
                    className={`form-control ${!mobileNumber && validated ? "is-invalid" : ""}`}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    style={{ paddingLeft: "10px" }}   // ✅ spacing fix
                    required
                  />
                </div>
              </div>

              {/* PHOTO */}
              <div className="col-md-7">
                <label className="form-label fw-semibold">Upload Photo *</label>

                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-image"></i>
                  </span>

                  <input
                    type="file"
                    className={`form-control ${!damagePhoto && validated ? "is-invalid" : ""}`}
                    onChange={(e) => setDamagePhoto(e.target.files[0])}
                    required
                  />
                </div>
              </div>

            </div>

            {/* LOCATION */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Location *</label>

              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-geo-alt"></i>
                </span>

                <input
                  type="text"
                  className={`form-control ${!location && validated ? "is-invalid" : ""}`}
                  value={location}
                  readOnly
                />

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleLocation}
                >
                  Share
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="d-flex justify-content-end gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => setActivePage("dashboard")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success px-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateServiceRequest;