import styles from './SmallText.module.css';

const SmallTextLink = (props) => {
  const text = props.text;
  return (
    <span className={styles['text-small-link']} onClick={props.onClick}>
      {text}
    </span>
  );
};

export default SmallTextLink;
