export const Squares = ({ handleClick, item, isWinningSquare,result }) => {
  return (
    <button
      className="border-0 square d-flex align-items-center justify-content-center"
      onClick={handleClick}
      disabled={item=="X" || item=="O" || result ? true : false }
      style={{
        color:isWinningSquare ? "teal" :"black"
      }}
    >
      {item}
    </button>
  );
};
