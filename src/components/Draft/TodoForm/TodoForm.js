import React, { Component } from 'react';

import './TodoForm.css';

class TodoForm extends Component {
  state = {
    message: '',
  };

  handleChange = event => {
    this.setState({ message: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

    // вызов addTodo из Draft.js <Form onSubmit={this.formSubmitHandler};
    this.props.onSubmit(this.state.message);

    // reset для очищения textarea
    this.setState({ message: '' });
  };

  render() {
    return (
      <form className="TodoEditor" onSubmit={this.handleSubmit}>
        <textarea
          value={this.state.message}
          onChange={this.handleChange}
          className="TodoEditor__textarea"
        ></textarea>

        <button type="submit" className="TodoEditor__button">
          Add
        </button>
      </form>
    );
  }
}
export default TodoForm;
