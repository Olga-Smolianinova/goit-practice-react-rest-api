import React from 'react';

const HomePage = () => {
  return (
    <div className="HomeView">
      {/*картинка для  фона HOME PAGE подставляется в стилях через background-image */}
      <h1 className="HomeView-title">
        WELCOME TO HOME PAGE
        <span role="img" aria-label="face emoji">
          😊
        </span>
      </h1>
    </div>
  );
};

export default HomePage;
