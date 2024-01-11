const Type = {
  default: 'default',
  primary: 'primary',
} as const;

type TProps = {
  className?: astroHTML.JSX.HTMLAttributes['class'];
  other?: string;
  type?: 'default' | 'primary';
  children?: React.ReactNode | string;
  onClick?: () => void;
};

export default function Button({
  children,
  className,
  type = Type.default,
  onClick,
}: TProps) {
  const classes = {
    pushable: {
      [Type.primary]: 'bg-amber-600',
      [Type.default]: 'bg-slate-600',
    },
    front: {
      [Type.primary]: 'bg-amber-400',
      [Type.default]: 'bg-slate-400',
    },
  };

  return (
    <button
      className={`group rounded-md text-neutral-900 text-sm font-bold ${classes.pushable[type]} ${className}`}
      onClick={onClick}
    >
      <span
        className={`p-2 block rounded-md uppercase duration-200 transition-transform -translate-y-1 group-hover:-translate-y-[0.325rem] group-active:-translate-y-0.5 ${classes.front[type]}`}
      >
        {children}
      </span>
    </button>
  );
}
