import React from 'react';
import {
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './LoginRegister.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


/**
 * Define TopBar, a React componment of CS142 project #5
 */
class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loginName: 'Name',
    };
    this.props.changeView("Please Login");
    console.log("enter login register");
  }

  handleInputChange(event){
      this.setState({loginName: event.target.value});
  }
  handleLoginButtonClick() {
      axios.post("http://localhost:3000/admin/login", {login_name: this.state.loginName}).then(response => {
          if (response.status !== 200) {
              console.log("login failed");
              // TODO error message
          } else {
              this.changeUser(response.data._id);
              this.changeUserIsLoggedIn(true);
          }
      });
  }

  render() {
    return (
        <Card>
        <CardActionArea>
        <CardContent>
            <form noValidate autoComplete="off">
            <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">Login Name</InputLabel>
            <OutlinedInput id="component-outlined" type="text" value={this.state.loginName} onChange={e => this.handleInputChange(e)} label="Name" />
            </FormControl>
            </form>
        </CardContent>
        </CardActionArea>
            <CardActions>
                <Button color="primary" onClick={this.handleLoginButtonClick()}>
                  Login
                </Button>
                <Button color="primary" onClick={this.handleLoginButtonClick()}>
                  regist
                </Button>
            </CardActions>
        </Card>
    );
  }
}

export default LoginRegister;
