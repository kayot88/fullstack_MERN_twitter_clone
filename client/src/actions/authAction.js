import axios from 'axios';
import { SET_CURRENT_USER, GET_ERRORS } from '../constants';
import setAuthHeader from '../utils/setAuthHeader';


export const loginUser = userData => dispatch => {
  axios
    .post('http://localhost:4000/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthHeader(token);
      dispatch(getCurrentUser());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('http://localhost:4000/api/users/register', userData)
    .then(res => {
      history.push('/login');
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getCurrentUser = () => dispatch => {
  axios
    .get('http://localhost:4000/api/users')
    .then(res => dispatch(setCurentUser(res.data)));
};

export const setCurentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthHeader();
  dispatch(setCurentUser());
};
