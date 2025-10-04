import '../styles/ProcessForm.css';

const ProcessTable = ({ processes, averageWaitingTime, averageTurnaroundTime, cpuUtilization }) => {
  // Check if any process has priority defined
  const hasPriority = processes.some(p => p.priority !== undefined && p.priority !== null);

  return (
    <div className="process-table-container">
      <h3>Process Details</h3>
      
      <div className="metrics-row">
        <div className="metric-card">
          <h4>Average Waiting Time</h4>
          <p className="metric-value">{averageWaitingTime.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h4>Average Turnaround Time</h4>
          <p className="metric-value">{averageTurnaroundTime.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h4>Total Processes</h4>
          <p className="metric-value">{processes.length}</p>
        </div>
        <div className="metric-card">
          <h4>CPU Utilization</h4>
          <p className="metric-value">{cpuUtilization.toFixed(1)}%</p>
        </div>
      </div>

      <div className="table-wrapper">
        <h4>Processes:</h4>
        <table className="process-table">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Burst Time</th>
              <th>Arrival Time</th>
              {hasPriority && <th>Priority</th>}
              <th>Completion Time</th>
              <th>Waiting Time</th>
              <th>Turnaround Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index}>
                <td>{process.id}</td>
                <td>{process.burstTime}</td>
                <td>{process.arrivalTime}</td>
                {hasPriority && <td>{process.priority}</td>}
                <td>{process.completionTime}</td>
                <td className={process.waitingTime === 0 ? 'highlight-green' : ''}>
                  {process.waitingTime}
                </td>
                <td className={process.waitingTime > 10 ? 'highlight-red' : ''}>
                  {process.turnaroundTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessTable;
