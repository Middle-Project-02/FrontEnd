import { useRef, useEffect } from 'react';
import useModalStore from '@/stores/modalStore';

const ModalContainer = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { modal, removeModal } = useModalStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        removeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [removeModal]);

  return (
    modal && (
      <div className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center">
        <div className="bg-white px-20 py-30 rounded-16 w-[300px]" ref={modalRef}>
          {modal}
        </div>
      </div>
    )
  );
};

export default ModalContainer;
