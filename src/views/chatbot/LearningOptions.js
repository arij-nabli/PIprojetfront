import React from "react";

const LearningOptions = (props) => {
  
  const options = [
    {
      text: "Javascript",
      handler: props.actionProvider.handleJavascriptQuiz,
      id: 1,
    },
    { text: "Python", handler: () => {}, id: 2 },
    { text: "Golang", handler: () => {}, id: 3 },
  ];

  const optionsMarkup = options.map((option) => (

    <button
    className=" text-#BD2C43 font-bold py-2 px-4 rounded m-1"
    style={{ border: '2px solid #BD2C43' }}
   
  key={option.id}
  onClick={option.handler}
>
      {option.text}
    </button>
  ));

  return <div className="flex flex-wrap">{optionsMarkup}</div>;
};

export default LearningOptions;