import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core';
import './UserPhotos.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import axios from 'axios';

/**
 * TODO project7 problem2, 
 * 1 在一个输入框中输入comment，所有都会更改
 * 2 每次添加comment都要重新加载整个界面
 */


/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        photos: undefined,
        comment: undefined,
    };

    axios('http://localhost:3000/photosOfUser/'+this.props.match.params.userId).then(response => {
        this.setState({photos: response.data});
    });
    axios('http://localhost:3000/user/'+this.props.match.params.userId).then(response => {
        this.props.changeView("Photo of " + response.data.first_name + " "+response.data.last_name);
    });
  }

  handleCommentChange(event) {
      this.setState({commentText: event.target.value});
  }
  handleButtonClick() {
      axios.post("http://localhost:3000/commentOfPhoto/"+this.state.photos.photo_id, {comment: this.state.comment}).then(response => {
          if (response.status !== 200) {
              console.log("comment failed");
              // TODO error message
          } else {
                axios('http://localhost:3000/photosOfUser/'+this.props.match.params.userId).then(response => {
                    this.setState({photos: response.data});
                });
          }
      });
  }

  render() {
    return (
        <div>
          { this.state.photos && this.state.photos.map(photo => {
              return (
           <Card maxWidth="345"> 
          <CardHeader
            subheader={photo.date_time}
          />
          <CardMedia
            component = "img"
            image={"/images/"+photo.file_name}
            height="200"
            width="50"
            title={photo.file_name}
          />
          <CardContent>
              {photo.comments &&  photo.comments.map(comment => {
              return (
            <Card>
                <CardContent>
                    <ListItem>
                        <ListItemText primary={comment.date_time}/>
                    </ListItem>
                    <ListItem button component={Link} to={"/users/"+comment.user._id}>
                        <ListItemText secondary={comment.user.first_name +" " + comments[i].user.last_name}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText secondary={comment.comment}/>
                    </ListItem>
                </CardContent>
            </Card>
           );})}
          </CardContent>
        <div>
            <div>
            <TextField
                label="Label"
                style={{ margin: 8 }}
                placeholder="add your comment"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                variant="filled"
                type="text"
                value={this.state.comment}
                onChange={e => this.handleCommentChange(e)}
            />
            </div>
            <div>
                <Button color="primary" onClick={this.handleButtonClick()}>
                    commit
                </Button>
            </div>
        </div>
          </Card>
              );
          })}  
        </div>
    );
  }
}

export default UserPhotos;
