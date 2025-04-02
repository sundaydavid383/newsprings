import { useState } from "react";
import "./portfolio.css"
function Portfolio() {
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState("");

  const symptomList = [
    "Fever", "Chills", "Sweating", "Headache", "Nausea", "Vomiting", "Muscle pain"
  ];

  const handleCheck = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const diagnose = async () => {
    const response = await fetch("http://localhost:5000/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms }),
    });
    const data = await response.json();
    setResult(data.message);
  };

  return (
    <div className="portfolio">
      <h2>Malaria Diagnosis</h2>
      {symptomList.map((symptom) => (
        <div key={symptom}>
          <input
            type="checkbox"
            onChange={() => handleCheck(symptom)}
            checked={symptoms.includes(symptom)}
          />
          {symptom}
        </div>
      ))}
      <button onClick={diagnose}>Check Diagnosis</button>
      <p>{result}</p>
    </div>
  );
}

export default Portfolio;