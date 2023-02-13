import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './imageGallery.module.scss';

const ImageGallery = ({ images, showModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            onClick={() => showModal(largeImageURL, tags)}
            webformatURL={webformatURL}
            altText={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  showModal: PropTypes.func,
};

export default memo(ImageGallery);
