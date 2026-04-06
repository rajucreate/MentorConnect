import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, Calendar, Users, BarChart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../utils/auth';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, role } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/', roles: ['public'] },
        { name: 'Dashboard', path: '/dashboard', roles: ['ADMIN', 'MENTOR', 'MENTEE'] },
        { name: 'Sessions', path: '/sessions', roles: ['ADMIN', 'MENTOR', 'MENTEE'] },
        { name: 'Matching', path: '/matching', roles: ['ADMIN'] },
        { name: 'Progress', path: '/progress', roles: ['ADMIN', 'MENTOR', 'MENTEE'] },
    ];

    const filteredLinks = navLinks.filter(link => {
        if (link.roles.includes('public') && !isAuthenticated) return true;
        if (isAuthenticated && link.roles.includes(role)) return true;
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
                    {isAuthenticated ? (
                        <li className="user-menu">
                            <Link to="/profile" className="profile-link">
                                <User size={20} />
                                <span>{role}</span>
                            </Link>
                            <button onClick={handleLogout} className="logout-btn">
                                <LogOut size={20} />
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className="btn btn-primary" style={{color:"#ffffff"}}>Login</Link>
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
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                            <button onClick={handleLogout} className="mobile-logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary" style={{color:"#ffffff"}} onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
