import React from 'react';
import { useStore, useActions } from 'easy-peasy';
import RadioQuestion from './RadioQuestion';

const questionComponents = {
  radio: RadioQuestion
};

const Question = () => {
  const question = useStore(state => state.questions.currentQuestion);
  const next = useActions(state => state.questions.next);

  if (!question) return null;
  const Component = questionComponents[question.type];
  if (!Component) return null;

  return (
    <div>
      <button onClick={next}>Next</button>
      <Component question={question} />
    </div>
  )
};

export default Question;
