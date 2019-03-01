import {
  select,
  thunk
} from 'easy-peasy';
import mockService from './mockService';
import { normalize, schema } from 'normalizr';

const question = new schema.Entity('questions');
const questionSchema = [ question ];

const model = {
  voiceMode: true,
  sharedContext: {
    name: 'mate'
  },
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
    getById: select(state =>
      id => state.byId[id]
    ),
    askedIds: select(state => {
      // The list of questions that have been asked (based on currentIndex)
      // If the questions were not linear, each answer would be responsible
      // for pushing the next question id to this array
      const { ids, currentIndex } = state;
      return ids.slice(0, currentIndex + 1)
    }),
    // Actions
    answerQuestion: (state, payload) => {
      const question = state.byId[payload.id];

      let friendlyAnswer = payload.answer;
      if (Array.isArray(payload.answer)) {
        friendlyAnswer = payload
          .answer
          .map((index) => question.answers[index].label)
          .join(', ');
      }

      state.byId = {
        ...state.byId,
        [payload.id]: {
          ...question,
          userAnswer: payload.answer,
          friendlyAnswer: friendlyAnswer,
          error: false
        }
      };

      state.currentIndex++;
    },
    setQuestionError: (state, payload) => {
      const question = state.byId[payload.id];

      state.byId = {
        ...state.byId,
        [payload.id]: {
          ...question,
          error: true
        }
      };
    },
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
