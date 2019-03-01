import React, { useEffect } from 'react';
import { MessageWrapper } from './shared';

const Question = (props) => {
  const { question, answerQuestion, friendlyQuestion } = props;

  // Show question after typing for a few seconds
  useEffect(() => {
    setTimeout(() => {
      answerQuestion({ id: question.id, answer: null})
    }, 2000);
  }, []);

  return (
    <MessageWrapper>
      {friendlyQuestion}
    </MessageWrapper>
  )
};

export default Question;
