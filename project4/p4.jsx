import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';

import Example from './components/example/Example';
import States from './components/states/States';
import Header from './components/hearder/Header';


class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
        example: true,
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
      // Bug 
      this.setState({example: !this.state.example});
  }

  render() {
    return (
     <div>
          <button type="button" onClick={this.handleButtonClick}>
          {this.state.example ? 'Switch to States' :'Switch to Example'}
          </button>
          {this.state.example ? <Example />:<States />}
     </div>
    );
  }
}

ReactDOM.render(
    <div>
    <Header />
    <Switch /> 
    </div>,
    document.getElementById('reactapp'),
);
