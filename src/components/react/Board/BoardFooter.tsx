import { useMyPresence, useStorage } from 'liveblocks.config';
import { Turn } from '@/consts';

export default function BoardFooter() {
  const [{ turn }] = useMyPresence();
  const countGames = useStorage((st) => st.board.countGames);
  const countGamesWonX = useStorage((st) => st.board.countGamesWonX);
  const countGamesWonY = useStorage((st) => st.board.countGamesWonY);

  return (
    <div className='grid grid-cols-3 grid-rows-1 gap-3'>
      <div className='flex-grow flex flex-col justify-center py-1 rounded-md bg-teal-400'>
        <p className='m-0 text-[0.6rem] uppercase text-center'>
          {Turn.X} {turn === Turn.X && '(you)'}
        </p>
        <p className='m-0 text-sm uppercase font-bold text-center'>
          {countGamesWonX}
        </p>
      </div>
      <div className='flex-grow flex flex-col justify-center py-1 rounded-md bg-slate-400'>
        <p className='m-0 text-[0.6rem] uppercase text-center'>Games</p>
        <p className='m-0 text-sm uppercase font-bold text-center'>
          {countGames}
        </p>
      </div>
      <div className='flex-grow flex flex-col justify-center py-1 rounded-md bg-amber-400'>
        <p className='m-0 text-[0.6rem] uppercase text-center'>
          {Turn.O} {turn === Turn.O && '(you)'}
        </p>
        <p className='m-0 text-sm uppercase font-bold text-center'>
          {countGamesWonY}
        </p>
      </div>
    </div>
  );
}
