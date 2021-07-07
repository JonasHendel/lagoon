import React from 'react';
import styles from '../../styles/modules/Input.module.scss';

const Input = (props) => {
  return (
    <div>
      <input
        className={`${styles.input} ${styles[props.type]}`}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default Input;
