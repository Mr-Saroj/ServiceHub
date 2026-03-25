import React from "react";

function MyJobs({ jobs, completeJob }) {
  return (
    <div className="fade-in">
      <h4 className="mb-4">My Accepted Jobs</h4>

      {jobs.length === 0 ? (
        <div className="text-center text-muted">No jobs accepted yet</div>
      ) : (
        <div className="row g-3">
          {jobs.map((job) => {
            const req = job.request;

            if (!req) return null; // safety check

            return (
              <div className="col-md-4 col-sm-6" key={job.jobId}>
                <div className="card shadow border-0 h-100" style={{ fontSize: "0.9rem" }}>
                  
                  {/* DAMAGE IMAGE */}
                  {req.damagePhotoUrl && (
                    <img
                      src={req.damagePhotoUrl}
                      alt="Damage"
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body p-2">
                    <h6 className="fw-bold text-primary">
                      {req.category?.categoryName || "Service"}
                    </h6>

                    <p className="text-muted mb-1"><b>Customer:</b> {req.customer?.name}</p>
                    <p className="text-muted mb-1"><b>Mobile:</b> {req.mobileNumber}</p>
                    <p className="text-muted mb-1"><b>Problem:</b> {req.problemDescription}</p>
                    <p className="text-muted mb-1">
                      <i className="fas fa-map-marker-alt me-1"></i>{req.locationAddress}
                    </p>
                    <p className="text-muted mb-1">
                      <i className="fas fa-calendar me-1"></i>
                      {req.scheduledDate ? req.scheduledDate : "Not scheduled"}
                    </p>
                    <p className="text-muted mb-1">
                      <i className="fas fa-clock me-1"></i>
                      {req.scheduledTime || "Not set"}
                    </p>

                    <p className="mb-1">
                      <span className={`badge ${req.status === "COMPLETED" ? "bg-success" : "bg-warning text-dark"}`}>
                        {req.status}
                      </span>
                    </p>
                  </div>

                  {/* MARK COMPLETE BUTTON */}
                  {req.status !== "COMPLETED" && (
                    <div className="card-footer bg-white border-0 p-1">
                      <button
                        className="btn btn-success w-100 btn-sm"
                        onClick={() => completeJob(job.jobId)}
                      >
                        Mark as Completed
                      </button>
                    </div>
                  )}
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