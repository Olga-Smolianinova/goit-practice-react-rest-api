import React from 'react';

import './TodoFilter.css';

const TodoFilter = ({ value, onChange }) => (
  <label className="Filter">
    Фильтр по имени
    <input type="text" value={value} onChange={onChange} />
  </label>
);
export default TodoFilter;
