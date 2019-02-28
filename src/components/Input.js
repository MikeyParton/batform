import React, { useState } from 'react';
import Speak from './Speak';

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
    <div>
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
    </div>
  )
}

export default Input;
