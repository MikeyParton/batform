import React from 'react';
import { MessageWrapper } from './shared';

const Question = (props) => {
  const { question, answerQuestion, friendlyQuestion } = props;
  const handleAnswer = (index) => {
    // Return if already answered
    if (question.userAnswer) return;
    answerQuestion({ id: question.id, answer: "response" })
  };

  return (
    <>
      <MessageWrapper>
        {friendlyQuestion}
      </MessageWrapper>
    </>
  )
};

export default Question;
