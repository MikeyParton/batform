import React, { useEffect } from 'react';

const Question = (props) => {
  const { question, answerQuestion } = props;

  // Show question after typing for a few seconds
  useEffect(() => {
    setTimeout(() => {
      answerQuestion({ id: question.id, answer: null})
    }, 2000);
  }, []);

  return (
    <div>
      <div>{question.question}</div>
    </div>
  )
};

export default Question;
