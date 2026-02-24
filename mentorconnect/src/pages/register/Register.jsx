import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../utils/auth';
import { UserPlus, Mail, Lock, User, Shield, Briefcase, GraduationCap } from 'lucide-react';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'mentee'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            register(formData);
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        { id: 'mentee', name: 'Mentee', icon: <GraduationCap size={24} />, desc: 'Learn and grow' },
        { id: 'mentor', name: 'Mentor', icon: <Briefcase size={24} />, desc: 'Share your expertise' },
        { id: 'admin', name: 'Admin', icon: <Shield size={24} />, desc: 'Manage the platform' }
    ];

    return (
        <div className="container">
            <div className="auth-form-container register-container">
                <div className="auth-header">
                    <div className="auth-icon">
                        <UserPlus size={32} color="white" />
                    </div>
                    <h2>Join MentorConnect</h2>
                    <p>Start your journey today</p>
                </div>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Select Your Role</label>
                        <div className="role-selector">
                            {roles.map(role => (
                                <div
                                    key={role.id}
                                    className={`role-option ${formData.role === role.id ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, role: role.id })}
                                >
                                    <div className="role-icon">{role.icon}</div>
                                    <div className="role-info">
                                        <span className="role-name">{role.name}</span>
                                        <span className="role-desc">{role.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <div className="input-with-icon">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-with-icon">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="form-footer">
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
