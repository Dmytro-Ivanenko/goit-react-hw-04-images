import React, { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// components
import Searchbar from './shared/components/Searchbar/Searchbar';
import ImageGallery from './modules/ImageGallery/ImageGallery';
import Button from './shared/components/Button/Button';
import Modal from './shared/components/Modal/Modal';

// api
import { searchImages } from './shared/services/pixabay-api';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (search === '') {
      return;
    }
    fetchImages();
  }, [search, page]);

  async function fetchImages() {
    try {
      setloading(true);
      const data = await searchImages(search, page);

      if (data.totalHits !== 0) {
        setImages(images => {
          return [...images, ...data.hits];
        });

        setTotalHits(data.totalHits);
      } else {
        Notify.warning('No images found, try another request.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setloading(false);
    }
  }

  const handleSearchSubmit = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
    setTotalHits(0);
  };

  const loadMore = () => {
    setPage(prevPage => {
      return prevPage + 1;
    });
  };

  // modal
  const onClickModal = (largeImage, tags) => {
    setModalImage({
      largeImage,
      tags,
    });
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} showModal={onClickModal} />
      {error && <p>{error.massage}</p>}
      {loading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#ffeb0d', '#3f51b5', '#ffeb0d', '#3f51b5', '#ffeb0d']}
        />
      )}
      {Boolean(images.length) && images.length < totalHits && (
        <Button type="button" onClickBtn={loadMore}>
          Load more
        </Button>
      )}
      {showModal && <Modal close={onCloseModal} imageData={modalImage}></Modal>}
    </>
  );
};

export default App;
