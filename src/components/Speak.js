import React, { useState, useEffect } from 'react';

const Speak = (props) => {
  const { active, onResult } = props;
  const [recognition, setRecognition] = useState();
  const result = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
			.map(result => result.transcript)
			.join("");

    onResult && onResult({
      transcript,
      isFinal: event.results[0].isFinal
    });
  }

  const end = (event) => {
    if (active) {
      recognition.start();
    }
  }

  useEffect(() => {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new window.SpeechRecognition();

    r.interimResults = true;
    r.addEventListener('result', result);
    r.addEventListener('end', end);
    setRecognition(r);
  }, []);

  useEffect(() => {
    if (active) {
      recognition.start();
    }
  }, [active])

  return null;
};

export default Speak;
