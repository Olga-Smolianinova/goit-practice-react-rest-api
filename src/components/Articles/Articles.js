import React, { Component } from 'react';

// Components
import ArticlesSearchForm from './ArticlesSearchForm/ArticlesSearchForm'; //input для поиска

import articlesApi from '../../api/articles-api'; //import файла, который прописывает логику настроек Api

import './Articles.css';

class Articles extends Component {
  state = {
    articles: [],
    currentPage: 1, //чтобы при нажатии на Load more могли увеличивать currentPage, и отрисовать следующую часть запроса
    searchQuery: '', //чтобы между разными запросами могли сохранить query, по которому делаем запрос и он же отрисовывался дальше при нажатии на  Load more
    isLoading: false, //спиннер, состояние загрузки

    error: null, //для catch
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  componentDidUpdate(prevProps, prevState) {
    //  добавляем условие, что если компонент обновился и обновилось именно свойство searchQuery ({ searchQuery: query }) тогда в этом случае делаем http-запрос. (если этого не сделать http-запрос делается с пустой сторокой (searchQuery: '') и не возвращает результат)
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchArticles();
    }
  }
  // Методы
  // метод, который будет отрабатываться при submit формы, когда будет изменяться query
  onChangeQuery = query => {
    // console.log(query);

    // 1)  чтобы при нажатии на  Load more продолжался делаться запрос по предыдущему query
    // 2)  чтобы изменить термин поиска, когда при вводе нового query в input - currentPage снова начинал отрисовываться с 1-й страницы, а не продалжал увеличиваться +1
    //   3) articles при новом запросе перед начало обнулялся от предыдущих статей
    //   4) при каждом следующем запросе обнуляем error
    this.setState({
      searchQuery: query,
      currentPage: 1,
      articles: [],
      error: null,
    });

    //   вызов  fetchArticles для обработки   того  query, который пользователь ввел в input, делаем http-запрос в componentDidUpdate
  };

  //выносим http-запрос в отдельный метод для удобства переиспользования
  fetchArticles = () => {
    const { searchQuery, currentPage } = this.state;

    //   выводим в отдельную переменную  searchQuery, currentPage для того, чтобы передать options в props в articles-api.js;
    const options = { searchQuery, currentPage };

    //   сотояние загрузки, меняем значение
    this.setState({ isLoading: true });

    //   по результатам того  query, который пользователь ввел в input делаем http-запрос

    // вызов функции из файла который прописывает логику настроек Api (articles-api.js)
    articlesApi
      .fetchArticles(options)
      .then(articles => {
        // console.log(response.data.articles);

        this.setState(prevState => ({
          //   чтобы articles не записывались поверх друг друга, а добавлялись в массив, добавляем новые через ...rest
          articles: [...prevState.articles, ...articles],

          // при нажатии на Load more увеличиваем currentPage, отрисовываем следующую часть запроса
          currentPage: prevState.currentPage + 1,
        }));
        // убираем отображение спиннера, когда загрузились данные
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { articles, isLoading, error } = this.state;

    //   должен ли отображаться Load more и спиннер. Отображается, если есть articles и вернулся http-запрос
    const shouldRenderLoadMoreButton = articles.length > 0 && !isLoading;

    return (
      <div className="Articles">
        <h1 className="Articles__title">Articles</h1>
        {/* input для поиска. В props передаем метод, который будет отрабатываться при submit формы */}
        <ArticlesSearchForm onSubmit={this.onChangeQuery} />
        <ul>
          {articles.map(article => (
            <li key={article.title}>
              <a href={article.url}>{article.title}</a>
            </li>
          ))}
        </ul>

        {/* появление спиннера, рендерим по условию  */}
        {isLoading && <h2>Loading...</h2>}

        {/* button Load more. Рендер по условию и спиннер во время загрузки меняем надпись Load more на Loading...*/}
        {shouldRenderLoadMoreButton && (
          <button
            type="button"
            className="LoadMoreBtn"
            onClick={this.fetchArticles}
          >
            Load more
          </button>
        )}

        {/* для обработки ошибок (error), рендер по условию */}
        {error && <h2>Something get wrong! Please, try again!</h2>}
      </div>
    );
  }
}

export default Articles;
