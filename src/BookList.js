import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

function BookList({ books, handleChange }) {
  const shelves = [
    { title: "Currently Reading", key: "currentlyReading" },
    { title: "Want To Read", key: "wantToRead" },
    { title: "Read", key: "read" },
  ];
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            {shelves.map((shelf) => (
              <React.Fragment key={shelf.key}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <BookShelf
                  books={books.filter((book) => book.shelf === shelf.key)}
                  handleChange={handleChange}
                />
              </React.Fragment>
            ))}
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
