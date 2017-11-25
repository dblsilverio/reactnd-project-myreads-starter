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

    async move(book, fromShelf, toShelf) {

        try {
            await BooksAPI.update(book, toShelf);

            this.setState((previous) => {
                book.shelf = toShelf;
                previous.shelves[`${fromShelf}`] = previous.shelves[`${fromShelf}`].filter(remove => book.id !== remove.id);
                previous.shelves[`${toShelf}`] = previous.shelves[`${toShelf}`].concat(book);
                return previous;
            })

        } catch (e) {
            console.error(e);
        }
    }

    render() {

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf name="Currently Reading" books={this.state.shelves.currentlyReading} moveBook={this.move.bind(this)} />
                        <Shelf name="Want to Read" books={this.state.shelves.wantToRead} moveBook={this.move.bind(this)} />
                        <Shelf name="Read" books={this.state.shelves.read} moveBook={this.move.bind(this)} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }

}