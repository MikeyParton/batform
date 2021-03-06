const wait = (time) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, time);
});

const questions = [
  {
    id: 1,
    question: `Hi 👋 I’m the Oneflare automated assistant, here to help match you with the right plumber for your request. 🔧 `,
    type: 'message'
  },
  {
    id: 2,
    question: 'Let\'s get started. 😊 \nFirstly, what\'s your name?',
    type: 'name'
  },
  {
    id: 3,
    question: `Thanks for that $name. 🙂 Now I need to know some details about your plumbing problem.\nWhat do you need the plumber to do?`,
    type: 'radio',
    answers: [
      { label: 'Installation' },
      { label: 'Replacement' },
      { label: 'Repair' }
    ]
  },
  {
    id: 4,
    question: 'What do you need repaired?',
    type: 'radio',
    answers: [
      { label: 'Shower' },
      { label: 'Toilet' },
      { label: 'Sink' },
      { label: 'Waterheater' }
    ]
  },
  {
    id: 5,
    question: 'What problems does the shower have?',
    type: 'checkbox',
    answers: [
      { label: 'Clogged drain' },
      { label: 'Poor water pressure' },
      { label: 'Broken fixture' },
      { label: 'Poor temperature control' }
    ]
  },
  {
    id: 6,
    question: 'How long has this been an issue?',
    type: 'radio',
    answers: [
      { label: 'A day' },
      { label: 'Less than a week' },
      { label: 'More than a week' }
    ]
  },
  {
    id: 7,
    question: 'When would you like the plumber to attend to the problem?',
    type: 'date'
  },
  {
    id: 8,
    question: 'Is there anything else you\'d like to add about your request?',
    type: 'textarea'
  },
  {
    id: 9,
    question: 'Lastly, what\'s your phone number so we can send you updates?',
    type: 'textarea'
  },
  {
    id: 10,
    question: `Thanks $name. We have all the details about your shower problem now. Plumbers will contact you shortly to provide a quote and arrange a time to get the job done.`,
    type: 'message'
  },
  {
    id: 11,
    question: 'Please contact us if you have any questions',
    type: 'radio',
    answers: [
      { label: 'Call us 📞' },
      { label: 'Chat to a support member 👩‍💻' }
    ]
  },
];

const mockService = {
  fetchQuestions: async () => {
    await wait(1000);
    return questions;
  }
};

export default mockService;
