export const fcfsAlgorithm = (inputProcesses) => {
  const processes = JSON.parse(JSON.stringify(inputProcesses));
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  const ganttData = [];
  
  processes.forEach((process) => {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }
    
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
  });

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
