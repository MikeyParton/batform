import React from 'react';
import styled from 'styled-components';
import {
  MessageWrapper,
  OptionsWrapper,
  Option
} from './shared';

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
      <OptionsWrapper>
        {question.answers.map((answer, index) => (
          <Option
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
