export const srtfAlgorithm = (inputProcesses) => {
  const processes = JSON.parse(JSON.stringify(inputProcesses));
  const n = processes.length;
  const remainingTime = processes.map(p => p.burstTime);
  const completed = new Array(n).fill(false);
  const ganttData = [];
  
  let currentTime = 0;
  let completedCount = 0;
  let lastProcess = -1;
  let segmentStart = 0;

  while (completedCount < n) {
    let idx = -1;
    let minRemaining = Infinity;
    
    for (let i = 0; i < n; i++) {
      if (!completed[i] && processes[i].arrivalTime <= currentTime && remainingTime[i] < minRemaining) {
        minRemaining = remainingTime[i];
        idx = i;
      }
    }
    
    if (idx === -1) {
      currentTime++;
      continue;
    }
    
    if (lastProcess !== idx && lastProcess !== -1) {
      ganttData.push({
        process: processes[lastProcess].id,
        start: segmentStart,
        end: currentTime
      });
      segmentStart = currentTime;
    } else if (lastProcess === -1) {
      segmentStart = currentTime;
    }
    
    remainingTime[idx]--;
    currentTime++;
    lastProcess = idx;
    
    if (remainingTime[idx] === 0) {
      ganttData.push({
        process: processes[idx].id,
        start: segmentStart,
        end: currentTime
      });
      
      processes[idx].completionTime = currentTime;
      processes[idx].turnaroundTime = processes[idx].completionTime - processes[idx].arrivalTime;
      processes[idx].waitingTime = processes[idx].turnaroundTime - processes[idx].burstTime;
      
      completed[idx] = true;
      completedCount++;
      lastProcess = -1;
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
