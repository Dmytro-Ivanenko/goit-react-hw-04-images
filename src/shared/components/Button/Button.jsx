import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.scss';

const Button = ({ type, onClickBtn, children }) => {
  return (
    <button type={type} className={styles.Button} onClick={onClickBtn}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClickBtn: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Button;
