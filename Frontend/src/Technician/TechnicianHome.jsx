import React from "react";

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

      {/* Extra Section */}
      <div className="mt-5">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="mb-3">Performance Summary</h5>

            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${completionRate}%` }}
              >
                {completionRate}%
              </div>
            </div>

            <p className="mt-3 text-muted">
              You have completed {completedJobs} out of {totalJobs} jobs.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default TechnicianHome;