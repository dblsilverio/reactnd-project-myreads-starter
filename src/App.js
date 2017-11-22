import React from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'

import MyShelves from './MyShelves';
import Search from './Search';

import './App.css'

class BooksApp extends React.Component {

  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  async componentDidMount() {
    const booksInMyShelves = await BooksAPI.getAll();
    this.setState({
      shelves: {
        currentlyReading: booksInMyShelves.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: booksInMyShelves.filter(book => book.shelf === 'wantToRead'),
        read: booksInMyShelves.filter(book => book.shelf === 'read')
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyShelves shelves={this.state.shelves} />
        )} />
        <Route path="/search" render={() => (
          <Search />
        )} />
      </div>
    );
  }
}

export default BooksApp
