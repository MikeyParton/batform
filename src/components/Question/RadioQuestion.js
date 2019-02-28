import React from 'react';
import { MessageWrapper } from './Question';

const Question = (props) => {
  const { question, answerQuestion } = props;
  const handleAnswer = (index) => {
    // Return if already answered
    if (question.userAnswer) return;
    answerQuestion({ id: question.id, answer: [index] })
  };

  return (
    <div>
      <MessageWrapper>
        {question.question}
      </MessageWrapper>
      <ul>
        {question.answers.map((answer, index) => (
          <li onClick={() => handleAnswer(index)}>
            {answer.label}
            {question.userAnswer && question.userAnswer.includes(index) && (
              <span>+</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Question;
