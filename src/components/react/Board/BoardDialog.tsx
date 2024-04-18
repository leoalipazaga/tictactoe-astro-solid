import { useEffect, useMemo } from 'react';
import { useMutation, useMyPresence, useStorage } from 'liveblocks.config';
import { Turn } from '@/consts';
import Button from '../Button';

const START_BOARD = Array(9).fill(null);

function isWinner(board: Array<Turn | null>, turn: Turn) {
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

function isBoardTied(board: Array<Turn | null>) {
  return board.filter(Boolean).length === 9;
}

function canShowDialog(board: Array<Turn | null>) {
  return (
    isWinner(board, Turn.X) || isWinner(board, Turn.O) || isBoardTied(board)
  );
}

export default function BoardDialog() {
  const [{ turn }] = useMyPresence();
  const board = useStorage((st) => st.board.data);
  const currentTurn = useStorage((st) => st.board.currentTurn);
  const hasXWon = isWinner(board, Turn.X);
  const hasYWon = isWinner(board, Turn.O);
  const hasGameDraw = isBoardTied(board);
  const showDialog = canShowDialog(board);

  useEffect(() => {
    if (hasXWon) {
      updateCountGames();
      return updateCountGamesX();
    }
    if (hasYWon) {
      updateCountGames();
      return updateCountGamesY();
    }

    if (hasGameDraw) {
      return updateCountGames();
    }
  }, [hasXWon, hasYWon, hasGameDraw]);

  const updateCountGames = useMutation(({ storage }) => {
    const currentBoard = storage.get('board');
    const currentCountGames = currentBoard.get('countGames');
    currentBoard.set('countGames', currentCountGames + 1);
  }, []);

  const updateCountGamesX = useMutation(({ storage }) => {
    const currentBoard = storage.get('board');
    const count = currentBoard.get('countGamesWonX');
    currentBoard.set('countGamesWonX', count + 1);
  }, []);

  const updateCountGamesY = useMutation(({ storage }) => {
    const currentBoard = storage.get('board');
    const count = currentBoard.get('countGamesWonY');
    currentBoard.set('countGamesWonY', count + 1);
  }, []);

  const updateBoard = useMutation(({ storage }, newBoard: Array<Turn>) => {
    const currentBoard = storage.get('board');
    currentBoard.set('data', newBoard);
  }, []);

  const text = useMemo(() => {
    if (isWinner(board, Turn.X) || isWinner(board, Turn.O)) {
      return isWinner(board, turn) ? 'you won!' : 'you lost!';
    }
    return 'both players have tied';
  }, [board, turn]);

  const onResetBoard = () => {
    updateBoard(START_BOARD);
  };

  const onQuit = () => {
    onResetBoard();
  };

  if (!showDialog) {
    return null;
  }

  return (
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
                {currentTurn === Turn.O ? Turn.X : Turn.O}
              </span>
              takes the round{' '}
            </span>
          ) : (
            'No winner here'
          )}
        </h1>
        <div className='flex gap-5 justify-center'>
          <Button onClick={onQuit}>Quit</Button>
          <Button type='primary' onClick={onResetBoard}>
            next round
          </Button>
        </div>
      </article>
    </dialog>
  );
}
