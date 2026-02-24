import React, { useState, useEffect } from 'react';
import { getCurrentUser, getSessions, saveSessions, getUsers, getMatches } from '../../utils/storage';
import { Plus, Search, Filter, Calendar as CalIcon, Clock, Trash2, Edit2, AlertTriangle } from 'lucide-react';
import SessionCard from '../../components/sessionCard/SessionCard';
import Modal from '../../components/modal/Modal';
import './Sessions.css';

const Sessions = () => {
    const user = getCurrentUser();
    const [sessions, setSessions] = useState([]);
    const [filteredSessions, setFilteredSessions] = useState([]);
    const [filter, setFilter] = useState('all'); // all, upcoming, past, today
    const [search, setSearch] = useState('');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentSession, setCurrentSession] = useState(null);
    const [sessionToDelete, setSessionToDelete] = useState(null);

    // Form states
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        notes: '',
        status: 'upcoming',
        menteeId: '',
        mentorId: ''
    });

    const [availableMentees, setAvailableMentees] = useState([]);
    const [myMentor, setMyMentor] = useState(null);

    useEffect(() => {
        const allSessions = getSessions();
        const mySessions = allSessions.filter(s =>
            user.role === 'admin' || s.mentorId === user.id || s.menteeId === user.id
        );
        setSessions(mySessions);

        if (user.role === 'mentor') {
            const matches = getMatches().filter(m => m.mentorId === user.id);
            const mIds = matches.map(m => m.menteeId);
            const allMentees = getUsers().filter(u => u.role === 'mentee' && mIds.includes(u.id));
            setAvailableMentees(allMentees);
        } else if (user.role === 'admin') {
            setAvailableMentees(getUsers().filter(u => u.role === 'mentee'));
        } else if (user.role === 'mentee') {
            const match = getMatches().find(m => m.menteeId === user.id);
            if (match) {
                const mentor = getUsers().find(u => u.id === match.mentorId);
                setMyMentor(mentor);
            }
        }
    }, [user.id, user.role]);

    useEffect(() => {
        let result = [...sessions];

        // Filter by status/time
        const today = new Date().toDateString();
        if (filter === 'upcoming') {
            result = result.filter(s => s.status === 'upcoming');
        } else if (filter === 'past') {
            result = result.filter(s => s.status === 'completed' || new Date(s.date) < new Date());
        } else if (filter === 'today') {
            result = result.filter(s => new Date(s.date).toDateString() === today);
        }

        // Search
        if (search) {
            result = result.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredSessions(result);
    }, [filter, search, sessions]);

    const handleOpenModal = (session = null) => {
        if (session) {
            setCurrentSession(session);
            setFormData(session);
        } else {
            setCurrentSession(null);
            setFormData({
                title: '',
                date: '',
                time: '',
                notes: '',
                status: 'upcoming',
                menteeId: user.role === 'mentee' ? user.id : '',
                mentorId: user.role === 'mentor' ? user.id : (user.role === 'mentee' && myMentor ? myMentor.id : '')
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allSessions = getSessions();

        if (currentSession) {
            // Update
            const updatedSessions = allSessions.map(s => s.id === currentSession.id ? { ...formData } : s);
            saveSessions(updatedSessions);
        } else {
            // Create
            const newSession = {
                ...formData,
                id: Date.now().toString(),
                status: user.role === 'mentee' ? 'requested' : 'upcoming'
            };
            allSessions.push(newSession);
            saveSessions(allSessions);
        }

        const refreshedSessions = getSessions().filter(s =>
            user.role === 'admin' || s.mentorId === user.id || s.menteeId === user.id
        );
        setSessions(refreshedSessions);
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        const allSessions = getSessions();
        const updatedSessions = allSessions.filter(s => s.id !== sessionToDelete);
        saveSessions(updatedSessions);
        setSessions(updatedSessions.filter(s =>
            user.role === 'admin' || s.mentorId === user.id || s.menteeId === user.id
        ));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="page-container container">
            <div className="sessions-header">
                <h1>{user.role === 'mentee' ? 'My Sessions' : 'Management Sessions'}</h1>
                {user.role === 'mentee' ? (
                    <button className="btn btn-primary" onClick={() => handleOpenModal()} disabled={!myMentor}>
                        <Plus size={20} /> Request Session
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                        <Plus size={20} /> Add New Session
                    </button>
                )}
            </div>

            {!myMentor && user.role === 'mentee' && (
                <div className="alert-banner error" style={{ marginBottom: '2rem' }}>
                    <AlertTriangle size={20} />
                    <span>You need to be matched with a mentor before requesting sessions.</span>
                </div>
            )}

            <div className="sessions-toolbar">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search sessions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setFilter('upcoming')}
                    >
                        Upcoming
                    </button>
                    <button
                        className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
                        onClick={() => setFilter('today')}
                    >
                        Today
                    </button>
                    <button
                        className={`filter-btn ${filter === 'past' ? 'active' : ''}`}
                        onClick={() => setFilter('past')}
                    >
                        Past
                    </button>
                </div>
            </div>

            <div className="sessions-grid">
                {filteredSessions.length > 0 ? (
                    filteredSessions.map(session => (
                        <SessionCard
                            key={session.id}
                            session={session}
                            role={user.role}
                            onEdit={handleOpenModal}
                            onDelete={(id) => {
                                setSessionToDelete(id);
                                setIsDeleteModalOpen(true);
                            }}
                        />
                    ))
                ) : (
                    <div className="empty-state-large">
                        <CalIcon size={48} />
                        <h3>No sessions found</h3>
                        <p>Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentSession ? "Edit Session" : (user.role === 'mentee' ? "Request Session" : "Schedule New Session")}
            >
                <form onSubmit={handleSubmit} className="session-form">
                    <div className="form-group">
                        <label>Session Title</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Weekly Mentorship Check-in"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                className="form-control"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Time</label>
                            <input
                                type="time"
                                className="form-control"
                                required
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>

                    {user.role !== 'mentee' && (
                        <div className="form-group">
                            <label>Select Mentee</label>
                            <select
                                className="form-control"
                                required
                                value={formData.menteeId}
                                onChange={(e) => setFormData({ ...formData, menteeId: e.target.value })}
                            >
                                <option value="">Select a mentee</option>
                                {availableMentees.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {user.role === 'mentee' && (
                        <div className="form-group">
                            <label>Mentor</label>
                            <input
                                type="text"
                                className="form-control"
                                value={myMentor?.name || ''}
                                disabled
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Notes (Optional)</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="What will you discuss?"
                        ></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {currentSession ? "Update Session" : (user.role === 'mentee' ? "Send Request" : "Schedule Session")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirm Deletion"
            >
                <div className="delete-confirm">
                    <div className="warn-icon">
                        <AlertTriangle size={32} color="#EF4444" />
                    </div>
                    <p>Are you sure you want to delete this session? This action cannot be undone.</p>
                    <div className="modal-footer">
                        <button className="btn btn-outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete Session</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Sessions;
