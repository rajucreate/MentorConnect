import React, { useState, useEffect } from 'react';
import { getCurrentUser, getSessions, getMatches, getUsers } from '../../utils/storage';
import { LayoutDashboard, Users, Calendar, BarChart, Plus, UserCheck } from 'lucide-react';
import SessionCard from '../../components/sessionCard/SessionCard';
import MenteeCard from '../../components/menteeCard/MenteeCard';
import MentorCard from '../../components/mentorCard/MentorCard';
import './Dashboard.css';

const Dashboard = () => {
    const user = getCurrentUser();
    const [sessions, setSessions] = useState([]);
    const [matches, setMatches] = useState([]);
    const [mentees, setMentees] = useState([]);
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        setSessions(getSessions());
        setMatches(getMatches());
        setMentees(getUsers().filter(u => u.role === 'mentee'));
        setMentors(getUsers().filter(u => u.role === 'mentor'));
    }, []);

    const renderAdminDashboard = () => (
        <div className="dashboard-grid">
            <div className="stat-card">
                <Users size={24} />
                <div className="stat-info">
                    <span>Total Mentees</span>
                    <h3>{mentees.length}</h3>
                </div>
            </div>
            <div className="stat-card">
                <UserCheck size={24} />
                <div className="stat-info">
                    <span>Total Mentors</span>
                    <h3>{mentors.length}</h3>
                </div>
            </div>
            <div className="stat-card">
                <Calendar size={24} />
                <div className="stat-info">
                    <span>Total Sessions</span>
                    <h3>{sessions.length}</h3>
                </div>
            </div>
            <div className="stat-card">
                <BarChart size={24} />
                <div className="stat-info">
                    <span>Total Matches</span>
                    <h3>{matches.length}</h3>
                </div>
            </div>

            <div className="dashboard-section full-width">
                <h2>System Overview</h2>
                <div className="recent-activity">
                    <p>You have {mentees.length} mentees and {mentors.length} mentors currently registered.</p>
                    <p>{matches.length} mentorship pairings are active.</p>
                </div>
            </div>
        </div>
    );

    const renderMentorDashboard = () => {
        const myMatches = matches.filter(m => m.mentorId === user.id);
        const myMentees = mentees.filter(m => myMatches.some(match => match.menteeId === m.id));
        const upcomingSessions = sessions
            .filter(s => s.mentorId === user.id && s.status === 'upcoming')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);

        return (
            <div className="dashboard-grid">
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Upcoming Sessions</h2>
                        <Plus size={20} className="add-icon" />
                    </div>
                    <div className="card-list">
                        {upcomingSessions.length > 0 ? (
                            upcomingSessions.map(s => <SessionCard key={s.id} session={s} role="mentor" />)
                        ) : (
                            <p className="empty-state">No upcoming sessions.</p>
                        )}
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2>Assigned Mentees</h2>
                    <div className="card-list">
                        {myMentees.length > 0 ? (
                            myMentees.map(m => <MenteeCard key={m.id} mentee={m} progress={65} />)
                        ) : (
                            <p className="empty-state">No mentees assigned yet.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderMenteeDashboard = () => {
        const myMatch = matches.find(m => m.menteeId === user.id);
        const myMentor = myMatch ? mentors.find(m => m.id === myMatch.mentorId) : null;
        const upcomingSessions = sessions
            .filter(s => s.menteeId === user.id && s.status === 'upcoming')
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        return (
            <div className="dashboard-grid">
                <div className="dashboard-section">
                    <h2>Your Mentor</h2>
                    {myMentor ? (
                        <MentorCard mentor={myMentor} />
                    ) : (
                        <div className="info-card">
                            <p>You haven't been matched with a mentor yet.</p>
                            <p className="text-muted">Wait for an admin to assign you a mentor.</p>
                        </div>
                    )}
                </div>

                <div className="dashboard-section">
                    <h2>Next Session</h2>
                    {upcomingSessions.length > 0 ? (
                        <SessionCard session={upcomingSessions[0]} role="mentee" />
                    ) : (
                        <p className="empty-state">No sessions scheduled.</p>
                    )}
                </div>

                <div className="dashboard-section full-width">
                    <h2>Learning Progress</h2>
                    <div className="progress-container">
                        <div className="progress-info">
                            <span>Frontend Development Mastery</span>
                            <span>75%</span>
                        </div>
                        <div className="progress-bar-bg larger">
                            <div className="progress-bar-fill" style={{ width: '75%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="page-container container">
            <div className="dashboard-header">
                <div>
                    <h1>Welcome, {user.name}!</h1>
                    <p className="subtitle">Here is what is happening in your {user.role} workspace.</p>
                </div>
                <div className="role-badge">
                    {user.role}
                </div>
            </div>

            {user.role === 'admin' && renderAdminDashboard()}
            {user.role === 'mentor' && renderMentorDashboard()}
            {user.role === 'mentee' && renderMenteeDashboard()}
        </div>
    );
};

export default Dashboard;
