import './App.css';
import backgroundMusic from './assets/bgMusic.mp3';
import { useState, useRef} from 'react';



function Square({value,onSquareClick}){
  return <button onClick={onSquareClick} className="square">{value}</button>;
}

const ResetButton = ({ resetBoard }) => {
  return (
    <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
      <button className="bg-red-500 text-white hover:bg-red-800 font-bold py-2 px-4 mt-3 rounded" onClick={resetBoard}>Reset</button>
    </div>
  )
}



export default function Board() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleButtonClick = () => {
    if (audioPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const playAudio = () => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.play();
    audioRef.current = audio;
    setAudioPlaying(true);
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setAudioPlaying(false);
  };


  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const resetBoard = () => {
    setSquares(Array(9).fill(null));
  }
  function handleClick(i) {
    const nextSquares = squares.slice();
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    if(xIsNext){
      nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner && winner !== 'draw') {
    status = 'Winner: ' + winner;
  }
  else if(winner && winner === 'draw'){
    status = "It's a " + winner;
  }
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  
  return (
    <>
      <div className="absolute top-5 right-20 p-2">
        <button className="transition-all duration-500 bg-yellow-500 text-white hover:bg-orange-500 font-bold py-2 px-4 mt-3 rounded" onClick={handleButtonClick}>
          {audioPlaying ? 'Pause Music' : 'Play Music'}
        </button>
      </div>
      <h1 className="text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-lime-50 to-yellow-500">
        TIC TAC TOE!
      </h1>
      <div className= {winner?"mt-10 mb-10 text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-pink-100 to-green-500":"mt-10 mb-10 text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-pink-100 to-purple-500"}>{status}</div>
      <div className="board-row flex justify-center items-center ">
        <Square value= {squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value= {squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value= {squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row flex justify-center items-center">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row flex justify-center items-center">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      <ResetButton resetBoard={resetBoard} />
      
    </>
  );
}


function calculateWinner(squares) {
  let isBoardFilled =true;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    if (!squares[a] || !squares[b] || !squares[c]) {
      isBoardFilled = false;
    }
  }
  if(isBoardFilled){
    return 'draw';
  }
  return null;
}

