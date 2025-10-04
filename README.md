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
Sure! Here’s a polished README.md based on your content, ready for GitHub:

# CPU Scheduling Visualizer

A web-based CPU Scheduling Visualizer built with **React.js** and **Vite**.  
Visualize how different CPU scheduling algorithms allocate CPU time to processes using an interactive Gantt chart.

---

## 📥 Installation

### Step 1: Clone the Repository

Using HTTPS:

```bash
git clone https://github.com/sumitkarki188/Cpu-Scheuling-Visualizer.git
cd Cpu-Scheuling-Visualizer


Alternative: Download ZIP from GitHub and extract it.

Step 2: Install Dependencies

Install all required packages:

npm install


This will install React, Vite, and other dependencies.

Step 3: Start Development Server
npm run dev


You should see something like:

VITE v5.0.0 ready in 500 ms
➜ Local: http://localhost:5173/
➜ Network: use --host to expose

Step 4: Open in Browser

Open your browser and go to: http://localhost:5173

You should see the CPU Scheduling Visualizer homepage! 🎉

🚀 Quick Start (One Command)
git clone https://github.com/sumitkarki188/Cpu-Scheuling-Visualizer.git && cd Cpu-Scheuling-Visualizer && npm install && npm run dev

📋 Available Commands
Command	Description
npm install	Install all dependencies
npm run dev	Start development server (with hot reload)
npm run build	Create production build
npm run preview	Preview production build locally
🌐 Deploy to Vercel
Method 1: Using Vercel Dashboard (Easiest)

Create Vercel Account
Go to vercel.com
 → Sign Up → GitHub login recommended

Import Project
Click Add New → Project → Select your GitHub repo Cpu-Scheuling-Visualizer

Configure Project

Framework Preset: Vite

Build Command: npm run build

Output Directory: dist

Install Command: npm install

Deploy
Click Deploy, wait 1–2 minutes, and your app will be live!
Example URL: https://your-project.vercel.app
