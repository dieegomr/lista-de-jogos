import Logo from '../components/Logo';
import styles from './AuthenticationPage.module.css';

export default function AuthenticationPage() {
  return (
    <div className={styles.container}>
      <main className={styles.login}>
        <Logo />
        <h2>Login</h2>
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className={styles.actions}>
            <button className={styles.btn}>Login</button>
            <button className={styles.btn}>Cancel</button>
          </div>
        </form>
      </main>
    </div>
  );
}
