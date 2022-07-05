import styles from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
  const color =
    props.color !== 'light'
      ? `${styles['spinner-primary']}`
      : `${styles['spinner-light']}`;

  return (
    <div className={styles['spinner--margin']}>
      <div className={color}></div>
    </div>
  );
};

export default LoadingSpinner;
