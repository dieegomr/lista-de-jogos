import styles from './Filter.module.css';

export default function Filter() {
  return (
    <select name="genre" className={styles.genre}>
      <option value="all">All</option>
      <option value="shooter">shooter</option>
      <option value="arpg">arpg</option>
      <option value="fighting">fighting</option>
      <option value="action">Action</option>
    </select>
  );
}
