import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {
  getUserProfile,
  getPostsByUserId,
  followUser,
  unfollowUser,
  refreshUserProfile
} from '../../actions/profileAction';
import Post from '../Posts/Post';
import Loading from '../Posts/Loading';

const styles = {
  paper: {
    padding: 8
  },
  detailsBlock: {
    display: 'flex'
  },
  login: {},
  email: {
    color: '#888',
    marginBottom: 5
  },
  details: {
    marginRight: 5,
    fontWeight: 'bold'

    // fontSize: 10
  },
  detailsTitle: {
    marginLeft: 3,
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 'normal'
  },
  btnBlock: {
    width: '100%',
    textAlign: 'right'
  },
  followBtn: {
    color: 'white',
    backgroundColor: '#9400D3',
    '&:hover': {
      color: '#9400D3',
      backgroundColor: 'white'
    }
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnFollow = this.handleUnFollow.bind(this);
  }
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userId);
    this.props.getPostsByUserId(this.props.match.params.userId);
  }
  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated) {
      if (
        prevProps.user &&
        prevProps.user.following !== this.props.user.following
      ) {
        this.props.refreshUserProfile(this.props.match.params.userId);
      }
    }
  }
  handleFollow() {
    this.props.followUser(this.props.match.params.userId);
    console.log(this.props.match.params.userId);
  }
  handleUnFollow() {
    this.props.unfollowUser(this.props.match.params.userId);
    console.log(this.props.match.params.userId);
  }

  render() {
    const {
      classes,
      loadingPosts,
      list,
      loadingProfile,
      profile,
      auth,
      user
    } = this.props;
    console.log(user);
    // console.log(this.state);
    let items;
    items = list && list.map(el => <Post key={el._id} post={el} />);

    let profileInfo;
    let followBtn;

    if (auth.isAuthenticated) {
      if (
        user &&
        user.following &&
        user.following.indexOf(this.props.match.params.userId) === -1
      ) {
        followBtn = (
          <div className={classes.btnBlock}>
            <Button
              className={classes.followBtn}
              variant="outlined"
              onClick={this.handleFollow}
            >
              Follow
            </Button>
          </div>
        );
      } else {
        followBtn = (
          <div className={classes.btnBlock}>
            <Button
              className={classes.followBtn}
              variant="outlined"
              onClick={this.handleUnFollow}
            >
              Unfollow
            </Button>
          </div>
        );
      }
    }

    if (profile && items) {
      profileInfo = (
        <Paper className={classes.paper}>
          <div className={classes.login}>{profile.login}</div>
          <div className={classes.email}>{profile.email}</div>
          <div className={classes.detailsBlock}>
            <div className={classes.details}>
              {items.length}
              <span className={classes.detailsTitle}>posts</span>
            </div>
            <div className={classes.details}>
              {profile.followers.length}

              <span className={classes.detailsTitle}>followers</span>
            </div>
            <div className={classes.details}>
              {profile.following.length}
              <span className={classes.detailsTitle}>following</span>
            </div>
            {followBtn}
          </div>
        </Paper>
      );
    }

    return (
      <div>
        {loadingProfile ? <div>Loading...</div> : profileInfo}
        {loadingPosts ? <Loading /> : items}
      </div>
    );
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
  {
    getUserProfile,
    getPostsByUserId,
    followUser,
    unfollowUser,
    refreshUserProfile
  }
)(withStyles(styles)(Profile));
