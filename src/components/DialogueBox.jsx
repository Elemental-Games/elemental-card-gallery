import React from 'react';

const DialogueBox = ({ text }) => {
  return (
    <div className="absolute top-4 right-4 max-w-md bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
      <p className="text-lg">{text}</p>
    </div>
  );
};

export default DialogueBox;