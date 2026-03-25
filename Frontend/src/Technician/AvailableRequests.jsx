import React, { useState } from "react";

function AvailableRequests({ requests, openAcceptModal }) {
  const [showModal, setShowModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  /* OPEN MODAL */
  const handleOpen = (id) => {
  console.log("Selected ID:", id); // ✅ check here
  setSelectedRequestId(id);
  setShowModal(true);
};
  /* CONFIRM */
  const handleConfirm = () => {
    if (!scheduleDate || !scheduleTime) {
      alert("Please select date & time");
      return;
    }

    openAcceptModal(selectedRequestId, scheduleDate, scheduleTime);

    setShowModal(false);
    setScheduleDate("");
    setScheduleTime("");
    setSelectedRequestId(null);
    console.log("ID:", selectedRequestId);
    console.log("DATE:", scheduleDate);
    console.log("TIME:", scheduleTime);
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
              <div className="card shadow-sm border-0 h-100">

                {/* DAMAGE IMAGE */}
                {req.damagePhotoUrl && (
                  <img
                    src={req.damagePhotoUrl}
                    alt="damage"
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body">

                  {/* CATEGORY */}
                  <h5 className="fw-bold text-primary">
                    {req.category?.name || "Service"}
                  </h5>

                  {/* PROBLEM */}
                  <p className="text-muted">
                    {req.problemDescription}
                  </p>

                  <hr />

                  {/* CUSTOMER DETAILS */}
                  <p className="mb-1">
                    👤 <strong>Name:</strong>{" "}
                    {req.customer?.name || "N/A"}
                  </p>

                  <p className="mb-2">
                    📞 <strong>Phone:</strong>{" "}
                    {req.customer?.phone || "N/A"}
                  </p>

                  {/* LOCATION */}
                  <p className="mb-2">
                    📍 <strong>Location:</strong>{" "}
                    {req.locationAddress}
                  </p>

                  {/* STATUS */}
                  <p>
                    <span className="badge bg-warning text-dark">
                      {req.status}
                    </span>
                  </p>

                </div>

                {/* ACTION */}
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
      {/* ================= MODAL ================= */}
      {showModal && (
        <>
          {/* BACKDROP */}
          <div className="modal-backdrop fade show"></div>

          {/* MODAL */}
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">

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