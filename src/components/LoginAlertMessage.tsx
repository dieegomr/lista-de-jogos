import { FcLock } from 'react-icons/fc';
import ActionButton from './ActionButton';
import styles from './LoginAlertMessage.module.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';

interface LoginAlertMessageProps {
  isOpen: boolean;
  closeAlert: () => void;
}

export default function LoginAlertMessage({
  closeAlert,
  isOpen,
}: LoginAlertMessageProps) {
  const navigate = useNavigate();

  if (isOpen)
    return (
      <Modal onClose={closeAlert}>
        <div className={styles.alertContainer}>
          <div className={styles.icon}>
            <FcLock size={50} />
          </div>
          <span className={styles.message}>
            Você precisa estar logado para realizar essa ação!
          </span>
          <div className={styles.actions}>
            <ActionButton
              className={styles.login}
              onClick={() => navigate('/auth?mode=login')}
              type="authBtn"
            >
              Login
            </ActionButton>
            <ActionButton className={styles.cancelLogin} onClick={closeAlert}>
              Cancel
            </ActionButton>
          </div>
        </div>
      </Modal>
    );

  return null;
}
