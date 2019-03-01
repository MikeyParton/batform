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
  const { question, answerQuestion, friendlyQuestion } = props;
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

  const hasSelected = selectedValues.length > 0;
  const hasAnswered =  question.userAnswer;
  const showSubmit = hasSelected && !hasAnswered;
  const showPlaceholder = !hasSelected && !hasAnswered;

  return (
    <div>
      <MessageWrapper>
        {friendlyQuestion}
      </MessageWrapper>
      <OptionsWrapper>
        {question.answers.map((answer, index) => (
          <Option
            index={index}
            active={selectedValues.includes(index) || (question.userAnswer && question.userAnswer.includes(index))}
            onClick={() => toggleAnswer(index)}
          >
            {index + 1}. {answer.label}
          </Option>
        ))}
        {showSubmit && (
          <Option
            index={0}
            submit
            onClick={handleAnswer}
          >
            Submit
          </Option>
        )}
        {showPlaceholder && <Placeholder />}
      </OptionsWrapper>
    </div>
  )
};

export default Question;
