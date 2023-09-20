import { useEffect } from "react";
const useKey = (key, action) => {
  useEffect(() => {
    console.log("key Effect is running");
    const callback = (event) => {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        action?.();
      }
    };
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [key, action]);
};

export { useKey };
