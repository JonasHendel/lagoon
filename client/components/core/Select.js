import { useState, useEffect } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import styles from '../../styles/modules/Select.module.scss';

const Select = (props) => {
	const [selectedItem, setSelectedItem] = useState(0);

	useEffect(() => {
		props.onChange(props.list[selectedItem]);
	}, [selectedItem]);

	return (
		<AnimateSharedLayout>
			<div className={styles.select}>
				{props.list.map((item, index) => {
					const isActive = index === selectedItem;

					return (
						<motion.div
							key={item}
							whileTap={
								isActive ? { scale: 0.95 } : {}
							}
							onClick={() => setSelectedItem(index)}
							className={styles.selectItem}>
							{isActive && (
								<motion.div
									layoutId='SelectActive'
									className={styles.active}
								/>
							)}
							<span className={styles.selectText}>{item}</span>
						</motion.div>
					);
				})}
			</div>
		</AnimateSharedLayout>
	);
};

export default Select;