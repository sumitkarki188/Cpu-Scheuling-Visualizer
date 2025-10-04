cat > README.md << 'EOF'
# 🖥️ CPU Scheduling Visualizer

An interactive web application built with React.js to visualize and compare various CPU scheduling algorithms with modern UI and real-time animations.

**🚀 [Live Demo](https://cpu-scheuling-visualizer-sk.vercel.app/)**

---

## ✨ Features

- **Modern Dark Theme** - Clean, professional interface with excellent text visibility
- **Interactive Gantt Charts** - Real-time process execution visualization with animations
- **Live Ready Queue** - Monitor process states and queue changes in real-time
- **Performance Metrics** - Comprehensive analysis with average waiting time, turnaround time, and CPU utilization
- **Algorithm Comparison** - Compare all algorithms side-by-side with visual charts
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Process Configuration** - Add processes manually or generate random test cases
- **Educational Tool** - Detailed explanations for each algorithm with strengths and weaknesses

## 🎯 Algorithms Implemented

### Non-Preemptive Algorithms
| Algorithm | Description |
|-----------|-------------|
| **FCFS** (First Come First Serve) | Processes execute in arrival order, simplest scheduling |
| **SJF** (Shortest Job First) | Shortest burst time process executes first, optimal average waiting time |
| **Priority** (Non-Preemptive) | Higher priority processes execute first |

### Preemptive Algorithms
| Algorithm | Description |
|-----------|-------------|
| **SRTF** (Shortest Remaining Time First) | Preemptive SJF, switches to shorter remaining time processes |
| **Round Robin** | Time quantum-based scheduling, fair CPU allocation |
| **Priority** (Preemptive) | Higher priority can interrupt running processes |

## 🛠️ Tech Stack

- **React.js 18** - Frontend library
- **React Router v6** - Navigation and routing
- **Vite** - Build tool and development server
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript ES6+** - Core programming language



### Setup Steps

