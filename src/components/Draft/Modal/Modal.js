import React, { Component } from 'react';

import { createPortal } from 'react-dom'; //для создания портала, куда будем рендерить разметку компонента Modal

import './Modal.css';

// для портала. ccылка к корневому элементу в index.html куда будем рендерить разметку компонента Modal.
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');

    //при 1 стадии монтирования вешаем слушателя события на window  для закрытия Модального окна по нажатию на ESC сперва
    window.addEventListener('keydown', this.handleKeyDown);
  }

  // на стадии размонтирования и зачистки кода после использования.
  componentWillUnmount() {
    // снимаем слушателя события с window при закрытии Модального окна по нажатию на ESC
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // закрытие Модального окна по нажатию на ESC
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      // console.log('ESC');

      // в props прокидываем toggleModal для возможности закрыть модалку по нажатию на "Escape"
      this.props.onClose();
    }
  };

  // закрытие Модального окна по нажатию на backdrop. Чтобы модалка закрылась currentTarget и target должны быть ===
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    // возвращаем результат вызова import { createPortal } from 'react-dom'куда будем рендерить разметку компонента Modal и 1) первым параметром передаем разметку мадального окна; 2) ссылка на корневой элемент в index.html
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
