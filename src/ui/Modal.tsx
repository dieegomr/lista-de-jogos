import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './Modal.module.css';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>
          <AiOutlineClose size={17} />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
