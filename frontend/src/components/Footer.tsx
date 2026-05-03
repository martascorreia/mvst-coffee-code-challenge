'use client';

import { GeneralInfo } from '@/types/generalInfo';

type FooterProps = {
  footer: GeneralInfo['footer'];
};

export const Footer = ({ footer }: FooterProps) => {
  return (
    <footer className="text-center pt-20  h-64 overflow-y-hidden">
      <img
        src={footer.background_image_url}
        alt="Footer"
        className="mx-auto object-cover h-full w-full"
      />
    </footer>
  );
};
