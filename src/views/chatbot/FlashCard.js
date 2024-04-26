import React, { useState } from "react";

const FlashCard = ({ question, options, handleOptionClick }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <div
        className="p-1 bg-gray-100 rounded-md cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {!showAnswer && <p className="text-lg">{question}</p>}
      
          <div    className="p-3 bg-gray-30 rounded-md cursor-pointer">
            {options.map((option, index) => (
              <p key={index} className="text-sm">
                {option}
              </p>
            ))}
          </div>

      </div>
      {showAnswer && (
        <button
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleOptionClick}
        >
          Next question
        </button>
      )}
    </>
  );
};

export default FlashCard;
