import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setOpen] = useState(true);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div>
      <button className="close" onClick={() => setOpen(!isOpen)}>{isOpen ? <>&times;</> : '<'}</button>
      {isOpen && (
      <div className="steps">
        <div className="numbers">
          <div className={step >= 1 ? "active" : ""}>1</div>
          <div className={step >= 2 ? "active" : ""}>2</div>
          <div className={step >= 3 ? "active" : ""}>3</div>
        </div>

        <div className="message">Step {messages[step - 1]}</div>

        <div className="buttons">
          <button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>)}
    </div>
  );
}
