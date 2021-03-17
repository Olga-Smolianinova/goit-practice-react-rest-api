import React from 'react';

import { Link } from 'react-router-dom';

const AuthorBooks = ({ books }) => {
  return (
    <>
      <h2>AUTOR BOOKS</h2>

      <ul>
        {books.map(book => (
          <li key={book.id}>
            {/* Делаем внешнюю навигацию, так, чтобы при клике на книгу открывалась страница с информацией о книге */}
            <Link to={`/books/${book.id}`}> {book.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AuthorBooks;
