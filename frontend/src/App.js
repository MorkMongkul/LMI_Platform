import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function App() {
        const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

        const openAuthModal = () => {
                setIsAuthModalOpen(true);
        };

        const closeAuthModal = () => {
                setIsAuthModalOpen(false);
        };

        return (
                <div className="App">
                        <Header openAuthModal={openAuthModal} />
                        <Hero openAuthModal={openAuthModal} />
                        <Stats />
                        <Features />
                        <HowItWorks />
                        <CTA openAuthModal={openAuthModal} />
                        <Footer />
                        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
                </div>
        );
}

export default App;