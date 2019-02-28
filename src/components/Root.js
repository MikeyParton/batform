import React, { useEffect } from 'react';
import { useActions, useStore } from 'easy-peasy';
import Question from './Question';
import Input from './Input';

const Root = () => {
  const initialise = useActions(actions => actions.initialise)
  useEffect(() => {
    initialise()
  }, []);

  const askedIds = useStore(state => state.questions.askedIds);

  return (
    <div>
      {askedIds.map(id => (
        <Question id={id} />
      ))}
      <Input />
    </div>
  );
};

export default Root;
