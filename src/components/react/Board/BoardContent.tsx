import {
  useMutation,
  useMyPresence,
  useOthers,
  useStorage,
} from 'liveblocks.config';
import { Turn } from '@/consts';
import BoardItem from './BoardItem';

function onChangeBoard(
  board: Array<Turn.X | Turn.O | null>,
  index: number,
  value: Turn.X | Turn.O
) {
  const copyBoard = [...board];
  copyBoard.splice(index, 1, value);
  return copyBoard;
}

export default function BoardContent() {
  const [{ turn }] = useMyPresence();
  const board = useStorage((st) => st.board.data);
  const currentTurn = useStorage((st) => st.board.currentTurn);

  const updateBoard = useMutation(
    ({ storage }, newBoard: Array<Turn>) => {
      const currentBoard = storage.get('board');
      currentBoard.set('data', newBoard);
      currentBoard.set('currentTurn', currentTurn === Turn.X ? Turn.O : Turn.X);
    },
    [currentTurn]
  );

  return (
    <div className='w-full h-[300px] sm:h-[320px] grid gap-3 grid-cols-3 grid-rows-3'>
      {board?.map((item, index) => (
        <BoardItem
          key={index}
          value={item!}
          onClick={() => {
            if (turn !== currentTurn) return;
            const newBoard = onChangeBoard(board, index, turn) as Turn[];
            updateBoard(newBoard);
          }}
        />
      ))}
    </div>
  );
}
