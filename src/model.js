import {
  select,
  thunk
} from 'easy-peasy';
import mockService from './mockService';
import { normalize, schema } from 'normalizr';

const question = new schema.Entity('questions');
const questionSchema = [ question ];

const model = {
  questions: {
    byId: {},
    ids: [],
    items: select(({ ids, byId }) => (
      ids.map(id => byId[id])
    )),
    currentIndex: 0,
    currentQuestion: select(({ byId, currentIndex, ids }) => {
      if (!ids) return null;
      const id = ids[currentIndex];
      if (!id) return null;
      return byId[id];
    }),
    // Actions
    next: (state, payload) => {
      state.currentIndex++;
    },
    back: (state, payload) => {
      state.currentIndex--;
    },
    fetched: (state, payload) => {
      state.byId = payload;
      state.ids = Object.keys(payload);
    },
    fetch: thunk(async actions => {
      const response = await mockService.fetchQuestions();
      const { entities: { questions } } = normalize(response, questionSchema);
      actions.fetched(questions);
    })
  },
  initialise: thunk(async (actions, payload, { dispatch }) => {
    await dispatch.questions.fetch();
  })
};

export default model;
