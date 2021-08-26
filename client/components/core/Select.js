import { useState, useEffect } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import styles from '@/styles/modules/Select.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeEdit } from '@/store/features/editSlice';
const Select = (props) => {
  const [selectedItem, setSelectedItem] = useState(0); // Default View 0 for Week; 1 for Month; 2 for Year

  const edit = useSelector((state) => state.edit);

  const dispatch = useDispatch();

  useEffect(() => {
    props.onChange(props.list[selectedItem]);
  }, [selectedItem]);

  return (
    <AnimateSharedLayout>
      <div className={styles.select}>
        {/* {auth.user && auth.user.role === 'admin' && ( */}
        <div
          className={edit.value ? styles.editTrue : styles.editFalse}
          onClick={() => dispatch(changeEdit())}>
          Edit
        </div>
        {/* )} */}
        {props.list.map((item, index) => {
          const isActive = index === selectedItem;
          return (
            <motion.div
              key={item}
              whileTap={isActive ? { scale: 0.95 } : {}}
              onClick={() => setSelectedItem(index)}
              className={styles.selectItem}>
              {isActive && (
                <motion.div layoutId="SelectActive" className={styles.active} />
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
