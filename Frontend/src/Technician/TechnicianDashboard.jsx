import React, { useState, useEffect } from "react";
import "./TechnicianDashboard.css";
import { useNavigate } from "react-router-dom";

function TechnicianDashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  const [technicianName, setTechnicianName] = useState("");
  const [availableRequests, setAvailableRequests] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [reviews, setReviews] = useState([]);

  /* ================= CHECK AUTH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role !== "TECHNICIAN") {
        navigate("/login");
        return;
      }

      setTechnicianName(payload.sub);

      fetchProfile(token);
      fetchAvailableRequests(token);
      fetchMyJobs(token);
      fetchReviews(token);

    } catch (error) {
      console.error("Invalid token");
      navigate("/login");
    }
  }, [navigate]);

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async (token) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/technician/profile",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.name) {
          setTechnicianName(data.name);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= FETCH AVAILABLE ================= */
  const fetchAvailableRequests = async (token) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/technician/requests",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setAvailableRequests(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= FETCH MY JOBS ================= */
  const fetchMyJobs = async (token) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/technician/my-jobs",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setMyJobs(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= FETCH REVIEWS ================= */
  const fetchReviews = async (token) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/technician/reviews",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= ACCEPT JOB ================= */
  const acceptJob = async (requestId) => {

    const token = localStorage.getItem("token");

    try {

      const res = await fetch(
        `http://localhost:8080/api/technician/accept/${requestId}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      if (res.ok) {

        alert("Job Accepted");

        fetchAvailableRequests(token);
        fetchMyJobs(token);

      }

    } catch (error) {
      console.error(error);
    }

  };

  /* ================= COMPLETE JOB ================= */
  const completeJob = async (jobId) => {

    const token = localStorage.getItem("token");

    try {

      const res = await fetch(
        `http://localhost:8080/api/technician/complete/${jobId}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        fetchMyJobs(token);
      }

    } catch (error) {
      console.error(error);
    }

  };

  /* ================= CALCULATIONS ================= */
  const totalCompletedJobs = myJobs.filter(
    (job) => job.request?.status === "COMPLETED"
  );

  const totalEarnings = totalCompletedJobs.reduce(
    (acc) => acc + 50,
    0
  );

  const completionRate =
    myJobs.length === 0
      ? 0
      : Math.round((totalCompletedJobs.length / myJobs.length) * 100);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>
            <i className="fas fa-hard-hat"></i> TechHub
          </h2>
        </div>

        <div className="sidebar-menu">
          <ul>

            <li
              className={activePage === "dashboard" ? "active" : ""}
              onClick={() => setActivePage("dashboard")}
            >
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </li>

            <li
              className={activePage === "available" ? "active" : ""}
              onClick={() => setActivePage("available")}
            >
              <i className="fas fa-briefcase"></i> Available Requests
            </li>

            <li
              className={activePage === "myjobs" ? "active" : ""}
              onClick={() => setActivePage("myjobs")}
            >
              <i className="fas fa-tasks"></i> My Jobs
            </li>

            <li
              className={activePage === "earnings" ? "active" : ""}
              onClick={() => setActivePage("earnings")}
            >
              <i className="fas fa-dollar-sign"></i> Earnings
            </li>

            <li
              className={activePage === "reviews" ? "active" : ""}
              onClick={() => setActivePage("reviews")}
            >
              <i className="fas fa-star"></i> Reviews
            </li>

          </ul>
        </div>
      </aside>

      <main className="main-content">

        {activePage === "dashboard" && (
          <>
            <div className="header">
              <h1>Welcome back, {technicianName}!</h1>
              <p>Manage your profile and track your earnings</p>
            </div>

            <div className="dashboard-content">

              <div className="card">
                <div className="card-header">
                  <h2>Profile</h2>
                </div>

                <div className="profile-card">
                  <div className="profile-avatar">
                    {technicianName
                      ? technicianName.charAt(0).toUpperCase()
                      : ""}
                  </div>
                  <div className="profile-info">
                    <h3>{technicianName}</h3>
                    <p>Technician</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2>Earnings Summary</h2>
                </div>

                <div className="earnings-summary">

                  <div className="earning-item">
                    <h3>Total Earnings</h3>
                    <p>${totalEarnings}</p>
                  </div>

                  <div className="earning-item">
                    <h3>Total Jobs</h3>
                    <p>{myJobs.length}</p>
                  </div>

                  <div className="earning-item">
                    <h3>Completion Rate</h3>
                    <p>{completionRate}%</p>
                  </div>

                </div>
              </div>

            </div>
          </>
        )}

        {activePage === "available" && (
          <div className="available-wrapper">

            <div className="available-header">
              <h2>Available Service Requests</h2>
            </div>

            <div className="request-grid">

              {availableRequests.length === 0 ? (
                <p>No available requests.</p>
              ) : (

                availableRequests.map((request) => (

                  <div key={request.requestId} className="request-card-modern">

                    <h3>{request.category?.categoryName}</h3>

                    <p><b>Customer:</b> {request.customer?.name}</p>

                    <p><b>Problem:</b> {request.problemDescription}</p>

                    <p><b>Location:</b> {request.locationAddress}</p>

                    {request.damagePhotoUrl && (
                      <div className="damage-image-container">
                        <img
                          src={request.damagePhotoUrl}
                          alt="Damage"
                          className="damage-image"
                        />
                      </div>
                    )}

                    <button
                      className="btn-accept"
                      onClick={() => acceptJob(request.requestId)}
                    >
                      Accept Job
                    </button>

                  </div>

                ))
              )}

            </div>
          </div>
        )}

        {activePage === "myjobs" && (
          <div className="available-wrapper">

            <div className="available-header">
              <h2>My Jobs</h2>
            </div>

            <div className="request-grid">

              {myJobs.length === 0 ? (
                <p>No jobs yet.</p>
              ) : (

                myJobs.map((job) => (

                  <div key={job.jobId} className="request-card-modern">

                    <h3>{job.request?.category?.categoryName}</h3>

                    <p><b>Problem:</b> {job.request?.problemDescription}</p>

                    <p><b>Status:</b> {job.request?.status}</p>

                    <p><b>Location:</b> {job.request?.locationAddress}</p>

                    {job.request?.damagePhotoUrl && (
                      <div className="damage-image-container">
                        <img
                          src={job.request.damagePhotoUrl}
                          alt="Damage"
                          className="damage-image"
                        />
                      </div>
                    )}

                    {job.request?.status === "ACCEPTED" && (
                      <button
                        className="btn-accept"
                        onClick={() => completeJob(job.jobId)}
                      >
                        Mark Completed
                      </button>
                    )}

                  </div>

                ))
              )}

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default TechnicianDashboard;