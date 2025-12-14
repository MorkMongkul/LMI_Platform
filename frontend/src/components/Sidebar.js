import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css'

const Sidebar = () => {
        const [isCollapsed, setIsCollapsed] = useState(false);
        const [isMobileOpen, setIsMobileOpen] = useState(false);

        const navItems = [
                {
                        path: '/dashboard/jobs',
                        icon: 'fas fa-briefcase',
                        label: 'Jobs',
                        color: '#0057b8'
                },
                {
                        path: '/dashboard/recommendations',
                        icon: 'fas fa-robot',
                        label: 'Chat-Bot',
                        color: '#28a745'
                },
                {
                        path: '/dashboard/skills',
                        icon: 'fas fa-tools',
                        label: 'Skills',
                        color: '#ffc107'
                },
                {
                        path: '/dashboard/university',
                        icon: 'fas fa-university',
                        label: 'University',
                        color: '#dc3545'
                },
        ];

        // Get user from localStorage
        const user = JSON.parse(localStorage.getItem('clmi_user') || '{}');

        const handleLogout = () => {
                localStorage.removeItem('clmi_user');
                window.location.href = '/';
        };

        const toggleSidebar = () => {
                setIsCollapsed(!isCollapsed);
        };

        const toggleMobileSidebar = () => {
                setIsMobileOpen(!isMobileOpen);
        };

        return (
                <>
                        {/* Mobile Toggle Button - Always visible on mobile */}
                        <button
                                className="mobile-toggle-btn"
                                onClick={toggleMobileSidebar}
                                title="Toggle sidebar"
                        >
                                <i className={`fas fa-${isMobileOpen ? 'times' : 'bars'}`}></i>
                        </button>

                        <div className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'show' : ''}`}>
                                {/* Top Header Section with just Collapse Button */}
                                <div className="sidebar-top-section">
                                        {/* Only collapse button at the top */}
                                        <button
                                                className="sidebar-toggle top-toggle"
                                                onClick={toggleSidebar}
                                                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                                        >
                                                <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
                                                {!isCollapsed && <span>Collapse</span>}
                                        </button>
                                </div>

                                <nav className="sidebar-nav">
                                        {navItems.map((item) => (
                                                <NavLink
                                                        key={item.path}
                                                        to={item.path}
                                                        className={({ isActive }) =>
                                                                `nav-link ${isActive ? 'active' : ''}`
                                                        }
                                                        style={({ isActive }) => ({
                                                                borderLeft: isActive ? `4px solid ${item.color}` : '4px solid transparent',
                                                                justifyContent: isCollapsed ? 'center' : 'flex-start'
                                                        })}
                                                        title={isCollapsed ? item.label : ''}
                                                        onClick={() => setIsMobileOpen(false)}
                                                >
                                                        <div className="nav-icon" style={{ color: item.color }}>
                                                                <i className={item.icon}></i>
                                                        </div>
                                                        {!isCollapsed && <span className="nav-text">{item.label}</span>}
                                                </NavLink>
                                        ))}
                                </nav>

                                <div className="sidebar-footer">
                                        {/* User info and logout button in footer */}
                                        <div className="footer-content">
                                                {!isCollapsed ? (
                                                        <>
                                                                <div className="user-info-footer">
                                                                        <div className="user-avatar-footer">
                                                                                <i className="fas fa-user-circle"></i>
                                                                        </div>
                                                                        <div className="user-details-footer">
                                                                                <h4>{user.name || 'phallymakara01'}</h4>
                                                                                <p>{user.email || 'phallymakara01@gmail.com'}</p>
                                                                        </div>
                                                                </div>
                                                                <button
                                                                        className="logout-btn"
                                                                        onClick={handleLogout}
                                                                >
                                                                        <i className="fas fa-sign-out-alt"></i>
                                                                        <span>Logout</span>
                                                                </button>
                                                        </>
                                                ) : (
                                                        <>
                                                                <button
                                                                        className="logout-btn collapsed"
                                                                        onClick={handleLogout}
                                                                        title="Logout"
                                                                >
                                                                        <i className="fas fa-sign-out-alt"></i>
                                                                </button>
                                                                <div className="collapsed-user-avatar" title={`${user.name || 'phallymakara01'}\n${user.email || 'phallymakara01@gmail.com'}`}>
                                                                        <i className="fas fa-user-circle"></i>
                                                                </div>
                                                        </>
                                                )}
                                        </div>
                                </div>
                        </div>
                </>
        );
};

export default Sidebar;