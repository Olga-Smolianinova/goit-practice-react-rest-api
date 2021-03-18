// routes.js - специальный файл, в котором мы будем хранить path из маршрутов (Route). До этого мы их напрямую прописывали в App.js
// До <Route path="/authors" component={AuthorsPage} />

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  //для NavLink и Route
  home: '/',
  authors: '/authors',
  books: '/books',
  bookDetails: '/books/:bookId',
};
