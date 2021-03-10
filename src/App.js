import React, { Component } from 'react';

// Components
import Feedback from './components/Feedback';

import Draft from './components/Draft'; // для тренировки теории модуля

// Styles

class App extends Component {
  render() {
    return (
      <div>
        {/* Home work */}
        <Feedback />

        {/* для тренировки теории по модулю components//Draft/Draft.js */}
        <Draft />
      </div>
    );
  }
}

export default App;
