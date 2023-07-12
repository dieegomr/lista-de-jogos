import { FcLock } from 'react-icons/fc';
import ActionButton from './ActionButton';
import styles from './LoginAlertMessage.module.css';
import { useNavigate } from 'react-router-dom';

interface LoginAlertMessageProps {
  closeModal: () => void;
}

export default function LoginAlertMessage({
  closeModal,
}: LoginAlertMessageProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.alertContainer}>
      <div className={styles.icon}>
        <FcLock size={50} />
      </div>
      <span className={styles.message}>
        Você precisa estar logado para realizar essa ação!
      </span>
      <div className={styles.actions}>
        <ActionButton onClick={() => navigate('/auth?mode=login')}>
          Login
        </ActionButton>
        <ActionButton onClick={closeModal}>Cancel</ActionButton>
      </div>
    </div>
  );
}
