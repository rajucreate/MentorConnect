import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';
import './Dashboard.css';

const AdminDashboard = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="dashboard-icon">
            <Shield size={40} color="white" />
          </div>
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Administrator!</p>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="role-badge">Role: {role}</div>
          <p className="dashboard-description">
            This is your admin dashboard. Manage users, matches, and platform settings here.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <h3>👥 Manage Users</h3>
              <p>View and manage all platform users</p>
            </div>
            <div className="feature-item">
              <h3>🔗 Manage Matches</h3>
              <p>Handle mentor-mentee pairings</p>
            </div>
            <div className="feature-item">
              <h3>📊 Analytics</h3>
              <p>View platform statistics and reports</p>
            </div>
            <div className="feature-item">
              <h3>⚙️ Settings</h3>
              <p>Configure platform settings</p>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
