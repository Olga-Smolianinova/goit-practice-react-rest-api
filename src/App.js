import React, { Component, Suspense, lazy } from 'react'; //lazy - метод, который позволяет загрузить асинхронно, возвращает Promise, который возвращает default export, и webpack при сборке его разchankует. lazy работает только при активации Suspense, благодаря которому показывается fallback co спиннером, пока этот компонент грузится

import { Route, Switch } from 'react-router-dom'; // Route - чтобы создать маршрут;  Switch - чтобы рендерился один компонент из целой группы

import routes from './routes'; // ссылки из routes.js - файла, в котором для удобства и чистоты кода храним все path из маршрутов (Route). Применяем их в NavLink и Route

// Pages
// для тренировки занятия 7 МАРШРУТИЗИЦИЯ
//отдельные страницы App

// import HomePage from './pages/HomePage/HomePage';

// import AuthorsPage from './pages/AuthorsPage';

// import BooksPage from './pages/BooksPage';
// import BookDetailsPage from './pages/BookDetailsPage'; //для отоброжения страницы об одной книге

import NotFoundPage from './pages/NotFoundPage';

// Components
import AppBar from './components/AppBar';

// Для тренировки занятия 6 РАБОТА С REST API
// import Draft from './components/Draft'; // для тренировки теории модуля. Todolist

// import Articles from './components/Articles'; //для тренировки api-подключения.

// Styles

// Dynamic import. Chunkование. При этом static import обязательно удалить, иначе React , как и прежде, будет включать его в результирующую сборку
const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
); //lazy, передаю путь относительно текущего файла по отношению к этой странице. Добавляем комментарий, чтобы webpack при npm run build задал chunk имя, указанное в коментарии

const AuthorsPage = lazy(() =>
  import('./pages/AuthorsPage' /* webpackChunkName: "authors-page" */),
);

const BooksPage = lazy(() =>
  import('./pages/BooksPage' /* webpackChunkName: "books-page" */),
);
const BookDetailsPage = lazy(() =>
  import(
    './pages/BookDetailsPage' /* webpackChunkName: "books-details-page" */
  ),
);

class App extends Component {
  render() {
    return (
      <div>
        {/* для тренировки занятия 7 МАРШРУТИЗИЦИЯ */}
        {/* вставляем Component AppBar с ложенной в него Navigation */}
        <AppBar />
        {/* Чтобы создать маршрут (ROUTE) используем спец.компонент  ROUTE из пакета react-router-dom. В props ему передаем path - это путь с именем страницы приложения или /. А что именно рендерить передаем в component, в который передаем {ссылку на component} exact - указывает на то, что этот Route(маршрут или страница должен совпасть точно */}
        {/*оборачиваем группу Route в Switch, который проходится по всей группе в порядке перечисления и ищет до 1-го совпадения. Как только найдено совпадения остальные Route он пропускает */}

        {/* оборачиваем в контейнер для lazy компонентов - Suspense, кщторому в prop  нужно передать fallback - то, что будет отображаться пока код необходимого компонента загружается (спиннер fallback={<Spinner/>}>, заголовок)*/}
        <Suspense fallback={<h3>Loading...</h3>}>
          <Switch>
            {/* HomePage */}
            <Route exact path={routes.home} component={HomePage} />

            {/* AuthorsPage */}
            <Route path={routes.authors} component={AuthorsPage} />

            {/* BooksPage */}
            <Route exact path={routes.books} component={BooksPage} />
            {/*для отоброжения страницы об одной книге  */}
            <Route path={routes.bookDetails} component={BookDetailsPage} />

            {/* NotFoundPage */}
            {/* для обработки ошибок, если component not found, передаем какой-либо default Route. Если не передавать path, этот путь будет рендирится везде  и всегда*/}
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>

        {/* Для тренировки занятия 6 РАБОТА С REST API */}
        {/* 1)  Articles */}
        {/* <Articles /> */}
        {/*2) TodoList для тренировки теории по модулю components//Draft/Draft.js */}
        {/* <Draft /> */}
      </div>
    );
  }
}

export default App;
