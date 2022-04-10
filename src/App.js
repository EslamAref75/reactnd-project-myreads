import { useState, useEffect } from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";
import { Routes, Route } from "react-router-dom";
import BookSearch from "./BookSearch";
import NotFound from "./NotFound";

function BooksApp() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, [books]);

  const getBooks = async () => {
    const receivedBooks = await BooksAPI.getAll();
    setBooks(receivedBooks);
  };

  // Handle book shelves selection in the book list
  const handleChange = async (book, shelf) => {
    book.shelf = shelf;
    await BooksAPI.update(book, shelf);
    getBooks();
  };

  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          exact
          path="/"
          element={<BookList books={books} handleChange={handleChange} />}
        />
        <Route
          path="/search"
          element={<BookSearch books={books} handleChange={handleChange} />}
        />
      </Routes>
    </div>
  );
}

export default BooksApp;
