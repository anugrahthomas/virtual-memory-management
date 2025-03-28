import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import OpenAI from "openai";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const openai = new OpenAI({ apiKey: process.env.API, dangerouslyAllowBrowser: true });
const algorithms = {
  LRU: (referenceString, numFrames) => {
    let memory = Array(numFrames).fill(null);
    let pageFaults = 0;
    let pageOrder = [];

    referenceString.forEach((page) => {
      if (!memory.includes(page)) {
        pageFaults++;

        if (memory.includes(null)) {
          memory[memory.indexOf(null)] = page;
        } else {
          const lruPage = pageOrder.shift();
          memory[memory.indexOf(lruPage)] = page;
        }
      }

      pageOrder.push(page);
      if (pageOrder.length > numFrames) {
        pageOrder.shift();
      }
    });

    return { memory, pageFaults };
  },

  Optimal: (referenceString, numFrames) => {
    let memory = Array(numFrames).fill(null);
    let pageFaults = 0;

    referenceString.forEach((page, index) => {
      if (!memory.includes(page)) {
        pageFaults++;

        if (memory.includes(null)) {
          memory[memory.indexOf(null)] = page;
        } else {
          const futureUse = memory.map((memoryPage) => {
            const futureIndex = referenceString.slice(index + 1).indexOf(memoryPage);
            return futureIndex === -1 ? Infinity : futureIndex;
          });

          const farthestPage = memory[futureUse.indexOf(Math.max(...futureUse))];
          memory[memory.indexOf(farthestPage)] = page;
        }
      }
    });

    return { memory, pageFaults };
  },

  FIFO: (referenceString, numFrames) => {
    let memory = Array(numFrames).fill(null);
    let pageFaults = 0;
    let queue = [];

    referenceString.forEach((page) => {
      if (!memory.includes(page)) {
        pageFaults++;

        if (memory.includes(null)) {
          memory[memory.indexOf(null)] = page;
          queue.push(page);
        } else {
          let evictedPage = queue.shift();
          memory[memory.indexOf(evictedPage)] = page;
          queue.push(page);
        }
      }
    });

    return { memory, pageFaults };
  }
};

const App = () => {
  const [numFrames, setNumFrames] = useState(3);
  const [referenceString, setReferenceString] = useState("");
  const [pageFaultsData, setPageFaultsData] = useState({});
  const [bestAlgorithm, setBestAlgorithm] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Page Faults",
        data: [],
        backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"],
      },
    ],
  });

  const handleRunSimulation = () => {
    if (!referenceString.trim()) {
      toast.error("Please enter a reference string.");
      return;
    }

    if (!numFrames || numFrames <= 0) {
      toast.error("Please enter a valid number of frames.");
      return;
    }

    const parsedReferenceString = referenceString.split(" ").map(Number);

    if (parsedReferenceString.some(isNaN)) {
      toast.error("Reference string must contain only numbers.");
      return;
    }

    let results = {};
    let bestAlgo = "";
    let minPageFaults = Infinity;

    Object.keys(algorithms).forEach((algo) => {
      const result = algorithms[algo](parsedReferenceString, numFrames);
      results[algo] = result.pageFaults;
      if (result.pageFaults < minPageFaults) {
        minPageFaults = result.pageFaults;
        bestAlgo = algo;
      }
    });

    setPageFaultsData(results);
    setBestAlgorithm(bestAlgo);
    setChartData({
      labels: Object.keys(results),
      datasets: [
        {
          label: "Page Faults",
          data: Object.values(results),
          backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"],
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 ">
      <header className="h-[10vh] flex items-center justify-center bg-[#00000052] text-2xl font-semibold text-white">Powered by-OpenAi</header>
      <div className="min-h-[80vh]  flex items-center justify-center p-5">
        <Toaster />
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">Virtual Memory Simulation</h1>
          <input
            type="text"
            placeholder="Enter reference string (e.g., 1 2 3 4 5)"
            value={referenceString}
            onChange={(e) => setReferenceString(e.target.value)}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Number of frames"
            value={numFrames}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value > 0) {
                setNumFrames(value);
              } else {
                setNumFrames(0);
              }
            }}  
            className="border p-2 w-full rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleRunSimulation}
            className="bg-blue-600 text-white p-2 w-full mt-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Run Simulation
          </button>

          {Object.keys(pageFaultsData).length > 0 && (
            <div className="mt-5 bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">Page Faults:</h2>
              <Bar data={chartData} options={{ responsive: true }} />
              <p className="mt-3 text-lg font-bold text-green-600">Best Algorithm: {bestAlgorithm}</p>
            </div>
          )}
        </div>
      </div>
      <footer className="h-[10vh] flex justify-center items-center bg-[#00000052] text-2xl font-semibold text-center text-white">Created by: Shivansh,Anugrah,Kunal</footer>
    </div>
  );
};

export default App;
