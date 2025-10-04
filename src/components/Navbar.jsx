import { Link } from 'react-router-dom';
import '../styles/App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📊</span>
          Scheduler App
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/algorithms" className="nav-link">Algorithms</Link>
          </li>
          <li className="nav-item">
            <Link to="/compare" className="nav-link">Compare</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
