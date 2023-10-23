import { action, atom } from 'nanostores';
import { Turn } from './consts';

export const board$ = atom<Array<Turn.O | Turn.X>>(Array(9).fill(null));

export const turn$ = atom<Turn.O | Turn.X>(Turn.X);

export const won$ = atom<boolean>(false);

export const ties$ = atom<number>(0);

export const addTie = action(ties$, 'addTie', (store$) =>
  store$.set(store$.get() + 1)
);

export const addMovementCount = action(ties$, 'addMovement', (store$) =>
  store$.set(Math.max(store$.get() + 1, 0))
);

export const resetBoard = action(board$, 'resetBoard', (store$) =>
  store$.set(Array(9).fill(null))
);
