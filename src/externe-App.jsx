import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const generateNumbers = () => {
  const num1 = Math.floor(Math.random() * 900 + 100);
  const num2 = Math.floor(Math.random() * 900 + 100);
  return [num1, num2];
};

export default function AdditionTrainer() {
  const [[num1, num2], setNumbers] = useState(generateNumbers);
  const [userResults, setUserResults] = useState(["", "", "", ""]);
  const [feedback, setFeedback] = useState("");

  const correctResult = num1 + num2;
  const correctDigits = correctResult.toString().padStart(4, "0").split("");

  const handleCheck = () => {
    if (userResults.join("") === correctDigits.join("")) {
      setFeedback("Richtig! Super gemacht.");
    } else {
      setFeedback("Leider falsch. Versuche es nochmal!");
    }
  };

  const handleNewTask = () => {
    setNumbers(generateNumbers);
    setUserResults(["", "", "", ""]);
    setFeedback("");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4">Schriftliche Addition</h1>
      <div className="grid grid-cols-4 gap-2 text-center font-mono text-lg">
        <span>{num1.toString().padStart(4, "0").split("").map((d, i) => <div key={i}>{d}</div>)}</span>
        <span>+</span>
        <span>{num2.toString().padStart(4, "0").split("").map((d, i) => <div key={i}>{d}</div>)}</span>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-4">
        {userResults.map((val, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={val}
            onChange={(e) => {
              const newValues = [...userResults];
              newValues[index] = e.target.value;
              setUserResults(newValues);
            }}
            className="border p-2 text-center w-10"
          />
        ))}
      </div>
      <p className="mt-4 text-red-500">{feedback}</p>
      <div className="mt-4 flex space-x-4">
        <Button onClick={handleCheck}>Prüfen</Button>
        <Button onClick={handleNewTask}>Neue Aufgabe</Button>
      </div>
    </div>
  );
}
