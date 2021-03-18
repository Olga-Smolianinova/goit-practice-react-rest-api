import React from 'react';

import { Link, withRouter } from 'react-router-dom'; //Link - Для того чтобы при клике на книгу перенаправляло на новую страницу с информацией именно о ней; withRouter - компонент высшего порядка (грубо говор - это как композиция функций), который может оборачивать исходный компонент, и возвращать другой компонент. Если необходимо в каком-либо компоненте, который не рендерится Route, получить доступ к 3 props (match, history, location)

import BookPreview from '../BookPreview';

import './BookList.scss';

const BookList = ({ books, location }) => {
  return (
    <>
      {/* <h1>This is BOOKS PAGE</h1> */}

      <ul className="BookList">
        {books.map(({ id, imgUrl, title }) => (
          <li key={id}>
            {/* Для того чтобы при клике на книгу перенаправляло на новую страницу с информацией именно о ней. Создаем еще один Link с путем, в котором указываем одно из свойств props->match->url (это свойство показывает буквально то, что находится в адресной строке. И его удобно использовать для создания вложенных маршрутов. Хранит информацию как текущий Route совпал с pathname) и id*/}
            <Link
              to={{
                pathname: `/books/${id}`,

                // в state можно передавать информацию, откуда ты пришел на эту страницу
                state: { from: location },
              }}
            >
              <BookPreview imgUrl={imgUrl} title={title} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

// вызваем функцию withRouter(), где в параметр передаем ссылку на BookList
export default withRouter(BookList);
