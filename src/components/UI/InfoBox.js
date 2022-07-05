import styles from './InfoBox.module.css';

const InfoBox = (props) => {
  return <div className={styles['info-box--card']}>{props.children}</div>;
};

export default InfoBox;
