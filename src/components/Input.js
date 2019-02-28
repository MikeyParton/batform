import React, { useState } from 'react';
import { useStore, useActions } from 'easy-peasy';
import Speak from './Speak';
import styled from 'styled-components';

const InputWrapper = styled.div`
  border-top: 1px solid grey;
  flex-shrink: 0;
`;

const Input = (props) => {
  const [speakActive, setSpeakActive] = useState(false);
  const [value, setValue] = useState('');
  const answerQuestion = useActions(state => state.questions.answerQuestion);
  const currentQuestion = useStore(state => state.questions.currentQuestion);

  const handleSimpleSend = () => {
    answerQuestion({ id: currentQuestion.id, answer: value })
  }
  const handleSend = () => {
    const handlers = {
      // radio: handleRadioSend,
      // checkbox: handleCheckboxSend,
      // date: handleSimpleSend,
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

  return (
    <InputWrapper>
      <textarea onChange={handleChange} value={value} />
      <button
        onMouseDown={() => setSpeakActive(true)}
        onMouseUp={() => setSpeakActive(false)}
      >
          Mic
      </button>
      <Speak
        active={speakActive}
        onResult={onSpeakResult}
      />
      <button
        onClick={() => handleSend() }
      >
          Submit
      </button>
    </InputWrapper>
  )
}

export default Input;
