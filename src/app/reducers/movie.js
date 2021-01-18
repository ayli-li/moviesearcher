import { FETCH_MOVIE_SUCCESS, FETCH_MOVIE_ERROR, FETCH_MOVIE_LOADING } from '../../constants';

const initialState = {
  movie: null,
  errorMessage: '',
  isLoading: false,
}

const movie = (state = initialState, { type, movie, err, loader }) => {
  switch(type) {
    case FETCH_MOVIE_SUCCESS:
      return {...state, movie};
    
    case FETCH_MOVIE_ERROR:
      return {...state, errorMessage: err};

    case FETCH_MOVIE_LOADING:
      return {...state, isLoading: loader};
    
    default:
      return state;
  }
}

export default movie;