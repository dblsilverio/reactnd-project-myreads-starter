import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'

import Shelf from './Shelf';

export default class MyShelves extends Component {

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
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf name="Currently Reading" books={this.state.shelves.currentlyReading} />
                        <Shelf name="Want to Read" books={this.state.shelves.wantToRead} />
                        <Shelf name="Read" books={this.state.shelves.read} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }

}