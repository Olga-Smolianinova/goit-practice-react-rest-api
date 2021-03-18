// отрисовывает все books из db.json

import React, { Component } from 'react';

import axios from 'axios';

// Components
import BookList from '../../components/BookList';

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
      <div className="container-fluid">
        <BookList books={this.state.books} />
      </div>
    );
  }
}

export default BooksPage;
