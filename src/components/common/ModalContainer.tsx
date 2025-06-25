import { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    <AnimatePresence mode="wait">
      {modal && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center"
        >
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white px-20 py-30 rounded-16 w-[300px]"
            ref={modalRef}
          >
            {modal}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalContainer;
