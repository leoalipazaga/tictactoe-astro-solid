type Props = {
  children: React.ReactNode | string;
  className?: string;
};

export default function Error({ className, children }: Props) {
  return (
    <section
      className={`flex justify-center items-center flex-col gap-10 ${className}`}
    >
      {children}
      <a
        className={`group rounded-md text-neutral-900 text-sm font-bold bg-amber-600`}
        href='/join'
      >
        <span
          className={`p-2 block rounded-md uppercase duration-200 transition-transform -translate-y-1 group-hover:-translate-y-[0.325rem] group-active:-translate-y-0.5 bg-amber-400`}
        >
          Try again
        </span>
      </a>
    </section>
  );
}
