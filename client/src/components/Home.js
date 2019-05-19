import React, { Component } from 'react';
import Login from './Auth/Login';
import PostList from './Posts/PostList';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/authAction';

class Home extends Component {
  render() {
    // console.log(this.props);
    return <div>{this.props.isAuthenticated ? <PostList /> : <Login />}</div>;
  }
}
const mapPropsToState = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapPropsToState,
  { getCurrentUser }
)(Home);
