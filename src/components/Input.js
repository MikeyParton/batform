import React, { useState } from 'react';
import Speak from './Speak';
import styled from 'styled-components';

const InputWrapper = styled.div`
  border-top: 1px solid grey;
  flex-shrink: 0;
`;

const Input = (props) => {
  const [speakActive, setSpeakActive] = useState(false);
  const [value, setValue] = useState('');

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
    </InputWrapper>
  )
}

export default Input;
