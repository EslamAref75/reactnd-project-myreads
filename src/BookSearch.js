import { useState } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import Books from "./Books";
import { DebounceInput } from "react-debounce-input";

function BookSearch(props) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const { handleChange } = props;

  // Get books from api search path according to the query
  const getBooks = async (query) => {
    try {
      const books = await BooksAPI.search(query);
      if (books.error) {
        return console.warn("Please provide a query in the search input field");
      } else if (books) {
        const newBooks = shelfHandler(books);
        return newBooks;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  // Update the shelves in books from search api results by matching book id
  const shelfHandler = (newBooks) => {
    const { books } = props;
    const booksUpdate = newBooks.map((newBook) => {
      books.forEach((oldBook) => {
        if (oldBook.id === newBook.id) {
          newBook.shelf = oldBook.shelf;
        }
      });
      return newBook;
    });
    return booksUpdate;
  };

  // Update the compenent to get the matched books in the query input
  const updateQuery = async (e) => {
    const query = e.target.value;
    setQuery(query);
    if (query === "") {
      setBooks({ books: [] });
    } else if (query) {
      const books = await getBooks(query);
      if (books) {
        setBooks(books);
      } else {
        setBooks({ books: [] });
      }
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button
            className="close-search"
           
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
            onChange={updateQuery}
            type="text"
            value={query}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        {books.length > 0 ? (
          <ol className="books-grid">
            {books.map((book) => (
              <Books key={book.id} handleChange={handleChange} book={book} />
            ))}
          </ol>
        ) : (
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
              Science Fiction, Shakespeare, Singh, Swimming, Tale, Thrun, Time,
              Tolstoy, Travel, Ultimate, Virtual Reality, Web Development, iOS
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookSearch;
