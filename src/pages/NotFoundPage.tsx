import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <section className={styles.info}>
        <h1>Ops, esta página não foi encontrada</h1>
        <p>Tente voltar para a página anterior ou acessar a home.</p>
        <div className={styles.actions}>
          <button className={styles.btn} onClick={() => navigate(-1)}>
            Voltar
          </button>
          <button className={styles.btn} onClick={() => navigate('/')}>
            Ir para a home
          </button>
        </div>
      </section>
      <section>
        <div className={styles.numbers}>
          <span className={styles.number1}>4</span>
          <span className={styles.number2}>0</span>
          <span className={styles.number3}>4</span>
        </div>
      </section>
    </div>
  );
}
