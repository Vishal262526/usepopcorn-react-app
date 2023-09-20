import { useEffect, useRef, useState } from "react";

const useLocalStorageState = (initValue, key) => {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);

    return storedValue != null ? JSON.parse(storedValue) : initValue;
  });

  const countRef = useRef(0);

  useEffect(() => {
    console.log(`UselocationStateState running on ${countRef.current} Times`);
    countRef.current++;
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export { useLocalStorageState };
