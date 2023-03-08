import css from './App.module.css';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button.jsx/Button';
import { FetchApi } from './FetchApi';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    totalHits: 0,
    imageCards: [],
    loading: false,
  };

  onSubmit = inputValue => {
    if (this.state.searchQuery !== inputValue) {
      this.setState({ searchQuery: inputValue, imageCards: [] });
    }
  };

  onLoadBtnClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      const { searchQuery, page } = this.state;

      this.setState({ loading: true });

      const fetchResponse = FetchApi(searchQuery, page);
      fetchResponse
        .then(resp => {
          this.setState(() => ({
            imageCards: [...this.state.imageCards, ...resp.data.hits],
            totalHits: resp.data.totalHits,
          }));
        })
        .catch(() => {})
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { imageCards, loading, totalHits } = this.state;
    const { onSubmit, onLoadBtnClick } = this;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />

        {imageCards.length > 0 && <ImageGallery imageCardsArray={imageCards} />}

        {loading && <Loader />}

        {totalHits > 12 && <Button onClick={onLoadBtnClick} />}

        <ToastContainer position="top-center" autoClose={3000} theme="light" />
      </div>
    );
  }
}
