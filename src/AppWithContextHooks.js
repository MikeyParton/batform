import React, {
  useState,
  useContext
} from 'react';

const FormState = React.createContext();

const App = () => {
  const next = () => {
    setFormState({
      ...formState,
      index: formState.index + 1
    });
  };

  const back = () => {
    setFormState({
      ...formState,
      index: formState.index - 1
    });
  };

  const initialFormState = {
    questions: [1, 2, 3],
    index: 0,
    next,
    back
  };

  const [formState, setFormState] = useState(initialFormState);

  return (
    <FormState.Provider value={formState}>
      App
      <Child />
    </FormState.Provider>
  );
};

const Child = () => {
  const { questions, index, next } = useContext(FormState);
  const question = questions[index]
  return (
    <div>
      Child {question}
      <button onClick={next}>Next</button>
    </div>
  )
}

export default App;
