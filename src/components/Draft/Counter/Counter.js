import React, { Component } from 'react';

import s from './Counter.module.css';

class Counter extends Component {
  static defaultProps = {
    initialValue: 0,
  };

  // static propTypes = {

  // }

  state = {
    value: this.props.initialValue,
  };

  handleIncrement = () => {
    this.setState(prevState => ({
      value: prevState.value + 1,
    }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1,
    }));
  };

  render() {
    return (
      <div className={s.Counter}>
        <h2>Modul Training</h2>
        <h2>Counter</h2>
        <button type="button">Counter value {this.state.value}</button>
        <button type="button" onClick={this.handleIncrement}>
          Увеличить на 1
        </button>
        <button type="button" onClick={this.handleDecrement}>
          Уменьшить на 1
        </button>
      </div>
    );
  }
}

export default Counter;
