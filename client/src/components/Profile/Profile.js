import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getUserProfile, getPostsByUserId } from '../../actions/profileAction';
import Post from '../Posts/Post';
import Loading from '../Posts/Loading';

const styles = {};

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userId);
    this.props.getPostsByUserId(this.props.match.params.userId);
  }
  render() {
    console.log (this.props);
    const {
      classes,
      loadingPosts,
      list,
      loadingProfile,
      profile,
      auth,
      user
    } = this.props;
    const items = list && list.map(el => <Post key={el._id} post={el} />);

    return <div>{loadingPosts ? <Loading /> : items}</div>;
    // return <div>{<Loading />}</div>;
  }
}

const mapStateToProps = state => ({
  loadingPosts: state.post.loading,
  list: state.post.list,
  loadingProfile: state.profile.loading,
  profile: state.profile.user,
  auth: state.auth,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getUserProfile, getPostsByUserId }
)(withStyles(styles)(Profile));
