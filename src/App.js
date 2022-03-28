import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookList from "./BookList";
import { Routes, Route } from "react-router-dom";
import BookSearch from "./BookSearch";
import NotFound from "./NotFound";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books }));
    });
  }

  // Handle book shelves selection in the book list
  handleChange = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(
      this.setState((currentState) => {
        return {
          books: currentState.books.map((b) => (b.id === book.id ? book : b)),
        };
      })
    );
  };

  // Reload the page to get the updated books from search path
  reloadPage = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  };

  render() {
    return (
      <div className="app">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            exact
            path="/"
            element={
              <BookList
                books={this.state.books}
                handleChange={this.handleChange}
              />
            }
          />
          <Route
            path="/search"
            element={
              <BookSearch
                books={this.state.books}
                handleChange={this.handleChange}
                reloadPage={this.reloadPage}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
