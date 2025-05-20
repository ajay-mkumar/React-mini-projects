import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeartOverlay = () => {
  const [isWrapping, setIsWrapping] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    setIsWrapping(true);
    setTimeout(() => {
      navigate("/gift");
    }, 2000);
  }
  
  return (
    <div className={`gift-box ${isWrapping ? "unwrap" : ""}`}>
      <svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 80 L10 40 A20 20 0 0 1 50 20 A20 20 0 0 1 90 40 Z"
          fill="red"
          stroke="white"
          stroke-width="4"
        />
      </svg>
      <div className="content">
        <h1>Happy Bithday...❤️</h1>
        <button className="gftbtn" onClick={handleClick}>
          unwrap your gift
        </button>
      </div>
    </div>
  );
};

export default HeartOverlay;
