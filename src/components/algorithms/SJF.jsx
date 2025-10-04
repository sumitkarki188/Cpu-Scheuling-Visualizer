import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProcessForm from '../ProcessForm';
import GanttChart from '../GanttChart';
import ProcessTable from '../ProcessTable';
import ReadyQueue from '../ReadyQueue';
import { sjfAlgorithm } from '../../utils/sjfAlgorithm';
import '../../styles/AlgorithmsPage.css';

const SJF = () => {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState(null);

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
    const result = sjfAlgorithm(processes);
    setResults(result);
  };

  return (
    <div className="algorithm-page">
      <div className="algorithm-header">
        <Link to="/algorithms" className="back-link">← Back to Algorithms</Link>
        <div className="header-content">
          <h1>Shortest Job First (SJF)</h1>
          <span className="algorithm-badge non-preemptive">NON-PREEMPTIVE ALGORITHM</span>
        </div>
        <p className="algorithm-description">
          Selects the process with the smallest execution time. Non-preemptive version waits for the current process to complete.
        </p>
        <div className="info-box">
          <p>
            <strong>Note:</strong> SJF is optimal in terms of average waiting time but can cause starvation of longer processes. 
            It requires knowledge of burst time in advance, which may not always be practical in real systems.
          </p>
        </div>
      </div>

      <ProcessForm
        onAddProcess={handleAddProcess}
        onGenerate={handleGenerate}
        onCalculate={handleCalculate}
        algorithmType="sjf"
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

export default SJF;
