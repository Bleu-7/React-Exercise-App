import React, { useState } from "react";
import RepetitionExercise from "./components/RepetitionExercise";
import DurationExercise from "./components/DurationExercise";
import "./App.css"

function App() {
  const [currentScreen, setCurrentScreen] = useState("menu");
  const [exerciseName, setExerciseName] = useState("");

  const exercises = [
    { name: "Push Ups", type: "repetition" },
    { name: "Running", type: "duration" },
    { name: "Plank", type: "duration" },
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
      ) : (
        <DurationExercise name={exerciseName} />
      )}
    </div>
  );
}

export default App;