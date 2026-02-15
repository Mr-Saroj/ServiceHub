import React from 'react'
import './CustomerDashboard.css';
function CustomerDashboard() {
  return (
    <div class="dashboard-container">
    <button class="mobile-menu-toggle">
        <i class="fas fa-bars"></i>
    </button>
    
    <aside class="sidebar">
        <div class="sidebar-header">
            <h2><i class="fas fa-user-circle"></i> My Account</h2>
        </div>
        <div class="sidebar-menu">
            <ul>
                <li><a href="#" class="active"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="#"><i class="fas fa-plus-circle"></i> Create Service Request</a></li>
                <li><a href="#"><i class="fas fa-list-alt"></i> My Requests</a></li>
                <li><a href="#"><i class="fas fa-calendar-alt"></i> Appointments</a></li>
                <li><a href="#"><i class="fas fa-credit-card"></i> Payment History</a></li>
                <li><a href="#"><i class="fas fa-star"></i> Reviews</a></li>
                <li><a href="#"><i class="fas fa-user"></i> Profile</a></li>
                <li><a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        </div>
    </aside>

    <main class="main-content">
        <div class="header">
            <div class="welcome-section">
                <h1>Welcome back, John!</h1>
                <p>Track and manage your service requests</p>
            </div>
            <div class="user-info">
                <div class="user-avatar">JD</div>
                <div class="user-name">John Doe</div>
                <a href="#" class="btn btn-sm">New Request</a>
            </div>
        </div>

        <div class="dashboard-content">
            <div class="card">
                <div class="card-header">
                    <h2>My Service Requests</h2>
                    <a href="#" class="btn btn-success">Create Request</a>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Technician</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#SR001</td>
                                <td>Plumbing</td>
                                <td>Feb 15, 2026</td>
                                <td>Mike Johnson</td>
                                <td><span class="badge badge-completed">Completed</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <a href="#" class="btn btn-sm btn-view">View</a>
                                        <a href="#" class="btn btn-sm btn-success">Review</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>#SR002</td>
                                <td>Electrical</td>
                                <td>Feb 18, 2026</td>
                                <td>-</td>
                                <td><span class="badge badge-pending">Pending</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <a href="#" class="btn btn-sm btn-view">View</a>
                                        <a href="#" class="btn btn-sm btn-cancel">Cancel</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</div>

  )
}

export default CustomerDashboard
