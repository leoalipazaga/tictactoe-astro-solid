import { useStore } from '@nanostores/solid';
import { board$, ties$, turn$ } from '@/store';
import { Turn } from '@/consts';

function getXTurns(board: Array<Turn.X | Turn.O>) {
  return board.filter((b) => b === Turn.X).length;
}

function getOTurns(board: Array<Turn.X | Turn.O>) {
  return board.filter((b) => b === Turn.O).length;
}

export default function BoardDetails() {
  const board = useStore(board$);
  const turn = useStore(turn$);
  const ties = useStore(ties$);

  return (
    <div class="grid grid-cols-3 grid-rows-1 gap-3">
      <div class="flex-grow flex flex-col justify-center py-1 rounded-md bg-teal-400">
        <p class="m-0 text-[0.6rem] uppercase text-center">
          {Turn.X} {turn() === Turn.X && '(you)'}
        </p>
        <p class="m-0 text-sm uppercase font-bold text-center">
          {getXTurns(board())}
        </p>
      </div>
      <div class="flex-grow flex flex-col justify-center py-1 rounded-md bg-slate-400">
        <p class="m-0 text-[0.6rem] uppercase text-center">ties</p>
        <p class="m-0 text-sm uppercase font-bold text-center">{ties()}</p>
      </div>
      <div class="flex-grow flex flex-col justify-center py-1 rounded-md bg-amber-400">
        <p class="m-0 text-[0.6rem] uppercase text-center">
          {Turn.O} {turn() === Turn.O && '(you)'}
        </p>
        <p class="m-0 text-sm uppercase font-bold text-center">
          {getOTurns(board())}
        </p>
      </div>
    </div>
  );
}
