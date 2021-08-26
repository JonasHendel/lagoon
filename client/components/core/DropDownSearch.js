import styles from '@/styles/modules/DDS.module.scss';
import { ChevronDown } from 'react-feather';
import { useState, useEffect } from 'react';
import {motion, AnimatePresence } from 'framer-motion';

const DropDownSearch = ({ title, options, onChange }) => {
  const [showDD, setShowDD] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);
  
  useEffect(() => {
    options &&
      setFilteredOptions(
        options.filter((option) =>
          option.name.toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [search]);

  useEffect(() => {
    onChange(selectedItem);
  }, [selectedItem]);

  const dropdownVariants = {
    enter: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 0.25,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      translateY: -10,
      transition: {
        duration: 0.2,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => setShowDD((prevState) => !prevState)}
        className={`input ${styles.toggle}`}>
        {selectedItem ? selectedItem.name : title}
        <ChevronDown />
      </div>
        <motion.div 
        variants={dropdownVariants}
        initial="exit"
        animate={showDD ? 'enter' : 'exit'}
        className={styles.options}>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search"
            className="input"
          />
          {filteredOptions.map((option, index) => (
            <div className={styles.optionItem}
              onClick={() => {
                setSelectedItem(option);
                setShowDD((prevState) => !prevState);
              }}>
              {option.name}
            </div>
          ))}
        </motion.div>
    </div>
  );
};

export default DropDownSearch;
