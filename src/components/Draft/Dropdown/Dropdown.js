import React, { Component } from 'react';

import s from './Dropdown.module.css';

class Dropdown extends Component {
  state = {
    visible: false,
  };

  // для оптимазации кода вместо show  и hide сделаем один метод toggle, который в зависимости от предыдущего переключает visible на противоположное значение
  toggle = () => {
    this.setState(prevState => ({
      visible: !prevState.visible, //!true, т.е. false
    }));
  };

  //   show = () => {
  //     this.setState({ visible: true });
  //   };

  //   hide = () => {
  //     this.setState({ visible: false });
  //   };

  render() {
    return (
      <div className={s.Dropdown}>
        <h2>Dropdown Menu</h2>

        <button
          type="button"
          className={s.Dropdown__toggle}
          onClick={this.toggle}
        >
          {/* рендер по условию: если true то отображаем кнопку "Скрыть", в противном случае - кнопку "Показать" */}
          {this.state.visible ? 'Скрыть' : 'Показать'}
        </button>

        {/* <button
          type="button"
          className={s.Dropdown__toggle}
          onClick={this.hide}
        >
          Скрыть
        </button> */}

        {/* рендер по условию: если true, тогда отрендери разметку с выпадающим меню*/}
        {this.state.visible && (
          <div className={s.Dropdown__menu}>Выпадающее меню</div>
        )}
      </div>
    );
  }
}
export default Dropdown;
