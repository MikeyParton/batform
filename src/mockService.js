const wait = (time) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, time);
});

const questions = [
  { id: 1, question: 'what is your name ?' },
  { id: 2, question: 'what is your phone number ?' }
];

const mockService = {
  fetchQuestions: async () => {
    await wait(1000);
    return questions;
  }
};

export default mockService;
