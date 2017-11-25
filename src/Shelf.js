import React, { Component } from 'react';

import Book from './Book';

export default class Shelf extends Component {

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books.map(book =>
                                (
                                    <li key={book.id}>
                                        <Book info={book} move={this.props.move} />
                                    </li>
                                ))
                        }
                    </ol>
                </div>
            </div>
        );
    }

}