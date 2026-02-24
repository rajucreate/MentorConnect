import React from 'react';
import { Award, BookOpen, Star } from 'lucide-react';
import './MentorCard.css';

const MentorCard = ({ mentor, onMatch }) => {
    return (
        <div className="mentor-card">
            <div className="mentor-avatar">
                {mentor.name.charAt(0)}
            </div>
            <div className="mentor-info">
                <h3>{mentor.name}</h3>
                <p className="mentor-email">{mentor.email}</p>
                <div className="mentor-meta">
                    <div className="meta-item">
                        <Award size={16} />
                        <span>Expert Mentor</span>
                    </div>
                    <div className="meta-item">
                        <Star size={16} className="star-icon" />
                        <span>4.9 (12 reviews)</span>
                    </div>
                </div>
            </div>
            {onMatch && (
                <button
                    className="btn btn-outline w-full"
                    onClick={() => onMatch(mentor)}
                >
                    Match with Mentee
                </button>
            )}
        </div>
    );
};

export default MentorCard;
