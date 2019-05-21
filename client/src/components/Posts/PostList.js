import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getPosts } from '../../actions/postAction';
import AddPost from './AddPost';
import Post from './Post';
import Loading from './Loading';

const styles = {
  load: {
    padding:0
  }
};

class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { loading, list, classes } = this.props;
    console.log(this.props);
    const items =
    list &&
    list.map(el => {
      return <Post key={el._id} post={el} />;
    });
    return (
      <div>
        <AddPost />
        {loading ? <Loading className={classes.load} /> : items}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.post.list,
  loading: state.post.loading
});

export default connect(
  mapStateToProps,
  { getPosts }
)(withStyles(styles)(PostList));
