'use client';

import { useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backgroundImage?: string;
  closeOnOutsideClick?: boolean; 
  cancelButton?: { label: string; onClick: () => void };
  confirmButton?: { label: string; onClick: () => void; disabled?: boolean };
};

export const Modal = ({ isOpen, onClose, children, backgroundImage, closeOnOutsideClick = true,  cancelButton, confirmButton,}: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay"  onClick={closeOnOutsideClick ? onClose : undefined}>
      <div className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={backgroundImage && window.innerWidth > 768
              ? { background: `url(${backgroundImage}) center/cover no-repeat` }
              : { backgroundColor: "black" }
          }>
          <button onClick={onClose} className="modal-close-button">
            <img src="/close_button.png" alt="Close" className="w-6 h-6" />
          </button>
          
          {children}

          {(cancelButton || confirmButton) && (
            <div className="modal-buttons">
              {cancelButton && (
                <button className="secondary-button" onClick={cancelButton.onClick}>
                  {cancelButton.label}
                </button>
              )}
              {confirmButton && (
                <button className="primary-button" onClick={confirmButton.onClick} disabled={confirmButton.disabled}>
                  {confirmButton.label}
                </button>
              )}
            </div>
          )}
      </div>
    </div>
  );
};
