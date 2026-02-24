import React, { useState, useEffect } from 'react';
import { getUsers, getMatches, saveMatches } from '../../utils/storage';
import { UserCheck, Users, Link as LinkIcon, AlertCircle, CheckCircle } from 'lucide-react';
import MentorCard from '../../components/mentorCard/MentorCard';
import MenteeCard from '../../components/menteeCard/MenteeCard';
import './Matching.css';

const Matching = () => {
    const [mentors, setMentors] = useState([]);
    const [mentees, setMentees] = useState([]);
    const [matches, setMatches] = useState([]);
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const allUsers = getUsers();
        setMentors(allUsers.filter(u => u.role === 'mentor'));
        setMentees(allUsers.filter(u => u.role === 'mentee'));
        setMatches(getMatches());
    }, []);

    const handleMatch = (mentor) => {
        if (!selectedMentee) {
            setMessage({ type: 'error', text: 'Please select a mentee first.' });
            return;
        }

        const existingMatch = matches.find(m => m.menteeId === selectedMentee.id);
        if (existingMatch) {
            const confirmReplace = window.confirm(`${selectedMentee.name} is already matched. Replace mentor?`);
            if (!confirmReplace) return;

            const updatedMatches = matches.map(m =>
                m.menteeId === selectedMentee.id ? { ...m, mentorId: mentor.id } : m
            );
            saveMatches(updatedMatches);
            setMatches(updatedMatches);
        } else {
            const newMatch = {
                id: Date.now().toString(),
                menteeId: selectedMentee.id,
                mentorId: mentor.id,
                createdAt: new Date().toISOString()
            };
            const updatedMatches = [...matches, newMatch];
            saveMatches(updatedMatches);
            setMatches(updatedMatches);
        }

        setMessage({ type: 'success', text: `Successfully matched ${selectedMentee.name} with ${mentor.name}!` });
        setSelectedMentee(null);

        setTimeout(() => setMessage(null), 3000);
    };

    const getMenteeMatch = (menteeId) => {
        const match = matches.find(m => m.menteeId === menteeId);
        if (!match) return null;
        return mentors.find(m => m.id === match.mentorId);
    };

    return (
        <div className="page-container container">
            <div className="section-title">
                <h1>Mentor-Mentee Matching</h1>
                <p>Assign mentors to mentees to establish professional learning journeys.</p>
            </div>

            {message && (
                <div className={`alert-banner ${message.type}`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span>{message.text}</span>
                </div>
            )}

            <div className="matching-layout">
                <div className="mentees-selection">
                    <h2>1. Select Mentee</h2>
                    <div className="mentees-list">
                        {mentees.map(mentee => {
                            const matchedMentor = getMenteeMatch(mentee.id);
                            return (
                                <div
                                    key={mentee.id}
                                    className={`mentee-item ${selectedMentee?.id === mentee.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedMentee(mentee)}
                                >
                                    <div className="mentee-mini-avatar">{mentee.name.charAt(0)}</div>
                                    <div className="mentee-mini-info">
                                        <h4>{mentee.name}</h4>
                                        {matchedMentor ? (
                                            <span className="match-status matched">Matched with {matchedMentor.name}</span>
                                        ) : (
                                            <span className="match-status unmatched">Not matched</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mentors-selection">
                    <h2>2. Assign Mentor</h2>
                    {selectedMentee ? (
                        <div className="mentors-grid-small">
                            {mentors.map(mentor => (
                                <MentorCard
                                    key={mentor.id}
                                    mentor={mentor}
                                    onMatch={handleMatch}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-selection-placeholder">
                            <LinkIcon size={48} />
                            <p>Select a mentee from the left to view available mentors.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Matching;
