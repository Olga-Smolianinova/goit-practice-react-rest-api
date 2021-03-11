import React, { Component } from 'react';

// Components

import Draft from './components/Draft'; // для тренировки теории модуля. Todolist

import Articles from './components/Articles'; //для тренировки api-подключения.

// Styles

class App extends Component {
  render() {
    return (
      <div>
        {/* Articles */}
        <Articles />

        {/*TodoList для тренировки теории по модулю components//Draft/Draft.js */}
        <Draft />
      </div>
    );
  }
}

export default App;
