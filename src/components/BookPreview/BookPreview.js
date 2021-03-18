import React from 'react';

import './BookPreview.scss';

const BookPreview = ({ imgUrl, title }) => {
  return (
    <div>
      <div className="BookPreview-thumb">
        <img src={imgUrl} alt={title} />
      </div>
      <div>
        <h5>{title}</h5>
      </div>
    </div>
  );
};

export default BookPreview;
