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
    imageCards: [],
  };

  onSubmit = inputValue => {
    this.setState({ searchQuery: inputValue });
  };

  componentDidUpdate(_, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      const { searchQuery, page } = this.state;
      const fetchResponse = FetchApi(searchQuery, page);
      fetchResponse.then(resp => {
        this.setState({ imageCards: resp.data.hits });
      });
    }
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery imageCardsArray={this.state.imageCards} />
        <Button />
        <ToastContainer position="top-center" autoClose={3000} theme="light" />
      </div>
    );
  }
}
