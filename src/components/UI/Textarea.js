import React from 'react';

import styles from './Input.module.css';

const Textarea = React.forwardRef((props, forwardedRef) => {
  return (
    <div
      className={`${styles['input-component']} ${props.inputComponentStyles}`}
    >
      <div
        className={`${styles['input-component--label-box']} ${props.labelStyles}`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        {props.description && <p>{props.description}</p>}
      </div>
      <textarea
        className={`${props.inputStyles} ${props.colorStyles}`}
        ref={forwardedRef}
        name={props.name}
        id={props.id}
        rows={props.rows}
        placeholder={props.placeholder}
      />
    </div>
  );
});

export default Textarea;
