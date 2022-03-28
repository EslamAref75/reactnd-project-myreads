import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import Books from "./Books";
import { DebounceInput } from "react-debounce-input";

class BookSearch extends Component {
  state = {
    query: "",
    books: [],
  };

  // Get books from api search path according to the query
  getBooks = async (query) => {
    try {
      const books = await BooksAPI.search(query);
      if (books.error) {
        return console.warn("Please provide a query in the search input field");
      } else if (books) {
        const newBooks = this.shelfHandler(books);
        return newBooks;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  // Update the shelves in books from search api results by matching book id
  shelfHandler(newBooks) {
    const { books } = this.props;
    const booksUpdate = newBooks.map((newBook) => {
      books.forEach((oldBook) => {
        if (oldBook.id === newBook.id) {
          newBook.shelf = oldBook.shelf;
        }
      });
      return newBook;
    });
    return booksUpdate;
  }

  // Update the compenent to get the matched books in the query input
  updateQuery = async (e) => {
    const query = e.target.value;
    this.setState({ query });
    if (query === "") {
      this.setState({ books: [] });
    } else if (query) {
      const books = await this.getBooks(query);
      if (books) {
        this.setState({ books });
      } else {
        this.setState({ books: [] });
      }
    }
  };

  render() {
    const { books } = this.state;
    const { handleChange, reloadPage } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button
              className="close-search"
              onClick={() => {
                reloadPage();
              }}
            >
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            {/* Use DebounceInput to handle the minimal length of text 
            and the notification debounce timeout in ms */}
            <DebounceInput
              minLength={3}
              debounceTimeout={500}
              onChange={this.updateQuery}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {books.length > 0 && (
            <ol className="books-grid">
              {books.map((book) => (
                <Books key={book.id} handleChange={handleChange} book={book} />
              ))}
            </ol>
          )}
          {books.length <= 0 && (
            <div>
              <h3>Search Terms:</h3>
              <p>
                Android, Art, Artificial Intelligence, Astronomy, Austen,
                Baseball, Basketball, Bhagat, Biography, Brief, Business, Camus,
                Cervantes, Christie, Classics, Comics, Cook, Cricket, Cycling,
                Desai, Design, Development, Digital Marketing, Drama, Drawing,
                Dumas, Education, Everything, Fantasy, Film, Finance, First,
                Fitness, Football, Future, Games, Gandhi, Homer, Horror, Hugo,
                Ibsen, Journey, Kafka, King, Lahiri, Larsson, Learn, Literary
                Fiction, Make, Manage, Marquez, Money, Mystery, Negotiate,
                Painting, Philosophy, Photography, Poetry, Production,
                Programming, React, Redux, River, Robotics, Rowling, Satire,
                Science Fiction, Shakespeare, Singh, Swimming, Tale, Thrun,
                Time, Tolstoy, Travel, Ultimate, Virtual Reality, Web
                Development, iOS
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BookSearch;
