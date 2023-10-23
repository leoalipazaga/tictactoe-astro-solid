import { board$ } from '@/store';
import Button from './Button';

export default function BoardReset() {
  return (
    <Button
      onClick={() => {
        board$.set(Array(9).fill(null));
      }}
    >
      Reset
    </Button>
  );
}
