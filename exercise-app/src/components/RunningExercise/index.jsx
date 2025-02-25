import React, { useState, useRef, useEffect } from "react";

function RunningExercise({ name }) {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const [laps, setLaps] = useState([]); // Array to store lap times
    const intervalRef = useRef(null);

    // Start the timer
    const handleStart = () => {
        setStartTime(Date.now());
        setNow(Date.now());

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10); // Update every 10 milliseconds
    };

    // Stop the timer
    const handleStop = () => {
        clearInterval(intervalRef.current);
    };

    // Reset the timer and laps
    const handleReset = () => {
        setStartTime(null);
        setNow(null);
        setLaps([]); // Clear the lap times
        clearInterval(intervalRef.current);
    };

    // Record a lap
    const handleLap = () => {
        if (startTime != null && now != null) {
            const lapTime = now - startTime; // Calculate lap time in milliseconds
            setLaps((prevLaps) => [...prevLaps, lapTime]); // Add lap time to the list
        }
    };

    // Calculate time in milliseconds
    let timePassed = 0;
    if (startTime != null && now != null) {
        timePassed = now - startTime;
    }

    // Format time as minutes:seconds:milliseconds (00:00:00)
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (totalSeconds % 60).toString().padStart(2, "0");
        const ms = Math.floor((milliseconds % 1000) / 10)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}:${ms}`;
    };

    // Prevents Memory Leak and any other errors
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div>
            <h2>{name}</h2>
            <p>Time: {formatTime(timePassed)}</p>
            <button style={{ background: "green", color: "white" }} onClick={handleStart}>Start</button>
            <button style={{ background: "darkred", color: "white" }} onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleLap}>Record Lap</button>

            <div>
                <h3>Laps</h3>
                {laps.length === 0 ? (
                    <p>No laps recorded yet.</p>
                ) : (
                    <ul>
                        {laps.map((lap, index) => (
                            <li key={index}>
                                Lap {index + 1}: {formatTime(lap)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default RunningExercise;