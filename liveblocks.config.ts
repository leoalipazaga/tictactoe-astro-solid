import type { Turn } from '@/consts';
import { LiveObject, createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';

const client = createClient({
  publicApiKey:
    'pk_dev_zN_q4Zme-1wH1kyaxUVCUGi3pOg9ZhjI4SZzxMdbjD1UxZEBC7c__1NlH2AbM6dF',
});

type Presence = {
  turn: Turn;
};

type Storage = {
  board: LiveObject<{
    data: (Turn.X | Turn.O | null)[];
    currentTurn: Turn;
    countGames: number;
    countGamesWonX: number;
    countGamesWonY: number;
  }>;
};

type UserMeta = {};
type RoomEvent =
  | { type: 'USER_CONNECTED'; payload: '' }
  | { type: 'USER_DISCONNECTED'; payload: '' };

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
