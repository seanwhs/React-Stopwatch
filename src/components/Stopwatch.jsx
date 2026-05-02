import { useState, useRef, useEffect } from "react";
import './Stopwatch.css';

/**
 * Helper function to convert milliseconds into a readable MM:SS:CC format.
 * @param {number} time - Time in milliseconds.
 */
const formatTime = (time) => {
  // Calculate minutes, seconds, and centiseconds (1/100th of a second)
  const minutes = Math.floor((time / 60000) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const centiseconds = Math.floor((time / 10) % 100);

  // Return formatted string with leading zeros
  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0") +
    ":" +
    String(centiseconds).padStart(2, "0")
  );
};

function Stopwatch() {
  // --- State Hooks ---
  // Current time elapsed in milliseconds
  const [time, setTime] = useState(0);
  // Boolean toggle for the timer's running state
  const [isRunning, setIsRunning] = useState(false);

  // --- Ref Hook ---
  // Stores the interval ID without triggering re-renders when it changes.
  // This allows us to clear the specific interval from any part of the component.
  const timerRef = useRef(null);

  // --- Effect Hook ---
  // Manages the side effect of the interval timer based on the [isRunning] dependency.
  useEffect(() => {
    if (isRunning) {
      // Start the interval when isRunning is true
      timerRef.current = setInterval(() => {
        // Increment time by 10ms (matching the 10ms interval frequency)
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      // Pause the timer by clearing the interval
      clearInterval(timerRef.current);
    }

    // Cleanup function: clears the interval if the component unmounts 
    // or before the effect re-runs (to prevent memory leaks).
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  /**
   * Resets the stopwatch to its initial state.
   */
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="stopwatch-container">
      {/* Display formatted time */}
      <h1>{formatTime(time)}</h1>
      
      <div className="controls">
        {/* Toggle between Start and Stop */}
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Start"}
        </button>
        
        {/* Reset button */}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
