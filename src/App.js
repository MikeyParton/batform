import React from 'react';
import model from './model'
import {
  StoreProvider,
  createStore,
} from 'easy-peasy';
import Root from './components/Root';

const store = createStore(model);

const App = () => {
  return (
    <StoreProvider store={store}>
      <Root />
    </StoreProvider>
  );
};

export default App;
