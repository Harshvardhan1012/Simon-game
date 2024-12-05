import React from 'react';

const SimonBlock = ({ color, onClick, isActive }) => {
  const colors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <div
      onClick={onClick}
      className={`w-24 h-24 rounded-md m-2 cursor-pointer transition-opacity hover:ring-2 border-black border   ${
        colors[color] 
      } ${isActive ? 'opacity-100 ring-2' : 'opacity-40'}`}
    />
  );
};

export default SimonBlock;
