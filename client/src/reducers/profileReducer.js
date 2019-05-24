import { GET_PROFILE, LOAD_PROFILE } from '../constants';

const initialState = {
  loading: false,
  user: null
};


export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case LOAD_PROFILE:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
