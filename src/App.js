import React from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';

import Shelves from './Shelves';
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

  /**
   * @description Refreshes shelves by requiring user books and filtering the response.
   */
  async refreshShelves() {
    const booksInMyShelves = await BooksAPI.getAll();

    this.setState({
      shelves: {
        currentlyReading: booksInMyShelves.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: booksInMyShelves.filter(book => book.shelf === 'wantToRead'),
        read: booksInMyShelves.filter(book => book.shelf === 'read')
      }
    });
  }

  componentDidMount() {
    this.refreshShelves();
  }

  /**
   * Moves a book from his shelf to a destination shelf.
   * 
   * @param {Book} book - The book to be moved between shelves
   * @param {string} fromShelf - The origin shelf
   * @param {string} toShelf  - The destination shelf
   */
  async move(book, fromShelf, toShelf) {

    try {
      this.setState((previous) => {
        previous.shelves[`${fromShelf}`] = previous.shelves[`${fromShelf}`].filter(remove => book.id !== remove.id);

        if (toShelf !== 'none') {
          previous.shelves[`${toShelf}`] = previous.shelves[`${toShelf}`].concat(book);
        }

        book.shelf = toShelf;
        return previous;
      });

    } catch (e) {
      console.error(e);
    }
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Shelves shelves={this.state.shelves} move={this.move.bind(this)} />
        )} />
        <Route path="/search" render={() => (
          <Search shelves={this.state.shelves} refresh={this.refreshShelves.bind(this)} />
        )} />
      </div>
    );
  }
}

export default BooksApp
