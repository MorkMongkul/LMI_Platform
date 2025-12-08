import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CLMI Platform</Link>
      </div>
      <ul className="navbar-nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/university">University</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/analytic">Analytic</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;