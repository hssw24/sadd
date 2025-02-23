import React, { useState } from "react";

const generateNumbers = () => {
  const num1 = Math.floor(Math.random() * 900 + 100);
  const num2 = Math.floor(Math.random() * 900 + 100);
  return [num1, num2];
};

const calculateCarries = (num1, num2) => {
  let carries = ["", "", ""];
  let carry = 0;
  const num1Digits = num1.toString().padStart(4, "0").split("").map(Number);
  const num2Digits = num2.toString().padStart(4, "0").split("").map(Number);

  for (let i = 3; i > 0; i--) {
    let sum = num1Digits[i] + num2Digits[i] + carry;
    carry = sum >= 10 ? 1 : 0;
    carries[i - 1] = carry ? "1" : "";
  }
  return carries;
};

export default function AdditionTrainer() {
  const [[num1, num2], setNumbers] = useState(generateNumbers);
  const [userResults, setUserResults] = useState(["", "", "", ""]);
  const [carry, setCarry] = useState(["", "", ""]);
  const [feedback, setFeedback] = useState("");

  const correctResult = num1 + num2;
  const correctDigits = correctResult.toString().padStart(4, "0").split("");
  const correctCarries = calculateCarries(num1, num2);

  const handleCheck = () => {
    if (userResults.join("") === correctDigits.join("") && carry.join("") === correctCarries.join("")) {
      setFeedback("Richtig! Super gemacht.");
    } else {
      setFeedback("Leider falsch. Versuche es nochmal!");
    }
  };

  const handleNewTask = () => {
    const newNumbers = generateNumbers();
    setNumbers(newNumbers);
    setUserResults(["", "", "", ""]);
    setCarry(["", "", ""]);
    setFeedback("");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-xl text-left font-mono text-lg">
      <h1 className="text-xl font-bold mb-4 text-center">Schriftliche Addition 1548</h1>
      <div className="grid grid-cols-5 gap-1 text-center">
        <div></div>
        {num1.toString().padStart(4, "0").split("").map((d, i) => (
          <div key={i} className="p-2 border border-gray-300">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1 text-center">
        <div>+</div>
        {num2.toString().padStart(4, "0").split("").map((d, i) => (
          <div key={i} className="p-2 border border-gray-300">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1 text-center mt-2">
        <div></div>
        {carry.map((val, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            value={val}
            onChange={(e) => {
              const newCarry = [...carry];
              newCarry[i] = e.target.value;
              setCarry(newCarry);
            }}
            className="border border-gray-400 p-1 text-center w-8 bg-yellow-100"
          />
        ))}
      </div>
      <div className="border-b-2 border-black my-2"></div>
      <div className="grid grid-cols-5 gap-1 text-center mt-2">
        <div>=</div>
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
            className="border border-gray-400 p-2 text-center w-10 bg-green-100"
          />
        ))}
      </div>
      <p className="mt-4 text-red-500 text-center">{feedback}</p>
      <div className="mt-4 flex space-x-4 justify-center">
        <button onClick={handleCheck} className="px-4 py-2 bg-blue-500 text-white rounded">Prüfen</button>
        <button onClick={handleNewTask} className="px-4 py-2 bg-gray-500 text-white rounded">Neue Aufgabe</button>
      </div>
    </div>
  );
}
