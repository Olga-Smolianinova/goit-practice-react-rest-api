import React, { Component } from 'react';

import axios from 'axios'; //для fetch запросов

class Articles extends Component {
  state = {
    articles: [],
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  componentDidMount() {
    axios.get();
  }
  render() {
    return <h1>Articles</h1>;
  }
}

export default Articles;
