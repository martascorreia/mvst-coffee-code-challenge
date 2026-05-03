'use client';
import { useState, useEffect } from 'react';
import { MdWarning } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

type AlertProps = {
  message: string;
  type?: 'error' | 'success';
  duration?: number;
  trigger: any;
};

export const Alert = ({ message, type = 'error', duration = 3000, trigger,}: AlertProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, [trigger]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`alert ${type === 'error' ? 'alert-error' : 'alert-success'}`}>
      <MdWarning className="alert-icon" />
      <span className="alert-message">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="alert-close"
        aria-label="Close alert">
        <IoMdClose className="alert-close-icon" />
      </button>
    </div>
  );
};
