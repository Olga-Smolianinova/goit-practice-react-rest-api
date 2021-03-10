import React, { Component } from 'react';

import shortId from 'shortid'; //npm для создания уникальных ID

// Components
// import Counter from './Counter';

// import Dropdown from './Dropdown';

import ColorPicker from './ColorPicker';

import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm/TodoForm';
import TodoFilter from './TodoFilter/TodoFilter';

import initialTodos from './TodoList/todos.json'; //данные для TodoList
import './TodoList/TodoList.css'; //стили для TodoList

// для тренировки Form
// import Form from './Form/Form';

// LOCAL STORAGE И ЖИЗНЕННЫЕ ЦИКЛЫ
import Modal from './Modal/Modal'; //Modal window

// data for ColorPicker
const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

class Draft extends Component {
  // state for TodoList
  state = {
    todos: initialTodos,

    // todos: [],

    // для фильтрации
    filter: '',

    // для Модального окна
    showModal: false,
  };

  // во время submit TodoForm нужно получить из нее данные, чтобы добавить  еще одну todos с ее текстом. Передаем этом метод с помощью prop для TodoForm
  addTodo = text => {
    // console.log(text);

    // делаем todos, и добавляем ее в state
    const todo = {
      id: shortId.generate(), //присваиваем уникальный ID
      text,
      completed: false,
    };
    // для обновления state, когда мы хотим в него что-либо добавить, сначала делаем новый массив, в который распыляем старый, и добавляем новый элемент в начало или конец массива [...старый[], элемент]
    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
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

  // для удаления элемента в TodoList при onClick на кнопку. Обращаемся к id элемента.
  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId), //берем предыдущий todos и отфильтровываем все элементы, кроме того у которого id совпадает
    }));
  };

  // чтобы при отравке (submit) формы получить доступ к state из Form.js. Это можно сделать через props. В data прокидываются ключи name,tag из state
  formSubmitHandler = data => {
    console.log(data);
  };

  //checkbox когда хотим что-либо обновить в коллекции, не изменяя ее длины. Сравниваем по идентификаторам, если совпало - заменяем, если нет - возвращается то, что было
  toggleCompleted = todoId => {
    //   console.log(todoId);

    //   this.setState(prevState => ({
    //     todos: prevState.todos.map(todo => {
    //       if (todo.id === todoId) {
    //         return {
    //           ...todo,
    //           completed: !todo.completed,
    //         };
    //       }
    //       return todo;
    //     }),
    //   }));

    // либо можно записать с помощью тернарного оператора
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  // LOCAL STORAGE И ЖИЗНЕННЫЕ ЦИКЛЫ
  // методы жизненного цикла вызываются без помощи стрелоных функции

  // вызывается после каждого обновления компонента
  componentDidUpdate(prevProps, prevState) {
    //обязательно сравниваем предыдущее значение todos c текущим, если неравно, то обновляем все todos. Это делается, чтобы не зациклить компонент
    if (this.state.todos !== prevState.todos) {
      // console.log('Update todos');

      // при каждом обновлении todos массив todos, приводим к строке и полностью перезаписываем todos  в local Storage
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  // вызывается один раз при Mount компонета. Удобен, чтобы взять начальные данные, которые хранятся в localStorage
  componentDidMount() {
    // console.log('Mount component');

    const todos = localStorage.getItem('todos');
    // console.log(todos);

    const parsedTodos = JSON.parse(todos);
    // console.log(parsedTodos);

    //сохраняем в localStorage новые todos поверх предыдущих и проверка на null. если есть todos, т.е. массив не пустой, то пишем их в  localStorage
    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

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
        {/* Counter */}
        {/* <Counter /> */}

        {/* Dropdown Menu */}
        {/* <Dropdown /> */}

        {/* ColorPicker */}
        <ColorPicker options={colorPickerOptions} />

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

        {/* Form. чтобы при отравке (submit) формы получить доступ к state из Form.js добавляем prop onSubmit методом для этого */}
        {/* <Form onSubmit={this.formSubmitHandler} /> */}

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
