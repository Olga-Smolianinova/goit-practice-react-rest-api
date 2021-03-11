import React, { Component } from 'react';

// Components

// import Draft from './components/Draft'; // для тренировки теории модуля. Todolist

import Articles from './components/Articles'; //для тренировки api-подключения.

// Styles

class App extends Component {
  render() {
    return (
      <div>
        {/*TodoList для тренировки теории по модулю components//Draft/Draft.js */}
        {/* <Draft /> */}

        {/* Articles */}
        <Articles />
      </div>
    );
  }
}

export default App;
