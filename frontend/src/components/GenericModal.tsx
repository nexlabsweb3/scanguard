'use client';

import { useEffect } from 'react';
import ReactPortal from './react-portal';

const GenericModal = ({
  isOpen,
  onClose,
  animate,
  children,
  className,
  position,
}: {
  isOpen: boolean;
  onClose: () => void;
  animate: boolean;
  children: React.ReactNode;
  className?: string;
  position?: string;
}) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? onClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return (): void => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return (): void => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <ReactPortal containerId="react-portal-modal-container">
        <div className="w-full">
          <div
            className={`fixed w-full top-0 left-0 h-screen z-40 bg-neutral-800 opacity-50`}
            onClick={onClose}
          />

          <div
            onClick={onClose}
            className={`fixed w-full inset-0 flex items-center justify-center z-50
          pt-20 md:p-0 overflow-x-hidden transition-all duration-300 ease-in-out`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="border  border-[#170F2E] rounded-3xl bg-[#303030] sm:max-w-sm md:max-w-lg w-full"
            >
              {children}
            </div>
          </div>
        </div>
      </ReactPortal>
    </>
  );
};

export default GenericModal;
