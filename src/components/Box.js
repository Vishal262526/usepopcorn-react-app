import { useState } from "react";

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <div className="dropdown-btn">
        <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
          {isOpen ? "-" : "+"}
        </button>
      </div>

      {isOpen && children}
    </div>
  );
};

export default Box;
