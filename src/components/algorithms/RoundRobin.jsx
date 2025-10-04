import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProcessForm from '../ProcessForm';
import GanttChart from '../GanttChart';
import ProcessTable from '../ProcessTable';
import ReadyQueue from '../ReadyQueue';
import { roundRobinAlgorithm } from '../../utils/roundRobinAlgorithm';
import '../../styles/AlgorithmsPage.css';

const RoundRobin = () => {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState(null);
  const [quantum, setQuantum] = useState(2);

  const handleAddProcess = (process) => {
    setProcesses(prev => [...prev, process]);
  };

  const handleGenerate = (randomProcesses) => {
    setResults(null);
    setProcesses(randomProcesses);
  };

  const handleCalculate = () => {
    if (processes.length === 0) {
      alert('Please add at least one process');
      return;
    }
    if (quantum <= 0) {
      alert('Time quantum must be greater than 0');
      return;
    }
    const result = roundRobinAlgorithm(processes, quantum);
    setResults(result);
  };

  return (
    <div className="algorithm-page">
      <div className="algorithm-header">
        <Link to="/algorithms" className="back-link">← Back to Algorithms</Link>
        <div className="header-content">
          <h1>Round Robin (RR)</h1>
          <span className="algorithm-badge preemptive">PREEMPTIVE ALGORITHM</span>
        </div>
        <p className="algorithm-description">
          Each process is assigned a fixed time slot in a cyclic queue. Suitable for time-sharing systems.
        </p>
        <div className="info-box">
          <p>
            <strong>Note:</strong> Round Robin ensures fair CPU allocation and no starvation. Performance heavily 
            depends on the time quantum value. A very small quantum leads to high context switching overhead, 
            while a very large quantum makes it behave like FCFS.
          </p>
        </div>

        <div className="quantum-input-section">
          <label htmlFor="quantum-input" className="quantum-label">
            <strong>Time Quantum:</strong>
          </label>
          <input
            id="quantum-input"
            type="number"
            min="1"
            value={quantum}
            onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
            className="quantum-input"
            placeholder="Enter time quantum"
          />
          <span className="quantum-hint">
            (The fixed time slice allocated to each process)
          </span>
        </div>
      </div>

      <ProcessForm
        onAddProcess={handleAddProcess}
        onGenerate={handleGenerate}
        onCalculate={handleCalculate}
        algorithmType="round-robin"
      />

      {processes.length > 0 && (
        <div className="current-processes">
          <h3>Current Processes ({processes.length})</h3>
          <div className="process-list">
            {processes.map((process, index) => (
              <div key={index} className="process-item">
                <span className="process-id">{process.id}</span>
                <span className="process-detail">BT: {process.burstTime}</span>
                <span className="process-detail">AT: {process.arrivalTime}</span>
                <button 
                  onClick={() => setProcesses(prev => prev.filter((_, i) => i !== index))}
                  className="remove-process-btn"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {results && (
        <div className="results-section">
          <h2>Results</h2>
          <div className="quantum-display">
            <strong>Time Quantum Used:</strong> {quantum} units
          </div>
          <GanttChart ganttData={results.ganttData} />
          <ReadyQueue processes={results.processes} ganttData={results.ganttData} />
          <ProcessTable
            processes={results.processes}
            averageWaitingTime={results.averageWaitingTime}
            averageTurnaroundTime={results.averageTurnaroundTime}
            cpuUtilization={results.cpuUtilization}
          />
        </div>
      )}
    </div>
  );
};

export default RoundRobin;
