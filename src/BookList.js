import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

function BookList({ books, handleChange }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <BookShelf
              books={books.filter((book) => book.shelf === "currentlyReading")}
              handleChange={handleChange}
            />
            <h2 className="bookshelf-title">Want to Read</h2>
            <BookShelf
              books={books.filter((book) => book.shelf === "wantToRead")}
              handleChange={handleChange}
            />
            <h2 className="bookshelf-title">Read</h2>
            <BookShelf
              books={books.filter((book) => book.shelf === "read")}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link className="open-search" to="/search">
          Add a book
        </Link>
      </div>
    </div>
  );
}

export default BookList;
