import React from "react";
import "./TechnicianHome.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function TechnicianHome({ totalEarnings, completedJobs, totalJobs }) {
  const completionRate =
    totalJobs === 0 ? 0 : Math.round((completedJobs / totalJobs) * 100);

  return (
    <div className="fade-in">
      <h4 className="mb-4">Dashboard Overview</h4>

      <div className="row g-4">

        {/* Earnings */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="fas fa-wallet fa-2x text-primary mb-2"></i>
              <h6 className="text-muted">Total Earnings</h6>
              <h4 className="fw-bold text-success">₹ {totalEarnings}</h4>
            </div>
          </div>
        </div>

        {/* Completed Jobs */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="fas fa-check-circle fa-2x text-success mb-2"></i>
              <h6 className="text-muted">Completed Jobs</h6>
              <h4 className="fw-bold">{completedJobs}</h4>
            </div>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="fas fa-chart-line fa-2x text-warning mb-2"></i>
              <h6 className="text-muted">Completion Rate</h6>
              <h4 className="fw-bold">{completionRate}%</h4>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-5">
  <div className="card shadow-lg border-0">
    <div className="card-body">

      <h5 className="mb-4 text-center">Performance Summary</h5>

      <div className="row align-items-center">

        {/* LEFT SIDE - GRAPH */}
        <div className="col-md-5 text-center">
          <div style={{ width: "150px", margin: "0 auto" }}>
            <CircularProgressbar
              value={completionRate}
              text={`${completionRate}%`}
              styles={buildStyles({
                textSize: "16px",
                pathColor:
                  completionRate > 70
                    ? "#28a745"
                    : completionRate > 40
                    ? "#ffc107"
                    : "#dc3545",
                textColor: "#000",
                trailColor: "#eee",
              })}
            />
          </div>
        </div>

        {/* RIGHT SIDE - STATS */}
        <div className="col-md-7">

          <div className="mb-3">
            <h6 className="text-muted">Completed Jobs</h6>
            <h4 className="fw-bold text-success">{completedJobs}</h4>
          </div>

          <div className="mb-3">
            <h6 className="text-muted">Total Jobs</h6>
            <h4 className="fw-bold">{totalJobs}</h4>
          </div>

          <div>
            <h6 className="text-muted">Performance</h6>
            <span className={`badge ${
              completionRate > 70
                ? "bg-success"
                : completionRate > 40
                ? "bg-warning text-dark"
                : "bg-danger"
            }`}>
              {completionRate}% Efficiency
            </span>
          </div>

        </div>

      </div>

    </div>
  </div>
</div>

    </div>
  );
}

export default TechnicianHome;