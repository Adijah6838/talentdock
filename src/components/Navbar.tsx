import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Bookmark, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Discover', path: '/', icon: Briefcase },
    { name: 'Saved Jobs', path: '/saved', icon: Bookmark },
    { name: 'Applications', path: '/applications', icon: FileText },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">TalentDock</Link>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {links.map((link) => {
            // We must extract the icon to a capitalized variable so JSX recognizes it as a React component
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}