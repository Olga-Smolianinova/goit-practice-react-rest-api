import React, { Component } from 'react';

import './ArticlesSearchForm.css';

class ArticlesSearchForm extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({
      query: event.currentTarget.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

    //  передача  props onSubmit из Articles.js для обработки действий когда будет изменяться query
    this.props.onSubmit(this.state.query);

    //   обновление input
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="Articles__search__form">
        <label>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </label>
      </form>
    );
  }
}

export default ArticlesSearchForm;
