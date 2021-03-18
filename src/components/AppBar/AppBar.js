import React from 'react';

import Navigation from '../Navigation'; //  выносим всю Навигацию для удобства в отдельный компонент

const AppBar = () => {
  return (
    <header className="AppBar">
      <Navigation />
    </header>
  );
};

export default AppBar;
