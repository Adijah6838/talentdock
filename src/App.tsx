import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Dashboard } from './pages/Dashboard';
import { JobDetails } from './pages/JobDetails';
import { SavedJobs } from './pages/SavedJobs';
import { Applications } from './pages/Applications';

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}