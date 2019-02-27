import React, { useEffect } from 'react';
import { useActions } from 'easy-peasy';
import Question from './Question';

const Root = () => {
  const initialise = useActions(actions => actions.initialise)
  useEffect(() => {
    initialise()
  });
  return (
    <div>
      <Question />
    </div>
  );
};

export default Root;
