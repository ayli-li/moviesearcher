import { FETCH_MOVIES_SUCCESS } from '../../constants';

const initialState = {
  movies: [],
}

const movies = (state = initialState, { type, movies }) => {
  switch(type) {
    case FETCH_MOVIES_SUCCESS:
      return {...state, movies};
      // eslint-disable-next-line no-unreachable
      break;
    default:
      return state;
  }
}

export default movies;