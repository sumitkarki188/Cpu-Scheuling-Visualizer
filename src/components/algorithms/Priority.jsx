import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProcessForm from '../ProcessForm';
import GanttChart from '../GanttChart';
import ProcessTable from '../ProcessTable';
import ReadyQueue from '../ReadyQueue';
import { priorityAlgorithm } from '../../utils/priorityAlgorithm';
import '../../styles/AlgorithmsPage.css';

const Priority = () => {
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
    
    const result = priorityAlgorithm(processes);
    setResults(result);
  };

  return (
    <div className="algorithm-page">
      <div className="algorithm-header">
        <Link to="/algorithms" className="back-link">← Back to Algorithms</Link>
        <div className="header-content">
          <h1>Priority Scheduling (Non-Preemptive)</h1>
          <span className="algorithm-badge non-preemptive">NON-PREEMPTIVE ALGORITHM</span>
        </div>
        <p className="algorithm-description">
          Processes are scheduled according to their priority, with higher priority processes being executed first.
          Once a process starts execution, it runs to completion.
        </p>
        <div className="info-box">
          <p>
            <strong>Note:</strong> Priority Scheduling allows important processes to be executed first. However, it can 
            lead to starvation of low-priority processes. Lower priority number indicates higher priority 
            (e.g., Priority 1 is higher than Priority 5). Aging techniques can be used to prevent starvation.
          </p>
        </div>
        <div className="priority-info">
          <strong>Priority System:</strong> Lower number = Higher priority (1 is highest, 5 is lowest)
        </div>
      </div>

      <ProcessForm
        onAddProcess={handleAddProcess}
        onGenerate={handleGenerate}
        onCalculate={handleCalculate}
        algorithmType="priority"
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

export default Priority;
