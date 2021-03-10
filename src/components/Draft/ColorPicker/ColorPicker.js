import React, { Component } from 'react';

import s from './ColorPicker.module.css';

class ColorPicker extends Component {
  // чтобы хранить выбранную текущую опцию выводим ее в state и будем обращаться к ней через ее индекс ([this.state.activeOptionIdx]) массиве.

  state = {
    activeOptionIdx: 0,
  };

  // по клику на каждую из кнопок ColorPicker вызывается setActiveIdx и передается в state. В параметрах передается index выбранной кнопки поверх предыдущего
  setActiveIdx = index => {
    this.setState({ activeOptionIdx: index });
  };

  // чтобы активная ссылка подсвечивалась добавляем дополнительный className: ColorPicker__option--active. Добавляем условие, если индекс массива ===  activeOptionIdx появляется доп.класс push к другому классу и ссылку на этот метод отражаем в className. (Если установить  npm install classnames можно сократить метод. Видео 4 С.Репета 00:55:00)
  makeOptionClassName = index => {
    const optionClasses = ['ColorPicker__option'];

    if (index === this.state.activeOptionIdx) {
      optionClasses.push('ColorPicker__option--active');
    }
    return optionClasses.join(' ');
  };

  render() {
    //из массива colorPickerOptions берется цвет { label } того элемента, чей indexсейчас активен. и этот цвет { label } ренндерится  в <p>Выбран цвет: {label} </p>
    const { label } = this.props.options[this.state.activeOptionIdx];

    return (
      <div className={s.ColorPicker}>
        <h2 className={s.ColorPicker__title}>Color Picker</h2>
        <p>Выбран цвет: {label} </p>

        <div>
          {/* проходимся map по props options */}

          {this.props.options.map(({ label, color }, index) => (
            <button
              key={label}
              className={this.makeOptionClassName(index)} //вынесены в App.css
              style={{ backgroundColor: color }}
              //   во время onClick вызывается инлайново функция setActiveIdx, которая через замыкание исполузует index и подменяет его в state
              onClick={() => {
                this.setActiveIdx(index);
              }}
            ></button>
          ))}
        </div>
      </div>
    );
  }
}
export default ColorPicker;
