import React, { useState, useEffect } from 'react';
import { useStore, useActions } from 'easy-peasy';
import AutoTextarea from 'react-textarea-autosize';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import {
  indexOfnumberMatch,
  indexOfFuzzyNumberMatch,
  indexOfFuzzyWordMatch
} from 'utils/fuzzyMatchers';
import { Microphone, Send } from 'icons';
import Speak from './Speak';

const autoSubmitSpeakTypes = ['radio', 'checkbox'];

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
  const setQuestionError = useActions(state => state.questions.setQuestionError);
  const setSharedContext = useActions(state => state.setSharedContext);
  const currentQuestion = useStore(state => state.questions.currentQuestion);
  const autoSubmitSpeak = currentQuestion && autoSubmitSpeakTypes.includes(currentQuestion.type);

  useEffect(() => {
    if (speakActive) {
      setValue('');
    }
  }, [speakActive])

  const handleSimpleSend = () => {
    answerQuestion({ id: currentQuestion.id, answer: value })
  }

  const handleNameSend = () => {
    setSharedContext({
      name: value
    })
    handleSimpleSend();
  }

  const handleRadioSend = () => {
    const answers = currentQuestion.answers.map(answer => answer.label);
    let index = indexOfFuzzyNumberMatch(value, answers);

    if (index === -1) {
      index = indexOfFuzzyWordMatch(value, answers);
    }

    // Set error message
    if (index === -1) {
      setQuestionError({ id: currentQuestion.id });
      return;
    }
    answerQuestion({ id: currentQuestion.id, answer: [index] });
  }

  const handleCheckboxSend = () => {
    let selectedValues

    const options = currentQuestion.answers.map(answer => answer.label);
    // const numberInputs = value.match(/\d/g);
    const inputs = value
      .split(' ')
      .filter((input) => input !== 'and');

    const indicies = inputs
      .map((input) => indexOfFuzzyNumberMatch(input, options))
      .filter((index) => index !== -1);

    if (indicies.length === inputs.length) {
      selectedValues = indicies;
    }

    if (!selectedValues) {
      selectedValues = []
      currentQuestion.answers.map((element, index) => {
        if ((value.toLowerCase()).includes(element.label.toLowerCase())) {
          selectedValues = [...selectedValues, index]
        }
      })
    }

    if (selectedValues.length < 1) {
      setQuestionError({ id: currentQuestion.id });
      return;
    }
    answerQuestion({ id: currentQuestion.id, answer: selectedValues });
  }

  const handleSend = () => {
    const handlers = {
      radio: handleRadioSend,
      checkbox: handleCheckboxSend,
      date: handleSimpleSend,
      textarea: handleSimpleSend,
      name: handleNameSend
    };

    const handler = handlers[currentQuestion.type];
    if (!handler) return;
    handler();
    setValue('');
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const onSpeakResult = (event) => {
    console.log('speakresult', speakActive);
    setValue(event.transcript);
  }

  const speakStart = () => {
    setSpeakActive(true)
  }

  const speakFinish = () => {
    console.log('button released', value);
    setSpeakActive(false);

    // Autosubmit is no good until we can fix this mismatch error
    // There appears to be a bug sometimes where
    // onResult gets called even after the button is
    // released. That's why we use a timeout
    // if (autoSubmitSpeak) {
    //   setTimeout(handleSend, 1000);
    // }
  }

  // This is the final event for when speaking is over
  const onSpeakEnd = () => {
    console.log('all done!')
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

  const placeholderText = () => {
    if (speakActive) return 'Start Speaking'
    if (autoSubmitSpeak) return '';
    return 'Type your message';
  }

  return (
    <InputWrapper>
      <AutoTextarea
        maxRows={3}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        placeholder={placeholderText()}
        value={value}
      />
      <Speak
        active={speakActive}
        onResult={onSpeakResult}
        onEnd={onSpeakEnd}
      />
      <IconWrapper
        onMouseDown={speakStart}
        onMouseUp={speakFinish}
        onMouseLeave={speakFinish}
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
