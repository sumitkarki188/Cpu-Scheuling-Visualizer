import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">CPU Scheduling Visualizer</h1>
        <p className="hero-subtitle">
          Understand how different CPU scheduling algorithms work with interactive visualizations
        </p>
        <Link to="/algorithms" className="get-started-btn">
          Get Started
        </Link>
      </div>

      <div className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">ℹ️</div>
            <h3 className="feature-title">Interactive Visualization</h3>
            <p className="feature-description">
              Watch how processes move through the CPU in real-time with animated visualizations.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Ready Queue View</h3>
            <p className="feature-description">
              See the real-time state of the ready queue as processes are scheduled.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔀</div>
            <h3 className="feature-title">Multiple Algorithms</h3>
            <p className="feature-description">
              Compare different scheduling algorithms like FCFS, SJF, Priority, and Round Robin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
