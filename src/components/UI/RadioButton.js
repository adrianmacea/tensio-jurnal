import styles from './RadioButton.module.css';

const RadioButton = (props) => {
  const labelText = props.text;

  return (
    <label className={`${styles['radio--label']} ${props.className}`}>
      <input
        className={styles['radio--input']}
        type="radio"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        onClick={props.onClick}
        onBlur={props.onBlur}
      />
      {labelText}
      {props.children}
    </label>
  );
};

export default RadioButton;
