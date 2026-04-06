import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';
import './Dashboard.css';

const MentorDashboard = () => {
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
            <Briefcase size={40} color="white" />
          </div>
          <div>
            <h1>Mentor Dashboard</h1>
            <p>Welcome, Mentor!</p>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="role-badge">Role: {role}</div>
          <p className="dashboard-description">
            This is your mentor dashboard. You can manage your mentees, schedule sessions, and track progress here.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <h3>👥 Manage Mentees</h3>
              <p>View and manage your mentee connections</p>
            </div>
            <div className="feature-item">
              <h3>📅 Schedule Sessions</h3>
              <p>Plan and schedule mentoring sessions</p>
            </div>
            <div className="feature-item">
              <h3>📊 Track Progress</h3>
              <p>Monitor your mentees' progress and growth</p>
            </div>
            <div className="feature-item">
              <h3>💬 Messages</h3>
              <p>Communicate with your mentees</p>
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

export default MentorDashboard;
