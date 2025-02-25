import React, { useState } from "react";
import RepetitionExercise from "./components/RepetitionExercise";
import DurationExercise from "./components/DurationExercise";
import RunningExercise from "./components/RunningExercise";
import "./App.css"

function App() {
  const [currentScreen, setCurrentScreen] = useState("menu");
  const [exerciseName, setExerciseName] = useState("");

  const exercises = [
    { name: "Push Ups", type: "repetition" },
    { name: "Running", type: "duration" },
    { name: "Plank", type: "duration" },
    { name: "Record Laps", type: "running"}
  ];

  const handleExerciseClick = (exercise) => {
    setExerciseName(exercise.name);
    setCurrentScreen(exercise.type);
  };

  return (
    <div className="App">
      {currentScreen === "menu" ? (
        <div>
          <h1>Home Menu</h1>
          {exercises.map((exercise, index) => (
            <button
              key={index}
              onClick={() => handleExerciseClick(exercise)}
              style={{ margin: "10px", padding: "10px" }}
            >
              {exercise.name}
            </button>
          ))}
        </div>
      ) : currentScreen === "repetition" ? (
        <RepetitionExercise name={exerciseName} />
      ) : currentScreen === "duration" ? (
        <DurationExercise name={exerciseName} />
      ) : (
        <RunningExercise name={exerciseName}/>
      )}
    </div>
  );
}

export default App;