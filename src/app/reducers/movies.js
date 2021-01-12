import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR, FETCH_MOVIES_LOADING } from '../../constants';

const initialState = {
  movies: [],
  errorMessage: '',
  isLoading: false,
}

const movies = (state = initialState, { type, movies, err, loader }) => {
  switch(type) {
    case FETCH_MOVIES_SUCCESS:
      return {...state, movies};
    
    case FETCH_MOVIES_ERROR:
      return {...state, errorMessage: err};

    case FETCH_MOVIES_LOADING:
      return {...state, isLoading: loader};
    
    default:
      return state;
  }
}

export default movies;