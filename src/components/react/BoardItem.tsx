import { Turn } from '@/consts';

type TProps = {
  win?: boolean;
  value: Turn.O | Turn.X | undefined;
  onClick: () => void;
};

export default function BoardItem({ value, win = false, onClick }: TProps) {
  const classes = {
    [Turn.X]: 'text-amber-400',
    [Turn.O]: 'text-slate-400',
  } as const;

  return (
    <div
      className={`flex justify-center items-center w-30 h-30 font-bold text-2xl rounded-md bg-slate-800 shadow-slate-900 shadow-[inset_0_-3px_0px_0px] hover:cursor-pointer ${
        value ? classes[value] : ''
      } ${win ? 'bg-teal-400' : ''}`}
      onClick={() => value ?? onClick()}
    >
      {value}
    </div>
  );
}
