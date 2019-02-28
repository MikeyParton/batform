import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MessageWrapper,
  OptionsWrapper,
  Option
} from './shared';

const Placeholder = styled.div`
  height: 59px;
`;

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
      <OptionsWrapper>
        {question.answers.map((answer, index) => (
          <Option
            active={selectedValues.includes(index)}
            onClick={() => toggleAnswer(index)}
          >
            {index + 1}. {answer.label}
          </Option>
        ))}
        {selectedValues.length > 0 ? (
          <Option
            submit
            onClick={handleAnswer}
          >
            Submit
          </Option>
        ) : (
          <Placeholder />
        )}
      </OptionsWrapper>
    </div>
  )
};

export default Question;
