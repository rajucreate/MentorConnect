import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, Calendar, Users, BarChart } from 'lucide-react';
import { getCurrentUser } from '../../utils/storage';
import { logout } from '../../utils/auth';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = getCurrentUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/', roles: ['public'] },
        { name: 'Dashboard', path: '/dashboard', roles: ['admin', 'mentor', 'mentee'] },
        { name: 'Sessions', path: '/sessions', roles: ['admin', 'mentor', 'mentee'] },
        { name: 'Matching', path: '/matching', roles: ['admin'] },
        { name: 'Progress', path: '/progress', roles: ['admin', 'mentor', 'mentee'] },
    ];

    const filteredLinks = navLinks.filter(link => {
        if (link.roles.includes('public') && !user) return true;
        if (user && link.roles.includes(user.role)) return true;
        return false;
    });

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
                    🌟 <span>MentorConnect</span>
                </Link>

                {/* Desktop Menu */}
                <ul className="nav-links">
                    {filteredLinks.map(link => (
                        <li key={link.path}>
                            <Link to={link.path}>{link.name}</Link>
                        </li>
                    ))}
                    {user ? (
                        <li className="user-menu">
                            <Link to="/profile" className="profile-link">
                                <User size={20} />
                                <span>{user.name}</span>
                            </Link>
                            <button onClick={handleLogout} className="logout-btn">
                                <LogOut size={20} />
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className="btn btn-primary">Login</Link>
                        </li>
                    )}
                </ul>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile menu */}
                <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
                    {filteredLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <>
                            <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                            <button onClick={handleLogout} className="mobile-logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
