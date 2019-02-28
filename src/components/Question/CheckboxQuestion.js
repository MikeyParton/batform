import React, { useState } from 'react';
import { MessageWrapper } from './Question';

const Question = (props) => {
  const { question, answerQuestion } = props;
  const [selectedValues, setSelectedValues] = useState([]);
  const handleAnswer = () => {
    // Return if already answered
    if (question.userAnswer) return;
    answerQuestion({ id: question.id, answer: selectedValues })
  };
  const toggleAnswer = (index) => {
    // Return if already answered
    if (question.userAnswer) return;

    let newSelectedValues
    if (selectedValues.includes(index)) {
      // remove value from selected answers
      newSelectedValues = selectedValues.filter((element) => element !== index)
    } else {
      // add value to selected answers
      newSelectedValues = [...selectedValues, index]
    }
    setSelectedValues(newSelectedValues)
  };

  return (
    <div>
      <MessageWrapper>
        {question.question}
      </MessageWrapper>
      <ul>
        {question.answers.map((answer, index) => (
          <li onClick={() => toggleAnswer(index)}>
            {answer.label}
            {selectedValues.includes(index) && (
              <span>+</span>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => handleAnswer()}>
        Submit
      </button>
    </div>
  )
};

export default Question;
