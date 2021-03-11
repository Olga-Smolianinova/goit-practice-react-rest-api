import React, { Component } from 'react';

// Components
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm/TodoForm';
import TodoFilter from './TodoFilter/TodoFilter';

import './TodoList/TodoList.css'; //стили для TodoList

// LOCAL STORAGE И ЖИЗНЕННЫЕ ЦИКЛЫ
import Modal from './Modal/Modal'; //Modal window

import todosApi from '../../api/todos-api'; //import файла, который прописывает логику настроек Api

class Draft extends Component {
  // state for TodoList
  state = {
    todos: [],

    // для фильтрации
    filter: '',

    // для Модального окна
    showModal: false,
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  // методы жизненного цикла вызываются без помощи стрелоных функции

  // вызывается один раз при Mount компонета.
  componentDidMount() {
    // console.log('Mount component');

    // При вызове делаем запрос с помощью axios и берем начальные данные, которые хранятся на локальном backend, который мы создали с помощью npm json-server и данные которого хранятся в корне проекта в файле db.json

    // вызов функции из файла который прописывает логику настроек Api (todos-api.js)
    todosApi
      .fetchTodos()

      .then(todos => this.setState({ todos }))
      .catch(error => {
        console.log(error);
      });
  }

  // вызывается после каждого обновления компонента
  componentDidUpdate(prevProps, prevState) {
    //обязательно сравниваем предыдущее значение todos c текущим, если неравно, то обновляем все todos. Это делается, чтобы не зациклить компонент

    if (this.state.todos !== prevState.todos) {
      // console.log('Update todos');

      // при каждом обновлении todos массив todos, приводим к строке и полностью перезаписываем todos  в local Storage
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  // во время submit TodoForm нужно получить из нее данные, чтобы добавить  еще одну todos с ее текстом. Передаем этом метод с помощью prop для TodoForm
  addTodo = text => {
    // console.log(text);

    // делаем todos, и добавляем ее в state
    const todoData = {
      // id: shortId.generate(), //ID не нужен, их сделает backend
      text,
      completed: false,
    };

    // перед добавлением сперва делаем запрос. в параметрах url,  и data, где указан шаблон ключей для отрисовки

    // вызов функции из файла который прописывает логику настроек Api (todos-api.js)
    todosApi.addTodo(todoData).then(todo => {
      this.setState(({ todos }) => ({
        todos: [...todos, todo],
      }));
    });

    // before axios
    // для обновления state, когда мы хотим в него что-либо добавить, сначала делаем новый массив, в который распыляем старый, и добавляем новый элемент в начало или конец массива [...старый[], элемент]
    // this.setState(({ todos }) => ({
    //   todos: [todo, ...todos],
    // }));
  };

  // для удаления элемента в TodoList при onClick на кнопку. Обращаемся к id элемента.
  deleteTodo = todoId => {
    todosApi.deleteTodo(todoId).then(() => {
      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => todo.id !== todoId), //берем предыдущий todos и отфильтровываем все элементы, кроме того у которого id совпадает
      }));
    });

    // before axios
    // this.setState(prevState => ({
    //   todos: prevState.todos.filter(todo => todo.id !== todoId), //берем предыдущий todos и отфильтровываем все элементы, кроме того у которого id совпадает
    // }));
  };

  //checkbox когда хотим что-либо обновить в коллекции, не изменяя ее длины. Сравниваем по идентификаторам, если совпало - заменяем, если нет - возвращается то, что было
  toggleCompleted = todoId => {
    //   console.log(todoId);

    // находим id того элемента на котором кликнули и вытягиваем его ключ completed
    const todo = this.state.todos.find(({ id }) => id === todoId);
    const { completed } = todo;
    const update = { completed: !completed };

    // делаем запрос, в парметрах указываем url и в каком поле какое значение мы хотим изменить, изменяем ключ completed на противоположное
    todosApi.updateTodo(todoId, update).then(updatedTodo => {
      this.setState(({ todos }) => ({
        todos: todos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      }));
    });

    // before axios
    // this.setState(({ todos }) => ({
    //   todos: todos.map(todo =>
    //     todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    //   ),
    // }));
  };

  // для фильтрации. для передачи данныx при onChange
  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  // вычисляемые свойства для фильтрации. Отфильтровываем те todos, которые includes то, что мы записали в input Фильтр по имени и в TodoList рендерим не все <TodoList
  //   todos={todos}, а только отфильтрованые, т.е.  todos={filteredTodos}
  // />
  getFilteredTodos = () => {
    // для чистоты кода выведем this.state.filter.toLowerCase() в отдельную переменную
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  // чтобы при отравке (submit) формы получить доступ к state из Form.js. Это можно сделать через props. В data прокидываются ключи name,tag из state
  formSubmitHandler = data => {
    console.log(data);
  };

  // работа Модального окна. Открытие-закрытие в зависимости от предыдущего значения
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    // деструктуризируем todos
    const { todos } = this.state;

    //для рассчета Количество выполненных todos
    const completedTodosCount = todos.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0,
    );

    const filteredTodos = this.getFilteredTodos();

    return (
      <div>
        {/* Form for TodoList */}
        <TodoForm onSubmit={this.addTodo} />
        {/* для фильтрации */}
        <TodoFilter value={this.state.filter} onChange={this.changeFilter} />

        {/* TodoList */}
        <div className="TodoList">
          <h2>TodoList</h2>
          <p>Total todos: {todos.length}</p>
          <p>Количество выполненных: {completedTodosCount}</p>
        </div>
        <TodoList
          todos={filteredTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />

        {/* LOCAL STORAGE И ЖИЗНЕННЫЕ ЦИКЛЫ */}
        {/* Modal. Рендер по условию */}
        <button type="button" onClick={this.toggleModal}>
          Open modal window
        </button>

        {this.state.showModal && (
          //в props прокидываем toggleModal для возможности закрыть модалку по нажатию на "Escape"
          <Modal onClose={this.toggleModal}>
            <h1>Modal</h1>
            <button type="button" onClick={this.toggleModal}>
              Close Modal window
            </button>
          </Modal>
        )}
      </div>
    );
  }
}
export default Draft;
