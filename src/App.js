import React, { Component } from 'react';

import { Route, NavLink, Switch } from 'react-router-dom'; // Route - чтобы создать маршрут; Link - чтобы обернуть в ссылку, практически не используется. Используем NavLink - т.к. он позволяем использовать стилизацию в отличие от Link; Switch - чтобы рендерился один компонент из целой группы

// Components
// для тренировки занятия 7 МАРШРУТИЗИЦИЯ
//отдельные страницы App
import HomePage from './pages/HomePage/HomePage';

import AuthorsPage from './pages/AuthorsPage';

import BooksPage from './pages/BooksPage';
import BookDetailsPage from './pages/BookDetailsPage'; //для отоброжения страницы об одной книге

import NotFoundPage from './pages/NotFoundPage';

// Для тренировки занятия 6 РАБОТА С REST API
// import Draft from './components/Draft'; // для тренировки теории модуля. Todolist

// import Articles from './components/Articles'; //для тренировки api-подключения.

// Styles

class App extends Component {
  render() {
    return (
      <div>
        {/* для тренировки занятия 7 МАРШРУТИЗИЦИЯ */}
        {/* Чтобы создать маршрут (ROUTE) используем спец.компонент  ROUTE из пакета react-router-dom. В props ему передаем path - это путь с именем страницы приложения или /. А что именно рендерить передаем в component, в который передаем {ссылку на component} exact - указывает на то, что этот Route(маршрут или страница должен совпасть точно*/}
        {/* пример навигации nav */}
        <ul>
          {/*передаем NavLink с указанием пути to куда, необходимо перейти относительно корня. NavLink  допольнительно принимает несколько props cо стилями инлайново*/}
          <li>
            {/* добавляем только в NavLink у HOME --exact только на строгое равенство и соответствие указанному пути - чтобы постоянно не применялся стиль NavLink--active и стринца всегда подсвечивалась красным*/}
            <NavLink
              exact
              to="/"
              className="NavLink"
              activeClassName="NavLink--active"
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/authors"
              className="NavLink"
              activeClassName="NavLink--active"
            >
              AUTHORS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className="NavLink"
              activeClassName="NavLink--active"
            >
              BOOKS
            </NavLink>
          </li>
        </ul>

        {/*оборачиваем группу Route в Switch, который проходится по всей группе в порядке перечисления и ищет до 1-го совпадения. Как только найдено совпадения остальные Route он пропускает */}
        <Switch>
          {/* HomePage */}
          <Route exact path="/" component={HomePage} />

          {/* AuthorsPage */}
          <Route path="/authors" component={AuthorsPage} />

          {/* BooksPage */}
          <Route exact path="/books" component={BooksPage} />
          <Route path="/books/:bookId" component={BookDetailsPage} />
          {/*для отоброжения страницы об одной книге  */}

          {/* NotFoundPage */}
          {/* для обработки ошибок, если component not found, передаем какой-либо default Route. Если не передавать path, этот путь будет рендирится везде  и всегда*/}
          <Route component={NotFoundPage} />
        </Switch>

        {/* Для тренировки занятия 6 РАБОТА С REST API */}

        {/*1)  Articles */}
        {/* <Articles /> */}

        {/*2) TodoList для тренировки теории по модулю components//Draft/Draft.js */}
        {/* <Draft /> */}
      </div>
    );
  }
}

export default App;
