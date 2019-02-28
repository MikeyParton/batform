import React, { useState, useEffect, useRef } from 'react';
import { useStore, useActions } from 'easy-peasy';
import styled from 'styled-components';
import RadioQuestion from './RadioQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import SimpleQuestion from './SimpleQuestion';
import Message from './Message';
import batman from 'images/batman.png';

const Avatar = styled.img`
  border-radius: 30px;
  height: 60px;
  margin-right: 10px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;

  ${props => props.user && `
    justify-content: flex-end;
  `}
`;

export const MessageWrapper = styled.div`
  background-color: #D8D8D8;
  border-radius: 4px;
  padding: 20px;
  white-space: pre-line;

  ${props => props.user && `
    background-color: #263133;
    color: white;
  `}
`

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

  const questionRef = useRef();
  // Scroll the question into view when it appears
  useEffect(() => {
    if (!questionRef.current) return;
    questionRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const Component = questionComponents[question.type];
  if (!Component) return null;

  return (
    <>
      <Row ref={questionRef}>
        <Avatar src={batman} />
        {typing ? (
          <MessageWrapper typing>
            ...
          </MessageWrapper>
        ) : (
          <Component
            answerQuestion={answerQuestion}
            question={question}
          />
        )}
      </Row>
      {question.userAnswer && (
        <Row user>
          <MessageWrapper user>
            {question.friendlyAnswer}
          </MessageWrapper>
        </Row>
      )}
    </>
  )
};

export default Question;
