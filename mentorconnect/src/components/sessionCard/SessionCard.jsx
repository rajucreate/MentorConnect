import React from 'react';
import { Calendar, Clock, User, MessageSquare } from 'lucide-react';
import './SessionCard.css';

const SessionCard = ({ session, onEdit, onDelete, role }) => {
    const { title, date, time, status, notes } = session;

    const statusColors = {
        upcoming: '#2563EB',
        completed: '#10B981',
        cancelled: '#EF4444'
    };

    const isToday = new Date(date).toDateString() === new Date().toDateString();

    return (
        <div className={`session-card ${isToday ? 'today' : ''}`}>
            {isToday && <span className="today-badge">Today</span>}
            <div className="session-header">
                <div
                    className="status-dot"
                    style={{ backgroundColor: statusColors[status] || '#64748B' }}
                ></div>
                <span className="status-text">{status}</span>
            </div>

            <h3>{title}</h3>

            <div className="session-details">
                <div className="detail-item">
                    <Calendar size={16} />
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                    <Clock size={16} />
                    <span>{time}</span>
                </div>
            </div>

            {notes && (
                <div className="session-notes">
                    <MessageSquare size={16} />
                    <p>{notes}</p>
                </div>
            )}

            {(role === 'mentor' || role === 'admin') && (
                <div className="session-actions">
                    <button onClick={() => onEdit(session)} className="btn-text">Edit</button>
                    <button onClick={() => onDelete(session.id)} className="btn-text delete">Delete</button>
                </div>
            )}
        </div>
    );
};

export default SessionCard;
