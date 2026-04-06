import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faReceipt,
  faHashtag,
  faCalendar,
  faMoneyBillWave,
  faTools,
  faUser
} from "@fortawesome/free-solid-svg-icons";

function CustomerPaidHistory({ token }) {
  const [paidRequests, setPaidRequests] = useState([]);

  // ================= STATUS COLOR =================
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return "success";
      case "IN_PROGRESS":
      case "ASSIGNED":
        return "primary";
      case "PENDING":
        return "warning";
      case "CANCELLED":
        return "danger";
      default:
        return "secondary";
    }
  };

  // ================= FETCH DATA =================
  const fetchPaidRequests = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/requests/paid`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setPaidRequests(data); // ✅ NO random rating
      } else {
        console.error("Failed to fetch paid requests");
      }
    } catch (error) {
      console.error("Error fetching paid requests:", error);
    }
  };

  useEffect(() => {
    if (token) fetchPaidRequests();
  }, [token]);

  // ================= HANDLE RATING =================
  const handleRating = async (requestId, value) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/requests/rate/${requestId}?rating=${value}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        fetchPaidRequests(); // 🔄 refresh UI
      } else {
        console.error("Failed to rate");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= STAR UI =================
  const renderStars = (rating = 0, requestId) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          onClick={() => handleRating(requestId, i)}
          className={i <= rating ? "text-warning" : "text-muted"}
          style={{ cursor: "pointer", marginRight: "3px" }}
        />
      );
    }

    return (
      <div className="d-flex align-items-center">
        {stars}
        <span className="ms-2 text-muted">({rating})</span>
      </div>
    );
  };

  // ================= UI =================
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 fw-bold">Paid Service Requests</h3>
        <span className="badge bg-secondary rounded-pill px-3 py-2">
          {paidRequests.length}{" "}
          {paidRequests.length === 1 ? "Request" : "Requests"}
        </span>
      </div>

      {paidRequests.length === 0 ? (
        <div className="text-center mt-5 py-5">
          <FontAwesomeIcon
            icon={faReceipt}
            className="fa-4x text-muted mb-3"
          />
          <h5 className="text-muted">
            You have no paid service requests.
          </h5>
        </div>
      ) : (
        <div className="row g-4">
          {paidRequests.map((req) => (
            <div key={req.requestId} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 overflow-hidden card-hover">

                {/* IMAGE */}
                <div className="position-relative">
                  <img
                    src={
                      req.damagePhotoUrl ||
                      "https://picsum.photos/400/200"
                    }
                    className="card-img-top"
                    alt="Service"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 end-0 p-2">
                    <span
                      className={`badge bg-${getStatusColor(
                        req.status
                      )} rounded-pill`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>

                {/* BODY */}
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">Service Request</h5>

                  <p className="text-muted flex-grow-1">
                    {req.problemDescription}
                  </p>

                  {/* ⭐ RATING */}
                  <div className="mb-3">
                    <span className="fw-semibold me-2">
                      Your Rating:
                    </span>
                    {renderStars(req.rating, req.requestId)}
                  </div>

                  {/* DETAILS */}
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <FontAwesomeIcon
                        icon={faTools}
                        className="me-2 text-primary"
                      />
                      <small className="text-muted">
                        Service Type
                      </small>
                    </div>
                    <small className="fw-semibold">
                      {req.category?.name || "General"}
                    </small>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <FontAwesomeIcon
                        icon={faUser}
                        className="me-2 text-primary"
                      />
                      <small className="text-muted">
                        Technician
                      </small>
                    </div>
                    <small className="fw-semibold">
                      {req.technician?.name || "Assigned"}
                    </small>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="card-footer bg-light d-flex justify-content-between">
                  <div>
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faHashtag} />{" "}
                      {req.requestId}
                    </small>
                    <br />
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faCalendar} />{" "}
                      {new Date(req.createdAt).toLocaleDateString()}
                    </small>
                  </div>

                  <div className="text-success fw-bold">
                    <FontAwesomeIcon icon={faMoneyBillWave} />{" "}
                    {req.serviceCharge?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }) || "₹0"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .card-hover {
          transition: 0.3s;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}

export default CustomerPaidHistory;