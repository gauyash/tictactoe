import React from "react";

export  const History = ({ history, moveTo,currentMove }) => {
  return (
    <ul>
      {history.map((_, index) => {
        return (
          <li className="list-unstyled text-center" key={index}>
            <button 
            className={`py-2 px-3 mt-3 rounded text-bg-warning ${index==currentMove? "border-3" :"border-0"}`}
            onClick={()=>{moveTo(index)}}>{index==0? "Go to game start":`Move to ${index}`}</button>
          </li>
        );
      })}
    </ul>
  );
};
