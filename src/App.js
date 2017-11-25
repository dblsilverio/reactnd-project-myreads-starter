import React from 'react'
import { Route } from 'react-router-dom';

import MyShelves from './MyShelves';
import Search from './Search';

import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyShelves />
        )} />
        <Route path="/search" render={() => (
          <Search />
        )} />
      </div>
    );
  }
}

export default BooksApp
