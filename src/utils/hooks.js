import { useRef, useEffect } from 'react';

// Custom hook to have access to the previous value
// of something, so we can do comparisons
export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current || {};
};
