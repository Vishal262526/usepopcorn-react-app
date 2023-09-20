import { useEffect, useRef } from "react";
import { useKey } from "../hooks/useKey";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useKey("enter", () => {
    if (document.activeElement !== inputEl.current) {
      inputEl.current.focus();
      setQuery("");
    }
  });

  return (
    <div className="search">
      <input
        ref={inputEl}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
