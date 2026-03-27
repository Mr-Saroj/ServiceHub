import React from "react";

function TechnicianEarnings({ earnings, downloadInvoice }) {
  return (
    <div>
      <h4 className="mb-4 fw-bold">💰 Earnings Dashboard</h4>

      {/* SUMMARY CARDS */}
      <div className="row mb-4">
        
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h6 className="text-muted">Total Earnings</h6>
              <h2 className="text-success fw-bold">
                ₹{earnings.totalEarnings}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h6 className="text-muted">Completed Jobs</h6>
              <h2 className="fw-bold">
                {earnings.completedJobs}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">
          <h5 className="mb-3">📄 Earnings History</h5>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>

              <tbody>
                {earnings.jobs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No earnings yet
                    </td>
                  </tr>
                ) : (
                  earnings.jobs.map((job, index) => (
                    <tr key={job.requestId}>
                      <td>{index + 1}</td>
                      <td>{job.customer?.name}</td>
                      <td>{job.category?.categoryName}</td>

                      <td className="fw-bold text-success">
                        ₹{job.serviceCharge}
                      </td>

                      <td>
                        <span className="badge bg-success">
                          {job.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => downloadInvoice(job.requestId)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TechnicianEarnings;