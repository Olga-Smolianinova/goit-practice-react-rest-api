// описание всей логики работы и подключения api
import axios from 'axios'; //для fetch запросов

// baseURL
axios.defaults.baseURL = `http://localhost:3000`;

// забрать все todos. вызов в componentDidMount() в TodoList.js

const fetchTodos = () => {
  return axios.get('/todos').then(response => response.data);
};

// add todo. для добавления todo
const addTodo = todo => {
  return axios.post('/todos', todo).then(({ data }) => data);
};

// deleteTodo
const deleteTodo = todoId => {
  return axios.delete(`todos/${todoId}`);
};

// для toggleCompleted прописывываем метод для обновления.  параметр update - {completed: !completed}
const updateTodo = (todoId, update) => {
  return axios.patch(`/todos/${todoId}`, update).then(({ data }) => data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchTodos, addTodo, deleteTodo, updateTodo };
