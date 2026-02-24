import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import './MenteeCard.css';

const MenteeCard = ({ mentee, progress = 0 }) => {
    return (
        <div className="mentee-card">
            <div className="mentee-avatar-sm">
                {mentee.name.charAt(0)}
            </div>
            <div className="mentee-content">
                <h3>{mentee.name}</h3>
                <p>{mentee.email}</p>
                <div className="mentee-progress">
                    <div className="progress-info">
                        <span>Overall Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenteeCard;
