import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';
import './Dashboard.css';

const MenteeDashboard = () => {
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
            <GraduationCap size={40} color="white" />
          </div>
          <div>
            <h1>Mentee Dashboard</h1>
            <p>Welcome, Mentee!</p>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="role-badge">Role: {role}</div>
          <p className="dashboard-description">
            This is your mentee dashboard. Find mentors, schedule sessions, and track your learning progress here.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <h3>🔍 Find Mentors</h3>
              <p>Browse and connect with experienced mentors</p>
            </div>
            <div className="feature-item">
              <h3>📅 Schedule Sessions</h3>
              <p>Book mentoring sessions with your mentor</p>
            </div>
            <div className="feature-item">
              <h3>📈 Track Progress</h3>
              <p>Monitor your learning and growth</p>
            </div>
            <div className="feature-item">
              <h3>⭐ Feedback</h3>
              <p>Receive guidance and feedback from mentors</p>
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

export default MenteeDashboard;
