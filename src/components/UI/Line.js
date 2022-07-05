import styles from './Line.module.css';

const Line = (props) => {
  const shorter = props.shortLine ? styles.shorter : '';
  const spacing = props.closer ? styles['spacing-low'] : styles['spacing-high'];

  return <div className={`${styles.border} ${shorter} ${spacing}`}></div>;
};

export default Line;
