import { For, Show, createMemo, createSignal } from 'solid-js';
import { Turn } from '@/consts';
import BoardItem from '@/solid/BoardItem';
import { getSocket } from '@/services/socket';
import Button from './Button';

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
  const [board, setBoard] = createSignal<Array<Turn.O | Turn.X>>(START_BOARD);
  const [ties, setTies] = createSignal(0);
  const [turn, setTurn] = createSignal(Turn.X);
  const socket = getSocket(import.meta.env.PUBLIC_WEB_SOCKET_URL, {
    auth: props,
  });
  socket.emit('join game');
  socket.on('get:board:success', setBoard);
  socket.on('get:turn:success', setTurn);

  const resetBoard = () => {
    socket.emit('put:board', { board: START_BOARD });
  };

  const onQuit = () => {
    resetBoard();
    setTies(0);
  };

  const text = createMemo(() => {
    if (isWinner(board(), Turn.X) || isWinner(board(), Turn.O)) {
      return isWinner(board(), props.turn) ? 'you won!' : 'you lost!';
    }
    return 'both players have tied';
  });

  return (
    <section class='flex flex-col gap-3 w-[300px] sm:w-[320px]'>
      <nav class='flex gap-3 items-center'>
        <div class='w-1/3'>
          <span class='text-5xl font-bold text-teal-400'>x</span>
          <span class='text-5xl font-bold text-amber-400'>o</span>
        </div>
        {/* <BoardTurn> */}
        <span
          class='w-1/3 p-3 rounded-md text-[0.6rem] text-center inset-y-2 font-bold uppercase'
          classList={{
            'bg-slate-800 text-slate-400': turn() !== props.turn,
            'bg-amber-400 text-black': turn() === props.turn,
          }}
        >
          {turn() === props.turn ? 'Your turn' : `${turn()} Turn`}
        </span>
        {/* <BoardTurn  /> */}
        <div class='w-1/3 text-right'>
          <Button onClick={resetBoard}>Reset</Button>
        </div>
      </nav>
      <div class='w-full h-[300px] sm:h-[320px] grid gap-3 grid-cols-3 grid-rows-3'>
        <For each={board()}>
          {(item, index) => (
            <BoardItem
              value={item}
              onClick={() => {
                if (turn() !== props.turn) return;
                const newBoard = onChangeBoard(board()!, index(), props.turn);
                socket.emit('put:board', { board: newBoard });
                const hasWon = isWinner(newBoard, props.turn);
                if (hasWon) {
                  setTies((prev) => prev + 1);
                }
              }}
            />
          )}
        </For>
      </div>
      {/* <BoardDetails board={board()} turn={props.turn} ties={ties()} /> */}
      <div class='grid grid-cols-3 grid-rows-1 gap-3'>
        <div class='flex-grow flex flex-col justify-center py-1 rounded-md bg-teal-400'>
          <p class='m-0 text-[0.6rem] uppercase text-center'>
            {Turn.X} {props.turn === Turn.X && '(you)'}
          </p>
          <p class='m-0 text-sm uppercase font-bold text-center'>
            {getXTurns(board())}
          </p>
        </div>
        <div class='flex-grow flex flex-col justify-center py-1 rounded-md bg-slate-400'>
          <p class='m-0 text-[0.6rem] uppercase text-center'>ties</p>
          <p class='m-0 text-sm uppercase font-bold text-center'>{ties()}</p>
        </div>
        <div class='flex-grow flex flex-col justify-center py-1 rounded-md bg-amber-400'>
          <p class='m-0 text-[0.6rem] uppercase text-center'>
            {Turn.O} {props.turn === Turn.O && '(you)'}
          </p>
          <p class='m-0 text-sm uppercase font-bold text-center'>
            {getOTurns(board())}
          </p>
        </div>
      </div>
      {/* DIALOG */}
      <Show
        when={
          isWinner(board(), Turn.X) ||
          isWinner(board(), Turn.O) ||
          isBoardTied(board())
        }
        fallback={null}
      >
        <dialog
          open
          class='w-full h-full flex items-center bg-transparent backdrop-blur absolute top-0'
        >
          <article class='py-10 grow bg-slate-800'>
            <p class='mb-4 text-xs text-center font-semibold uppercase text-slate-400'>
              {text()}
            </p>
            <h1 class='mb-4 text-xl text-center font-bold uppercase text-teal-400'>
              <Show
                when={isWinner(board(), Turn.X) || isWinner(board(), Turn.O)}
                fallback='Tied'
              >
                <span class='text-4xl font-extrabold'>
                  {turn() === Turn.O ? Turn.X : Turn.O}
                </span>
                takes the round
              </Show>
            </h1>
            <div class='flex gap-5 justify-center'>
              <Button onClick={onQuit}>Quit</Button>
              <Button type='primary' onClick={resetBoard}>
                next round
              </Button>
            </div>
          </article>
        </dialog>
      </Show>
    </section>
  );
}
