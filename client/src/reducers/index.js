import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import postReducer from './postReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  post: postReducer
});
