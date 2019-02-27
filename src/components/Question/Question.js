import React from 'react';
import { useStore, useActions } from 'easy-peasy';
import RadioQuestion from './RadioQuestion';

const questionComponents = {
  radio: RadioQuestion
};

const Question = (props) => {
  const { id } = props;
  const question = useStore(state => state.questions.getById(id));
  const answerQuestion = useActions(state => state.questions.answerQuestion);

  if (!question) return null;
  const Component = questionComponents[question.type];
  if (!Component) return null;

  return (
    <div>
      <Component
        answerQuestion={answerQuestion}
        question={question}
      />
    </div>
  )
};

export default Question;
