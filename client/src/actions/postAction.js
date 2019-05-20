import axios from 'axios';
import { LOADING_POSTS, ADD_POST, GET_POSTS } from '../constants';

export const addPost = postData => dispatch => {
  axios
    .post('http://localhost:4000/api/posts/add', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const getPosts = () => dispatch => {
  dispatch(loadPosts);
  axios
    .get('http://localhost:4000/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const loadPosts = () => {
  return {
    type: LOADING_POSTS
  };
};
