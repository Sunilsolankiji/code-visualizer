"use client";

import { useState, useRef } from "react";
import { SortStep, StepType } from "@/models/sorting";
import { algorithms } from "@/constant";

const generateArray = (length = 30) =>
  Array.from({ length }, () => Math.floor(Math.random() * 200) + 20);

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>(generateArray());
  const [selectedAlgo, setSelectedAlgo] = useState<string>("Bubble Sort");
  const [speed, setSpeed] = useState<number>(50);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [status, setStatus] = useState<string>("Idle");
  const [timeTaken, setTimeTaken] = useState<number | null>(null);

  const isSorting = useRef(false);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleReset = () => {
    isSorting.current = false;
    setArray(generateArray());
    setActiveIndices([]);
    setStatus("Idle");
    setTimeTaken(null);
  };

  const visualize = async () => {
    const start = performance.now();
    const steps: SortStep[] = algorithms[selectedAlgo].sort([...array]);
    const end = performance.now();
    setTimeTaken(end - start); // store time taken (excluding animation)

    isSorting.current = true;
    setStatus("Sorting...");

    for (const step of steps) {
      if (!isSorting.current) break;

      switch (step.type) {
        case StepType.Compare:
          setStatus("Comparing...");
          setActiveIndices(step.indices);
          break;
        case StepType.Swap:
          setStatus("Swapping...");
          setActiveIndices(step.indices);
          setArray((prev) => {
            const newArr = [...prev];
            const [i, j] = step.indices;
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
            return newArr;
          });
          break;
        case StepType.Overwrite:
          setStatus("Overwriting...");
          setActiveIndices([step.index]);
          setArray((prev) => {
            const newArr = [...prev];
            newArr[step.index] = step.value;
            return newArr;
          });
          break;
      }

      await sleep(speed);
    }

    setStatus("Done!");
    setActiveIndices([]);
    isSorting.current = false;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Sorting Algorithm Visualizer
      </h1>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <select
          disabled={isSorting.current}
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          className="border px-3 py-2 rounded-md bg-white shadow-sm"
        >
          {Object.keys(algorithms).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <button
            disabled={isSorting.current}
            onClick={visualize}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Visualize
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Speed</label>
          <input
            type="range"
            disabled={isSorting.current}
            min={10}
            max={3000}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm font-semibold">{speed} ms</span>
        </div>
      </div>

      {/* Status */}
      <div className="text-center text-sm font-semibold text-gray-600 mb-4">
        Status: {status}
      </div>

      <div className="text-center text-sm font-medium text-gray-700 mt-2">
        Time Complexity: <strong>{algorithms[selectedAlgo].complexity}</strong>
        {timeTaken !== null && (
          <>
            {" | "} Actual Time: <strong>{Math.round(timeTaken)} ms</strong>
          </>
        )}
      </div>

      {/* Array Bars with Values */}
      <div className="flex items-end justify-center gap-[2px] h-[320px] border rounded-md p-4 bg-white shadow-inner overflow-x-auto">
        {array.map((value, idx) => {
          const isActive = activeIndices.includes(idx);
          return (
            <div key={idx} className="flex flex-col items-center">
              <div
                style={{
                  height: `${value}px`,
                  width: "18px",
                }}
                className={`transition-all duration-200 rounded-sm ${
                  isActive ? "bg-red-500" : "bg-blue-500"
                }`}
              ></div>
              <span className="text-xs mt-1 text-gray-700">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
