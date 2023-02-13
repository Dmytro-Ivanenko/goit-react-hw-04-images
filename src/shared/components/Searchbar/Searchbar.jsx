import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Button from '../Button/Button';
import styles from './searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (search.trim() !== '') {
      onSubmit(search);
      setSearch('');
    } else {
      Notify.failure('Please enter a search query.');
    }
  };

  const handleChangeInput = e => {
    setSearch(e.target.value);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.form}>
        <Button type="submit" onClickBtn={handleSubmit}>
          Search
        </Button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
