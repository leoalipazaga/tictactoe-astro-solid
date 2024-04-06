import Button from '../Button';

type Props = {
  me: 'X' | 'O';
  currentTurn: 'X' | 'O';
  onReset: () => void;
};

export default function BoardHeader({ me, currentTurn, onReset }: Props) {
  return (
    <nav className='flex gap-3 items-center'>
      <div className='w-1/3'>
        <span className='text-5xl font-bold text-teal-400'>x</span>
        <span className='text-5xl font-bold text-amber-400'>o</span>
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
