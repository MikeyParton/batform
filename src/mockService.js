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
      { label: 'Residential' },
      { label: 'Commercial' }
    ]
  },
  {
    id: 2,
    question: 'Which service do you need?',
    type: 'radio',
    answers: [
      { label: 'Installation' },
      { label: 'Replacement' },
      { label: 'Repair and Maintenance' }
    ]
  },
  {
    id: 3,
    question: 'What do you need repaired or maintained?',
    type: 'radio',
    answers: [
      { label: 'Pipelines' },
      { label: 'Gasline' },
      { label: 'Shower or bathtub' },
      { label: 'Toilet' }
    ]
  },
  {
    id: 4,
    question: 'What shower or bathtub problems do you have?',
    type: 'checkbox',
    answers: [
      { label: 'Clogged drain' },
      { label: 'Slow drain' },
      { label: 'Shower or bathtub' },
      { label: 'Toilet' }
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
