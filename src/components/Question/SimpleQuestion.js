import React from 'react';

const Question = (props) => {
  const { question, answerQuestion } = props;
  const handleAnswer = (index) => {
    // Return if already answered
    if (question.userAnswer) return;
    answerQuestion({ id: question.id, answer: "response" })
  };

  return (
    <div>
      <div>{question.question}</div>
    </div>
  )
};

export default Question;
