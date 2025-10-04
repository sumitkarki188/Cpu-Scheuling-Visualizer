import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AlgorithmsPage from './components/AlgorithmsPage';
import ComparePage from './components/ComparePage';
import FCFS from './components/algorithms/FCFS';
import SJF from './components/algorithms/SJF';
import SRTF from './components/algorithms/SRTF';
import RoundRobin from './components/algorithms/RoundRobin';
import Priority from './components/algorithms/Priority';
import PriorityPreemptive from './components/algorithms/PriorityPreemptive';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algorithms" element={<AlgorithmsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/algorithms/fcfs" element={<FCFS />} />
          <Route path="/algorithms/sjf" element={<SJF />} />
          <Route path="/algorithms/srtf" element={<SRTF />} />
          <Route path="/algorithms/round-robin" element={<RoundRobin />} />
          <Route path="/algorithms/priority" element={<Priority />} />
          <Route path="/algorithms/priority-preemptive" element={<PriorityPreemptive />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
