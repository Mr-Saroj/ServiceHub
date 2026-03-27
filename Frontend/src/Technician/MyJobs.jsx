import React from "react";

function MyJobs({
  jobs,
  amounts,
  setAmounts,
  completeJob,
  downloadInvoice,
}) {
  return (
    <div className="fade-in">
      <h5 className="mb-3">My Accepted Jobs</h5>

      {!jobs || jobs.length === 0 ? (
        <div className="text-center text-muted">No jobs accepted yet</div>
      ) : (
        <div className="row g-2">
          {jobs.map((job) => {
            const req = job.request;
            if (!req) return null;

            return (
              <div className="col-md-3 col-sm-6" key={job.jobId}>
                <div
                  className="card shadow-sm border-0 h-100"
                  style={{ fontSize: "0.8rem" }}
                >

                  {/* IMAGE */}
                  {req.damagePhotoUrl && (
                    <img
                      src={req.damagePhotoUrl}
                      alt="Damage"
                      className="card-img-top"
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body p-2">
                    <h6 className="fw-bold text-primary mb-1">
                      {req.category?.categoryName || "Service"}
                    </h6>

                    <p className="mb-1"><b>{req.customer?.name}</b></p>
                    <p className="mb-1 text-muted">{req.mobileNumber}</p>
                    <p className="mb-1 text-muted">{req.problemDescription}</p>

                    <p className="mb-1 text-muted">📍 {req.locationAddress}</p>
                    <p className="mb-1 text-muted">📅 {req.scheduledDate || "Not set"}</p>
                    <p className="mb-1 text-muted">⏰ {req.scheduledTime || "Not set"}</p>

                    {/* STATUS */}
                    <span
                      className={`badge ${
                        req.status?.toUpperCase() === "COMPLETED"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {req.status}
                    </span>

                    {/* ✅ SHOW AMOUNT AFTER COMPLETED */}
                    {req.status?.toUpperCase() === "COMPLETED" && (
                      <p className="text-success fw-bold mt-1 mb-0">
                        ₹ {req.serviceCharge}
                      </p>
                    )}
                  </div>

                  {/* ✅ FOOTER SECTION */}
                  <div className="card-footer p-1">

                    {/* 🔹 IF NOT COMPLETED → SHOW INPUT + BUTTON */}
                    {req.status?.toUpperCase() !== "COMPLETED" && (
                      <>
                        <input
                          type="number"
                          className="form-control form-control-sm mb-1"
                          placeholder="Enter amount ₹"
                          value={amounts[job.jobId] || ""}
                          onChange={(e) =>
                            setAmounts({
                              ...amounts,
                              [job.jobId]: e.target.value,
                            })
                          }
                        />

                        <button
                          className="btn btn-success w-100 btn-sm"
                          onClick={() => completeJob(job.jobId)}
                        >
                          Complete
                        </button>
                      </>
                    )}

                    {/* 🔹 IF COMPLETED → SHOW INVOICE BUTTON */}
                    {req.status?.toUpperCase() === "COMPLETED" && (
                      <button
                        className="btn btn-primary w-100 btn-sm"
                        onClick={() => downloadInvoice(job.jobId)}
                      >
                        Invoice
                      </button>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyJobs;