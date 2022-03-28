import React from "react";
import Books from "./Books";

function BookShelf({ books, handleChange }) {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Books book={book} key={book.id} handleChange={handleChange} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default BookShelf;
