import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import './UserDetail.css';
import { Link } from "react-router-dom";
import axios from 'axios';


/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        //user: window.cs142models.userModel(this.props.match.params.userId),
        user: undefined,    
    };

    axios('http://localhost:3000/user/'+this.props.match.params.userId).then(response => {
        this.setState({user: response.data});
        this.props.changeView(response.data.first_name + " "+response.data.last_name);
    });

  }

  componentDidUpdate = () => {
    if (this.state.user._id !== this.props.match.params.userId) {
      axios('http://localhost:3000/user/'+this.props.match.params.userId).then(response => {
          this.setState({user: response.data});
          this.props.changeView(response.data.first_name + " "+response.data.last_name);
      });
    }
  };

  render() {
    return (
        <div>
            {undefined !== this.state.user ? 
            <Card maxWidth="345">
                <CardActionArea>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.state.user.first_name} + " "{this.state.user.last_name}
                    </Typography>
                    <List component="nav">
                        <ListItem>
                            <ListItemText>Location: {this.state.user.location}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Desciption: {this.state.user.desciption}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Occupation: {this.state.user.occupation}</ListItemText>
                        </ListItem>
                    </List>
                </CardContent>
                <CardActions>
            <Button size="small" color="primary" component={Link} to={"/photos/" + this.props.match.params.userId}>
              Photos
            </Button>  
                </CardActions>
                </CardActionArea>
            </Card>
            :<Card></Card>
            }

        {/*
      <Typography variant="body1">
        This should be the UserDetail view of the PhotoShare app. Since
        it is invoked from React Router the params from the route will be
        in property match. So this should show details of user:
        {this.props.match.params.userId}. You can fetch the model for the
        user from window.cs142models.userModel(userId).
      </Typography>
        */}
        </div>
    );
  }
}

export default UserDetail;
