export const roundRobinAlgorithm = (inputProcesses, quantum = 2) => {
  const processes = JSON.parse(JSON.stringify(inputProcesses));
  const n = processes.length;
  const remainingTime = processes.map(p => p.burstTime);
  const ganttData = [];
  
  let currentTime = 0;
  const queue = [];
  const arrived = new Array(n).fill(false);
  let completedCount = 0;

  while (completedCount < n) {
    for (let i = 0; i < n; i++) {
      if (!arrived[i] && processes[i].arrivalTime <= currentTime) {
        queue.push(i);
        arrived[i] = true;
      }
    }
    
    if (queue.length === 0) {
      currentTime++;
      continue;
    }
    
    const idx = queue.shift();
    const execTime = Math.min(quantum, remainingTime[idx]);
    const startTime = currentTime;
    const endTime = currentTime + execTime;
    
    ganttData.push({
      process: processes[idx].id,
      start: startTime,
      end: endTime
    });
    
    remainingTime[idx] -= execTime;
    currentTime = endTime;
    
    for (let i = 0; i < n; i++) {
      if (!arrived[i] && processes[i].arrivalTime <= currentTime && i !== idx) {
        queue.push(i);
        arrived[i] = true;
      }
    }
    
    if (remainingTime[idx] > 0) {
      queue.push(idx);
    } else {
      processes[idx].completionTime = currentTime;
      processes[idx].turnaroundTime = processes[idx].completionTime - processes[idx].arrivalTime;
      processes[idx].waitingTime = processes[idx].turnaroundTime - processes[idx].burstTime;
      completedCount++;
    }
  }

  const totalWaitingTime = processes.reduce((sum, p) => sum + p.waitingTime, 0);
  const totalTurnaroundTime = processes.reduce((sum, p) => sum + p.turnaroundTime, 0);
  const totalBurstTime = processes.reduce((sum, p) => sum + p.burstTime, 0);
  const cpuUtilization = (totalBurstTime / currentTime) * 100;

  return {
    processes,
    ganttData,
    averageWaitingTime: totalWaitingTime / processes.length,
    averageTurnaroundTime: totalTurnaroundTime / processes.length,
    cpuUtilization
  };
};
