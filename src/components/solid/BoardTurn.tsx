import { turn$ } from '@/store';
import { useStore } from '@nanostores/solid';

export default function BoardTurn() {
  const turn = useStore(turn$);

  return (
    <span class="w-1/3 py-1 px-3 rounded-md text-center inset-y-2 text-sm font-bold bg-slate-800 text-slate-400 uppercase shadow-[inset_0_-10px_10px_10px_rgba(0,0,0,0.3)]">
      {turn()} <span class="text-[0.6rem]">Turn</span>
    </span>
  );
}
