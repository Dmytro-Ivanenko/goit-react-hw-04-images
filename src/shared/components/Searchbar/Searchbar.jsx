import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Button from '../Button/Button';
import styles from './searchbar.module.scss';

class Searchbar extends Component {
  state = {
    search: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    const { search } = this.state;
    e.preventDefault();

    if (search.trim() !== '') {
      this.props.onSubmit(search);
      this.reset();
    } else {
      Notify.failure('Please enter a search query.');
    }
  };

  handleChangeInput = e => {
    this.setState({ search: e.target.value });
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  render() {
    const { search } = this.state;

    return (
      <header className={styles.Searchbar}>
        <form className={styles.form}>
          <Button type="submit" onClickBtn={this.handleSubmit}>
            Search
          </Button>

          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
