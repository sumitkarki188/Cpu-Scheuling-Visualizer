import { Link } from 'react-router-dom';
import '../styles/AlgorithmsPage.css';

const AlgorithmsPage = () => {
  const algorithms = [
    {
      name: 'FCFS',
      fullName: 'First Come First Serve',
      description: 'Processes are executed in the order they arrive in the ready queue. Simple but may not be optimal for different process priorities.',
      type: 'Non-preemptive',
      strengths: [
        'Simple to implement',
        'Fair for processes that arrive first',
        'Low scheduling overhead'
      ],
      weaknesses: [
        'Can lead to convoy effect',
        'Long average waiting time',
        'Not suitable for interactive systems'
      ],
      path: '/algorithms/fcfs'
    },
    {
      name: 'SJF',
      fullName: 'Shortest Job First',
      description: 'Selects the process with the smallest execution time. Non-preemptive version waits for the current process to complete.',
      type: 'Non-preemptive',
      strengths: [
        'Optimal average waiting time',
        'Good for batch systems',
        'Reduces average turnaround time'
      ],
      weaknesses: [
        'Potential starvation of longer processes',
        'Requires knowledge of burst time',
        'Not suitable for interactive systems'
      ],
      path: '/algorithms/sjf'
    },
    {
      name: 'Priority Scheduling',
      fullName: 'Priority Scheduling',
      description: 'Processes are scheduled according to their priority, with higher priority processes being executed first.',
      type: 'Non-preemptive',
      strengths: [
        'Prioritizes important processes',
        'Flexible policy implementation',
        'Good for real-time systems'
      ],
      weaknesses: [
        'Can lead to starvation',
        'Priority inversion problems',
        'Need for aging mechanism'
      ],
      path: '/algorithms/priority'
    },
    {
      name: 'Round Robin',
      fullName: 'Round Robin',
      description: 'Each process is assigned a fixed time slot in a cyclic queue. Suitable for time-sharing systems.',
      type: 'Preemptive',
      strengths: [
        'Fair allocation of CPU',
        'No starvation',
        'Good response time for short processes'
      ],
      weaknesses: [
        'Higher average turnaround time',
        'Performance depends on time quantum',
        'Context switching overhead'
      ],
      path: '/algorithms/round-robin'
    },
    {
      name: 'SRTF',
      fullName: 'Shortest Remaining Time First',
      description: 'Preemptive version of SJF. Selects the process with the smallest remaining time at every state change.',
      type: 'Preemptive',
      strengths: [
        'Optimal average waiting time',
        'Responsive to short processes',
        'Good for interactive systems'
      ],
      weaknesses: [
        'Overhead due to frequent context switching',
        'Potential starvation of longer processes',
        'Requires continuous monitoring'
      ],
      path: '/algorithms/srtf'
    },
    {
      name: 'Priority Scheduling',
      fullName: 'Priority Scheduling (Preemptive)',
      description: 'Preemptive version where higher priority processes can interrupt running processes.',
      type: 'Preemptive',
      strengths: [
        'Better response time for high priority processes',
        'Adaptive to changing system needs',
        'Suitable for real-time systems'
      ],
      weaknesses: [
        'Context switching overhead',
        'Can lead to starvation',
        'Implementation complexity'
      ],
      path: '/algorithms/priority-preemptive'
    }
  ];

  return (
    <div className="algorithms-page">
      <div className="page-header">
        <h1 className="page-title">CPU Scheduling Algorithms</h1>
        <p className="page-description">
          Choose an algorithm to visualize how it schedules processes on the CPU. Each algorithm has different characteristics and is suitable for different scenarios.
        </p>
      </div>

      <div className="algorithms-grid">
        {algorithms.map((algo, index) => (
          <div key={index} className="algorithm-card">
            <div className="card-header">
              <h3 className="algo-name">{algo.name}</h3>
              <span className={`algo-badge ${algo.type === 'Preemptive' ? 'preemptive' : 'non-preemptive'}`}>
                {algo.type}
              </span>
            </div>
            
            <p className="algo-full-name">{algo.fullName}</p>
            <p className="algo-description">{algo.description}</p>
            
            <div className="algo-details">
              <div className="strengths">
                <h4 className="detail-title">Strengths:</h4>
                <ul>
                  {algo.strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="weaknesses">
                <h4 className="detail-title">Weaknesses:</h4>
                <ul>
                  {algo.weaknesses.map((weakness, i) => (
                    <li key={i}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <Link to={algo.path} className="launch-btn">
              Launch {algo.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmsPage;
