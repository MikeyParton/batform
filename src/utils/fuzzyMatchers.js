import FuzzySet from 'fuzzyset';
import wordsToNumbers from 'words-to-numbers';

// Find the index of the closest matching word
export const indexOfFuzzyWordMatch = (value, options) => {
  const fs = FuzzySet(options);
  const results = fs.get(value);

  // If we don't have the one result, bail out
  if (!results || !results.length === 1) return -1;
  // If we have a low quality result, bail out
  if (results[0][0] < 0.5) return -1;

  return options.findIndex((option, index) => {
    return option === results[0][1];
  });
};

// Find the index of an option number e.g. 1
export const indexOfnumberMatch = (value, options) => {
  return options.findIndex((option, index) => {
    if (value === (index + 1).toString()) return true;
  });
};

// Find the index of an option number word e.g. 'one' or 'won'
export const indexOfFuzzyNumberMatch = (value, options) => {
  return options.findIndex((option, index) => {
    if (wordsToNumbers(value, { fuzzy: true }) === index + 1) return true;
  });
};
