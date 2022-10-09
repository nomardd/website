import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import clsx from 'clsx';

type ModalProps = {
  title?: string;
  bodyClassName?: string;
  bodyContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  message?: string;
  isOpen: boolean;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'full';
  style?: any;
  removeModalMargins?: boolean;
};

export default function Modal({
  title,
  bodyClassName,
  bodyContent,
  footerContent,
  message,
  isOpen,
  onClose,
  size = 'md',
  style = {},
  removeModalMargins = false,
}: ModalProps) {
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };
  let modalWidth = '28rem';
  let modalMinHeight = '28rem';
  if (size === 'full') {
    modalWidth = '100%';
  } else if (size === 'lg') {
    modalWidth = '75rem';
  } else if (size === 'md') {
    modalWidth = '48rem';
  } else if (size === 'sm') {
    modalMinHeight = '10rem';
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto '>
          <div className='flex min-h-full items-center  justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={clsx(
                  `w-full transform overflow-hidden rounded-2xl bg-base-300 py-12 px-10 text-left align-middle shadow-xl transition-all`,
                  bodyClassName,
                  'max-w-full',
                  'flex flex-col'
                )}
                style={{
                  width: modalWidth,
                  minHeight: modalMinHeight,
                  ...style,
                }}
              >
                {title ? (
                  <Dialog.Title
                    as='h3'
                    className='pb-4 text-xl font-medium uppercase leading-6 '
                  >
                    {title}
                  </Dialog.Title>
                ) : undefined}
                {bodyContent ? (
                  bodyContent
                ) : message ? (
                  <div className='mt-2'>
                    <p className='text-sm '>{message}</p>
                  </div>
                ) : null}
                {footerContent ? footerContent : undefined}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
