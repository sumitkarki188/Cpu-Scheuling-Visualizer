import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProcessForm from '../ProcessForm';
import GanttChart from '../GanttChart';
import ProcessTable from '../ProcessTable';
import ReadyQueue from '../ReadyQueue';
import { srtfAlgorithm } from '../../utils/srtfAlgorithm';
import '../../styles/AlgorithmsPage.css';

const SRTF = () => {
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
    const result = srtfAlgorithm(processes);
    setResults(result);
  };

  return (
    <div className="algorithm-page">
      <div className="algorithm-header">
        <Link to="/algorithms" className="back-link">← Back to Algorithms</Link>
        <div className="header-content">
          <h1>Shortest Remaining Time First (SRTF)</h1>
          <span className="algorithm-badge preemptive">PREEMPTIVE ALGORITHM</span>
        </div>
        <p className="algorithm-description">
          Preemptive version of SJF. Selects the process with the smallest remaining time at every state change.
        </p>
        <div className="info-box">
          <p>
            <strong>Note:</strong> SRTF provides optimal average waiting time but requires frequent context switching. 
            This can lead to overhead and potential starvation of longer processes. The algorithm continuously monitors 
            remaining burst times and preempts the current process if a shorter job arrives.
          </p>
        </div>
      </div>

      <ProcessForm
        onAddProcess={handleAddProcess}
        onGenerate={handleGenerate}
        onCalculate={handleCalculate}
        algorithmType="srtf"
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

export default SRTF;
