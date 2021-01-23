import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR, FETCH_MOVIES_LOADING, SET_MOVIES_PAGE } from '../../constants';

const initialState = {
  movies: [],
  errorMessage: '',
  isLoading: false,
  page: 1
}

const movies = (state = initialState, { type, movies, err, loader, page }) => {
  switch(type) {
    case FETCH_MOVIES_SUCCESS:
      return {...state, movies};
    
    case FETCH_MOVIES_ERROR:
      return {...state, errorMessage: err};

    case FETCH_MOVIES_LOADING:
      return {...state, isLoading: loader};
    
    case SET_MOVIES_PAGE:
      return {...state, page};
    
    default:
      return state;
  }
}

export default movies;