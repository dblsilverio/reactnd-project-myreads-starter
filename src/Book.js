import React, { Component } from 'react';

export default class Book extends Component {

    moveElsewhere(book, to){
        this.props.moveBook(book, this.props.info.shelf, to);
    }

    render() {

        let authors = this.props.info.authors;
        let actualShelf = this.props.info.shelf;

        if(authors){
            authors = authors.join(', ');
        } else {
            authors = this.props.info.publisher;
        }

        if(!actualShelf){
            actualShelf = "none";
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.info.imageLinks.smallThumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={actualShelf} onChange={(e) => {this.moveElsewhere(this.props.info, e.target.value)}}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.info.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        );
    }

}