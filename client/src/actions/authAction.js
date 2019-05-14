import axios from 'axios';
import { GET_ERRORS } from '../constants';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('http://localhost:4000/api/users/register', userData)
    .then(res => {
      history.push('/login');
    })
    .catch(err => {
      console.log(err.response.data);
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.data
      // })
    });
};

