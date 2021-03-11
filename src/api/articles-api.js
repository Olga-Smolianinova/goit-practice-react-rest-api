import axios from 'axios'; //для fetch запросов

// из api-документации используем общий заголовок авторизации, чтобы сократить код, поєтому прописываем apiKey по default
axios.defaults.headers.common['Authorization'] =
  'Bearer 4330ebfabc654a6992c2aa792f3173a3';

const fetchArticles = ({ searchQuery = '', currentPage = 1, pageSize = 5 }) => {
  return axios
    .get(
      `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}&page=${currentPage}`,
    )
    .then(response => response.data.articles);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchArticles };
