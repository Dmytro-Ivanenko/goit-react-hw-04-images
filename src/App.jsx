import React, { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// components
import Searchbar from './shared/components/Searchbar/Searchbar';
import ImageGallery from './modules/ImageGallery/ImageGallery';
import Button from './shared/components/Button/Button';
import Modal from './shared/components/Modal/Modal';

// api
import { searchImages } from './shared/services/pixabay-api';

class App extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    totalHits: 0,
    showModal: false,
    modalImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;

      const data = await searchImages(search, page);

      if (data.totalHits !== 0) {
        this.setState(({ images }) => ({
          images: [...images, ...data.hits],
          totalHits: data.totalHits,
        }));
      } else {
        Notify.warning('No images found, try another request.');
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleSearchSubmit = search => {
    this.setState({ search, images: [], page: 1, totalHits: 0 });
  };

  loadMore = e => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  // modal
  onClickModal = (largeImage, tags) => {
    this.setState({
      modalImage: {
        largeImage,
        tags,
      },
      showModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      modalImage: null,
    });
  };

  render() {
    const { images, totalHits, loading, error, showModal, modalImage } =
      this.state;
    const { loadMore, handleSearchSubmit, onClickModal, onCloseModal } = this;

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
        {showModal && (
          <Modal close={onCloseModal} imageData={modalImage}></Modal>
        )}
      </>
    );
  }
}

export default App;
