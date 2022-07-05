import React, { useRef, useImperativeHandle } from 'react';

import styles from './Input.module.css';

const Input = React.forwardRef((props, forwardedRef) => {
  const localInputRef = useRef();

  const activate = () => {
    localInputRef.current.focus();
  };

  useImperativeHandle(forwardedRef, () => {
    return {
      focus: activate
    };
  });

  return (
    <div
      className={`${styles['input-component']} ${
        props.error === true ? styles.invalid : ''
      } ${props.inputComponentStyles}`}
    >
      <div
        className={`${styles['input-component--label-box']} ${props.labelStyles}`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        {props.description && <p>{props.description}</p>}
      </div>
      <input
        className={`${props.inputStyles} ${props.colorStyles}`}
        ref={localInputRef}
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        error={props.hasError}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onClick={props.onClick}
        step={props.step}
        min={props.min}
        max={props.max}
        minLength={props.minLength}
        maxLength={props.maxLength}
      />
    </div>
  );
});

export default Input;
