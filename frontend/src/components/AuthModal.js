import React, { useState } from 'react';
import './Modal.css';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
        const [activeTab, setActiveTab] = useState('login');
        const [loginData, setLoginData] = useState({ email: '', password: '' });
        const [signupData, setSignupData] = useState({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
        });
        const [rememberMe, setRememberMe] = useState(false);
        const [agreeTerms, setAgreeTerms] = useState(false);

        const handleLoginSubmit = (e) => {
                e.preventDefault();
                // Simple validation
                if (!loginData.email || !loginData.password) {
                        alert('Please enter email and password');
                        return;
                }

                // Simulate login - always succeeds
                const user = {
                        id: 'user-' + Date.now(),
                        name: loginData.email.split('@')[0],
                        email: loginData.email,
                        role: 'user'
                };

                // Store in localStorage
                localStorage.setItem('clmi_user', JSON.stringify(user));

                alert(`Login successful! Welcome ${user.name}`);
                onClose();
                setLoginData({ email: '', password: '' });

                // Call success callback
                if (onLoginSuccess) onLoginSuccess(user);
        };

        const handleSignupSubmit = (e) => {
                e.preventDefault();

                // Simple validation
                if (!signupData.name || !signupData.email || !signupData.password) {
                        alert('Please fill all fields');
                        return;
                }

                if (signupData.password !== signupData.confirmPassword) {
                        alert('Passwords do not match!');
                        return;
                }

                if (!agreeTerms) {
                        alert('You must agree to the terms and conditions');
                        return;
                }

                // Simulate signup - always succeeds
                const user = {
                        id: 'user-' + Date.now(),
                        name: signupData.name,
                        email: signupData.email,
                        role: 'user'
                };

                // Store in localStorage
                localStorage.setItem('clmi_user', JSON.stringify(user));

                alert(`Account created successfully! Welcome ${user.name}`);
                onClose();
                setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
                setAgreeTerms(false);

                // Call success callback
                if (onLoginSuccess) onLoginSuccess(user);
        };

        if (!isOpen) return null;

        return (
                <div className="auth-modal active" onClick={onClose}>
                        <div className="auth-container" onClick={(e) => e.stopPropagation()}>
                                <div className="auth-header">
                                        <button className="close-modal" onClick={onClose}>&times;</button>
                                        <h2>Welcome to CLMI Platform</h2>
                                </div>

                                <div className="auth-tabs">
                                        <button
                                                className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('login')}
                                        >
                                                Login
                                        </button>
                                        <button
                                                className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('signup')}
                                        >
                                                Sign Up
                                        </button>
                                </div>

                                <div className="auth-content">
                                        {/* Login Form */}
                                        {activeTab === 'login' && (
                                                <form className="auth-form active" onSubmit={handleLoginSubmit}>
                                                        <div className="form-group">
                                                                <label htmlFor="loginEmail">Email Address</label>
                                                                <input
                                                                        type="email"
                                                                        id="loginEmail"
                                                                        className="form-control"
                                                                        placeholder="student@university.edu.kh"
                                                                        value={loginData.email}
                                                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                                                        required
                                                                />
                                                        </div>

                                                        <div className="form-group">
                                                                <label htmlFor="loginPassword">Password</label>
                                                                <input
                                                                        type="password"
                                                                        id="loginPassword"
                                                                        className="form-control"
                                                                        placeholder="Enter your password"
                                                                        value={loginData.password}
                                                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                                                        required
                                                                />
                                                        </div>

                                                        <div className="remember-forgot">
                                                                <label>
                                                                        <input
                                                                                type="checkbox"
                                                                                id="rememberMe"
                                                                                checked={rememberMe}
                                                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                                        />
                                                                        Remember me
                                                                </label>
                                                                <a href="#forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                                                        </div>

                                                        <button type="submit" className="auth-button">Login to CLMI</button>

                                                        <div className="auth-divider">or continue with</div>

                                                        <div className="social-login">
                                                                <button type="button" className="social-btn google" onClick={() => alert('Google login would be implemented here')}>
                                                                        <i className="fab fa-google"></i> Google
                                                                </button>
                                                                <button type="button" className="social-btn linkedin" onClick={() => alert('LinkedIn login would be implemented here')}>
                                                                        <i className="fab fa-linkedin"></i> LinkedIn
                                                                </button>
                                                        </div>

                                                        <div className="auth-footer">
                                                                Don't have an account? <a href="#signup" onClick={(e) => { e.preventDefault(); setActiveTab('signup'); }}>Sign up here</a>
                                                        </div>
                                                </form>
                                        )}

                                        {/* Signup Form */}
                                        {activeTab === 'signup' && (
                                                <form className="auth-form" onSubmit={handleSignupSubmit}>
                                                        <div className="form-group">
                                                                <label htmlFor="signupName">Full Name</label>
                                                                <input
                                                                        type="text"
                                                                        id="signupName"
                                                                        className="form-control"
                                                                        placeholder="Enter your full name"
                                                                        value={signupData.name}
                                                                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                                                        required
                                                                />
                                                        </div>

                                                        <div className="form-group">
                                                                <label htmlFor="signupEmail">Email Address</label>
                                                                <input
                                                                        type="email"
                                                                        id="signupEmail"
                                                                        className="form-control"
                                                                        placeholder="student@university.edu.kh"
                                                                        value={signupData.email}
                                                                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                                                        required
                                                                />
                                                        </div>

                                                        <div className="form-group">
                                                                <label htmlFor="signupPassword">Password</label>
                                                                <input
                                                                        type="password"
                                                                        id="signupPassword"
                                                                        className="form-control"
                                                                        placeholder="Create a strong password"
                                                                        value={signupData.password}
                                                                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                                                        required
                                                                />
                                                        </div>

                                                        <div className="form-group">
                                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                                <input
                                                                        type="password"
                                                                        id="confirmPassword"
                                                                        className="form-control"
                                                                        placeholder="Re-enter your password"
                                                                        value={signupData.confirmPassword}
                                                                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                                                        required
                                                                />
                                                        </div>

                                                        <div className="terms-checkbox">
                                                                <input
                                                                        type="checkbox"
                                                                        id="agreeTerms"
                                                                        checked={agreeTerms}
                                                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                                                        required
                                                                />
                                                                <label htmlFor="agreeTerms">
                                                                        I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                                                                </label>
                                                        </div>

                                                        <button type="submit" className="auth-button">Create Account</button>

                                                        <div className="auth-divider">or sign up with</div>

                                                        <div className="social-login">
                                                                <button type="button" className="social-btn google" onClick={() => alert('Google signup would be implemented here')}>
                                                                        <i className="fab fa-google"></i> Google
                                                                </button>
                                                                <button type="button" className="social-btn linkedin" onClick={() => alert('LinkedIn signup would be implemented here')}>
                                                                        <i className="fab fa-linkedin"></i> LinkedIn
                                                                </button>
                                                        </div>

                                                        <div className="auth-footer">
                                                                Already have an account? <a href="#login" onClick={(e) => { e.preventDefault(); setActiveTab('login'); }}>Login here</a>
                                                        </div>
                                                </form>
                                        )}
                                </div>
                        </div>
                </div>
        );
};

export default AuthModal;