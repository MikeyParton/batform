import React from 'react';

const Question = (props) => {
  const { question, answerQuestion } = props;
  const handleAnswer = (index) => {
    // Return if already answered
    if (question.userAnswer) return;
    answerQuestion({ id: question.id, answer: [index] })
  };

  return (
    <div>
      <div>{question.question}</div>
      <ul>
        {question.answers.map((answer, index) => (
          <li onClick={() => handleAnswer(index)}>
            {answer.answer}
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
