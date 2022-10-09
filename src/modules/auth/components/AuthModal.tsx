import Modal from '@/components/Modal';
import { Dialog } from '@headlessui/react';
import * as React from 'react';
import AuthModalContent from './AuthModalContent';

export default function AuthModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      bodyContent={
        <AuthModalContent
          onAuthenticate={() => {
            setIsOpen(false);
          }}
        />
      }
      bodyClassName='bg-base-300 max-w-md'
    />
  );
}
