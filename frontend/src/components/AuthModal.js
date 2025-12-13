import React, { useState } from 'react';
import { AuthController } from '../controllers/AuthController';
import './Modal.css';

const AuthModal = ({ isOpen, onClose }) => {
        const [activeTab, setActiveTab] = useState('login');
        const [loginData, setLoginData] = useState({ email: '', password: '' });
        const [signupData, setSignupData] = useState({
                name: '',
                email: '',
                userType: '',
                password: '',
                confirmPassword: ''
        });
        const [rememberMe, setRememberMe] = useState(false);
        const [agreeTerms, setAgreeTerms] = useState(false);

        //Handle Login Section
        const handleLoginSubmit = async (e) => {
                e.preventDefault();
                const result = await AuthController.login(loginData.email, loginData.password, rememberMe);
                if (result.success) {
                        alert(`Login successful! Welcome ${result.user.name}`);
                        onClose();
                        setLoginData({ email: '', password: '' });
                } else {
                        alert(result.message);
                }
        };
        // Handle SignUp Section
        const handleSignupSubmit = async (e) => {
                e.preventDefault();
                // Validate all fields
                if (signupData.password !== signupData.confirmPassword) {
                        alert('Passwords do not match!');
                        return;
                }

                if (!signupData.userType) {
                        alert('Please select your role');
                        return;
                }

                if (!agreeTerms) {
                        alert('You must agree to the terms and conditions');
                        return;
                }

                if (signupData.password.length < 6) {
                        alert('Password must be at least 6 characters');
                        return;
                }

                // Show loading state
                const submitBtn = e.target.querySelector('.auth-button');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Creating Account...';
                submitBtn.disabled = true;

                const result = await AuthController.signup(
                        signupData.name,
                        signupData.email,
                        signupData.userType, // Pass userType
                        signupData.password,
                        agreeTerms
                );

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                if (result.success) {
                        alert(`Account created successfully!\n\nWelcome ${result.user.name}!\nEmail: ${result.user.email}\nRole: ${result.user.role}\n\nYou can now login to access CLMI features.`);
                        onClose();
                        setActiveTab('login');
                        setSignupData({
                                name: '',
                                email: '',
                                userType: '',
                                password: '',
                                confirmPassword: ''
                        });
                        setAgreeTerms(false);
                } else {
                        alert(`${result.message}`);
                }
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
                                                <form className="auth-form active" onSubmit={handleSignupSubmit}>
                                                        <div className="form-group">
                                                                <label htmlFor="signupName">Full Name *</label>
                                                                <input
                                                                        type="text"
                                                                        id="signupName"
                                                                        className="form-control"
                                                                        placeholder="Enter your full name"
                                                                        value={signupData.name}
                                                                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                                                        required
                                                                />
                                                                {signupData.name && signupData.name.length < 2 && (
                                                                        <small className="text-error">Name must be at least 2 characters</small>
                                                                )}
                                                        </div>

                                                        <div className="form-group">
                                                                <label htmlFor="signupEmail">Email Address *</label>
                                                                <input
                                                                        type="email"
                                                                        id="signupEmail"
                                                                        className="form-control"
                                                                        placeholder="student@university.edu.kh"
                                                                        value={signupData.email}
                                                                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                                                        required
                                                                />
                                                                {signupData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email) && (
                                                                        <small className="text-error">Please enter a valid email</small>
                                                                )}
                                                        </div>

                                                        <div className="form-group">
                                                                <label htmlFor="userType">I am a *</label>
                                                                <select
                                                                        id="userType"
                                                                        className="form-control"
                                                                        value={signupData.userType}
                                                                        onChange={(e) => setSignupData({ ...signupData, userType: e.target.value })}
                                                                        required
                                                                >
                                                                        <option value="">Select your role</option>
                                                                        <option value="student">Student / Job Seeker</option>
                                                                        <option value="university">University Staff</option>
                                                                        <option value="employer">Employer / HR Professional</option>
                                                                        <option value="policymaker">Policy Maker / Researcher</option>
                                                                </select>
                                                        </div>

                                                        <div className="form-group">
                                                                <label htmlFor="signupPassword">Password *</label>
                                                                <input
                                                                        type="password"
                                                                        id="signupPassword"
                                                                        className="form-control"
                                                                        placeholder="Create a strong password (min. 6 characters)"
                                                                        value={signupData.password}
                                                                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                                                        required
                                                                />
                                                                <div className="password-strength">
                                                                        {signupData.password && (
                                                                                <>
                                                                                        <div className={`strength-bar ${signupData.password.length >= 6 ? 'strong' : 'weak'}`}></div>
                                                                                        <small>{signupData.password.length >= 6 ? '✓ Strong password' : 'Password should be at least 6 characters'}</small>
                                                                                </>
                                                                        )}
                                                                </div>
                                                        </div>

                                                        <div className="form-group">
                                                                <label htmlFor="confirmPassword">Confirm Password *</label>
                                                                <input
                                                                        type="password"
                                                                        id="confirmPassword"
                                                                        className="form-control"
                                                                        placeholder="Re-enter your password"
                                                                        value={signupData.confirmPassword}
                                                                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                                                        required
                                                                />
                                                                {signupData.confirmPassword && signupData.password !== signupData.confirmPassword && (
                                                                        <small className="text-error">Passwords do not match</small>
                                                                )}
                                                        </div>

                                                        <div className="form-group">
                                                                <div className="terms-checkbox">
                                                                        <input
                                                                                type="checkbox"
                                                                                id="agreeTerms"
                                                                                checked={agreeTerms}
                                                                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                                                                required
                                                                        />
                                                                        <label htmlFor="agreeTerms">
                                                                                I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a> *
                                                                        </label>
                                                                </div>
                                                                {!agreeTerms && signupData.name && (
                                                                        <small className="text-error">You must agree to the terms and conditions</small>
                                                                )}
                                                        </div>

                                                        <button
                                                                type="submit"
                                                                className="auth-button"
                                                                disabled={!agreeTerms || signupData.password !== signupData.confirmPassword}
                                                        >
                                                                Create Account
                                                        </button>

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