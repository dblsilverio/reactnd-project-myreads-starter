import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';

import Book from './Book';

export default class Search extends Component {

    state = {
        query: '',
        books: []
    }

    async updateQuery(query) {
        this.setState({ query: query });
        
        if(query.trim() && query.trim().length >=3){
            console.log(`Querying: ${query}`);

            try{
                this.setState({ books: await BooksAPI.search(query) });
            } catch(e){
                this.setState({ books: [] });
            }
        } else {
            this.setState({ books: [] });
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e) => this.updateQuery(e.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.books.map(book =>
                                (
                                    <li key={book.title}>
                                        <Book info={book} />
                                    </li>
                                ))
                        }
                    </ol>
                </div>
            </div>
        );
    }

}