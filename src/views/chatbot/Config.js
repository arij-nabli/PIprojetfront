import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import LearningOptions from "./LearningOptions";
import Quiz from "./Quizz";
import MessageParser from "./MessageParser";

const handleSendQuestionId = (id) => {
  // Logique pour gérer l'ID de la question
};

const config = {
  botName: "ECBot",
  initialMessages: [
    createChatBotMessage(`Hello. What do you want to learn`, {
      widget: "options",
    }),
    <button  className="absolute right-0 top-0 m-4">
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  </button>
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "javascriptQuiz",
      widgetFunc: (props) => {
        const { questions } = props;
        if (questions && questions.length > 0) {
          const { id } = questions[0];
          handleSendQuestionId(id);
        }
        return (
          <Quiz
            {...props}
            sendQuestionId={handleSendQuestionId}
          />
        );
      },
      props: {
        questions: [
          {
            question: "What is closure?",
            options: [
              "1-A link between an object and an object store that holds shared properties.",
              "2-A way to create HTML prototypes.",
              "3-A technique for defining CSS classes.",
            ],
            answer:
              "Closure is a way for a function to retain access to its enclosing function scope after the execution of that function is finished.",
            id: 1,
          },
          {
            question: "Explain prototypal inheritance",
            options: [
              "A link between an object and an object store that holds shared properties.",
              "A way to create HTML prototypes.",
              "A technique for defining CSS classes.",
            ],
            answer:
              "Prototypal inheritance is a link between an object and an object store that holds shared properties. If a property is not found on the host object, JavaScript will check the prototype object.",
            id: 2,
          },
        ],
      },
    },
  ],

  // Assurez-vous d'exporter correctement la classe MessageParser
  customStyles: {
    // Cette section permet de personnaliser les styles du chatbot
    botMessageBox: {
      backgroundColor: " #BD2C43",
    },
    chatButton: {
      backgroundColor: "#BD2C43",
    },
  },
  MessageParser: MessageParser, // Assurez-vous d'exporter correctement la classe MessageParser
};



export default config;