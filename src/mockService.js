const wait = (time) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, time);
});

const questions = [
  {
    id: 1,
    question: 'Is this a residential or commercial plumbing job?',
    type: 'radio',
    answers: [
      { answer: 'Residential' },
      { answer: 'Commercial' }
    ]
  },
  {
    id: 2,
    question: 'Which service do you need?',
    type: 'radio',
    answers: [
      { answer: 'Installation' },
      { answer: 'Replacement' },
      { answer: 'Repair and Maintenance' }
    ]
  },
  {
    id: 3,
    question: 'What do you need repaired or maintained?',
    type: 'radio',
    answers: [
      { answer: 'Pipelines' },
      { answer: 'Gasline' },
      { answer: 'Shower or bathtub' },
      { answer: 'Toilet' }
    ]
  },
  {
    id: 4,
    question: 'What shower or bathtub problems do you have?',
    type: 'checkbox',
    answers: [
      { answer: 'Clogged drain' },
      { answer: 'Slow drain' },
      { answer: 'Shower or bathtub' },
      { answer: 'Toilet' }
    ]
  }
];

const mockService = {
  fetchQuestions: async () => {
    await wait(1000);
    return questions;
  }
};

export default mockService;
