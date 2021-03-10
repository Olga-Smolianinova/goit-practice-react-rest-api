import React from 'react';

import PropTypes from 'prop-types';

import s from './FeedbackOptions.module.css';

const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  // т.к. state - объект, обработаем его с помощью метода Object.keys, и далее ключи выведем с помощью map
  const buttons = Object.keys(options);

  return (
    <>
      {buttons.map(button => (
        <button
          type="button"
          key={button}
          onClick={onLeaveFeedback}
          className={s.Feedback__btn}
        >
          {/*рендерим button, приведя сначала к  Заглавной букве название кнопки */}
          {button.toUpperCase().slice(0, 1) + button.slice(1)}
        </button>
      ))}
    </>
  );
};

FeedbackOptions.propTypes = {
  options: PropTypes.object.isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};

export default FeedbackOptions;
