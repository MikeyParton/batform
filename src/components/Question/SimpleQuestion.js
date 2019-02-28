import React from 'react';
import { MessageWrapper } from './Question';

const Question = (props) => {
  const { question, answerQuestion } = props;
  const handleAnswer = (index) => {
    // Return if already answered
    if (question.userAnswer) return;
    answerQuestion({ id: question.id, answer: "response" })
  };

  return (
    <>
      <MessageWrapper>
        {question.question}
      </MessageWrapper>
    </>
  )
};

export default Question;
