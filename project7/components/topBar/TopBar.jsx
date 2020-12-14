import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core';
import './TopBar.css';
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state={
        text: this.props.text,
    };
  }

  componentDidUpdate(prevProps) {
      if (prevProps.text !== this.props.text) {
          this.setState({text: this.props.text});
      }
  }

  //this function is called when user presses the update button
  handleUploadButtonClicked = (e) => {
    e.preventDefault();
    if (this.uploadInput.files.length > 0) {
      // Create a DOM form and add the file to it under the name uploadedphoto
      const domForm = new FormData();
      domForm.append('uploadedphoto', this.uploadInput.files[0]);
      axios.post('/photos/new', domForm).then((res) => {
        console.log(res);
      }).catch(err => console.log(`POST ERR: ${err}`));
    }
  };

  handleLogoutButtonClick = () => {
      axios.post("http://localhost:3000/admin/logout").then(response => {
          if (response.status !== 200) {
              console.log("logout failed");
              // TODO error message
          } else {
              this.changeUser(null);
              this.changeUserIsLoggedIn(false);
          }
      });
  };

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
             <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
          <Typography variant="h5" color="inherit" align="left">
             Haizhou Zhao 
          </Typography>
          {
              this.props.userIsLoggedIn && 
              <div>
                  <input 
                  type="file" 
                  accept="image/*" 
                  ref={(domFileRef) => { 
                      this.uploadInput = domFileRef; 
                  }} />
                  <Button color="primary" onClick={this.handleUploadButtonClick()}>
                  upload
                  </Button>
                  <Button color="primary" onClick={this.handleLogoutButtonClick()}>
                  logout
                  </Button>
              </div>
          }
          <Typography variant="h5">
                {this.state.text}
          </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
