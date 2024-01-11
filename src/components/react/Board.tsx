import { useMemo, useState } from 'react';
import { Turn } from '@/consts';
import BoardItem from '@/components/react/BoardItem';
import { getSocket } from '@/services/socket';
import Button from './Button';
import Error from './Error';

type Props = {
  gameId: string;
  username: string;
  turn: Turn.X | Turn.O;
};

const START_BOARD = Array(9).fill(null);

function isWinner(board: Array<Turn.O | Turn.X>, turn: Turn.O | Turn.X) {
  if ([board[0], board[1], board[2]].every((value) => value === turn)) {
    return true;
  }

  if ([board[2], board[5], board[8]].every((value) => value === turn)) {
    return true;
  }

  if ([board[8], board[7], board[6]].every((value) => value === turn)) {
    return true;
  }

  if ([board[0], board[3], board[6]].every((value) => value === turn)) {
    return true;
  }

  if ([board[0], board[4], board[8]].every((value) => value === turn)) {
    return true;
  }

  if ([board[2], board[4], board[6]].every((value) => value === turn)) {
    return true;
  }

  if ([board[1], board[4], board[7]].every((value) => value === turn)) {
    return true;
  }

  if ([board[3], board[4], board[5]].every((value) => value === turn)) {
    return true;
  }

  return false;
}

function getXTurns(board: Array<Turn.X | Turn.O>) {
  return board.filter((b) => b === Turn.X).length;
}

function getOTurns(board: Array<Turn.X | Turn.O>) {
  return board.filter((b) => b === Turn.O).length;
}

function onChangeBoard(
  board: Array<Turn.X | Turn.O>,
  index: number,
  value: Turn.X | Turn.O
) {
  const copyBoard = [...board];
  copyBoard.splice(index, 1, value);
  return copyBoard;
}

function isBoardTied(board: Array<Turn.X | Turn.O>) {
  return board.filter(Boolean).length === 9;
}

export default function Board(props: Props) {
  const [board, setBoard] = useState<Array<Turn.O | Turn.X>>(START_BOARD);
  const [ties, setTies] = useState(0);
  const [turn, setTurn] = useState(Turn.X);
  const [error, setError] = useState<Error | null>(null);
  const socket = getSocket(import.meta.env.PUBLIC_WEB_SOCKET_URL, {
    auth: props,
  });
  const [shareText, setShareText] = useState('Share Link');
  const showDialog =
    isWinner(board, Turn.X) || isWinner(board, Turn.O) || isBoardTied(board);

  socket.emit('join game');
  socket.on('get:board:success', setBoard);
  socket.on('get:turn:success', setTurn);
  socket.on('connect_error', setError);

  const resetBoard = () => {
    socket.emit('put:board', { board: START_BOARD });
  };

  const onQuit = () => {
    resetBoard();
    setTies(0);
  };

  const onShare = () => {
    navigator.clipboard.writeText(props.gameId ?? '');
    setShareText('Copied!');
    setTimeout(setShareText, 2000, 'Share Link');
  };

  const text = useMemo(() => {
    if (isWinner(board, Turn.X) || isWinner(board, Turn.O)) {
      return isWinner(board, props.turn) ? 'you won!' : 'you lost!';
    }
    return 'both players have tied';
  }, [board, props.turn]);

  if (error?.message === 'room_full') {
    return (
      <Error className='h-full'>
        <h1 className='text-white text-3xl'>Opps! Room is full.</h1>
      </Error>
    );
  }

  if (error?.message === 'socket_not_exist') {
    return (
      <Error className='h-full'>
        <h1 className='text-white text-3xl'>
          <span className='text-teal-400'>{props.gameId}</span> not exists.
        </h1>
      </Error>
    );
  }

  return (
    <section className='flex flex-col gap-3 w-[300px] sm:w-[320px]'>
      <nav className='flex gap-3 items-center'>
        <div className='w-1/3'>
          <span className='text-5xl font-bold text-teal-400'>x</span>
          <span className='text-5xl font-bold text-amber-400'>o</span>
        </div>
        {/* <BoardTurn> */}
        <span
          className={`w-1/3 p-3 rounded-md text-[0.6rem] text-center inset-y-2 font-bold uppercase ${
            turn !== props.turn
              ? 'bg-slate-800 text-slate-400'
              : turn === props.turn
              ? 'bg-amber-400 text-black'
              : ''
          }`}
        >
          {turn === props.turn ? 'Your turn' : `${turn} Turn`}
        </span>
        {/* <BoardTurn  /> */}
        <div className='w-1/3 text-right'>
          <Button onClick={resetBoard}>Reset</Button>
        </div>
      </nav>
      <div className='w-full h-[300px] sm:h-[320px] grid gap-3 grid-cols-3 grid-rows-3'>
        {board.map((item, index) => (
          <BoardItem
            key={index}
            value={item}
            onClick={() => {
              if (turn !== props.turn) return;
              const newBoard = onChangeBoard(board!, index, props.turn);
              socket.emit('put:board', { board: newBoard });
              const hasWon = isWinner(newBoard, props.turn);
              if (hasWon) {
                setTies((prev) => prev + 1);
              }
            }}
          />
        ))}
      </div>
      <div className='grid grid-cols-3 grid-rows-1 gap-3'>
        <div className='flex-grow flex flex-col justify-center py-1 rounded-md bg-teal-400'>
          <p className='m-0 text-[0.6rem] uppercase text-center'>
            {Turn.X} {props.turn === Turn.X && '(you)'}
          </p>
          <p className='m-0 text-sm uppercase font-bold text-center'>
            {getXTurns(board)}
          </p>
        </div>
        <div className='flex-grow flex flex-col justify-center py-1 rounded-md bg-slate-400'>
          <p className='m-0 text-[0.6rem] uppercase text-center'>Games</p>
          <p className='m-0 text-sm uppercase font-bold text-center'>{ties}</p>
        </div>
        <div className='flex-grow flex flex-col justify-center py-1 rounded-md bg-amber-400'>
          <p className='m-0 text-[0.6rem] uppercase text-center'>
            {Turn.O} {props.turn === Turn.O && '(you)'}
          </p>
          <p className='m-0 text-sm uppercase font-bold text-center'>
            {getOTurns(board)}
          </p>
        </div>
      </div>
      <div className='flex justify-center items-center mt-10'>
        <Button className='w-fit' type='primary' onClick={onShare}>
          <div className='flex gap-2'>
            <span>{shareText}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-copy text-black'
            >
              <rect width='14' height='14' x='8' y='8' rx='2' ry='2'></rect>
              <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'></path>
            </svg>
          </div>
        </Button>
      </div>
      {/* DIALOG */}
      {showDialog && (
        <dialog
          open
          className='w-full h-full flex items-center bg-transparent backdrop-blur absolute top-0'
        >
          <article className='py-10 grow bg-slate-800'>
            <p className='mb-4 text-xs text-center font-semibold uppercase text-slate-400'>
              {text}
            </p>
            <h1 className='mb-4 text-xl text-center font-bold uppercase text-teal-400'>
              {isWinner(board, Turn.X) || isWinner(board, Turn.O) ? (
                <span>
                  <span className='text-4xl font-extrabold'>
                    {turn === Turn.O ? Turn.X : Turn.O}
                  </span>
                  takes the round{' '}
                </span>
              ) : (
                'No winner here'
              )}
            </h1>
            <div className='flex gap-5 justify-center'>
              <Button onClick={onQuit}>Quit</Button>
              <Button type='primary' onClick={resetBoard}>
                next round
              </Button>
            </div>
          </article>
        </dialog>
      )}
    </section>
  );
}
