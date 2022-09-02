import React from "react";

function Button({ btnName, addtionalStyles, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 bg-[#FA5400]  text-white shadow-md font-semibold hover:scale-105 duration-300 active:scale-95 ${addtionalStyles}`}
    >
      <p className="font-light">{btnName}</p>
    </button>
  );
}

export default Button;
