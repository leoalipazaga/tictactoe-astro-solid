import { useMutation, useMyPresence, useStorage } from 'liveblocks.config';
import { Turn } from '@/consts';
import Button from '../Button';

export default function BoardHeader() {
  const [{ turn: me }] = useMyPresence();
  const currentTurn = useStorage((st) => st.board.currentTurn);
  const updateBoard = useMutation(
    ({ storage }, newBoard: Array<Turn>) => {
      const currentBoard = storage.get('board');
      currentBoard.set('countGamesWonX', 0);
      currentBoard.set('countGamesWonY', 0);
      currentBoard.set('countGames', 0);
      currentBoard.set('data', newBoard);
      currentBoard.set('currentTurn', currentTurn === Turn.X ? Turn.O : Turn.X);
    },
    [currentTurn]
  );

  const onReset = () => {
    updateBoard(Array(9).fill(null));
  };

  return (
    <nav className='flex gap-3 items-center'>
      <div className='w-1/3'>
        <span translate='no' className='text-5xl font-bold text-teal-400'>
          x
        </span>
        <span translate='no' className='text-5xl font-bold text-amber-400'>
          o
        </span>
      </div>
      <span
        className={`w-1/3 p-3 rounded-md text-[0.6rem] text-center inset-y-2 font-bold uppercase ${
          me !== currentTurn
            ? 'bg-slate-800 text-slate-400'
            : me === currentTurn
            ? 'bg-amber-400 text-black'
            : ''
        }`}
      >
        {me === currentTurn ? 'Your turn' : `${me} Turn`}
      </span>
      <div className='w-1/3 text-right'>
        <Button onClick={onReset}>Reset</Button>
      </div>
    </nav>
  );
}
