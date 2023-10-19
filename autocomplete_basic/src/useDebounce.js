import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // setup code
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // clean up function
    return () => clearTimeout(handler);
    // dependencies
  }, [value, delay]);

  return debouncedValue;
}
