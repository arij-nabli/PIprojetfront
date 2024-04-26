
import React from "react";
import Chatbot from "react-chatbot-kit";
import Config from "./Config";
import ActionProvider from "./ActionProvider";
import LearningOptions from "./LearningOptions";
import MessageParser from "./MessageParser";
import 'react-chatbot-kit/build/main.css';
export default function Chat() {
  return (
    <>
    <div style ={{maxWidth: "300px"}}>
      <Chatbot
        config={Config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        LearningOptions={LearningOptions}
      />
      </div>
    </>
  );
};

