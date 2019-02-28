import React, { useState, useEffect } from 'react';
import { useStore, useActions } from 'easy-peasy';
import RadioQuestion from './RadioQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import SimpleQuestion from './SimpleQuestion';
import Message from './Message';

const questionComponents = {
  radio: RadioQuestion,
  checkbox: CheckboxQuestion,
  textarea: SimpleQuestion,
  date: SimpleQuestion,
  message: Message
};

const Question = (props) => {
  const { id } = props;
  const question = useStore(state => state.questions.getById(id));
  const answerQuestion = useActions(state => state.questions.answerQuestion);
  const [typing, setTyping] = useState(true);

  // Show question after typing for a few seconds
  useEffect(() => {
    setTimeout(() => {
      setTyping(false);
    }, 2000);
  }, []);

  const Component = questionComponents[question.type];
  if (!Component) return null;

  // Typing indicator between questions
  if (typing) {
    return (
      <div>
        Oneflare is typing ....
      </div>
    )
  }

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
