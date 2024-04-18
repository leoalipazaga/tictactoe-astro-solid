import { useState } from 'react';
import Button from '../Button';

type Props = {
  gameId: string;
};

const i18n = {
  shareLink: 'Share Link',
  copiedLink: 'Copied!',
};

const BoardShareButton = ({ gameId }: Props) => {
  const [shareText, setShareText] = useState(i18n.shareLink);
  const onShare = () => {
    navigator.clipboard.writeText(gameId ?? '');
    setShareText(i18n.copiedLink);
    setTimeout(setShareText, 2000, i18n.shareLink);
  };

  return (
    <Button className='w-fit' type='primary' onClick={onShare}>
      <div className='flex gap-2'>
        <span>{shareText}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-copy text-black'
        >
          <rect width='14' height='14' x='8' y='8' rx='2' ry='2'></rect>
          <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'></path>
        </svg>
      </div>
    </Button>
  );
};

export default BoardShareButton;
