import React, { useEffect } from 'react';
import { useActions, useStore } from 'easy-peasy';
import Question from './Question';
import Input from './Input';
import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  border-bottom: 1px solid grey;
  flex-shrink: 0;
  height: 40px;
  padding: 10px;
`;

const MessageWindow = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: scroll;
`;

const Root = () => {
  const initialise = useActions(actions => actions.initialise)
  useEffect(() => {
    initialise()
  }, []);

  const askedIds = useStore(state => state.questions.askedIds);

  return (
    <Page>
      <Header>
        Oneflare
      </Header>
      <MessageWindow>
        {askedIds.map(id => (
          <Question id={id} />
        ))}
      </MessageWindow>
      <Input />
    </Page>
  );
};

export default Root;
