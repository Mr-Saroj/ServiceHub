import React, { useState } from "react";

function Dashboard({ requests, refreshRequests, token }) {
  const [openTrackId, setOpenTrackId] = useState(null);
  const [payLoadingId, setPayLoadingId] = useState(null);

  // ✅ Delete a request
  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/requests/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        }
      );

      if (res.ok) {
        alert("Request deleted successfully");
        refreshRequests();
      } else {
        const text = await res.text();
        alert("Failed to delete request: " + text);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting request: " + error.message);
    }
  };

  // ✅ Payment handler
  const handlePayment = async (requestId) => {
    if (!window.confirm("Proceed with payment?")) return;

    try {
      setPayLoadingId(requestId);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/requests/${requestId}/confirm-payment`,
        {
          method: "POST",
          headers: { Authorization: "Bearer " + token },
        }
      );

      if (res.ok) {
        alert("Only COD is available for now. Payment marked as completed.");

        // Update local requests immediately
        const updatedRequests = requests.map((req) =>
          req.requestId === requestId
            ? { ...req, paymentStatus: "PAID" }
            : req
        );
        refreshRequests(updatedRequests);
      } else {
        const text = await res.text();
        alert("Payment failed ❌: " + text);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment error ❌: " + error.message);
    } finally {
      setPayLoadingId(null);
    }
  };

  const selectedRequest = requests.find((r) => r.requestId === openTrackId);

  // ✅ Helper to get bootstrap badge class for status
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-secondary";
      case "accepted":
        return "bg-info";
      case "on_the_way":
        return "bg-primary";
      case "completed":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  // ✅ Step tracking logic
  const isStepCompleted = (currentStatus, step) => {
    const order = ["PENDING", "ACCEPTED", "ON_THE_WAY", "COMPLETED"];
    return order.indexOf(currentStatus.toUpperCase()) >= order.indexOf(step);
  };

  const isActiveStep = (currentStatus, step) =>
    currentStatus.toUpperCase() === step;

  return (
    <>
      <h3 className="mb-4">Your Requests</h3>

      {requests.map((req) => (
        <div key={req.requestId} className="card mb-4 shadow-sm">
          <div className="row g-0">
            {req.damagePhotoUrl && (
              <div className="col-md-4">
                <img
                  src={req.damagePhotoUrl}
                  className="img-fluid rounded-start h-100"
                  alt="Damage"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            <div className={`col-md-${req.damagePhotoUrl ? "8" : "12"}`}>
              <div className="card-body">
                <h4 className="card-title">
                  Category: {req.category?.categoryName}
                </h4>
                <p className="card-text">Description: {req.problemDescription}</p>
                <p className="card-text">
                  <i className="bi bi-geo-alt me-2"></i>Location: {req.locationAddress}
                </p>
                <p className="card-text">
                  Status:{" "}
                  <span className={`badge ms-2 ${getStatusBadgeClass(req.status)}`}>
                    {req.status}
                  </span>
                </p>

                <div className="row g-2 mt-3">
                  <div className="col-12 col-md-auto">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => deleteRequest(req.requestId)}
                      disabled={req.status.toUpperCase() === "COMPLETED"}
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="col-12 col-md-auto">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => setOpenTrackId(req.requestId)}
                    >
                      View Details
                    </button>
                  </div>

                  {req.status.toUpperCase() === "COMPLETED" &&
                    req.paymentStatus !== "PAID" && (
                      <div className="col-12 col-md-auto">
                        <button
                          className="btn btn-success w-100"
                          onClick={() => handlePayment(req.requestId)}
                          disabled={payLoadingId === req.requestId}
                        >
                          {payLoadingId === req.requestId ? "Processing..." : "💳 Pay"}
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for tracking */}
      {selectedRequest && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-right modal-lg"
            style={{
              position: "fixed",
              right: 0,
              margin: 0,
              height: "700px",
              maxWidth: "500px",
              zIndex: 1050,
            }}
          >
            <div className="modal-content h-100 border-0 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-person-gear me-2"></i>Technician Details
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setOpenTrackId(null)}
                ></button>
              </div>

              <div className="modal-body p-0" style={{ overflowY: "auto" }}>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <h5>
                      {selectedRequest.technician?.name || "Not Assigned Yet"}
                    </h5>
                    <p className="text-muted">Service Technician</p>
                    <p>
                      <i className="bi bi-telephone me-2"></i>
                      <strong>Technician Mobile:</strong>{" "}
                      {selectedRequest.technician?.mobileNumber || "Not Available"}
                    </p>
                    <p>
                      <i className="bi bi-calendar-event me-2"></i>
                      <strong>Date:</strong>{" "}
                      {selectedRequest.scheduledDate || "Not Scheduled"}
                    </p>
                    <p>
                      <i className="bi bi-clock me-2"></i>
                      <strong>Time:</strong>{" "}
                      {selectedRequest.scheduledTime || "Not Scheduled"}
                    </p>
                    <p>
                      <i className="bi bi-geo-alt me-2"></i>
                      <strong>Location:</strong> {selectedRequest.locationAddress}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="mb-4">
                    <i className="bi bi-map me-2"></i>Order Tracking
                  </h4>
                  <div className="tracking-timeline">
                    {["PENDING", "ACCEPTED", "ON_THE_WAY", "COMPLETED"].map(
                      (step, index) => (
                        <div
                          key={index}
                          className={`tracking-step ${
                            isStepCompleted(selectedRequest.status, step)
                              ? "completed"
                              : "pending"
                          } ${isActiveStep(selectedRequest.status, step) ? "active" : ""}`}
                        >
                          <div className="step-icon">
                            <i
                              className={`bi ${
                                step === "PENDING"
                                  ? "bi-hourglass-split"
                                  : step === "ACCEPTED"
                                  ? "bi-person-check"
                                  : step === "ON_THE_WAY"
                                  ? "bi-truck"
                                  : "bi-check-circle"
                              }`}
                            ></i>
                          </div>
                          <div className="step-content">
                            <h6>
                              {step === "PENDING"
                                ? "Request Pending"
                                : step === "ACCEPTED"
                                ? "Technician Assigned"
                                : step === "ON_THE_WAY"
                                ? "On The Way"
                                : "Service Completed"}
                            </h6>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="alert alert-info mt-3">
                    Current Status: <strong>{selectedRequest.status}</strong>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light">
                <button
                  className="btn btn-secondary"
                  onClick={() => setOpenTrackId(null)}
                >
                  Close
                </button>
                <button className="btn btn-primary">
                  <i className="bi bi-telephone me-2"></i>Contact Technician
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;