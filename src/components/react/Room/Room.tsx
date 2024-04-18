import type { PropsWithChildren } from 'react';
import { ClientSideSuspense } from '@liveblocks/react';
import { RoomProvider } from 'liveblocks.config';
import { LiveObject } from '@liveblocks/client';
import { Turn } from '@/consts';

type Props = {
  roomId: string;
  turn: Turn;
};

export default function Room({
  children,
  roomId,
  turn,
}: PropsWithChildren<Props>) {
  const fn = () => children;
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ turn }}
      initialStorage={{
        board: new LiveObject({
          data: Array(9).fill(null),
          currentTurn: Turn.X,
          countGames: 0,
          countGamesWonX: 0,
          countGamesWonY: 0,
        }),
      }}
    >
      <ClientSideSuspense
        fallback={
          <div className='animate-pulse text-white text-lg'>Loading…</div>
        }
      >
        {fn}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
