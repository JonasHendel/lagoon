import React from 'react';
import styles from '../../styles/modules/Button.module.scss';

const Button = (props) => {
	const { children } = props;

	return (
		<div>
			<button className={`${styles.button} ${styles[props.type]}`} onClick={props.onClick}>{children}</button>
		</div>
	);
};

export default Button;
