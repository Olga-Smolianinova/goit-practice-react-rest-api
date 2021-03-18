import React, { Component } from 'react';

import axios from 'axios';

import routes from '../../routes';

class BookDetailsPage extends Component {
  state = {
    // book: null,
    // authorId: 1
    descr: null,
    genre: null,
    id: null,
    imgUrl: null,
    title: null,
    author: null,
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  // для отрисовки страницы с информацией только об одной книге делаем http-запрос
  async componentDidMount() {
    // выносим в отдельную переменную bookId - значение this.props.match.params.bookId
    const bookId = this.props.match.params.bookId;

    // http-запрос делаем отдельный, для того, чтобы если не заходя на страницу и не переходя по ссылкам, если в адресной строке сразу ввести url одной книги, открылась страница с информацией о ней. В противном случае будет null или ошибка
    const response = await axios.get(
      `http://localhost:3000/books/${bookId}?_expand=author`,
    );
    // console.log(response);

    this.setState({
      ...response.data,
    });
  }

  // Методы
  //  Клик по Кнопке "Вернуться назад"
  handleButtonBack = () => {
    const { location, history } = this.props;
    // console.log(location);
    // console.log(location.state);
    // console.log(location.state.from);

    // если пользователь напрямую перешел на страницу одной книге, это первая страница - при клике "Вернуться назад" будет ошибка т.к. location.state.from - undefined. В этом случае добавляем проверку

    // новый метод 2020: optional chaining (?.) - оператор state и from, || - если нет, то перекинь на routes.books
    history.push(location?.state?.from || routes.books);

    // (oldSchool метод)
    //     if (location.state && location.state.from) {
    //       return history.push(location.state.from);
    //  }

    // history.push(routes.books);

    // При клике кладем новую запись в location (метод push - добавить новую, replace - заменить старую)  и возвращаемся обратно откуда были перенаправлены на текущую страницу
    history.push(location.state.from);
  };

  render() {
    const { descr, genre, imgUrl, title, author } = this.state;

    return (
      <div>
        <h1>THIS IS Book Detail Page {this.props.match.params.bookId}</h1>

        {/* Кнопка "Вернуться назад". При клике кладем новую запись в location (метод push - добавить новую, replace - заменить старую)  и возвращаемся обратно на /books */}
        <button type="button" onClick={this.handleButtonBack}>
          Вернуться назад
        </button>

        {/* Информация о книге */}
        <img src={imgUrl} alt={title} />

        <h2>{title}</h2>

        <p>{genre}</p>

        <p>{descr}</p>

        {/* рендер по условию, если есть автор */}
        {author && <p>Автор: {author.name}</p>}
      </div>
    );
  }
}

export default BookDetailsPage;
