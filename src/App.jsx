import "./App.css";
import { History } from "./components/History";
import { Squares } from "./components/squares";
import { useState } from "react";

function App() {
  const [currentMove, setCurrentMove] = useState(0);

  const [history, setHistory] = useState([
    {
      square: new Array(9).fill(undefined),
      xPlayer: true,
    },
  ]);

  const gamingBoard = history[currentMove];

  const result = calculateWinner(gamingBoard.square);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.winningLine : null;



  // Handling the player click
  function handleClick(index) {

    setHistory(currentHistory =>{

      const isTraversing=currentMove + 1 !== currentHistory.length;


      const lastGamingState=isTraversing? currentHistory[currentMove] :currentHistory[currentHistory.length - 1];

      const nextGamingState=lastGamingState.square.map((squareValue,position)=>{
        if(position==index){
          return lastGamingState.xPlayer ? "X" : "O"
        }
        return squareValue
      })

      const base=isTraversing ? currentHistory.slice(0,currentHistory.indexOf(lastGamingState) + 1): currentHistory

      return base.concat({
        square:nextGamingState,
        xPlayer:!lastGamingState.xPlayer
      })
    })



    setCurrentMove(move=>move+1);

  }

  // winning logic
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          winningLine: lines[i],
        };
      }
    }
    return null;
  }

  function gameResult() {
    if (result) {
      return ` Winner is ${winner}`;
    } else if (gamingBoard.square.includes(undefined) == false) {
      return "It's a Draw";
    } else {
      return `Next Player is ${gamingBoard.xPlayer ? "X" : "O"}`;
    }
  }

  function moveTo(index){
    setCurrentMove(index)
  }


  return (
    <>
      <h1 className="text-center heading">Tic Tac Toe</h1>
      <h5 className="text-center mt-5">{gameResult()}</h5>
      <div className="game-box d-flex align-items-center justify-content-center">
        <div className="board">
          {gamingBoard.square.map((item, index) => {
            const isWinningSquare = winningLine && winningLine.includes(index);
            return (
              <Squares
                handleClick={() => {
                  handleClick(index);
                }}
                item={item}
                key={index}
                isWinningSquare={isWinningSquare}
                result={result}
              />
            );
          })}
        </div>
      </div>
        <div className="text-center">
          <button
            className="rounded text-bg-dark py-2 px-3"
            onClick={() => {
              setHistory([
                { square: new Array(9).fill(undefined), xPlayer: true },
              ]);
              setCurrentMove(0);
            }}
          >
            Start Again
          </button>
        </div>
        <History currentMove={currentMove} history={history} moveTo={moveTo} />
    </>
  );
}

export default App;
