import styles from './SmallText.module.css';

const SmallText = (props) => {
  const { text, className } = props;
  return <span className={`${styles['text-small']} ${className}`}>{text}</span>;
};

export default SmallText;
