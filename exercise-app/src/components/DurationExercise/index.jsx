// Code for Timer Implementation was Referenced and Modified from https://react.dev/reference/react/useRef

import React, { useState, useRef, useEffect } from "react";

function DurationExercise({ name }) {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
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

    // Reset the timer
    const handleReset = () => {
        setStartTime(null);
        setNow(null);
        clearInterval(intervalRef.current);
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
        </div>
    );
}

export default DurationExercise;