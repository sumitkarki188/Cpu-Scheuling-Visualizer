import { useState, useEffect } from 'react';
import '../styles/GanttChart.css';

const ReadyQueue = ({ processes, currentProcess, ganttData, animationTime }) => {
  const [queue, setQueue] = useState([]);
  const [running, setRunning] = useState(null);

  useEffect(() => {
    if (ganttData && animationTime !== undefined) {
      // Find currently running process
      const current = ganttData.find(
        item => animationTime >= item.start && animationTime < item.end
      );
      setRunning(current ? current.process : null);

      // Find waiting processes
      const waiting = processes.filter(p => {
        const inGantt = ganttData.find(g => g.process === p.id && g.start <= animationTime);
        const completed = ganttData.filter(g => g.process === p.id).every(g => g.end <= animationTime);
        return p.arrivalTime <= animationTime && !completed && (!current || current.process !== p.id);
      });
      setQueue(waiting);
    }
  }, [animationTime, ganttData, processes]);

  const colors = ['#5b7ff5', '#4ecdc4', '#ff6b6b', '#a68bf5', '#ffd166'];

  return (
    <div className="ready-queue-container">
      <h4 className="queue-title">Ready Queue (Real-time)</h4>
      
      <div className="cpu-section">
        <label>CPU</label>
        <div className="process-boxes">
          {running ? (
            <div className="process-box running">
              <span className="status-label">Running</span>
              <div className="process-badge">{running}</div>
            </div>
          ) : (
            <div className="process-box empty">
              <span className="status-label">Idle</span>
            </div>
          )}
          
          {queue.length > 0 && (
            <div className="process-box waiting">
              <span className="status-label">Waiting</span>
              {queue.slice(0, 3).map((p, idx) => (
                <div key={idx} className="process-badge waiting-badge">
                  {p.id}
                </div>
              ))}
              {queue.length > 3 && <span className="more-indicator">+{queue.length - 3}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadyQueue;
