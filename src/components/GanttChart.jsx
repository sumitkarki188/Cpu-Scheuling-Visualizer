import { useState, useEffect } from 'react';
import '../styles/GanttChart.css';

const GanttChart = ({ ganttData, currentTime }) => {
  const [animationTime, setAnimationTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  currentTime;
  useEffect(() => {
    let interval;
    if (isPlaying && !isPaused) {
      interval = setInterval(() => {
        setAnimationTime(prev => {
          const maxTime = ganttData[ganttData.length - 1]?.end || 0;
          if (prev >= maxTime) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, ganttData]);

  const startAnimation = () => {
    setAnimationTime(0);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseAnimation = () => {
    setIsPaused(!isPaused);
  };

  const resetAnimation = () => {
    setAnimationTime(0);
    setIsPlaying(false);
    setIsPaused(false);
  };

  const maxTime = ganttData[ganttData.length - 1]?.end || 0;
  const colors = ['#5b7ff5', '#4ecdc4', '#ff6b6b', '#a68bf5', '#ffd166'];

  return (
    <div className="gantt-container">
      <h3>Gantt Chart</h3>
      
      <div className="gantt-controls">
        <button onClick={startAnimation} className="control-btn start-btn" disabled={isPlaying}>
          Start Animation
        </button>
        <button onClick={pauseAnimation} className="control-btn pause-btn" disabled={!isPlaying}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={resetAnimation} className="control-btn reset-btn">
          Reset
        </button>
        <span className="time-display">Time: {animationTime}</span>
      </div>

      <div className="process-legend">
        {Array.from(new Set(ganttData.map(d => d.process))).map((process, idx) => (
          <div key={idx} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: colors[idx % colors.length] }}></div>
            <span>{process}</span>
          </div>
        ))}
      </div>

      <div className="gantt-chart">
        <div className="timeline-container">
          <div className="timeline">
            {ganttData.map((item, index) => {
              const width = ((item.end - item.start) / maxTime) * 100;
              const left = (item.start / maxTime) * 100;
              const colorIndex = ganttData.findIndex(d => d.process === item.process) % colors.length;
              const isActive = animationTime >= item.start && animationTime < item.end;
              const isCompleted = animationTime >= item.end;

              return (
                <div
                  key={index}
                  className={`gantt-bar ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    backgroundColor: colors[colorIndex],
                    opacity: isCompleted ? 0.7 : 1
                  }}
                >
                  <span className="process-label">{item.process}</span>
                </div>
              );
            })}
            
            {isPlaying && (
              <div
                className="time-marker"
                style={{ left: `${(animationTime / maxTime) * 100}%` }}
              />
            )}
          </div>

          <div className="time-labels">
            {[...Array(maxTime + 1)].map((_, i) => (
              <span key={i} className="time-label" style={{ left: `${(i / maxTime) * 100}%` }}>
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
