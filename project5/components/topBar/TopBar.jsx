import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core';
import './TopBar.css';
import {Grid} from '@material-ui/core';

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
