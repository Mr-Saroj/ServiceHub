import React from 'react'
import './TechnicianDashboard.css';
function TechnicianDashboard() {
  return (
    <div class="dashboard-container">
    {/* <!-- Mobile Menu Toggle --> */}
    <button class="mobile-menu-toggle">
        <i class="fas fa-bars"></i>
    </button>
    
    {/* <!-- Sidebar --> */}
    <aside class="sidebar">
        <div class="sidebar-header">
            <h2><i class="fas fa-hard-hat"></i> TechHub</h2>
        </div>
        <div class="sidebar-menu">
            <ul>
                <li><a href="#" class="active"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="#"><i class="fas fa-briefcase"></i> Available Jobs</a></li>
                <li><a href="#"><i class="fas fa-tasks"></i> My Jobs</a></li>
                <li><a href="#"><i class="fas fa-calendar-alt"></i> Schedule</a></li>
                <li><a href="#"><i class="fas fa-dollar-sign"></i> Earnings</a></li>
                <li><a href="#"><i class="fas fa-star"></i> Reviews</a></li>
                <li><a href="#"><i class="fas fa-user"></i> Profile</a></li>
                <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
                <li><a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        </div>
    </aside>

    {/* <!-- Main Content --> */}
    <main class="main-content">
        {/* <!-- Header --> */}
        <div class="header">
            <div class="welcome-section">
                <h1>Welcome back, Mike!</h1>
                <p>Manage your jobs and track your earnings</p>
            </div>
            <div class="user-info">
                <div class="user-avatar">MJ</div>
                <div class="user-name">Mike Johnson</div>
                <a href="#" class="btn btn-sm">Edit Profile</a>
            </div>
        </div>

        {/* <!-- Dashboard Content --> */}
        <div class="dashboard-content">
            {/* <!-- Profile Card --> */}
            <div class="card">
                <div class="card-header">
                    <h2>Profile</h2>
                </div>
                <div class="profile-card">
                    <div class="profile-avatar">MJ</div>
                    <div class="profile-info">
                        <h3>Mike Johnson</h3>
                        <p>Plumbing Specialist</p>
                        <div class="profile-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span>4.7 (32 reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Earnings Summary --> */}
            <div class="card">
                <div class="card-header">
                    <h2>Earnings Summary</h2>
                </div>
                <div class="earnings-summary">
                    <div class="earning-item">
                        <h3>This Month</h3>
                        <p>$2,450</p>
                    </div>
                    <div class="earning-item">
                        <h3>Last Month</h3>
                        <p>$1,875</p>
                    </div>
                    <div class="earning-item">
                        <h3>Total Jobs</h3>
                        <p>18</p>
                    </div>
                    <div class="earning-item">
                        <h3>Completion Rate</h3>
                        <p>94%</p>
                    </div>
                </div>
            </div>

            {/* <!-- Available Jobs --> */}
            <div class="card card-full">
                <div class="card-header">
                    <h2>Available Job Requests</h2>
                    <a href="#">View All</a>
                </div>
                <div class="job-cards">
                    <div class="job-card">
                        <div class="job-header">
                            <div class="job-id">#SR005</div>
                            <div class="job-date">Feb 15, 2026</div>
                        </div>
                        <h3 class="job-title">Kitchen Sink Installation</h3>
                        <div class="job-details">
                            <div class="job-detail">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Downtown</span>
                            </div>
                            <div class="job-detail">
                                <i class="fas fa-dollar-sign"></i>
                                <span>$150</span>
                            </div>
                        </div>
                        <p class="job-description">Replace old kitchen sink with a new one. Customer has purchased the sink.</p>
                        <div class="job-actions">
                            <a href="#" class="btn btn-success btn-sm">Accept</a>
                            <a href="#" class="btn btn-sm">View Details</a>
                        </div>
                    </div>

                    <div class="job-card">
                        <div class="job-header">
                            <div class="job-id">#SR006</div>
                            <div class="job-date">Feb 16, 2026</div>
                        </div>
                        <h3 class="job-title">Bathroom Faucet Repair</h3>
                        <div class="job-details">
                            <div class="job-detail">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Westside</span>
                            </div>
                            <div class="job-detail">
                                <i class="fas fa-dollar-sign"></i>
                                <span>$80</span>
                            </div>
                        </div>
                        <p class="job-description">Bathroom faucet is leaking from the base. Fix or replace faucet.</p>
                        <div class="job-actions">
                            <a href="#" class="btn btn-success btn-sm">Accept</a>
                            <a href="#" class="btn btn-sm">View Details</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Current Jobs --> */}
            <div class="card card-full">
                <div class="card-header">
                    <h2>Current Jobs</h2>
                </div>
                <div class="job-cards">
                    <div class="job-card">
                        <div class="job-header">
                            <div class="job-id">#SR002</div>
                            <div class="job-date">Feb 12, 2026</div>
                        </div>
                        <h3 class="job-title">Water Heater Installation</h3>
                        <div class="job-details">
                            <div class="job-detail">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>North District</span>
                            </div>
                            <div class="job-detail">
                                <i class="fas fa-dollar-sign"></i>
                                <span>$350</span>
                            </div>
                            <div class="job-detail">
                                <span class="badge badge-accepted">In Progress</span>
                            </div>
                        </div>
                        <p class="job-description">Install new 40-gallon water heater. Old unit removed.</p>

                        {/* <!-- Status Timeline --> */}
                        <div class="job-status">
                            <h4>Job Status</h4>
                            <div class="status-timeline">
                                <div class="status-item active">
                                    <div class="status-title">Job Accepted</div>
                                    <div class="status-date">Feb 12, 2026, 9:00 AM</div>
                                </div>
                                <div class="status-item active">
                                    <div class="status-title">In Progress</div>
                                    <div class="status-date">Feb 13, 2026, 10:00 AM</div>
                                </div>
                                <div class="status-item">
                                    <div class="status-title">Completed</div>
                                    <div class="status-date">Pending</div>
                                </div>
                            </div>
                        </div>

                        <div class="job-actions">
                            <a href="#" class="btn btn-success btn-sm">Mark Complete</a>
                            <a href="#" class="btn btn-sm">View Details</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
</div>

  )
}

export default TechnicianDashboard
