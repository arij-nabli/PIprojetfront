import React from "react";

class MessageParser {
  constructor(actionProvider, config, currentQuestionId) {
    this.actionProvider = actionProvider;
    this.config = config;
    this.currentQuestionId = currentQuestionId; // Ajouter une propriété pour stocker l'ID de la question courante
  }
  setCurrentQuestionId(id) {
    this.currentQuestionId = id;
  }
  parse(message) {
    console.log(message);
  
    const lowercase = message.toLowerCase();

    if (lowercase.includes("hello") || lowercase.includes("hi")) {
      this.actionProvider.greet();
    }

    if (lowercase.includes("javascript") || lowercase.includes("js")) {
      this.actionProvider.handleJavascriptQuiz();
    } 
    if (lowercase.includes("correct") || lowercase.includes("incorrect")) {
      // Appel de la fonction handleAnswerQuiz avec la réponse de l'utilisateur
      this.actionProvider.handleAnswerQuiz(lowercase);
    }
  }
}

export default MessageParser;
