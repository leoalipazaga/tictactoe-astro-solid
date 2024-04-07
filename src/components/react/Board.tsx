import { Turn } from '@/consts';
import BoardShareButton from './Board/BoardShareButton';
import BoardHeader from './Board/BoardHeader';
import Room from './Room/Room';
import BoardContent from './Board/BoardContent';
import BoardFooter from './Board/BoardFooter';
import BoardDialog from './Board/BoardDialog';

type Props = {
  gameId: string;
  username: string;
  turn: Turn.X | Turn.O;
};

export default function Board(props: Props) {
  return (
    <Room roomId={props.gameId} turn={props.turn}>
      <section className='flex flex-col gap-3 w-[300px] sm:w-[320px]'>
        <BoardHeader />
        <BoardContent />
        <BoardFooter />
        <div className='flex justify-center items-center mt-10'>
          <BoardShareButton gameId={props.gameId} />
        </div>
        <BoardDialog />
      </section>
    </Room>
  );
}
