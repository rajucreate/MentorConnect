import React, { useState, useEffect } from 'react';
import { getCurrentUser, getSessions, getMatches, getUsers } from '../../utils/storage';
import { Target, CheckCircle, Circle, MessageSquare, TrendingUp, Award } from 'lucide-react';
import './Progress.css';

const Progress = () => {
    const user = getCurrentUser();
    const [milestones, setMilestones] = useState([
        { id: 1, title: 'Complete Foundations', completed: true, date: '2026-01-15' },
        { id: 2, title: 'Build Portoflio Website', completed: true, date: '2026-02-10' },
        { id: 3, title: 'Master React Context API', completed: false, date: null },
        { id: 4, title: 'Learn Advanced Patterns', completed: false, date: null },
        { id: 5, title: 'Final Project Delivery', completed: false, date: null },
    ]);

    const progressValue = Math.round((milestones.filter(m => m.completed).length / milestones.length) * 100);

    const toggleMilestone = (id) => {
        if (user.role === 'mentee') return; // Only mentors/admins can toggle
        setMilestones(milestones.map(m =>
            m.id === id ? { ...m, completed: !m.completed, date: !m.completed ? new Date().toISOString().split('T')[0] : null } : m
        ));
    };

    return (
        <div className="page-container container">
            <div className="section-title">
                <h1>Learning Progress</h1>
                <p>Track your journey, milestones, and achievements.</p>
            </div>

            <div className="progress-overview-grid">
                <div className="progress-main-card">
                    <div className="progress-header-row">
                        <div className="progress-stat">
                            <TrendingUp size={24} color="var(--primary)" />
                            <div>
                                <span>Overall Completion</span>
                                <h3>{progressValue}%</h3>
                            </div>
                        </div>
                        <div className="progress-stat">
                            <Award size={24} color="var(--secondary)" />
                            <div>
                                <span>Milestones Reached</span>
                                <h3>{milestones.filter(m => m.completed).length} / {milestones.length}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="progress-track">
                        <div className="progress-bar-bg larger">
                            <div className="progress-bar-fill" style={{ width: `${progressValue}%` }}></div>
                        </div>
                    </div>

                    <div className="milestones-list">
                        <h3>Milestones</h3>
                        {milestones.map(m => (
                            <div
                                key={m.id}
                                className={`milestone-item ${m.completed ? 'completed' : ''} ${user.role !== 'mentee' ? 'clickable' : ''}`}
                                onClick={() => toggleMilestone(m.id)}
                            >
                                {m.completed ? (
                                    <CheckCircle size={24} className="status-icon completed" />
                                ) : (
                                    <Circle size={24} className="status-icon" />
                                )}
                                <div className="milestone-text">
                                    <h4>{m.title}</h4>
                                    {m.date && <span className="milestone-date">Completed on {m.date}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="progress-sidebar">
                    <div className="notes-section">
                        <div className="section-header">
                            <h3><MessageSquare size={20} /> Mentor Notes</h3>
                            {user.role === 'mentor' && <button className="btn-text">Add Note</button>}
                        </div>
                        <div className="notes-list">
                            <div className="note-card">
                                <p>"Showing great improvement in React hooks implementation. Next step is looking into performance optimization."</p>
                                <div className="note-meta">
                                    <span>Feb 20, 2026</span>
                                </div>
                            </div>
                            <div className="note-card">
                                <p>"Initial assessment completed. Very strong CSS fundamentals."</p>
                                <div className="note-meta">
                                    <span>Jan 10, 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="next-goals-card">
                        <h3><Target size={20} /> Next Goals</h3>
                        <ul>
                            <li>Implement Redux Toolkit</li>
                            <li>Unit Testing with Jest</li>
                            <li>Deploy to Production</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;
