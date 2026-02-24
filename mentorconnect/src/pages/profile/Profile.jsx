import React, { useState } from 'react';
import { getCurrentUser, setCurrentUser } from '../../utils/storage';
import { User, Mail, Shield, UserCircle, Save, Camera } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const user = getCurrentUser();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: 'Professional passionate about learning and growth in the tech industry.',
        location: 'New York, USA',
        skills: 'React, JavaScript, CSS, Node.js'
    });

    const [saved, setSaved] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, we'd update the user in the users list too
        setCurrentUser({ ...user, name: formData.name });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="page-container container">
            <div className="profile-layout">
                <div className="profile-sidebar">
                    <div className="profile-card-static">
                        <div className="profile-avatar-large">
                            {user?.name?.charAt(0)}
                            <div className="avatar-edit">
                                <Camera size={16} />
                            </div>
                        </div>
                        <h2>{user?.name}</h2>
                        <span className="profile-role-badge">{user?.role}</span>
                    </div>
                </div>

                <div className="profile-main">
                    <div className="profile-form-card">
                        <div className="section-header">
                            <h2>Profile Settings</h2>
                            {saved && <span className="save-status">Changes saved!</span>}
                        </div>

                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <div className="input-with-icon">
                                        <User size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="input-with-icon">
                                        <Mail size={18} className="input-icon" />
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <div className="input-with-icon">
                                        <Shield size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={user?.role}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Bio</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Skills / Expertise</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.skills}
                                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                    placeholder="e.g. React, UI Design, Marketing"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                <Save size={20} /> Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
