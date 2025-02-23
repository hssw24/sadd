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
    setNumbers(generateNumbers());
    setUserResults(["", "", "", ""]);
    setCarry(["", "", ""]);
    setFeedback("");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Schriftliche Addition</h1>
      <div style={{ display: "inline-block", textAlign: "right" }}>
        {num1.toString().padStart(4, "0").split("").map((d, i) => (
          <div key={i} style={{ fontSize: "18px", fontWeight: "bold" }}>{d}</div>
        ))}
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>+</div>
        {num2.toString().padStart(4, "0").split("").map((d, i) => (
          <div key={i} style={{ fontSize: "18px", fontWeight: "bold" }}>{d}</div>
        ))}
      </div>
      <div>
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
            style={{ width: "20px", textAlign: "center", margin: "2px", backgroundColor: "#fffae6" }}
          />
        ))}
      </div>
      <div style={{ borderBottom: "2px solid black", width: "80px", margin: "5px auto" }}></div>
      <div>
        {userResults.map((val, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            value={val}
            onChange={(e) => {
              const newValues = [...userResults];
              newValues[i] = e.target.value;
              setUserResults(newValues);
            }}
            style={{ width: "30px", textAlign: "center", fontSize: "18px", backgroundColor: "#e6ffe6", margin: "2px" }}
          />
        ))}
      </div>
      <p style={{ color: "red", fontWeight: "bold" }}>{feedback}</p>
      <div>
        <button onClick={handleCheck} style={{ padding: "8px 12px", margin: "5px", backgroundColor: "#007bff", color: "white", borderRadius: "5px", border: "none" }}>Prüfen</button>
        <button onClick={handleNewTask} style={{ padding: "8px 12px", margin: "5px", backgroundColor: "#6c757d", color: "white", borderRadius: "5px", border: "none" }}>Neue Aufgabe</button>
      </div>
    </div>
  );
}
