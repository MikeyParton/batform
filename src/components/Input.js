import React, { useState } from 'react';

const Input = (props) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <input onChange={handleChange} value={value} />
  )
}

export default Input;
