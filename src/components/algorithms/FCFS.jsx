import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProcessForm from '../ProcessForm';
import GanttChart from '../GanttChart';
import ProcessTable from '../ProcessTable';
import ReadyQueue from '../ReadyQueue';
import { fcfsAlgorithm } from '../../utils/fcfsAlgorithm';
import '../../styles/AlgorithmsPage.css';

const FCFS = () => {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState(null);

  const handleAddProcess = (process) => {
    setProcesses(prev => [...prev, process]);
  };

  const handleGenerate = (randomProcesses) => {
    // Clear existing results when generating new processes
    setResults(null);
    // Set the new processes array
    setProcesses(randomProcesses);
  };

  const handleCalculate = () => {
    if (processes.length === 0) {
      alert('Please add at least one process');
      return;
    }
    const result = fcfsAlgorithm(processes);
    setResults(result);
  };

  return (
    <div className="algorithm-page">
      <div className="algorithm-header">
        <Link to="/algorithms" className="back-link">← Back to Algorithms</Link>
        <div className="header-content">
          <h1>First Come First Serve (FCFS)</h1>
          <span className="algorithm-badge non-preemptive">NON-PREEMPTIVE ALGORITHM</span>
        </div>
        <p className="algorithm-description">
          Processes are executed in the order they arrive in the ready queue. It is the simplest scheduling algorithm.
        </p>
        <div className="info-box">
          <p>
            <strong>Note:</strong> FCFS is non-preemptive, meaning once a process starts execution, it continues until it completes. 
            This can lead to the "convoy effect" where short processes wait behind long ones.
          </p>
        </div>
      </div>

      <ProcessForm
        onAddProcess={handleAddProcess}
        onGenerate={handleGenerate}
        onCalculate={handleCalculate}
        algorithmType="fcfs"
      />

      {/* Display current processes */}
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

export default FCFS;
