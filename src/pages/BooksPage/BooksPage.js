// отрисовывает все books из db.json

import React, { Component } from 'react';

import { Link } from 'react-router-dom'; //Для того чтобы при клике на книгу перенаправляло на новую страницу с информацией именно о ней

import axios from 'axios';

class BooksPage extends Component {
  state = {
    books: [],
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  // при Mount компонента отрисовываются все книги при переходе на страницу BOOKS с помощью async await
  async componentDidMount() {
    const response = await axios.get('http://localhost:3000/books');
    // console.log(response.data);

    this.setState({ books: response.data });
  }

  render() {
    return (
      <>
        <h1>This is BOOKS PAGE</h1>

        <ul>
          {this.state.books.map(book => (
            <li key={book.id}>
              {/* Для того чтобы при клике на книгу перенаправляло на новую страницу с информацией именно о ней. Создаем еще один Link с путем, в котором указываем одно из свойств props->match->url (это свойство показывает буквально то, что находится в адресной строке. И его удобно использовать для создания вложенных маршрутов. Хранит информацию как текущий Route совпал с pathname) и id*/}
              <Link to={`${this.props.match.url}/${book.id}`}>
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default BooksPage;
