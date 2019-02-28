import React, { useState } from 'react';
import { useStore, useActions } from 'easy-peasy';
import AutoTextarea from 'react-textarea-autosize';
import { isMobile } from 'react-device-detect';
import { Microphone, Send } from 'icons';
import Speak from './Speak';
import styled from 'styled-components';

const InputWrapper = styled.div`
  border-top: 1px solid grey;
  display: flex;
  flex-shrink: 0;
  padding: 20px 10px;

  textarea {
    border: none;
    flex-grow: 1;
    font-size: 18px;
    resize: none;
    outline: none;
  }
`;

const IconWrapper = styled.div`
  align-self: flex-end;
  margin-right: 10px;
`;

const Input = (props) => {
  const [speakActive, setSpeakActive] = useState(false);
  const [value, setValue] = useState('');
  const answerQuestion = useActions(state => state.questions.answerQuestion);
  const currentQuestion = useStore(state => state.questions.currentQuestion);

  const handleSimpleSend = () => {
    answerQuestion({ id: currentQuestion.id, answer: value })
  }

  const handleRadioSend = () => {
    const index = currentQuestion.answers.findIndex((element, index) => {
      return element.label.toLowerCase() === value.toLowerCase() || value === (index + 1).toString()
    });
    if (index === -1) return;
    answerQuestion({ id: currentQuestion.id, answer: [index] });
  }

  const handleCheckboxSend = () => {
    let selectedValues = value.match(/\d/g)
    if (!selectedValues) {
      selectedValues = []
      currentQuestion.answers.map((element, index) => {
        if ((value.toLowerCase()).includes(element.label.toLowerCase())) {
          selectedValues = [...selectedValues, index]
        }
      })
    } else {
        selectedValues = selectedValues.map((val) => {
          return parseInt(val) - 1 ;
        });
    }

    if (selectedValues.length < 1) return;
    answerQuestion({ id: currentQuestion.id, answer: selectedValues });
  }

  const handleSend = () => {
    const handlers = {
      radio: handleRadioSend,
      checkbox: handleCheckboxSend,
      date: handleSimpleSend,
      textarea: handleSimpleSend
    };

    const handler = handlers[currentQuestion.type];
    handler();
    setValue('');
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const onSpeakResult = (event) => {
    setValue(event.transcript);
  }

  const handleKeyPress = (event) => {
    // Desktop only form behaviour
    // Enter = send
    // Shift + Enter or Alt + Enter = new line
    if (event.charCode === 13 && !event.altKey && !event.shiftKey && !isMobile) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <InputWrapper>
      <AutoTextarea
        maxRows={3}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        placeholder="Type your message"
        value={value}
      />
      <Speak
        active={speakActive}
        onResult={onSpeakResult}
      />
      <IconWrapper
        onMouseDown={() => setSpeakActive(true)}
        onMouseUp={() => setSpeakActive(false)}
      >
        <Microphone />
      </IconWrapper>
      <IconWrapper onClick={() => handleSend() }>
        <Send />
      </IconWrapper>
    </InputWrapper>
  )
}

export default Input;
