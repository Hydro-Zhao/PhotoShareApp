import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
}
from '@material-ui/core';
import './UserList.css';
import { Link } from "react-router-dom";
import axios from 'axios';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userList: undefined,
          //userList : window.cs142models.userListModel(),
    };    
    axios('http://localhost:3000/user/list').then(response => {
        this.setState({userList: response.data});
    });
  }

  render() {
    let listItems = [];
    if ( undefined !== this.state.userList) {
    for (let i = 0; i < this.state.userList.length; i++) {
        listItems[i] = 
        <Link to={"/users/" +  this.state.userList[i]._id}>
      <ListItem>
          <ListItemText primary = {this.state.userList[i].first_name + " " + this.state.userList[i].last_name} />
      </ListItem>
      <Divider />
        </Link>;
    }
    }

    return (
        <List component="nav">
            {listItems}
        </List>
    );
  }
}

export default UserList;
