import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getUsers, saveUsers, getSessions, saveSessions, getMatches, saveMatches } from './utils/storage'

// Initialize dummy data if empty
const initData = () => {
  if (getUsers().length === 0) {
    const dummyUsers = [
      { id: '1', name: 'Admin User', email: 'admin@mentorconnect.com', password: 'password', role: 'admin' },
      { id: '2', name: 'Dr. Jane Smith', email: 'jane@mentor.com', password: 'password', role: 'mentor' },
      { id: '3', name: 'Alex Johnson', email: 'alex@mentee.com', password: 'password', role: 'mentee' }
    ];
    saveUsers(dummyUsers);
  }

  if (getSessions().length === 0) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dummySessions = [
      {
        id: '101',
        mentorId: '2',
        menteeId: '3',
        title: 'Project Architecture Review',
        date: today.toISOString().split('T')[0],
        time: '14:00',
        status: 'upcoming',
        notes: 'Reviewing the React structure and state management.'
      },
      {
        id: '102',
        mentorId: '2',
        menteeId: '3',
        title: 'Career Coaching',
        date: tomorrow.toISOString().split('T')[0],
        time: '10:00',
        status: 'upcoming',
        notes: 'Discussing career goals and resume improvements.'
      }
    ];
    saveSessions(dummySessions);
  }

  if (getMatches().length === 0) {
    const dummyMatches = [
      { id: '201', mentorId: '2', menteeId: '3', createdAt: new Date().toISOString() }
    ];
    saveMatches(dummyMatches);
  }
};

initData();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

