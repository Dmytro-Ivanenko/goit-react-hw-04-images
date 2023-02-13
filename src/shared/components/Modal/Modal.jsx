import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    imageData: PropTypes.shape({
      largeImage: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
    close: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const {
      imageData: { largeImage, tags },
    } = this.props;
    const { closeModal } = this;

    return createPortal(
      <div className={styles.Overlay} onClick={closeModal}>
        <div className={styles.Modal}>
          <img src={largeImage} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
