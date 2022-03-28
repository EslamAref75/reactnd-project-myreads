# MyReads Project

This is a library app. The main purpose of this project is to keep tracking the state of the books. The app has three main categories: Currentely reading , Want to read and Read.
The user will update the book's category according to the new state, this can be done from the drop down-menu in each book.
The user can search for new books in the library with provided search terms.

## Tech

MyReads uses a number of open source projects to work properly:

- ReactJS 
- Node.js 

## Installation

- install all project dependencies with `npm install`
- start the development server with `npm start`

## What's included

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon.
│   └── index.html 
└── src
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of the app. Contains react components.
    ├── Books.js # React compenent that contains the books info.
    ├── BookShelf.js # This compenent acts as a shelf to each book.
    ├── BookList.js # This compenent contains each list of books with their shelves.
    ├── BookSearch.js # This compenent handles the seach query of books.
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── NotFound.js # This a not found page 404.
    ├── icons # Helpful images for the app. 
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    └── index.js # This file is for DOM rendering.
```


## Backend Server

The file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
