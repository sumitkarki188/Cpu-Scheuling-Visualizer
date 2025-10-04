import { useState } from 'react';
import '../styles/ComparePage.css';
import GanttChart from './GanttChart';
import ProcessTable from './ProcessTable';
import { fcfsAlgorithm } from '../utils/fcfsAlgorithm';
import { sjfAlgorithm } from '../utils/sjfAlgorithm';
import { srtfAlgorithm } from '../utils/srtfAlgorithm';
import { roundRobinAlgorithm } from '../utils/roundRobinAlgorithm';
import { priorityAlgorithm } from '../utils/priorityAlgorithm';
import { priorityPreemptiveAlgorithm } from '../utils/priorityPreemptiveAlgorithm';

const ComparePage = () => {
  const [useSameProcesses, setUseSameProcesses] = useState(true);
  const [processes, setProcesses] = useState([
    { id: 'P1', burstTime: 1, arrivalTime: 0, priority: 1 },
    { id: 'P2', burstTime: 3, arrivalTime: 4, priority: 1 },
    { id: 'P3', burstTime: 4, arrivalTime: 3, priority: 1 },
    { id: 'P4', burstTime: 4, arrivalTime: 1, priority: 1 },
    { id: 'P5', burstTime: 4, arrivalTime: 1, priority: 2 }
  ]);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [quantum, setQuantum] = useState(2);

  const handleProcessChange = (index, field, value) => {
    const updatedProcesses = [...processes];
    updatedProcesses[index][field] = field === 'id' ? value : parseInt(value) || 0;
    setProcesses(updatedProcesses);
  };

  const addProcess = () => {
    const newProcess = {
      id: `P${processes.length + 1}`,
      burstTime: 1,
      arrivalTime: 0,
      priority: 1
    };
    setProcesses([...processes, newProcess]);
  };

  const removeProcess = (index) => {
    if (processes.length > 1) {
      const updatedProcesses = processes.filter((_, i) => i !== index);
      setProcesses(updatedProcesses);
    }
  };

  const generateRandom = () => {
    const count = 5;
    const randomProcesses = [];
    
    for (let i = 1; i <= count; i++) {
      randomProcesses.push({
        id: `P${i}`,
        burstTime: Math.floor(Math.random() * 8) + 1,
        arrivalTime: Math.floor(Math.random() * 5),
        priority: Math.floor(Math.random() * 5) + 1
      });
    }
    
    setProcesses(randomProcesses);
  };

  const compareAlgorithms = () => {
    if (processes.length === 0) {
      alert('Please add at least one process');
      return;
    }

    try {
      const fcfsResult = fcfsAlgorithm(processes);
      const sjfResult = sjfAlgorithm(processes);
      const srtfResult = srtfAlgorithm(processes);
      const rrResult = roundRobinAlgorithm(processes, quantum);
      const priorityResult = priorityAlgorithm(processes);
      const priorityPreemptiveResult = priorityPreemptiveAlgorithm(processes);

      setResults({
        fcfs: fcfsResult,
        sjf: sjfResult,
        srtf: srtfResult,
        rr: rrResult,
        priority: priorityResult,
        priorityPreemptive: priorityPreemptiveResult
      });
      
      setActiveTab('overview');
    } catch (error) {
      alert('Error computing algorithms: ' + error.message);
    }
  };

  const getBestAlgorithm = (metric) => {
    if (!results) return null;
    
    const algorithms = [
      { name: 'FCFS', value: results.fcfs[metric] },
      { name: 'SJF', value: results.sjf[metric] },
      { name: 'SRTF', value: results.srtf[metric] },
      { name: 'Round Robin', value: results.rr[metric] },
      { name: 'Priority', value: results.priority[metric] },
      { name: 'Priority (P)', value: results.priorityPreemptive[metric] }
    ];
    
    const best = algorithms.reduce((min, curr) => 
      curr.value < min.value ? curr : min
    );
    
    return best;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'compare', label: 'Compare Side-by-Side' },
    { id: 'fcfs', label: 'FCFS' },
    { id: 'sjf', label: 'SJF' },
    { id: 'srtf', label: 'SRTF' },
    { id: 'priority', label: 'Priority' },
    { id: 'priorityPreemptive', label: 'Priority (Preemptive)' },
    { id: 'rr', label: 'Round Robin' }
  ];

  return (
    <div className="compare-page">
      <div className="compare-header">
        <h1>Compare CPU Scheduling Algorithms</h1>
        <p>Configure your processes and compare how different CPU scheduling algorithms perform</p>
      </div>

      <div className="process-configuration">
        <h2>Process Configuration</h2>
        
        <div className="config-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={useSameProcesses}
              onChange={(e) => setUseSameProcesses(e.target.checked)}
            />
            Use same processes for all algorithms
          </label>
          <p className="config-note">
            Configure the processes below that will be used for all selected algorithms
          </p>
          <p className="priority-note">
            <strong>Note:</strong> Priority values are required because you have Priority-based algorithms enabled. 
            Lower values indicate higher priority.
          </p>
        </div>

        <div className="add-process-section">
          <h3>Add New Process</h3>
          <button onClick={addProcess} className="add-process-btn">Add New Process</button>
        </div>

        <div className="configured-processes">
          <h3>Configured Processes ({processes.length})</h3>
          
          {processes.map((process, index) => (
            <div key={index} className="process-row">
              <div className="process-field">
                <label>Process ID *</label>
                <input
                  type="text"
                  value={process.id}
                  onChange={(e) => handleProcessChange(index, 'id', e.target.value)}
                  placeholder="Process ID"
                />
              </div>
              
              <div className="process-field">
                <label>Burst Time *</label>
                <input
                  type="number"
                  min="1"
                  value={process.burstTime}
                  onChange={(e) => handleProcessChange(index, 'burstTime', e.target.value)}
                />
              </div>
              
              <div className="process-field">
                <label>Arrival Time *</label>
                <input
                  type="number"
                  min="0"
                  value={process.arrivalTime}
                  onChange={(e) => handleProcessChange(index, 'arrivalTime', e.target.value)}
                />
              </div>
              
              <div className="process-field">
                <label>Priority *</label>
                <input
                  type="number"
                  min="1"
                  value={process.priority}
                  onChange={(e) => handleProcessChange(index, 'priority', e.target.value)}
                />
                <span className="field-hint">Lower number = Higher priority</span>
              </div>
              
              <button 
                onClick={() => removeProcess(index)} 
                className="remove-btn"
                disabled={processes.length === 1}
              >
                ✕ Remove
              </button>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button onClick={generateRandom} className="generate-btn">Generate Random</button>
          <button onClick={compareAlgorithms} className="compare-btn">Compare Algorithms</button>
        </div>
      </div>

      {results && (
        <div className="results-container">
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="performance-comparison">
                  <h2>Performance Comparison</h2>
                  <p className="comparison-note">Lower values are better for both metrics</p>
                  
                  <div className="chart-container">
                    <div className="comparison-bars">
                      {[
                        { key: 'fcfs', label: 'FCFS', data: results.fcfs },
                        { key: 'sjf', label: 'SJF', data: results.sjf },
                        { key: 'srtf', label: 'SRTF', data: results.srtf },
                        { key: 'priority', label: 'Priority', data: results.priority },
                        { key: 'priorityP', label: 'Priority (P)', data: results.priorityPreemptive },
                        { key: 'rr', label: 'Round Robin', data: results.rr }
                      ].map((algo) => {
                        const maxWait = 12;
                        const maxTurnaround = 15;
                        const waitHeight = (algo.data.averageWaitingTime / maxWait) * 100;
                        const turnaroundHeight = (algo.data.averageTurnaroundTime / maxTurnaround) * 100;
                        
                        return (
                          <div key={algo.key} className="bar-group">
                            <div className="bars">
                              <div 
                                className="bar waiting-bar" 
                                style={{ height: `${Math.min(waitHeight, 100)}%` }}
                                title={`Avg Waiting Time: ${algo.data.averageWaitingTime.toFixed(2)}`}
                              >
                                <span className="bar-value">{algo.data.averageWaitingTime.toFixed(1)}</span>
                              </div>
                              <div 
                                className="bar turnaround-bar" 
                                style={{ height: `${Math.min(turnaroundHeight, 100)}%` }}
                                title={`Avg Turnaround Time: ${algo.data.averageTurnaroundTime.toFixed(2)}`}
                              >
                                <span className="bar-value">{algo.data.averageTurnaroundTime.toFixed(1)}</span>
                              </div>
                            </div>
                            <div className="bar-label">{algo.label}</div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="chart-legend">
                      <div className="legend-item">
                        <span className="legend-color waiting"></span>
                        Avg Waiting Time
                      </div>
                      <div className="legend-item">
                        <span className="legend-color turnaround"></span>
                        Avg Turnaround Time
                      </div>
                    </div>
                  </div>
                </div>

                <div className="best-algorithms">
                  <div className="best-card">
                    <h3>Best Algorithm for Waiting Time</h3>
                    <div className="best-algo-name">
                      {getBestAlgorithm('averageWaitingTime')?.name}
                    </div>
                    <div className="best-algo-value">
                      {getBestAlgorithm('averageWaitingTime')?.value.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="best-card">
                    <h3>Best Algorithm for Turnaround Time</h3>
                    <div className="best-algo-name">
                      {getBestAlgorithm('averageTurnaroundTime')?.name}
                    </div>
                    <div className="best-algo-value">
                      {getBestAlgorithm('averageTurnaroundTime')?.value.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'compare' && (
              <div className="comparison-table-container">
                <h2>Side-by-Side Comparison</h2>
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Algorithm</th>
                      <th>Avg Waiting Time</th>
                      <th>Avg Turnaround Time</th>
                      <th>CPU Utilization</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'FCFS', data: results.fcfs, type: 'Non-Preemptive' },
                      { name: 'SJF', data: results.sjf, type: 'Non-Preemptive' },
                      { name: 'SRTF', data: results.srtf, type: 'Preemptive' },
                      { name: 'Priority', data: results.priority, type: 'Non-Preemptive' },
                      { name: 'Priority (Preemptive)', data: results.priorityPreemptive, type: 'Preemptive' },
                      { name: 'Round Robin', data: results.rr, type: 'Preemptive' }
                    ].map((algo, index) => (
                      <tr key={index}>
                        <td className="algo-name-cell">{algo.name}</td>
                        <td className="metric-cell">{algo.data.averageWaitingTime.toFixed(2)}</td>
                        <td className="metric-cell">{algo.data.averageTurnaroundTime.toFixed(2)}</td>
                        <td className="metric-cell">{algo.data.cpuUtilization.toFixed(1)}%</td>
                        <td>
                          <span className={`type-badge ${algo.type === 'Preemptive' ? 'preemptive' : 'non-preemptive'}`}>
                            {algo.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'fcfs' && (
              <div className="algorithm-result">
                <h2>First Come First Serve (FCFS)</h2>
                <GanttChart ganttData={results.fcfs.ganttData} />
                <ProcessTable
                  processes={results.fcfs.processes}
                  averageWaitingTime={results.fcfs.averageWaitingTime}
                  averageTurnaroundTime={results.fcfs.averageTurnaroundTime}
                  cpuUtilization={results.fcfs.cpuUtilization}
                />
              </div>
            )}

            {activeTab === 'sjf' && (
              <div className="algorithm-result">
                <h2>Shortest Job First (SJF)</h2>
                <GanttChart ganttData={results.sjf.ganttData} />
                <ProcessTable
                  processes={results.sjf.processes}
                  averageWaitingTime={results.sjf.averageWaitingTime}
                  averageTurnaroundTime={results.sjf.averageTurnaroundTime}
                  cpuUtilization={results.sjf.cpuUtilization}
                />
              </div>
            )}

            {activeTab === 'srtf' && (
              <div className="algorithm-result">
                <h2>Shortest Remaining Time First (SRTF)</h2>
                <GanttChart ganttData={results.srtf.ganttData} />
                <ProcessTable
                  processes={results.srtf.processes}
                  averageWaitingTime={results.srtf.averageWaitingTime}
                  averageTurnaroundTime={results.srtf.averageTurnaroundTime}
                  cpuUtilization={results.srtf.cpuUtilization}
                />
              </div>
            )}

            {activeTab === 'priority' && (
              <div className="algorithm-result">
                <h2>Priority Scheduling (Non-Preemptive)</h2>
                <GanttChart ganttData={results.priority.ganttData} />
                <ProcessTable
                  processes={results.priority.processes}
                  averageWaitingTime={results.priority.averageWaitingTime}
                  averageTurnaroundTime={results.priority.averageTurnaroundTime}
                  cpuUtilization={results.priority.cpuUtilization}
                />
              </div>
            )}

            {activeTab === 'priorityPreemptive' && (
              <div className="algorithm-result">
                <h2>Priority Scheduling (Preemptive)</h2>
                <GanttChart ganttData={results.priorityPreemptive.ganttData} />
                <ProcessTable
                  processes={results.priorityPreemptive.processes}
                  averageWaitingTime={results.priorityPreemptive.averageWaitingTime}
                  averageTurnaroundTime={results.priorityPreemptive.averageTurnaroundTime}
                  cpuUtilization={results.priorityPreemptive.cpuUtilization}
                />
              </div>
            )}

            {activeTab === 'rr' && (
              <div className="algorithm-result">
                <h2>Round Robin (Time Quantum: {quantum})</h2>
                <div className="quantum-control">
                  <label>Time Quantum:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantum}
                    onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
                    className="quantum-input-small"
                  />
                  <button onClick={compareAlgorithms} className="recalculate-btn">
                    Recalculate
                  </button>
                </div>
                <GanttChart ganttData={results.rr.ganttData} />
                <ProcessTable
                  processes={results.rr.processes}
                  averageWaitingTime={results.rr.averageWaitingTime}
                  averageTurnaroundTime={results.rr.averageTurnaroundTime}
                  cpuUtilization={results.rr.cpuUtilization}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="footer">
        © 2025 Created for educational purposes
      </div>
    </div>
  );
};

export default ComparePage;
