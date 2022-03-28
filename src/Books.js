import React from "react";

function Books({ book, handleChange, shelf }) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              book.imageLinks === undefined ? null : book.imageLinks.thumbnail
            })`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            key={book.id}
            onChange={(e) => handleChange(book, e.target.value)}
            value={book.shelf === undefined ? "none" : shelf}
            defaultValue={book.shelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors &&
        book.authors.map((author) => (
          <div className="book-authors" key={author}>
            {author}
          </div>
        ))}
    </div>
  );
}

export default Books;
