import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './pages/Dashboard';

function App() {
        const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        const openAuthModal = () => {
                setIsAuthModalOpen(true);
        };

        const closeAuthModal = () => {
                setIsAuthModalOpen(false);
        };

        const handleLogin = () => {
                setIsAuthenticated(true);
                closeAuthModal();
        };

        const handleLogout = () => {
                setIsAuthenticated(false);
                localStorage.removeItem('clmi_user');
        };

        const HomePage = () => (
                <>
                        <Header
                                openAuthModal={openAuthModal}
                                isAuthenticated={isAuthenticated}
                                onLogout={handleLogout}
                        />
                        <Hero
                                openAuthModal={openAuthModal}
                                isAuthenticated={isAuthenticated}
                        />
                        <Stats />
                        <Features />
                        <HowItWorks />
                        <CTA
                                openAuthModal={openAuthModal}
                                isAuthenticated={isAuthenticated}
                        />
                        <Footer />
                        <AuthModal
                                isOpen={isAuthModalOpen}
                                onClose={closeAuthModal}
                                onLoginSuccess={handleLogin}
                        />
                </>
        );

        return (
                <Router>
                        <div className="App">
                                <Routes>
                                        {/* Home Route */}
                                        <Route
                                                path="/"
                                                element={isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />}
                                        />

                                        {/* Dashboard Route - Protected */}
                                        <Route
                                                path="/dashboard/*"
                                                element={
                                                        isAuthenticated ? <Dashboard /> : <Navigate to="/" />
                                                }
                                        />

                                        {/* Redirect all other routes */}
                                        <Route path="*" element={<Navigate to="/" />} />
                                </Routes>
                        </div>
                </Router>
        );
}

export default App;