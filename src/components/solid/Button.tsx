import { type JSXElement } from 'solid-js';

const Type = {
  default: 'default',
  primary: 'primary',
} as const;

type TProps = {
  class?: string;
  type?: 'default' | 'primary';
  children?: JSXElement | string;
  onClick?: () => void;
};

export default function Button({
  children,
  type = Type.default,
  onClick,
}: TProps) {
  const classes = {
    [Type.primary]: 'bg-amber-400 shadow-amber-600',
    [Type.default]: 'bg-slate-400 shadow-slate-600',
  } as Record<(typeof Type)[keyof typeof Type], string>;

  return (
    <button
      class={`p-2 rounded-md uppercase text-neutral-900 text-sm font-bold shadow-[inset_0_-3px_0px_0px]  ${classes[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
