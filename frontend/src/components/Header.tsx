'use client';

import { useRouter } from 'next/navigation';
import { GeneralInfo } from '@/types/generalInfo';

type HeaderProps = {
  header: GeneralInfo['header'];
};

export const Header = ({ header }: HeaderProps) => {
  const router = useRouter();

  return (
    <section className="header">
      <img src={header.logo_url} alt="Logo" />
      {header && (
        <button onClick={() => router.push('/new-coffee')} className="primary-button">
          {header.create_button}
        </button>
      )}
    </section>
  );
};
