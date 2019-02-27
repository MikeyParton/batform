import React from 'react';
import { useStore, useActions } from 'easy-peasy';

const Question = () => {
  const question = useStore(state => state.questions.currentQuestion);
  const next = useActions(state => state.questions.next);
  if (!question) return null;

  return (
    <div>
      Child {question.question}
      <button onClick={next}>Next</button>
    </div>
  )
};

export default Question;
