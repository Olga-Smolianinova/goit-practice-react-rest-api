import React from 'react';

import PropTypes from 'prop-types';

import './IconButton.css';

// когда в кнопке отстутствует текст (в случае когда там иконка) обязательно  необходимо передавать атрибут доступности aria-label в propTypes и в самом компоненте IconButton и в App распыляем  {...allProps}, чтобы избежать ошибок при компиляции
const IconButton = ({ children, onClick, ...allProps }) => (
  <button type="button" className="IconButton" onClick={onClick} {...allProps}>
    {children}
  </button>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,

  // когда в кнопке отстутствует текст (в случае когда там иконка) необходимо передавать атрибут доступности aria-label
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
