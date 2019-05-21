import axios from 'axios';
import {
  GET_PROFILE,
  LOAD_PROFILE,
  LOADING_POSTS,
  GET_POSTS
} from '../constants';

export const getUserProfile = (userId) => dispatch => {
  dispatch(loadingProfile());
  axios
    .get(`http://localhost:4000/api/users/${userId}`)
    .then(res =>  dispatch({type: GET_PROFILE,payload: res.data}))
    .catch(err => {
      console.log(err);
    });
};

export const getPostsByUserId = (userId) => dispatch => {
  dispatch(loadingPosts());
  axios
    .get(`http://localhost:4000/api/posts/${userId}`)
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

export const loadingProfile = () => {
  return {
    type: LOAD_PROFILE
  };
};
export const loadingPosts = () => {
  return {
    type: LOADING_POSTS
  };
};
