import React, { Component } from 'react';
import AddPost from './AddPost';
import Post from './Post';

export default class PostList extends Component {
  render() {
    return (
      <div>
        <AddPost />
        <Post />
        PostList component
      </div>
    );
  }
}
