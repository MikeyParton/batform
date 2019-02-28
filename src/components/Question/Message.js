import React, { useEffect } from 'react';
import { MessageWrapper } from './Question';

const Question = (props) => {
  const { question, answerQuestion } = props;

  // Show question after typing for a few seconds
  useEffect(() => {
    setTimeout(() => {
      answerQuestion({ id: question.id, answer: null})
    }, 2000);
  }, []);

  return (
    <MessageWrapper>
      {question.question}
    </MessageWrapper>
  )
};

export default Question;
