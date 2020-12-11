import React from 'react';
import './States.css';

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    //console.log('window.cs142models.statesModel()', window.cs142models.statesModel());

    // Components have a special property named "state" that holds state.
    this.state = {
        states: window.cs142models.statesModel().sort(),
        searchText: ''
    };

    for (let i=0;i<this.state.states.length;i++) {
        if (this.state.states[i].toLowerCase().includes('al')) {
            console.log(this.state.states[i]);
        }
    }

  }

  handleSearchChange(event) {
      this.setState({searchText: event.target.value});
  }

  handleSearch() {
     let listItem = [];
     if (this.state.searchText === '') {
        for (let i = 0; i < this.state.states.length; i++) {
            listItem[i] = <li>{this.state.states[i]}</li>;
        }
     } else {
        listItem = this.state.states.filter(state=>state.toLowerCase().includes(this.state.searchText.toLowerCase()));
        for (let i = 0; i < listItem.length; i++) {
            listItem[i] = <li>{listItem[i]}</li>;
        }
     } 
     const retVal = (
         <div>
             <p className="searchText">{this.state.searchText}</p>
             <ul className="resultList">{listItem}</ul>
         </div>
     )
     return retVal;
  }

  render() {
    return (
      <div>
        Replace this with the code for CS142 Project #4, Problem #2
        <div>
            <div>
                <label htmlFor="searchId">Input Field:</label>
                <input id="searchId" type="text" value={this.state.searchText} onChange={e => this.handleSearchChange(e)} />
                {this.handleSearch()}
            </div>
        </div>
      </div>
    );
  }
}

export default States;
