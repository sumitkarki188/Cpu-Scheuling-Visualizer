import { useState } from 'react';
import '../styles/ProcessForm.css';

const ProcessForm = ({ onAddProcess, onGenerate, onCalculate, algorithmType }) => {
  const [process, setProcess] = useState({
    id: '',
    burstTime: 0,
    arrivalTime: 0,
    priority: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (process.id && process.burstTime > 0) {
      onAddProcess(process);
      setProcess({
        id: '',
        burstTime: 0,
        arrivalTime: 0,
        priority: 0
      });
    }
  };

  const generateRandom = () => {
    const randomProcesses = [];
    const count = Math.floor(Math.random() * 3) + 3; // 3-5 processes
    
    for (let i = 1; i <= count; i++) {
      randomProcesses.push({
        id: `P${i}`,
        burstTime: Math.floor(Math.random() * 8) + 1,
        arrivalTime: Math.floor(Math.random() * 5),
        priority: Math.floor(Math.random() * 5) + 1
      });
    }
    
    // Call the onGenerate callback with the generated processes
    if (onGenerate) {
      onGenerate(randomProcesses);
    }
  };

  return (
    <div className="process-form-container">
      <div className="form-header">
        <h3>Process Configuration</h3>
        <button onClick={generateRandom} className="generate-btn" type="button">
          Generate Random Processes
        </button>
      </div>

      <form onSubmit={handleSubmit} className="process-form">
        <div className="form-row">
          <div className="form-group">
            <label>Process ID</label>
            <input
              type="text"
              placeholder="Process ID"
              value={process.id}
              onChange={(e) => setProcess({ ...process, id: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Burst Time</label>
            <input
              type="number"
              placeholder="0"
              min="1"
              value={process.burstTime || ''}
              onChange={(e) => setProcess({ ...process, burstTime: parseInt(e.target.value) || 0 })}
              required
            />
          </div>

          <div className="form-group">
            <label>Arrival Time</label>
            <input
              type="number"
              placeholder="0"
              min="0"
              value={process.arrivalTime || ''}
              onChange={(e) => setProcess({ ...process, arrivalTime: parseInt(e.target.value) || 0 })}
              required
            />
          </div>

          {(algorithmType === 'priority' || algorithmType === 'priority-preemptive') && (
            <div className="form-group">
              <label>Priority</label>
              <input
                type="number"
                placeholder="0"
                min="1"
                value={process.priority || ''}
                onChange={(e) => setProcess({ ...process, priority: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          )}

          <button type="submit" className="add-process-btn">
            + Add Process
          </button>
        </div>
      </form>

      <button onClick={onCalculate} className="calculate-btn" type="button">
        Calculate
      </button>
    </div>
  );
};

export default ProcessForm;
