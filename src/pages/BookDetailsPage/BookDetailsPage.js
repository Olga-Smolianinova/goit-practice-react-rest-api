import React, { Component } from 'react';

import axios from 'axios';

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
  render() {
    const { descr, genre, imgUrl, title, author } = this.state;

    return (
      <>
        <h1>THIS IS Book Detail Page {this.props.match.params.bookId}</h1>

        {/* Информация о книге */}
        <img src={imgUrl} alt={title} />

        <h2>{title}</h2>

        <p>{genre}</p>

        <p>{descr}</p>

        {/* рендер по условию, если есть автор */}
        {author && <p>Автор: {author.name}</p>}
      </>
    );
  }
}

export default BookDetailsPage;
