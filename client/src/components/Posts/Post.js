import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  paper: {
    paddingLeft: 30
  }
};
class Post extends Component {

  render() {
    const { classes } = this.props;
    const { post } = this.props;
    // const { createdAt } = this.props.post
    return (
      <Paper className={classes.paper}>
        <div
          className={classes.avatar}
          style={{ backgroundColor: '#000' }}
        />
        <div>
          <h3>
            <span>{post.createdAt}</span>
          </h3>
          {/* {post.text} */}
        </div>
      </Paper>
    );
  }
}
export default withStyles(styles)(Post);
