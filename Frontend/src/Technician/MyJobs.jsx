import React, { useState } from "react";
import "./MyJobs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function MyJobs({
  jobs,
  amounts,
  setAmounts,
  completeJob,
  downloadInvoice,
}) {

  // ✅ LOADING STATES
  const [loadingComplete, setLoadingComplete] = useState({});
  const [loadingInvoice, setLoadingInvoice] = useState({});

  // ✅ CUSTOM ALERT
  const CustomAlert = Swal.mixin({
    background: "rgba(255,255,255,0.9)",
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

  // ⭐ STAR RENDER FUNCTION
  const renderStars = (rating = 0) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= rating ? "text-warning" : "text-muted"}
        />
      );
    }

    return stars;
  };

  // ✅ HANDLE COMPLETE
  const handleComplete = async (jobId) => {
    try {
      if (!amounts[jobId]) {
        return CustomAlert.fire({
          icon: "warning",
          title: "Enter Amount",
          text: "Please enter service charge before completing.",
        });
      }

      setLoadingComplete((prev) => ({ ...prev, [jobId]: true }));

      await completeJob(jobId);

      CustomAlert.fire({
        icon: "success",
        title: "Job Completed",
        text: "Service marked as completed successfully!",
      });

    } catch (err) {
      CustomAlert.fire({
        icon: "error",
        title: "Error",
        text: "Failed to complete job!",
      });
    } finally {
      setLoadingComplete((prev) => ({ ...prev, [jobId]: false }));
    }
  };

  // ✅ HANDLE INVOICE
  const handleInvoice = async (jobId) => {
    try {
      setLoadingInvoice((prev) => ({ ...prev, [jobId]: true }));

      await downloadInvoice(jobId);

      CustomAlert.fire({
        icon: "success",
        title: "Invoice Downloaded",
        text: "Invoice has been downloaded successfully!",
      });

    } catch (err) {
      CustomAlert.fire({
        icon: "error",
        title: "Download Failed",
        text: "Could not download invoice!",
      });
    } finally {
      setLoadingInvoice((prev) => ({ ...prev, [jobId]: false }));
    }
  };

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
                <div className="card shadow-sm border-0 h-100 job-card">

                  {/* IMAGE */}
                  {req.damagePhotoUrl && (
                    <img
                      src={req.damagePhotoUrl}
                      alt="Damage"
                      className="card-img-top job-img"
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
                    <p className="mb-1 text-muted">
                      📅 {req.scheduledDate || "Not set"}
                    </p>
                    <p className="mb-1 text-muted">
                      ⏰ {req.scheduledTime || "Not set"}
                    </p>

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

                    {/* COMPLETED DETAILS */}
                    {req.status?.toUpperCase() === "COMPLETED" && (
                      <>
                        <p className="text-success fw-bold mt-1 mb-0">
                          ₹ {req.serviceCharge}
                        </p>

                        <div className="mt-1 d-flex align-items-center">
                          {req.rating > 0 ? (
                            <>
                              {renderStars(req.rating)}
                              <span className="ms-2 small text-muted">
                                ({req.rating})
                              </span>
                            </>
                          ) : (
                            <span className="text-muted small">
                              Not Rated Yet
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* FOOTER */}
                  <div className="card-footer p-1">

                    {/* NOT COMPLETED */}
                    {req.status?.toUpperCase() !== "COMPLETED" ? (
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
                          className={`btn btn-success w-100 btn-sm ${
                            loadingComplete[job.jobId] ? "btn-loading" : ""
                          }`}
                          onClick={() => handleComplete(job.jobId)}
                          disabled={loadingComplete[job.jobId]}
                        >
                          {loadingComplete[job.jobId] ? (
                            <>
                              <span className="spinner"></span>
                              Processing...
                            </>
                          ) : (
                            "Complete"
                          )}
                        </button>
                      </>
                    ) : (
                      /* COMPLETED */
                      <button
                        className={`btn btn-primary w-100 btn-sm ${
                          loadingInvoice[job.jobId] ? "btn-loading" : ""
                        }`}
                        onClick={() => handleInvoice(job.jobId)}
                        disabled={loadingInvoice[job.jobId]}
                      >
                        {loadingInvoice[job.jobId] ? (
                          <>
                            <span className="spinner"></span>
                            Downloading...
                          </>
                        ) : (
                          "Invoice"
                        )}
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