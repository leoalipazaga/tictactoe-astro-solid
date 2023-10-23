import { Show } from 'solid-js';
import { useStore } from '@nanostores/solid';
import { resetBoard, ties$, turn$, won$ } from '@/store';
import Button from './Button';
import { Turn } from '@/consts';

export default function Dialog() {
  const won = useStore(won$);
  const turn = useStore(turn$);

  const onNextRound = () => {
    resetBoard();
    won$.set(false);
  };

  const onQuit = () => {
    onNextRound();
    ties$.set(0);
  };

  return (
    <Show when={won()} fallback={null}>
      <dialog
        class="w-screen h-screen flex items-center bg-transparent backdrop-blur absolute"
        open={won()}
      >
        <article class="py-10 grow bg-slate-800">
          <p class="mb-4 text-xs text-center font-semibold uppercase text-slate-400">
            you won!
          </p>
          <h1 class="mb-4 text-xl text-center font-bold uppercase text-teal-400">
            <span class="text-4xl font-extrabold">
              {turn() === Turn.O ? Turn.X : Turn.O}
            </span>{' '}
            takes the round
          </h1>
          <div class="flex gap-5 justify-center">
            <Button onClick={onQuit}>Quit</Button>
            <Button type="primary" onClick={onNextRound}>
              next round
            </Button>
          </div>
        </article>
      </dialog>
    </Show>
  );
}
