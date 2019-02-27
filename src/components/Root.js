import React, { useEffect } from 'react';
import { useActions } from 'easy-peasy';
import Question from './Question';
import Input from './Input';

const Root = () => {
  const initialise = useActions(actions => actions.initialise)
  useEffect(() => {
    initialise()
  });
  return (
    <div>
      <Question />
      <Input />
    </div>
  );
};

export default Root;
