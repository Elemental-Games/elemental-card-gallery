import React from 'react';

const DialogueBox = ({ text }) => {
  return (
    <div className="absolute top-4 right-4 max-w-md bg-purple-900 bg-opacity-90 p-4 rounded-lg shadow-lg">
      <p className="text-lg text-purple-200">{text}</p>
    </div>
  );
};

export default DialogueBox;