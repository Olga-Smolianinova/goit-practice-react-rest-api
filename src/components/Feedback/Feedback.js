import React, { Component } from 'react';

//Components
import Section from './Section'; //for title

import FeedbackOptions from './FeedbackOptions';

import Statistics from './Statistics';

import Notification from './Notification';

// Styles
import s from './Feedback.module.css';

class Feedback extends Component {
  // static defaultProps = {
  //   value: this.defaultProps.value,
  // };

  // static propTypes ={}

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  // методы
  countFeedback = event => {
    const btnName = event.target.textContent.toLowerCase();

    this.setState(prevState => {
      // перебираем this.state. Если в переборе ключ и имя кнопки (приведенное к нижнему регистру) совпадает, то значение ключа +1
      for (const key in prevState) {
        if (key === btnName) {
          return { [key]: prevState[key] + 1 };
        }
      }
      // вариант 2 - тоже самое через распыление
      // ...prevState,
      // ...{
      //   [btnName]:
      //     prevState[btnName] + 1,
      // },
    });
  };

  // метод для расчета общего количества отзывов (total). Для использования этого способа в render() прописываем totalFeedback=this.countTotalFeedback()

  // countTotalFeedback = () => {
  //   const values = Object.values(this.state);
  //   console.log(values);
  //   const totalFeedback = values.reduce((acc, value) => acc + value, 0);
  //   return totalFeedback;
  // };

  // render
  render() {
    // для оптимизации кода деструктуризируем свойства state,чтобы каждый раз не писать this.state в Statistics
    const { good, neutral, bad } = this.state;
    // console.log(this.state);

    // для расчета общего количества отзывов (total)
    const countTotalFeedback = good + neutral + bad;

    // для расчета % положительных отзывов
    const countPositiveFeedbackPercentage = Math.round(
      (good * 100) / countTotalFeedback,
    );

    return (
      <div className={s.Feedback}>
        {/*1. title выносим в отдельный component 
        /* 2.  внутрь Section рендерим и вставляем часть кода из ./FeedbackOptions.js */}
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.countFeedback}
          />
        </Section>

        {/*3. title выносим в отдельный component
        4. внутрь Section рендерим и вставляем часть кода из ./Statistics.js */}
        <Section title="Statistics">
          {/* рендер по условию: если есть хотя бы 1 отзыв выведи всю статистику, в обратном случае - надпись No feedback given' */}
          {countTotalFeedback !== 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback}
              positivePercentage={countPositiveFeedbackPercentage}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </div>
    );
  }
}

export default Feedback;
