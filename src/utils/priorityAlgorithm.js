export const priorityAlgorithm = (inputProcesses) => {
  const processes = JSON.parse(JSON.stringify(inputProcesses));
  const n = processes.length;
  const completed = new Array(n).fill(false);
  const ganttData = [];
  
  let currentTime = 0;
  let completedCount = 0;

  while (completedCount < n) {
    let idx = -1;
    let highestPriority = Infinity;
    
    for (let i = 0; i < n; i++) {
      if (!completed[i] && processes[i].arrivalTime <= currentTime) {
        if (processes[i].priority < highestPriority) {
          highestPriority = processes[i].priority;
          idx = i;
        }
      }
    }
    
    if (idx === -1) {
      currentTime++;
      continue;
    }
    
    const process = processes[idx];
    const startTime = currentTime;
    const endTime = currentTime + process.burstTime;
    
    ganttData.push({
      process: process.id,
      start: startTime,
      end: endTime
    });
    
    process.completionTime = endTime;
    process.turnaroundTime = process.completionTime - process.arrivalTime;
    process.waitingTime = process.turnaroundTime - process.burstTime;
    
    currentTime = endTime;
    completed[idx] = true;
    completedCount++;
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
