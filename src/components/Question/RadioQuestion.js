import React from 'react';
import styled from 'styled-components';
import {
  MessageWrapper,
  OptionsWrapper,
  Option
} from './shared';

const Question = (props) => {
  const { question, answerQuestion, friendlyQuestion } = props;
  const handleAnswer = (index) => {
    // Return if already answered
    if (question.userAnswer) return;
    answerQuestion({ id: question.id, answer: [index] })
  };

  return (
    <div>
      <MessageWrapper>
        {friendlyQuestion}
      </MessageWrapper>
      <OptionsWrapper>
        {question.answers.map((answer, index) => (
          <Option
            index={index}
            active={question.userAnswer && question.userAnswer.includes(index)}
            onClick={() => handleAnswer(index)}
          >
            {index + 1}. {answer.label}
          </Option>
        ))}
      </OptionsWrapper>
    </div>
  )
};

export default Question;
