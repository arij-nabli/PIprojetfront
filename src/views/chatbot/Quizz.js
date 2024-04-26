import React, {Component} from 'react';
import Question from './Question';
import Answer from './Answer';


export default class Quiz extends Component {

    // initiating the local state
    state = {
        quiestions: {
            1: 'Which method is used to convert a string to an integer in JavaScript?',
            2: 'How do you add an element to the end of an array in JavaScript?',
            3: 'What is the syntax for declaring a variable in JavaScript?'
        },
        answers: {
            1: {
              1: 'parseInt()',
              2: ' parseFloat()',
              3: 'toInteger()'
            },
            2: {
                1: 'array.add(element)',
                2: 'array.push(element)',
                3: ' array.append(element)'
            },
            3: {
                1: 'var myVar',
                2: 'variable myVar',
                3: 'let myVar'
            }
        },
        correctAnswers: {
            1: '1',
            2: '2',
            3: '1'
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0
    }

    // the method that checks the correct answer
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render(){
        let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
        return(
            <div className="Content">
                {step <= Object.keys(quiestions).length ? 
                    (<>
                        <Question
                            question={quiestions[step]}
                        />
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                        <button
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(quiestions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <p>Your score is: {score} of {Object.keys(quiestions).length}</p>
                            <p>Thank you!</p>
                        </div>
                    )
                }
            </div>
        );
    }
}