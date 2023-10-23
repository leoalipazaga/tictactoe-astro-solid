import { useStore } from '@nanostores/solid';
import { createEffect, For } from 'solid-js';
import { Turn } from '@/consts';
import BoardItem from '@/solid/BoardItem';
import { addTie, board$, turn$, won$ } from '@/store';

function setSelectBoard(
  board: Array<Turn.X | Turn.O>,
  index: number,
  value: Turn.O | Turn.X
) {
  const copyBoard = [...board];
  copyBoard.splice(index, 1, value);

  return copyBoard;
}

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

function toggleTurn(turn: Turn.O | Turn.X) {
  return turn === Turn.X ? Turn.O : Turn.X;
}

export default function Board() {
  const turn = useStore(turn$);
  const board = useStore(board$);

  return (
    <div class="w-full h-[300px] sm:h-[320px] grid gap-3 grid-cols-3 grid-rows-3">
      <For each={board()}>
        {(item, index) => (
          <BoardItem
            value={item}
            onClick={() => {
              board$.set(setSelectBoard(board(), index(), turn()));
              const hasWon = isWinner(board(), turn());
              won$.set(isWinner(board(), turn()));
              turn$.set(toggleTurn(turn()));
              if (hasWon) {
                addTie();
              }
            }}
          />
        )}
      </For>
    </div>
  );
}
