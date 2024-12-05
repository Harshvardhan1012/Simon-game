import React, { useState, useEffect } from "react";
import SimonBlock from "./SimonBlock"; 

const textColors = {
  red: "text-red-500",
  blue: "text-blue-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
};

const SimonGame = () => {
  const colors = ["red", "blue", "green", "yellow"]; // Possible block colors
  const [sequence, setSequence] = useState([]); // The sequence to be followed
  const [userStep, setUserStep] = useState(0); // Tracks the user's progress in the sequence
  const [activeColor, setActiveColor] = useState(null); // Current highlighted block
  const [isUserTurn, setIsUserTurn] = useState(false); // Indicates if it's the user's turn
  const [messageColor, setMessageColor] = useState({
    message: "Click Start to Play!",
    color: "blue",
  }); // Message to display to the user


  const addColorToSequence = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence((prev) => [...prev, randomColor]);
  };
 
  const startGame = () => {
    setSequence([]);
    setUserStep(0); 
    setMessageColor({ message: "Game Started!", color: "blue" });
    addColorToSequence(); 
  };

  const handleUserClick = (color) => {
    if (!isUserTurn) return; 

    if (color === sequence[userStep]) {
      if (userStep + 1 === sequence.length) {
        setUserStep(0); 

        addColorToSequence(); 
      } else {
        setUserStep(userStep + 1);
        setMessageColor({ message: "Keep going!", color: "blue" });
      }
    } else {
      setMessageColor({
        message: "Game Over! Click Start to Retry.",
        color: "red",
      });
      setIsUserTurn(false); 
    }
  };

  
  useEffect(() => {
    if (sequence.length > 0){
      const playSequence = async () => {
        setIsUserTurn(false); // Disable user input during playback
        setMessageColor({ message: "Watch the sequence!", color: "yellow" });
    
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 600ms
        setActiveColor(sequence[sequence.length - 1]); // Highlight the current color
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait 600ms
        setActiveColor(null); // Remove highlight
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 300ms
    
        setMessageColor({ message: "Your turn!", color: "green" });
        setIsUserTurn(true); // Enable user input
      };
      playSequence()
    }
  }, [sequence]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Simon Game</h1>
      <p className={`text-lg mb-6 ${textColors[messageColor.color]}`}>
        {messageColor.message}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {colors.map((color) => (
          <SimonBlock
            key={color}
            color={color}
            onClick={() => handleUserClick(color)} 
            isActive={activeColor === color}
          />
        ))}
      </div>

      {/* Start button */}
      <button
        onClick={startGame}
        className="mt-8 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        {sequence.length > 0 && messageColor.color !== "red"
          ? "Restart"
          : "Start"}
      </button>
    </div>
  );
  
};

export default SimonGame;
