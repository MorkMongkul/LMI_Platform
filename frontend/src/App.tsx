import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home/Home';
import JobsPage from './pages/Jobs/Jobs';
import UniversityPage from './pages/University/University';
import CompanyPage from './pages/Company/Company';
import AnalyticPage from './pages/Analytic/Analytic';
import AboutPage from './pages/About/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/university" element={<UniversityPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/analytic" element={<AnalyticPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


