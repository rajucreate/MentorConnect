import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, BarChart, ChevronRight, Star, Heart, Shield } from 'lucide-react';
import { getCurrentUser } from '../../utils/storage';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);
    const features = [
        {
            icon: <Users size={32} />,
            title: 'Mentor Matching',
            desc: 'Connect with expert mentors tailored to your career goals and skill level.'
        },
        {
            icon: <Calendar size={32} />,
            title: 'Session Scheduling',
            desc: 'Book and manage mentoring sessions with a seamless integrated calendar.'
        },
        {
            icon: <BarChart size={32} />,
            title: 'Progress Tracking',
            desc: 'Monitor your growth with detailed milestones and performance analytics.'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Software Engineer',
            text: 'MentorConnect helped me transition from junior to senior dev in just 6 months. My mentor was incredible!',
            avatar: 'SC'
        },
        {
            name: 'Marcus Johnson',
            role: 'UX Designer',
            text: 'The progress tracking feature keeps me motivated. I can see exactly how far I have come.',
            avatar: 'MJ'
        },
        {
            name: 'Elena Rodriguez',
            role: 'Project Manager',
            text: 'As a mentor, I love how easy it is to manage my sessions and track my mentees milestones.',
            avatar: 'ER'
        }
    ];

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <h1 className="hero-title">
                        Unlock Your Potential with <span className="text-gradient">Expert Guidance</span>
                    </h1>
                    <p className="hero-subtitle">
                        Connect with industry-leading mentors, schedule personalized coaching sessions,
                        and track your professional growth—all in one place.
                    </p>
                    <div className="hero-btns">
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Get Started for Free <ChevronRight size={20} />
                        </Link>
                        <Link to="/login" className="btn btn-outline btn-lg">
                            View Mentors
                        </Link>
                    </div>
                </div>
                <div className="hero-bg-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section" id="features">
                <div className="container">
                    <div className="section-title">
                        <h2>Everything you need to <span className="text-secondary">Succeed</span></h2>
                        <p>Our platform is designed to make the mentorship experience seamless and effective for both mentors and mentees.</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container stats-grid">
                    <div className="stat-item">
                        <h3>500+</h3>
                        <p>Expert Mentors</p>
                    </div>
                    <div className="stat-item">
                        <h3>2k+</h3>
                        <p>Happy Mentees</p>
                    </div>
                    <div className="stat-item">
                        <h3>10k+</h3>
                        <p>Sessions Completed</p>
                    </div>
                    <div className="stat-item">
                        <h3>98%</h3>
                        <p>Success Rate</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section" id="testimonials">
                <div className="container">
                    <div className="section-title">
                        <h2>Real Stories from <span className="text-accent">Real People</span></h2>
                        <p>Join thousands of professionals who have accelerated their careers with MentorConnect.</p>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((t, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-stars">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                </div>
                                <p className="testimonial-text">"{t.text}"</p>
                                <div className="testimonial-user">
                                    <div className="avatar-small">{t.avatar}</div>
                                    <div className="user-info">
                                        <h4>{t.name}</h4>
                                        <span>{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container cta-content">
                    <h2>Ready to start your growth journey?</h2>
                    <p>Join MentorConnect today and get matched with a mentor who will help you reach your goals.</p>
                    <Link to="/register" className="btn btn-white">Join the Community</Link>
                </div>
            </section>
        </div>
    );
};

export default Landing;
