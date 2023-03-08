import css from './App.module.css';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button.jsx/Button';
import { FetchApi } from './FetchApi';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    totalHits: 0,
    imageCards: [],
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

      const fetchResponse = FetchApi(searchQuery, page);
      fetchResponse.then(resp => {
        this.setState(() => ({
          imageCards: [...this.state.imageCards, ...resp.data.hits],
          totalHits: resp.data.totalHits,
        }));
      });
    }
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.imageCards.length > 0 && (
          <ImageGallery imageCardsArray={this.state.imageCards} />
        )}
        {this.state.totalHits > 12 && <Button onClick={this.onLoadBtnClick} />}
        <ToastContainer position="top-center" autoClose={3000} theme="light" />
      </div>
    );
  }
}
