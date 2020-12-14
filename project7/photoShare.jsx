import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Redirect, Route, Switch
} from 'react-router-dom';
import {
  Grid, Paper, List
} from '@material-ui/core';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/UserDetail';
import UserList from './components/userList/UserList';
import UserPhotos from './components/userPhotos/UserPhotos';
import LoginRegister from './components/loginRegister/LoginRegister';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        text: "Home",
        userIsLoggedIn: false,
        userId: undefined,
    };
    this.changeView = this.changeView.bind(this);
    this.changUserIsLoggedIn = this.changeUserIsLoggedIn.bind(this);
    this.changUserId = this.changeUserId.bind(this);
  }

  changeView = (newText) => {
      this.setState({text:newText});
  };
  changeUserIsLoggedIn = (userIsLoggedIn) => {
      this.setState({userIsLoggedIn:userIsLoggedIn});
  };
  changeUserId= (userId) => {
      this.setState({userId:userId});
  };

  render() {
    return (
      <HashRouter>
      <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TopBar text={this.state.text} userIsLoggedIn={this.state.userIsLoggedIn} />
        </Grid>
        <div className="cs142-main-topbar-buffer"/>
        <Grid item sm={3}>
          <Paper  className="cs142-main-grid-item">
            {this.state.userIsLoggedIn ? <UserList /> : <List component="nav"></List>}
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className="cs142-main-grid-item">
            <Switch>
                <Route exact path="/">
                    {
                        this.state.userIsLoggedIn ? 
                        <Redirect path="/" to={"/users/"+this.state.userId} />
                        :
                        <Redirect path="/" to="/login-register" />
                    }
                </Route>
                <Route path="/login-register"
                  render={ props => <LoginRegister 
                        changeView={this.changeView} 
                        changeUserId={this.changeUserId}
                        changeUserIsLoggedIn={this.changUserIsLoggedIn}
                        {...props} /> }
                />
            {
              this.state.userIsLoggedIn ?
              <Route path="/users/:userId"
                render={ props => <UserDetail changeView={this.changeView} {...props} /> }
              />
              :
              <Redirect path="/users/:userId" to="/login-register" />
            }
            {
              this.state.userIsLoggedIn ?
              <Route path="/photos/:userId"
              render ={ props => <UserPhotos changeView={this.changeView} {...props} /> }
              />
              :
              <Redirect path="/photos/:userId" to="/login-register" />
            }
            {
              this.state.userIsLoggedIn ?
              <Route path="/users" component={UserList}  />
              :
              <Redirect path="/users" to="/login-register" />
            }
            </Switch>
          </Paper>
        </Grid>
      </Grid>
      </div>
    </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
