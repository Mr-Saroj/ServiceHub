import React, { useState } from "react";
import Swal from "sweetalert2";
import "./AvailableRequests.css";

function AvailableRequests({ requests, openAcceptModal }) {
  const [showModal, setShowModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // ✅ CUSTOM ALERT
  const CustomAlert = Swal.mixin({
    background: "rgba(255,255,255,0.95)",
    color: "#333",
    confirmButtonColor: "#4A90E2",
    backdrop: `rgba(0,0,0,0.4)`,
    customClass: {
      popup: "swal-popup",
      title: "swal-title",
      confirmButton: "swal-confirm-btn",
    },
    buttonsStyling: false,
  });

  /* OPEN MODAL */
  const handleOpen = (id) => {
    setSelectedRequestId(id);
    setShowModal(true);
  };

  /* CONFIRM */
  const handleConfirm = async () => {
    if (!scheduleDate || !scheduleTime) {
      return CustomAlert.fire({
        icon: "warning",
        title: "Missing Details",
        text: "Please select date & time",
      });
    }

    try {
      await openAcceptModal(selectedRequestId, scheduleDate, scheduleTime);

      CustomAlert.fire({
        icon: "success",
        title: "Job Accepted",
        text: "You have successfully accepted this job!",
      });

      setShowModal(false);
      setScheduleDate("");
      setScheduleTime("");
      setSelectedRequestId(null);

    } catch (err) {
      CustomAlert.fire({
        icon: "error",
        title: "Failed",
        text: "Could not accept job. Try again!",
      });
    }
  };

  return (
    <div className="fade-in">
      <h4 className="mb-4">Available Requests</h4>

      {requests.length === 0 ? (
        <div className="text-center text-muted">
          No available requests
        </div>
      ) : (
        <div className="row g-4">
          {requests.map((req) => (
            <div className="col-md-6" key={req.requestId}>
              <div className="card shadow-sm border-0 h-100 request-card">

                {/* IMAGE */}
                {req.damagePhotoUrl && (
                  <img
                    src={req.damagePhotoUrl}
                    alt="damage"
                    className="card-img-top request-img"
                  />
                )}

                <div className="card-body">

                  <h5 className="fw-bold text-primary">
                    {req.category?.name || "Service"}
                  </h5>

                  <p className="text-muted">
                    {req.problemDescription}
                  </p>

                  <hr />

                  <p className="mb-1">
                    👤 <strong>Name:</strong>{" "}
                    {req.customer?.name || "N/A"}
                  </p>

                  <p className="mb-2">
                    📞 <strong>Phone:</strong>{" "}
                    {req.customer?.phone ||
                      "Available after accepting job"}
                  </p>

                  <p className="mb-2">
                    📍 <strong>Location:</strong>{" "}
                    {req.locationAddress}
                  </p>

                  <span className="badge bg-warning text-dark">
                    {req.status}
                  </span>

                </div>

                <div className="card-footer bg-white border-0">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleOpen(req.requestId)}
                  >
                    Accept Job
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content custom-modal">

                <div className="modal-header">
                  <h5 className="modal-title">Schedule Job</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">

                  <label className="form-label">Select Date</label>
                  <input
                    type="date"
                    className="form-control mb-3"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />

                  <label className="form-label">Select Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />

                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AvailableRequests;