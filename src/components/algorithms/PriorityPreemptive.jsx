import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProcessForm from '../ProcessForm';
import GanttChart from '../GanttChart';
import ProcessTable from '../ProcessTable';
import ReadyQueue from '../ReadyQueue';
import { priorityPreemptiveAlgorithm } from '../../utils/priorityPreemptiveAlgorithm';
import '../../styles/AlgorithmsPage.css';

const PriorityPreemptive = () => {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState(null);

  const handleAddProcess = (process) => {
    if (!process.priority || process.priority <= 0) {
      alert('Please provide a valid priority (lower number = higher priority)');
      return;
    }
    setProcesses(prev => [...prev, process]);
  };

  const handleGenerate = (randomProcesses) => {
    const processesWithPriority = randomProcesses.map(p => ({
      ...p,
      priority: p.priority || Math.floor(Math.random() * 5) + 1
    }));
    setResults(null);
    setProcesses(processesWithPriority);
  };

  const handleCalculate = () => {
    if (processes.length === 0) {
      alert('Please add at least one process');
      return;
    }
    
    const allHavePriority = processes.every(p => p.priority && p.priority > 0);
    if (!allHavePriority) {
      alert('All processes must have a valid priority value');
      return;
    }
    
    const result = priorityPreemptiveAlgorithm(processes);
    setResults(result);
  };

  return (
    <div className="algorithm-page">
      <div className="algorithm-header">
        <Link to="/algorithms" className="back-link">← Back to Algorithms</Link>
        <div className="header-content">
          <h1>Priority Scheduling (Preemptive)</h1>
          <span className="algorithm-badge preemptive">PREEMPTIVE ALGORITHM</span>
        </div>
        <p className="algorithm-description">
          Preemptive version where higher priority processes can interrupt running processes. 
          The CPU is allocated to the process with the highest priority at any given time.
        </p>
        <div className="info-box">
          <p>
            <strong>Note:</strong> Preemptive Priority Scheduling provides better response time for high-priority processes 
            but can lead to significant context switching overhead. It can also cause indefinite blocking (starvation) 
            of low-priority processes. Lower priority number indicates higher priority. The algorithm checks for 
            higher priority processes at every time unit.
          </p>
        </div>
        <div className="priority-info">
          <strong>Priority System:</strong> Lower number = Higher priority (1 is highest, 5 is lowest)
        </div>
        <div className="preemption-note">
          <strong>Preemption:</strong> A running process will be interrupted if a higher priority process arrives
        </div>
      </div>

      <ProcessForm
        onAddProcess={handleAddProcess}
        onGenerate={handleGenerate}
        onCalculate={handleCalculate}
        algorithmType="priority-preemptive"
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
                <span className="process-detail">P: {process.priority}</span>
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

export default PriorityPreemptive;
