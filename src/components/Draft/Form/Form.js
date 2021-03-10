import React, { Component } from 'react';

class Form extends Component {
  state = {
    name: '',
    tag: '',
    experience: 'middle',
    license: false,
  };

  // ввод данных
  handleChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  // для отправки (submit) формы
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    //   во время отправки (submit) формы обращаемся к prop onSubmit={this.formSubmitHandler} для передачи данных из  state (name, tag) в App
    this.props.onSubmit(this.state);

    // вызов reset для очистки  данных формы,
    this.reset();
  };

  // для очистки (reset) данных формы, в который передаем начальное состояние state
  reset = () => {
    this.setState({ name: '', tag: '' });
  };

  //  для checkbox делаем отдельный метод, т.к. проверяется не по value, а по ключу checked
  handleCheckboxChange = event => {
    console.log(event.currentTarget.checked);
    this.setState({ license: event.currentTarget.checked });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* Name */}
        <label>
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <br />

        {/* Surname */}
        <label>
          Surname
          <input
            type="text"
            name="tag"
            value={this.state.tag}
            onChange={this.handleChange}
          />
        </label>
        <br />

        {/* Radio button */}
        <p>Radiobutton Your level: </p>
        <label>
          <input
            type="radio"
            name="experience"
            value="junior"
            onChange={this.handleChange}
            checked={this.state.experience === 'junior'}
          />
          Junior
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="experience"
            value="middle"
            onChange={this.handleChange}
            checked={this.state.experience === 'middle'}
          />
          Middle
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="experience"
            value="senior"
            onChange={this.handleChange}
            checked={this.state.experience === 'senior'}
          />
          Senior
        </label>
        <br />

        {/* Checbox. Если только 1 Checbox - value не нужен, достаточно только checked */}
        <p>Checkbox</p>
        <label>
          <input
            type="checkbox"
            name="license"
            checked={this.state.license}
            onChange={this.handleCheckboxChange}
          />
          Согласен с условием
        </label>
        <br />

        {/* Button Submit */}
        <button type="submit" disabled={!this.state.license}>
          SEND
        </button>
        <br />
      </form>
    );
  }
}
export default Form;
