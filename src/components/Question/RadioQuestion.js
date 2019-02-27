import React from 'react';

const Question = (props) => {
  const { question } = props;
  return (
    <div>
      <div>{question.question}</div>
      <ul>
        {question.answers.map(answer => (
          <li>{answer.answer}</li>
        ))}
      </ul>
    </div>
  )
};

export default Question;
