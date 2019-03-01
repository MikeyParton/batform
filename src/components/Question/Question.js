import React, { useState, useEffect, useRef } from 'react';
import { useStore, useActions } from 'easy-peasy';
import styled from 'styled-components';
import { MessageWrapper } from './shared';
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
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  ${props => props.user && `
    justify-content: flex-end;
  `}
`;

const questionComponents = {
  radio: RadioQuestion,
  checkbox: CheckboxQuestion,
  textarea: SimpleQuestion,
  date: SimpleQuestion,
  message: Message,
  name: SimpleQuestion
};

const synthesis = window.speechSynthesis

const Question = (props) => {
  const { id, voiceMode } = props;
  const sharedContext = useStore(state => state.sharedContext);
  const question = useStore(state => state.questions.getById(id));
  const answerQuestion = useActions(state => state.questions.answerQuestion);
  const nextQuestion = useActions(state => state.questions.nextQuestion);
  const [typing, setTyping] = useState(true);
  const friendlyQuestion = question.question.replace('$name', sharedContext.name)
  const friendlyAnswer = question.friendlyAnswer;
  const errorMessage = "Sorry I didn't catch that. Can you try again please?";

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

  // If voiceMode is disabled, stop speaking
  useEffect(() => {
    if (!voiceMode) {
      synthesis.cancel()
    }
  }, [voiceMode])

  // If we progress to a new question, stop speaking
  useEffect(() => {
    if (synthesis.speaking) {
      synthesis.cancel()
    }
  })

  // Read questions when the messages have rendered
  // TODO: This is kind of gross and could use a refactor
  // It should always reflect the order of components in
  // the render method

  useEffect(() => {
    if (typing || !voiceMode || question.userAnswer) {
      return
    }

    // If we get an error, read it out here
    question.error && window.speechSynthesis.speak(
      new SpeechSynthesisUtterance(errorMessage)
    )

    // Read the question
    window.speechSynthesis.speak(
      new SpeechSynthesisUtterance(friendlyQuestion)
    )
    // ... followed by the available answers
    question.answers && question.answers.forEach(({label}, index) =>
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance(`${index + 1}. ${label}`)
      )
    )
  }, [question, typing])

  useEffect(() => {
    if (typeof question.userAnswer !== 'undefined') {
      if (voiceMode) {
        const answerUtterance = new SpeechSynthesisUtterance(
          question.type === 'message'
            ? ' '
            : `okay, ${friendlyAnswer}`
        );
        answerUtterance.onend = nextQuestion;
        window.speechSynthesis.speak(answerUtterance);
      } else {
        nextQuestion();
      }
    }
  }, [question.userAnswer])

  const Component = questionComponents[question.type];
  if (!Component) return null;

  return (
    <>
      <Row ref={questionRef}>
        <Avatar src={batman}/>
        {typing ? (
          <MessageWrapper typing>
            ...
          </MessageWrapper>
        ) : (
          <Component
            answerQuestion={answerQuestion}
            question={question}
            friendlyQuestion={friendlyQuestion}
          />
        )}
      </Row>
      {question.userAnswer && (
        <Row user>
          <MessageWrapper user>
            {friendlyAnswer}
          </MessageWrapper>
        </Row>
      )}
      {question.error && (
        <Row>
          <Avatar src={batman} />
          <MessageWrapper error>
            {errorMessage}
          </MessageWrapper>
        </Row>
      )}
    </>
  )
};

export default Question;
