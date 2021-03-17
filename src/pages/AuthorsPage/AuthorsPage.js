// отрисовывает все authors из db.json

import React, { Component } from 'react';

import { NavLink, Route } from 'react-router-dom'; //для создания вложенного маршрута, чтобы информация об авторе при клике отрисовывалась на той же странице

import axios from 'axios';

// Components
import AuthorBooks from '../../components/AuthorBooks'; // import компонента для отрисовки на одной странице информации о книгах автора

class AuthorsPage extends Component {
  state = {
    authors: [],
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  // при Mount компонента отрисовываются все книги при переходе на страницу BOOKS с помощью async await
  async componentDidMount() {
    const response = await axios.get(
      ' http://localhost:3000/authors?_embed=books',
    );
    // console.log(response.data);

    this.setState({ authors: response.data });
  }

  render() {
    return (
      <>
        <h1>This is AUTHORS PAGE</h1>

        <ul>
          {this.state.authors.map(author => (
            <li key={author.id}>
              {/* для создания вложенного маршрута, чтобы информация об авторе при
              клике отрисовывалась на той же странице оборачиваем в NavLink */}
              <NavLink to={`${this.props.match.url}/${author.id}`}>
                {author.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* для создания вложенного маршрута, чтобы информация об авторе при клике отрисовывалась на той же странице оборачиваем в NavLink. В этом случае  Route создаем на той же странице */}
        <Route
          path={`${this.props.match.path}/:authorId`}
          // component={AuthorBooks}

          //если component нужно передать доп. props для этого используем render={в который передаем функцию, в который возвращаем наш компонент с доп. props}
          render={props => {
            // console.log(props);

            // логика поиска книг одного автора
            const bookId = Number(props.match.params.authorId); //выводим id  книги указанного автора
            // console.log(bookId);

            const authorBooks = this.state.authors.find(
              author => author.id === bookId,
            ); //находим совпадающие id
            // console.log(authorBooks);
            // console.log(authorBooks.books);

            // чтобы не выдавало ошибку, добавляем условие, если массив authorBooks непустой
            return (
              authorBooks && (
                <AuthorBooks {...props} books={authorBooks.books} />
              )
            );
            // как было до, без условия
            // return  <AuthorBooks {...props} authors={this.state.authors} />;
          }}
        />
      </>
    );
  }
}

export default AuthorsPage;
