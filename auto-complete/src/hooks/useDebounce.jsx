import { useState, useEffect } from "react";

export default function useDebounce(value, delay = 500) {
  console.log(value);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log("debounced", value);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
      console.log("cleartimeout", id);
    };
  }, [value, delay]);
  return debouncedValue;
}
