import React from 'react';

import { NavLink } from 'react-router-dom'; //  Link - чтобы обернуть в ссылку, практически не используется. Используем NavLink - т.к. он позволяем использовать стилизацию в отличие от Link;

import routes from '../../routes'; // ссылки из routes.js - файла, в котором для удобства и чистоты кода храним все path из маршрутов (Route). Применяем их в NavLink и Route

const Navigation = () => {
  return (
    <nav>
      {/*передаем NavLink с указанием пути to куда, необходимо перейти относительно корня. NavLink  допольнительно принимает несколько props cо стилями инлайново*/}

      {/* Home Page */}

      {/* добавляем только в NavLink у HOME --exact только на строгое равенство и соответствие указанному пути - чтобы постоянно не применялся стиль NavLink--active и стринца всегда подсвечивалась красным*/}
      <NavLink
        exact
        to={routes.home}
        className="NavLink"
        activeClassName="NavLink--active"
      >
        HOME
      </NavLink>

      {/* Authors Page */}

      <NavLink
        to={routes.authors}
        className="NavLink"
        activeClassName="NavLink--active"
      >
        AUTHORS
      </NavLink>

      {/* Books Page */}
      <NavLink
        to={routes.books}
        className="NavLink"
        activeClassName="NavLink--active"
      >
        BOOKS
      </NavLink>
    </nav>
  );
};

export default Navigation;
