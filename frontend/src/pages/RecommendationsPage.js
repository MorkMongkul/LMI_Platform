import React, { useState, useRef, useEffect } from 'react';
import '../styles/recommendationPage.css'

const RecommendationsPage = () => {
        const [messages, setMessages] = useState([
                {
                        id: 1,
                        text: "Hello! I'm your AI Career Assistant. I can help you with career recommendations, job market insights, and skill analysis. How can I assist you today?",
                        sender: 'bot',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
        ]);
        const [inputText, setInputText] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const messagesEndRef = useRef(null);

        const scrollToBottom = () => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        useEffect(() => {
                scrollToBottom();
        }, [messages]);

        const handleSendMessage = async (e) => {
                e.preventDefault();
                if (!inputText.trim()) return;

                const userMessage = {
                        id: messages.length + 1,
                        text: inputText,
                        sender: 'user',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                setMessages(prev => [...prev, userMessage]);
                setInputText('');
                setIsLoading(true);

                // Simulate AI response
                setTimeout(() => {
                        const botResponses = [
                                "Based on your profile and current market trends, I'd recommend exploring roles in Data Analysis or Digital Marketing. These fields have seen 30% growth in Cambodia over the past year.",
                                "I can analyze your skills and suggest relevant courses. Could you share more about your current skill set?",
                                "Looking at market data, the demand for tech skills like React.js and Python is growing rapidly in Phnom Penh. Would you like me to suggest specific learning resources?",
                                "I notice you're interested in career growth. Let me analyze current job openings that match your profile...",
                                "Based on recent job postings, companies are looking for professionals with both technical and soft skills. Communication and problem-solving are highly valued."
                        ];

                        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

                        const botMessage = {
                                id: messages.length + 2,
                                text: randomResponse,
                                sender: 'bot',
                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        };

                        setMessages(prev => [...prev, botMessage]);
                        setIsLoading(false);
                }, 1500);
        };

        const handleQuickQuestion = (question) => {
                setInputText(question);
        };

        const quickQuestions = [
                "What career is best for me?",
                "Show me job trends in Cambodia",
                "What skills should I learn?",
                "Match me with universities",
                "Analyze my resume"
        ];

        return (
                <div className="recommendations-container">
                        <div className="chatbot-wrapper">
                                <div className="chatbot-messages">
                                        {messages.map((message) => (
                                                <div
                                                        key={message.id}
                                                        className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                                                >
                                                        <div className="message-content">
                                                                <div className="message-text">{message.text}</div>
                                                                <div className="message-time">{message.time}</div>
                                                        </div>
                                                </div>
                                        ))}

                                        {isLoading && (
                                                <div className="message bot-message">
                                                        <div className="message-content">
                                                                <div className="typing-indicator">
                                                                        <span></span>
                                                                        <span></span>
                                                                        <span></span>
                                                                </div>
                                                        </div>
                                                </div>
                                        )}

                                        <div ref={messagesEndRef} />
                                </div>

                                <div className="chatbot-controls">
                                        <div className="quick-questions">
                                                {quickQuestions.map((question, index) => (
                                                        <button
                                                                key={index}
                                                                className="quick-question-btn"
                                                                onClick={() => handleQuickQuestion(question)}
                                                        >
                                                                {question}
                                                        </button>
                                                ))}
                                        </div>

                                        <form className="message-input-form" onSubmit={handleSendMessage}>
                                                <div className="input-container">
                                                        <input
                                                                type="text"
                                                                value={inputText}
                                                                onChange={(e) => setInputText(e.target.value)}
                                                                placeholder="Type your career question here..."
                                                                className="message-input"
                                                                disabled={isLoading}
                                                        />
                                                        <button
                                                                type="submit"
                                                                className="send-btn"
                                                                disabled={!inputText.trim() || isLoading}
                                                        >
                                                                <i className="fas fa-paper-plane"></i>
                                                        </button>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default RecommendationsPage;